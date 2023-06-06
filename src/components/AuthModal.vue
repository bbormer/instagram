<script setup>
import { ref, reactive } from "vue";
import { useModalStore } from "../stores/ModalStore";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const route = useRouter();

const userName = ref("");
const password = ref("");
const email = ref("");

const userStore = useUserStore();
const { isProcessing } = storeToRefs(userStore);
const { handleRegister, errMsg } = userStore;

const credentials = reactive({
  userName: "",
  email: "",
  password: "",
});

const modalStore = useModalStore();
// const modalType = modalStore.showRegister ? "register" : "login";
const modalType = "register";
console.log(modalType);

const cancelOut = () => {
  modalStore.closeModal(modalType);
  userStore.errMsg = [];
  route.push("/");
};

const authenticate = async () => {
  if (modalType == "register") {
    // password.value == "Bobby"
    //   ? modalStore.setAuthentication(true)
    //   : modalStore.setAuthentication(false);
    const button = document.getElementById("submit");
    // button.style.pointerEvents = "none";
    // button.style.opacity = 0.5;
    button.classList.add("pointer-events-none", "opacity-30");
    await handleRegister(credentials);
    console.log(
      `returned from handleRegister:  **${errMsg[0]}**${errMsg[1]}**${errMsg[2]}`
    );
    button.classList.remove("pointer-events-none", "opacity-30");
  }

  if (errMsg[0] == "" && errMsg[1] == "" && errMsg[2] == "") {
    modalStore.closeModal(modalType);
    route.push("/");
    // modalStore.setAuthentication(true);
  } else {
    // modalStore.setAuthentication(false);
  }
};
</script>

<template>
  <Teleport to="#modal" v-if="modalStore.showRegister">
    <Transition>
      <div class="mymodal">
        <div class="bg-white p-[50px] rounded mt-[300px] mx-auto w-1/3">
          <p class="mb-6">
            Hello {{ userName }} from the {{ modalType }} modal!
          </p>
          <div class="flex-none gap-2 my-auto">
            <div class="form-control">
              <input
                v-if="modalType == 'register'"
                v-model="credentials.userName"
                type="text"
                placeholder="username...  "
                class="input border border-green-500 my-2"
              />
              <span class="text-red-500">{{ errMsg[1] }}</span>
              <input
                v-model="credentials.email"
                type="email"
                placeholder="email...  "
                class="input border border-green-500 my-2"
              />
              <span class="text-red-500">{{ errMsg[2] }}</span>
              <input
                v-model="credentials.password"
                type="password"
                placeholder="password...  "
                class="input border border-green-500 my-2"
              />
              <span class="text-red-500">{{ errMsg[0] }}</span>
            </div>
          </div>
          <Transition>
            <img
              v-if="isProcessing"
              class="w-[50px] h-5"
              src="../assets/three-dots.svg"
            />
          </Transition>
          <!-- {{
            userName == "Bobby"
              ? modalStore.setAuthentication(true)
              : modalStore.setAuthentication(false)
          }} -->
          <button
            class="px-5 py-2 rounded border border-green-500 mt-10"
            @click="cancelOut('register')"
          >
            Cancel
          </button>
          <button
            id="submit"
            class="px-5 py-2 rounded border border-green-500 mt-10 ml-5"
            @click="authenticate()"
          >
            OK
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.mymodal {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid green;
  background: grey;
  color: black;
  visibility: initial;
  opacity: 0.98;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
</style>
