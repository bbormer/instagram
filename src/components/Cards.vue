<script setup>
const props = defineProps({
  title: { type: String, required: true },
  imgurl: { type: String, required: true },
  desc: { type: String, required: true },
});
</script>

<template>
  <div class="card w-96 bg-base-100 shadow-xl bg-lime-300">
    <figure class="px-10 pt-10">
      <img :src="imgurl" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ desc }}</p>
      <!-- <div class="card-actions">
        <button class="btn btn-primary">Buy Now</button>
      </div> -->
    </div>
  </div>
</template>
