<template>
  <div class="mt-5 text-center">
    <h1>This is an logout page</h1>
  <div class="">
    <button
    v-if="!loading"
      @click="logout()"
      type="submit"
      class="btn btn-block btn-primary mt-5"
    >
      Logout
    </button>

    <div v-if="loading" class="mt-5 ">Loading . . .</div>
  </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import store from "../../store";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);

function logout() {
  loading.value = true ;
  console.log("logout");
  localStorage.removeItem("token");
  localStorage.removeItem("mobilePassword");

  loading.value = false ;

  if ((store._state.data.getToken == "")) {
    router.push({ name: "login" });
  }
}
</script>

<style>
</style>
