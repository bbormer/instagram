<script setup>
import AuthModal from "../components/AuthModal.vue";
import { useModalStore } from "../stores/ModalStore";

const { openModal } = useModalStore();
openModal("register");
</script>

<template>
  <AuthModal />
</template>
