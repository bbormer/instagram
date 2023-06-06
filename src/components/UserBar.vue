<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/UserStore";
import { useModalStore } from "../stores/ModalStore";
import { ref, watch } from "vue";
import FileUploadModal from "./FileUploadModal.vue";
import { supabase } from "../supabase";

// destructuring stores won't work
const userStore = useUserStore();
// but this will
// const { user } = storeToRefs(userStore);
const { user } = userStore;
const { openFileUpload } = useModalStore();

const props = defineProps({
  username: { type: String, required: true },
  posts: { type: Number, required: true },
  followers: { type: Number, required: true },
  following: { type: Number, required: true },
  userid: { type: Number, required: true },
});

let zzz = ref(0);
zzz.value = props.followers;

watch(user, (x, y) => {
  console.log(`watched user changed from ${y.username} to ${x.username}`);
});

const updateFollow = async () => {
  console.log(`${user.id} is following ${props.userid}`);
  const { error } = await supabase.from("follow").insert({
    follower_id: props.userid,
    following_id: user.id,
  });
  zzz.value++;
  console.log(zzz.value);
};

const open = ref(false);
</script>

<template>
  <div class="flex flex-col mt-5">
    <div class="ml-10 mr-10 py-5">
      <div class="flex flex-row justify-between flex-wrap items-center">
        <h1 class="mb-5 text-3xl">{{ username }}'s profiles</h1>

        <div v-if="user">
          <button
            class="border px-3 py-2 border-green-500 rounded"
            v-if="user.username == username"
            @click="openFileUpload()"
          >
            Upload photo
          </button>
          <button
            class="border px-3 py-2 border-green-500 rounded"
            v-else
            @click="updateFollow()"
          >
            Follow
          </button>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-10 text-2xl">
        <h2>{{ posts }} posts</h2>
        <h2>{{ zzz }} followers</h2>
        <h2>{{ following }} following</h2>
      </div>
    </div>
  </div>

  <FileUploadModal />
</template>
