<template>
  <div class="mt-5 text-center">
    <h1>This is an dashboard page</h1>
    <h5 v-if="(userToken = !'')" class="mt-5">
      Your mobile is :{{ myMobile }}
    </h5>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      userToken: "",
      myMobile: "",
    };
  },
  mounted() {
    this.userToken = localStorage.getItem("token");
    console.log(store.state);
    

  },
};
</script>

<style></style>
