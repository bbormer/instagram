<script setup>
import { ref } from "vue";
import { useModalStore } from "../stores/ModalStore";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";
import { supabase } from "../supabase";
import { UniqueString } from "unique-string-generator";

const modalStore = useModalStore();
const { closeFileUpload } = modalStore;

const userStore = useUserStore();
const { user, isProcessing, images } = storeToRefs(userStore);

const file = ref(null);
const caption = ref("");
const errMsg = ref("");

const uploadFile = (e) => {
  console.log("uploadFile");
  if (e.target.files[0]) {
    console.log(e.target.files[0]);
    file.value = e.target.files[0];
  }
};

const handleUploadFile = async () => {
  // loading.value = true;
  // const fileName = Math.floor(Math.random() * 10000000000000000);
  const fileName = UniqueString();
  errMsg.value = null;
  let filePath;
  if (file.value) {
    console.log(`${fileName}${file.value}`);
    try {
      isProcessing.value = true;
      const { data, error } = await supabase.storage
        .from("images")
        .upload("public/" + fileName, file.value);

      if (error) throw error;

      try {
        filePath = data.path;
        console.log(filePath);
        const { data2, error2 } = await supabase.from("posts").insert({
          url: filePath,
          caption: caption.value,
          owner_id: user.value.id,
        });
      } catch (e) {
        // if (error) throw error;
        // } catch (e) {
        // if (error2) {
        console.log(error2);
        return (errMsg.value = "Unable to post");
        // }
        // console.log(e);
        // return (errMsg.value = "Unable to post");
        // }
      }
    } catch (e) {
      console.log(e);
      return (errMsg.value = "Unable to upload image");
    }
    closeFileUpload();
    // append new post to image store
    images.value.push({
      url: filePath,
      caption: caption.value,
      owner_id: user.value.id,
    });
    console.log(`... ${images.value}`);
    userStore.addNewPost({
      url: filePath,
      caption: caption.value,
    });
    caption.value = "";
    isProcessing.value = false;
  }
};

// loading.value = false;
// visible.value = false;
// caption.value = "";
// props.addNewPost({
//   url: filePath,
//   caption: caption.value,
// });
</script>

<template>
  <Teleport to="#modal">
    <div v-if="modalStore.showFileUpload" class="mymodal">
      <div class="bg-white p-[50px] rounded mt-[300px] mx-auto w-1/3">
        <h1 class="text-lg mb-5">Upload Photo</h1>
        <!-- <input type="file" accept=".jpeg,.jpg,.png" /> -->
        <input
          type="file"
          class="file-input file-input-bordered file-input-success w-full max-w-xs"
          accept=".jpeg,.jpg,.png"
          @change="uploadFile"
        />
        <input
          class="input border border-green-500 my-2 w-[90%]"
          type="text"
          placeholder="Caption..."
          v-model="caption"
        />
        <Transition>
          <img
            v-if="isProcessing"
            class="w-[50px] h-5"
            src="../assets/three-dots.svg"
          />
        </Transition>
        <span class="text-red-300">{{ errMsg }}</span>
        <br />
        <button
          class="px-3 py-2 border rounded border-green-300 text-green-500"
          @click="closeFileUpload()"
        >
          Close
        </button>

        <button
          id="submit"
          class="px-5 py-2 text-green-500 rounded border border-green-300 mt-10 ml-5"
          @click="handleUploadFile"
        >
          OK
        </button>
      </div>
    </div>
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
