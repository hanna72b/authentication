import { createStore } from "vuex";
import instance from "./plugins/axios.config";

const store = createStore({
  state: {
    done: null,
    getToken: "",
  },
  getters: {},
  mutations: {
    signup(state, status) {
      state.done = status;
    },
    verify(state, response) {
      state.getToken = response;
    },
  },
  actions: {
    async signup({ commit }, formData) {
      await instance
        .post("register", formData)
        .then((response) => {
          console.log("register response", response);

          const status = response.status
          commit("signup", status);
        })
        .catch((error) => {
          console.log("Register error", error);
        });
    },

    async verify({ commit }, dataVerify) {
      await instance
        .post("active", dataVerify)
        .then((response) => {
          console.log("active response", response);
          localStorage.setItem("token", response.data.token);
          commit("verify", response);
        })
        .catch((error) => {
          console.log("active error", error);
        });
    },

    async resend({ commit }, mobile) {
      await instance
        .post("resend", mobile)
        .then((response) => {
          console.log("resend response", response);
        })
        .catch((error) => {
          console.log("resend error", error);
        });
    },

    async login({ commit }, formData) {
      await instance
        .post("login", formData)
        .then((response) => {
          console.log("login response", response);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("mobilePassword", response.config.data);
        })
        .catch((error) => {
          console.log("login error", error);
        });
    },
  },
});

export default store;
