<template>
  <div class="mt-5 text-center">
    <h1>This is an dashboard page</h1>
    <h5 v-if="(userToken = !'')" class="mt-5">
      Your mobile is :{{ myMobile }}
    </h5>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userToken: "",
      myMobile: "",
    };
  },
  mounted() {
    this.userToken = localStorage.getItem("token");
    console.log(this.userToken);
    this.myMobile = localStorage.getItem("mobilePassword");
  },
};
</script>

<style></style>
