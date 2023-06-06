<script setup>
import { RouterLink } from "vue-router";
import Container from "./Container.vue";
import AuthModal from "./AuthModal.vue";
import { ref } from "vue";
import { useModalStore } from "../stores/ModalStore";
import { useUserStore } from "../stores/UserStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const modalStore = useModalStore();
// const modal = storeToRefs(modalStore);
const userStore = useUserStore();
console.log(userStore.user);
const user = storeToRefs(userStore);

const searchUserName = ref("");

const router = useRouter();

const onSearch = () => {
  if (searchUserName.value) {
    router.push(`/profiles/${searchUserName.value}`);
    searchUserName.value = "";
  }
};

const myProfile = () => {
  router.push(`/profiles/${userStore.user.username}`);
};
</script>

<template>
  <Container>
    <!-- {{ searchUserName }} -->
    <div class="nav-container flex justify-between">
      <!-- <div class="navbar bg-base-100 text-green-500 rounded"> -->
      <div class="left-content flex">
        <div class="mr-8 my-auto">
          <RouterLink to="/" class="btn btn-ghost normal-case text-xl"
            >Instagram</RouterLink
          >
        </div>
        <div class="flex-none gap-2 my-auto">
          <div class="form-control">
            <input
              v-model="searchUserName"
              type="text"
              placeholder="username...  "
              class="input border border-green-500"
              @keyup.enter="onSearch"
            />
          </div>
        </div>
      </div>
      <div class="relative bg-grey my-auto">
        <!-- <Transition> -->
        <!-- {{ modal.isAuthenticated }} {{ modalStore.isAuthenticated }} -->
        <ul class="menu menu-horizontal" v-if="!modalStore.isAuthenticated">
          <li>
            <AuthModal v-if="modalStore.showRegister" />
            <!-- <button
              class="mx-4 only:px-3 py-2 border rounded border-green-300 text-green-300"
            > -->
            <RouterLink
              to="/register"
              class="mr-4 px-3 py-2 border rounded border-green-300 text-green-300"
              >Register</RouterLink
            >
            <!-- </button> -->
            <!-- @click="modal.openModal('register')" -->
          </li>
          <li>
            <AuthModal v-if="modalStore.showLogin" />
            <!-- <button
              class="mr-4 px-3 py-2 border rounded border-green-300 text-green-300"
            > -->
            <RouterLink
              to="/login"
              class="mr-4 px-3 py-2 border rounded border-green-300 text-green-300"
              >Login</RouterLink
            >
            <!-- @click="modalStore.openModal('login')" -->
            <!-- </button> -->
          </li>
        </ul>
        <ul class="menu menu-horizontal items-center" v-else>
          <span v-if="userStore.user.username">
            Welcome {{ userStore.user.username }}
          </span>
          <li>
            <AuthModal v-if="modalStore.showRegister" />
            <button
              class="mx-4 only:px-3 py-2 border rounded border-green-300 text-green-300"
              @click="myProfile()"
            >
              Profile
            </button>
          </li>
          <li>
            <AuthModal v-if="modalStore.showLogin" />
            <button
              class="mr-4 px-3 py-2 border rounded border-green-300 text-green-300"
              @click="userStore.handleLogout()"
            >
              Logout
            </button>
          </li>
        </ul>
        <!-- </Transition> -->
      </div>
    </div>
  </Container>
</template>

<style scoped>
/* input {
  font-family: "FontAwesome";
} */
.v-enter-active {
  transition: opacity 0.1s ease;
}
</style>
