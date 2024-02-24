import { defineStore } from "pinia";
import {Loading, LocalStorage, Notify} from "quasar";
import { api } from "boot/axios";

export const useGlobalStore = defineStore("global", {
  state: () => ({

  }),

  getters: {},

  actions: {
    // async isConnected(){
    //   let status = await Network.getStatus()
    //   return status.connected;
    // },

    async apiRequest(data) {

      return await api
        .request({
          method: data.method,
          url: "api/" + data.url,
          data: data.data,
          params: data.method.toLowerCase() == "get" ? data.data : null,
          responseType: data.responseType ? data.responseType : "json",
          // headers,
          headers: data.headers ? data.headers : {},
          // headers: {"Accept-Language": i18n.$locale == 'en-US' ? 'bn' : 'en'},

        })
        .then((response) => {
          // if (data?.loading ?? true == true) {
          //   Loading.hide();
          // }
          if (typeof data.success === "function") {
            return data.success(response, this.$router);
          }
          return Promise.resolve(response);
        })
        .catch((error) => {
          // if (data?.loading ?? true == true) {
          //   Loading.hide();
          // }
          if (
            error.response !== undefined &&
            error.response.data !== undefined &&
            error.response.data.errors !== undefined &&
            !data?.hide_errors
          ) {
            for (const [key, err] of Object.entries(
              error.response.data.errors
            )) {
              Notify.create({
                color: "negative",
                position: "top",
                message: key + ": " + err[0],
                icon: "report_problem",
              });
            }
          }
          let message = error.message;
          if (
            error.response !== undefined &&
            error.response.data !== undefined &&
            error.response.data.message !== undefined
          ) {
            message = error.response.data.message;
          }
          if (!error.response?.data?.errors && !data?.hide_errors) {
            Notify.create({
              color: "negative",
              position: "top",
              message: "Something went wrong: " + message,
              icon: "report_problem",
            });
          }
          // Loading.hide();

          return Promise.reject(error);
        });
    },
  },
});
