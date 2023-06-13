<template>
  <nav class="navbar navbar-expand-lg bg-dark text-white">
    <div class="container-fluid align-items-center">
      <RouterLink class="navbar-brand text-white" to="/"
        >Welcome to Vue3</RouterLink
      >
      <button
      style="background-color: #fff;"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse marginLeft" id="navbarText">
        <ul
          v-if="(userToken != null)"
          class="d-flex align-items-center list-unstyled me-auto mb-2 mb-lg-0"
        >
          <li class="">
            <RouterLink
              class="nav-link"
              :class="$route.name == 'dashboard' ? 'active' : ''"
              to="/dashboard"
              >Dashboard</RouterLink
            >
          </li>
          <li class="">
            <RouterLink
              class="mL12 nav-link"
              :class="$route.name == 'logout' ? 'active' : ''"
              to="/auth/logout"
              >Logout</RouterLink
            >
          </li>
        </ul>

        <ul class="d-flex align-items-center list-unstyled mb-2 mb-lg-0">
          <li class="">
            <RouterLink
              class="mR12 nav-link"
              :class="$route.name == 'login' ? 'active' : ''"
              to="/"
              >Login</RouterLink
            >
          </li>

          <div v-if="userToken ==  null">
            <li class="">
              <RouterLink
                class="mR12 nav-link"
                :class="$route.name == 'signup' ? 'active' : ''"
                to="/auth/signup"
                >Signup</RouterLink
              >
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from "vue";

const userToken = ref('');

onMounted(async () => {
  userToken.value = localStorage.getItem("token");
  console.log(userToken.value);
});
</script>

<style>
.active {
  color: #0d6efd !important;
}

.marginLeft {
  margin-left: 25px;
}
.mL12 {
  margin-left: 12px;
}

.mR12 {
  margin-right: 12px;
}
</style>
