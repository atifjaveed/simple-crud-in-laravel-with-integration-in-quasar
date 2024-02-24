  import {boot} from 'quasar/wrappers'
  import axios from 'axios'
  import {useAuthStore} from "stores/Auth/AuthStore";
  import {Cookies, LocalStorage} from "quasar";
  // Be careful when using SSR for cross-request state pollution
  // due to creating a Singleton instance here;
  // If any client changes this (global) instance, it might be a
  // good idea to move this instance creation inside of the
  // "export default () => {}" function below (which runs individually
  // for each client)
  const api = axios.create({baseURL: process.env.API_URL})

  export default boot(({app}) => {
    // for use inside Vue files (Options API) through this.$axios and this.$api

      app.config.globalProperties.$axios = axios
    
      app.config.globalProperties.$api = api
      api.defaults.withCredentials = true
      api.interceptors.request.use(async (config) =>{
          api.interceptors.response.use(
              response => {
                return response;
              },
              function(error) {
                  if (error.response?.status === 401 && useAuthStore().current_user!==null ){
                    localStorage.removeItem("userToken");
                    localStorage.removeItem("currentUser");
                    useAuthStore().current_user=null
                    useAuthStore().userToken=null
                    this.router.push('/')
                  }
                  return Promise.reject(error);
              }
          );
          const state = useAuthStore();
          if (( state.csrftoken === null || state.csrftoken ==='null')  && config.url != 'sanctum/csrf-cookie'){
              await api.get("sanctum/csrf-cookie").then((res)=>{
                  let token =Cookies.get("XSRF-TOKEN")
                  LocalStorage.set('csrftoken',token)
              })
          }
          config.headers["X-XSRF-TOKEN"] = state.csrftoken;
          let token = LocalStorage.getItem("userToken");
          if (token && token != null && token != undefined && token != "null") {
              config.headers["Authorization"] = "Bearer " + token;
          }
          return config;
      })

  })

  export {api}
