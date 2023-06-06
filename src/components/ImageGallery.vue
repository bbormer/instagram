<script setup>
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { images } = storeToRefs(userStore);

const route = useRoute();
const userName = route.params.userName;

// const props = defineProps(["images"]);
</script>

<template>
  <div class="mt-5">
    <div class="flex flex-row flex-wrap gap-5 mx-5 py-5 justify-around">
      <img
        v-for="image in images.slice().reverse()"
        :key="image.id"
        :src="`https://rjonnxwsqmoysqfxctgt.supabase.co/storage/v1/object/public/images/${image.url}`"
        class="w-[300px] h-[300px] object-cover"
      />
    </div>
  </div>
</template>

<!-- https://rjonnxwsqmoysqfxctgt.supabase.co/storage/v1/object/public/images/public/Njg4XzE2ODMyMTczMzYxOThfNzI1 -->
