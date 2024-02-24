import {defineStore} from 'pinia'
import {LocalStorage, Notify} from "quasar";
import {useGlobalStore} from "stores/GlobalStore";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    current_user: LocalStorage.has('currentUser') ? LocalStorage.getItem('currentUser') : null,
    csrftoken: LocalStorage.has('csrftoken') ? LocalStorage.getItem('csrftoken') : null,
    userToken: LocalStorage.has('userToken') ? LocalStorage.getItem('userToken') : null,

    
  }),

  getters: {
    IsLoggedIn(state) {
      return state.current_user;
    },
  },

  actions: {
    async register(data) {
      const global_store = useGlobalStore();
      return await global_store.apiRequest({
        url: "register",
        method: "POST",
        data: data,
        loading: false,
      }).then((response) => {
        console.log(response)
        LocalStorage.set('userToken', response.data.token)
        LocalStorage.set('currentUser', response.data.user)
        // this.current_user = response.data.user;

        Notify.create({
          color: "green",
          position: "top",
          message: response.data.message,
        });
        this.router.push('/login')
        return Promise.resolve(response);
      }).catch((error) => {
        return Promise.reject(error);
      })
    },


    async login(data) {
      const global_store = useGlobalStore();
      return await global_store.apiRequest({
        url: "login",
        method: "POST",
        data: data,
      })
        .then((response) => {
          console.log(response)
          if (response.status == '200') {
            this.current_user=response.data.user;
            LocalStorage.set('userToken', response.data.token)
            LocalStorage.set('currentUser', response.data.user)
            Notify.create({
              color: "green",
              position: "top",
              message: 'User Logged In Successfully',
            });
            this.router.push('/dashboard')
          }
          return Promise.resolve(response);
        }).catch((error) => {
          console.log("ERROR" + error);
          return Promise.reject(error);
        })
    },


    async logout() {
      const global_store = useGlobalStore();
      return await global_store.apiRequest({
        url: "logout",
        method: "POST",
      })
        .then((response) => {
          if (response.status == '200') {
            Notify.create({
              color: "green",
              position: "top",
              message: 'User Logout  Successfully',
            });
            LocalStorage.remove('userToken')
            LocalStorage.remove('currentUser')
            this.current_user=null
            this.router.push('/login')
          }
          return Promise.resolve(response);
        }).catch((error) => {
          console.log("ERROR" + error);
          return Promise.reject(error);
        })
    }
  }
})
