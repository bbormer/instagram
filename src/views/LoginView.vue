<script setup>
import LoginModal from "../components/LoginModal.vue";
import { useModalStore } from "../stores/ModalStore";

const { openModal } = useModalStore();
openModal("login");
</script>

<template>
  <LoginModal />
</template>
