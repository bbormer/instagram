<script setup>
import { ref, watch, onMounted, onUpdated } from "vue";
import { useRoute } from "vue-router";
import UserBar from "../components/UserBar.vue";
import ImageGallery from "../components/ImageGallery.vue";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";
import { supabase } from "../supabase";

const userStore = useUserStore();
let { user } = userStore;
// let { images } = userStore;
const { isProcessing, images } = storeToRefs(userStore);

const postsCount = ref(0);
const ingCount = ref(0);
const erCount = ref(0);

const route = useRoute();
const { userName } = route.params;
let xxx = userName;
let yyy = 0;
watch(
  // () => route.params.id,
  // (newId, oldId) => {
  //   console.log(`ProfilesView: ${id}, ${newId}, ${oldId}`);
  // },
  () => route.params.userName,
  (newName, oldName) => {
    xxx = newName;
    console.log(`ProfilesView watch: ${userName}, ${newName}, ${oldName}`);
    xxx = newName;
    fetchData();
  }
);

images.value = [];
// images = [];

const fetchData = async () => {
  // loading.value = true
  try {
    const { data: userData, error } = await supabase
      .from("users")
      .select()
      .eq("userName", xxx)
      .single();

    if (error) throw error;

    user = userData;
    yyy = user.id;
    console.log(`fetchData..${user.id}, ${user.userName}`);

    const { data: postsData } = await supabase
      .from("posts")
      .select()
      .eq("owner_id", user.id);

    images.value = postsData;
    // images = postsData;
    // postsCount.value = postsData.length;

    // loading.value = false
  } catch {
    console.log("!userData");
    return (user = null);
  }

  // const ingCount = await getFollowingInfo();
  // const erCount = await getFollowerInfo();
  const res = await getFollowInfo();
  ingCount.value = res.ingCount;
  erCount.value = res.erCount;
  console.log(`ing:${ingCount.value}, er:${erCount.value}`);
};

const getFollowInfo = async () => {
  const { count: ingCount } = await supabase
    .from("follow")
    .select("*", { count: "exact" })
    .eq("following_id", user.id);

  const { count: erCount } = await supabase
    .from("follow")
    .select("*", { count: "exact" })
    .eq("follower_id", user.id);

  return { ingCount, erCount };
};

onMounted(() => {
  console.log("onMounted");
  fetchData();
  console.log(`after fetchData..${user}`);
});

onUpdated(() => {
  console.log("onUpdated");
  // fetchData();
});

// console.log(`ProfilesView: ${userName}, ${id}`);

// const data = [
//   {
//     id: 1,
//     title: "Item #1",
//     imgurl: "https://source.unsplash.com/random/300x400/?city&1",
//     desc: "Description for Item#1",
//   },
//   {
//     id: 2,
//     title: "Item #2",
//     imgurl: "https://source.unsplash.com/random/300x400/?city&2",
//     desc: "Description for Item#2",
//   },
//   {
//     id: 3,
//     title: "Item #3",
//     imgurl: "https://source.unsplash.com/random/300x400/?city&3",
//     desc: "Description for Item#3",
//   },
// ];
</script>

<template>
  <div class="w-[1000px] mt-10 border border-green-500">
    <UserBar
      :username="xxx"
      :posts="images.length"
      :followers="erCount"
      :following="ingCount"
      :userid="yyy"
    />
    <!-- :key="$route.params.userName" -->
    <ImageGallery :images="images" />
  </div>
</template>

<!--
:images="[
        {
          id: '1',
          url: 'https://source.unsplash.com/random/200x200/?nature&1',
        },
        {
          id: '2',
          url: 'https://source.unsplash.com/random/200x200/?city&2',
        },
        {
          id: '3',
          url: 'https://source.unsplash.com/random/200x200/?people&3',
        },
        {
          id: '4',
          url: 'https://source.unsplash.com/random/200x200/?sea&4',
        },
        {
          id: '5',
          url: 'https://source.unsplash.com/random/200x200/?nature&5',
        },
        {
          id: '6',
          url: 'https://source.unsplash.com/random/200x200/?nature&6',
        },
      ]"

-->
