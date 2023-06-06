<script setup>
import { RouterLink, RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
import { onMounted } from "vue";
import { useUserStore } from "./stores/UserStore";

const userStore = useUserStore();

onMounted(async () => {
  console.log("onMounted");
  await userStore.getUser();
  if (userStore.user !== null) {
    console.log(
      `onMounted user: ${userStore.user.username}, ${userStore.user.email}, ${userStore.user.id}`
    );
  }
});
</script>

<template>
  <div>
    <Nav></Nav>
    <RouterView />
  </div>
</template>

<style scoped></style>
