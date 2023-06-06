<script setup>
import { ref } from "vue";
import Cards from "../components/Cards.vue";

const data = [
  {
    id: 1,
    title: "Item #1",
    imgurl: "https://source.unsplash.com/random/200x200/?people",
    desc: "Description for Item#1",
  },
  {
    id: 2,
    title: "Item #2",
    imgurl: "https://source.unsplash.com/random/200x200/?cars",
    desc: "Description for Item#2",
  },
  {
    id: 3,
    title: "Item #3",
    imgurl: "https://source.unsplash.com/random/200x200/?nature",
    desc: "Description for Item#3",
  },
];
</script>

<template>
  <div class="flex items-center flex-col">
    <Cards
      class="my-5"
      v-for="{ title, imgurl, desc, id } in data"
      :key="id"
      :title="title"
      :imgurl="imgurl"
      :desc="desc"
    />
  </div>
</template>
