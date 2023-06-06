import { defineStore } from "pinia";
import { storeToRefs } from "pinia";
import { supabase } from "../supabase";
import { ref } from "vue";
import { useModalStore } from "./ModalStore";
import { useRouter } from "vue-router";

const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const useUserStore = defineStore("UserStore", () => {
  const user = ref(null);
  const errMsg = ref([]);
  const isProcessing = ref(false);
  const postedImage = ref(null);
  const modalStore = useModalStore();
  const modal = storeToRefs(modalStore);
  const router = useRouter();
  const images = ref([]);

  const handleLogin = async (credentials) => {
    const { email, password } = credentials;

    errMsg.value[0] = !password.length ? "Please enter password" : "";

    errMsg.value[1] = !validateEmail(email) ? "Invalid email" : "";

    if (errMsg.value[0] == "" && errMsg.value[1] == "") {
      console.log(`login with ${password}, ${email}`);

      try {
        isProcessing.value = true;
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        console.log("after await");
        if (error) throw error;
        //
        try {
          const { error, data } = await supabase
            .from("users")
            .select()
            .eq("email", email)
            .single();

          if (error) throw error;

          user.value = {
            email: data.email,
            username: data.userName,
            id: data.id,
          };
        } catch (e) {
          console.log(e);
          errMsg.value[1] = "Username already exists";
        }
      } catch (e) {
        errMsg.value[0] = e.message;
        console.log(e.message);
      } finally {
        isProcessing.value = false;
        console.log("finally");
      }
    }
  };

  const handleRegister = async (credentials) => {
    const { email, password, userName } = credentials;

    errMsg.value[0] =
      password.length < 6 ? "Password must be greater than 6 characters" : "";

    errMsg.value[1] =
      userName.length < 4 ? "Username must be greater than 4 characters" : "";

    // check for duplicate user
    try {
      const { error, data } = await supabase
        .from("users")
        .select()
        .eq("userName", userName)
        .single();

      if (data) throw error;
    } catch (e) {
      console.log(e);
      errMsg.value[1] = "Username already exists";
    }

    errMsg.value[2] = !validateEmail(email) ? "Invalid email" : "";

    // check for duplicate email
    try {
      const { error, data } = await supabase
        .from("users")
        .select()
        .eq("email", email)
        .single();

      if (data) throw error;
    } catch (e) {
      console.log(e);
      errMsg.value[2] = "email already exists";
    }

    if (
      errMsg.value[0] == "" &&
      errMsg.value[1] == "" &&
      errMsg.value[2] == ""
    ) {
      console.log("calling await signUp");

      try {
        isProcessing.value = true;
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        console.log("after await");
        if (error) throw error;

        try {
          console.log(`insert user ${userName}, email ${email}`);
          const { error } = await supabase.from("users").insert({
            userName: userName,
            email: email,
          });
          if (error) throw error;
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        errMsg.value[2] = e.message;
        console.log(e.message);
      } finally {
        isProcessing.value = false;
        console.log("finally");
      }
      // const { error } = supabase.auth.signUp({
      //   email: email,
      //   password: password,
      // });
      // console.log("after await");
      // if (error) {
      //   errMsg.value[2] = e.message;
      //   console.log(e.message);
      // }
      // errMsg.value[2] = supabaseSignUp(email, password);
      // console.log(`return from supabaseSignUp: r${errMsg.value[2]}`);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    modalStore.isAuthenticated = false;
    console.log(`handleLogout: ${modalStore.isAuthenticated}`);
    user.value = null;
    router.push("/");
  };

  const getUser = async () => {
    try {
      const { error, data: token } = await supabase.auth.getUser();

      if (error) throw error;

      const { data } = await supabase
        .from("users")
        .select()
        .eq("email", token.user.email)
        .single();
      // console.log(data);
      user.value = {
        email: data.email,
        username: data.userName,
        id: data.id,
      };
      console.log(user.value);
      modalStore.isAuthenticated = true;
    } catch (e) {
      user.value = null;
      modalStore.isAuthenticated = false;
    }
  };

  const addNewPost = (data) => {
    postedImage.url = data.url;
    postedImage.caption = data.caption;
    console.log(`${postedImage.url}..${postedImage.caption}`);
  };

  return {
    user,
    errMsg,
    handleRegister,
    handleLogin,
    handleLogout,
    getUser,
    isProcessing,
    modalStore,
    addNewPost,
    images,
  };
});
