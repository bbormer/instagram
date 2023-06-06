import { defineStore } from "pinia";

export const useModalStore = defineStore("ModalStore", {
  state: () => {
    return {
      showRegister: false,
      showLogin: false,
      isAuthenticated: false,
      showFileUpload: false,
      // isProcessing: false,
    };
  },
  actions: {
    openRegister() {
      this.showRegister = true;
      console.log("openRegister");
    },
    openLogin() {
      this.showLogin = true;
    },
    closeRegister() {
      this.showRegister = false;
      console.log("closeRegister");
    },
    closeLogin() {
      this.showLogin = false;
    },
    openFileUpload() {
      this.showFileUpload = true;
    },
    closeFileUpload() {
      this.showFileUpload = false;
    },
    openModal(type) {
      console.log(`openModal: ${type}`);
      if (type == "register") {
        this.showRegister = true;
      } else {
        this.showLogin = true;
      }
    },
    closeModal(type) {
      console.log(`closeModal: ${type}`);
      if (type == "register") {
        this.showRegister = false;
      } else {
        this.showLogin = false;
      }
    },
    setAuthentication(state) {
      this.isAuthenticated = state;
    },
  },
});
