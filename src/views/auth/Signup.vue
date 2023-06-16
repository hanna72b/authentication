<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <h2 class="mb-5">Signup Page</h2>

    <div v-for="error in v$.$errors" :key="error.$uid">
      <small style="color: red">
        {{ error.$uid }} : {{ error.$message }}
      </small>
    </div>

    <form class="w-75 mt-4" @submit.prevent="Register()">
      <div class="form-group">
        <label>username </label>
        <input
          v-model="formData.username"
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter username"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>

      <div class="form-group mt-3">
        <label>mobile</label>
        <input
          v-model="formData.mobile"
          type="tel"
          class="form-control"
          placeholder="mobile"
        />
      </div>

      <div class="form-group mt-3">
        <label>Password</label>
        <input
          v-model="formData.password"
          type="password"
          class="form-control"
          placeholder="Password"
        />
      </div>
      <div class="form-group mt-3">
        <label>Re_Password</label>
        <input
          v-model="formData.Re_Password"
          type="password"
          class="form-control"
          placeholder="Re_Password"
        />
      </div>
      <div class="form-check mt-3">
        <input
          @click="terms = !terms"
          type="checkbox"
          class="form-check-input"
          id="exampleCheck1"
        />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
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
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers, sameAs } from "@vuelidate/validators";
import store from "../../store";
import { useRouter } from "vue-router";

const terms = ref(false);
const loading = ref(false);

const formData = reactive({
  username: "",
  mobile: null,
  password: "",
  Re_Password: "",
});

const rules = computed(() => {
  return {
    username: { required },
    mobile: { required, minLength: minLength(11) },
    password: { required, minLength: minLength(8) },
    Re_Password: { required, sameAs: sameAs(formData.password) },
  };
});
const v$ = useVuelidate(rules, formData);

const router = useRouter();

function Register() {
  this.v$.$validate();
  console.log(this.v$);

  if (terms) {
    loading.value = true;

    store.dispatch("signup", formData);

    loading.value = false;

    if (store._state.data.done === 200) {
      router.push({ name: "verification" });
    }
  }
}
</script>
