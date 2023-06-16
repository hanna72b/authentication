<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <h2 class="mb-5">Login Page</h2>

    <div v-for="error in v$.$errors" :key="error.$uid">
      <small style="color: red">
        {{ error.$uid }} : {{ error.$message }}
      </small>
    </div>

    <form class="w-75 mt-3" @submit.prevent="login()">
      <div class="form-group">
        <label>mobile</label>
        <input
          v-model="formData.mobile"
          type="tel"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter mobile"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group mt-3">
        <label for="exampleInputPassword1">Password</label>
        <input
          v-model="formData.password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>

      <div>
        <button
          v-if="!loading"
          type="submit"
          class="btn btn-block btn-primary mt-3"
        >
          Submit
        </button>
        <div v-if="loading" class="mt-3">Loading . . .</div>
      </div>
    </form>

    <div class="mt-3">
      <span>Don't have an account?</span>
      <RouterLink
        class=" my-3 text-center signupBtn nav-link rounded "
        :class="$route.name == 'signup' ? 'active' : ''"
        to="/auth/signup"
        >Signup</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, computed } from "vue";
import store from "../store";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers, sameAs } from "@vuelidate/validators";

const router = useRouter();
const loading = ref(false);

const formData = reactive({
  mobile: null,
  password: "",
});

const rules = computed(() => {
  return {
    mobile: { required, minLength: minLength(11) },
    password: { required, minLength: minLength(8) },
  };
});
const v$ = useVuelidate(rules, formData);

function login() {
  this.v$.$validate();

  loading.value = true;

  console.log(this.v$);
  console.log(formData);
  store.dispatch("login", formData);

  loading.value = false;

  if ((store._state.data.getToken = !"")) {
    router.push({ name: "dashboard" });
  }
}
</script>
