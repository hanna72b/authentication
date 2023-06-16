<template>
  <div class="mt-5 text-center">
    <h1>This is an logout page</h1>
    <button
      @click="logout()"
      type="submit"
      class="btn btn-block btn-primary mt-5"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import store from "../../store";
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
  console.log("logout");
  localStorage.removeItem("token");
  localStorage.removeItem("mobilePassword");


  if ((store._state.data.getToken == "")) {
    router.push({ name: "login" });
  }
}
</script>

<style></style>
