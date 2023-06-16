<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <h2 class="mt-5">account verification</h2>

    <div v-for="error in v$.$errors" :key="error.$uid">
      <small style="color: red">
        {{ error.$uid }} : {{ error.$message }}
      </small>
    </div>

    <form class="w-75 mt-4">
      <div class="form-group">
        <label>mobile</label>
        <input
          v-model="dataVerify.mobile"
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
        <label>verify code</label>
        <input
          v-model="dataVerify.code"
          type="number"
          class="form-control"
          placeholder="code"
        />
      </div>

      <div>
        <button
          v-if="!loading"
          @click.prevent="verify()"
          type="submit"
          class="btn btn-block btn-primary mt-3"
        >
          send code
        </button>

        <button
          v-if="!loading"
          @click.prevent="resend()"
          type="submit"
          class="btn btn-block btn-primary ml-4 mt-3"
        >
          Resend code
        </button>
        <div v-if="loading" class="mt-3">Loading . . .</div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import store from "../../store";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers, sameAs } from "@vuelidate/validators";

const loading = ref(false);

const dataVerify = reactive({
  mobile: "",
  code: null,
});

const rules = computed(() => {
  return {
    mobile: { required, minLength: minLength(11) },
    code: { required, minLength: minLength(8) },
  };
});
const v$ = useVuelidate(rules, dataVerify);

function verify() {
  this.v$.$validate();
  console.log(this.v$);

  loading.value = true;

  console.log(dataVerify);
  store.dispatch("verify", dataVerify);

  loading.value = true;

  if ((store._state.data.getToken = !"")) {
    router.push({ name: "dashboard" });
  }
}

function resend() {
  const mobile = {
    mobile: dataVerify.mobile,
  };

  this.v$.$validate();
  console.log(this.v$);

  loading.value = true;

  console.log("mobile");
  store.dispatch("resend", mobile);
  loading.value = false;
}
</script>
