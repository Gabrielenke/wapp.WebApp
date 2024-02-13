<template>
  <q-card class="q-pa-md shadow-2 w-[500px] rounded-lg" bordered>
    <q-card-section class="text-center">
      <p class="text-secondary text-3xl text-weight-bold">Wapp</p>
      <p class="text-grey-8 text-2xl">Welcome to Wapp!</p>
      <p class="text-grey-8 text-md">Create your account!</p>
    </q-card-section>
    <q-form @submit="registerUser">
      <q-input
        dense
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type your name']"
        outlined
        v-model="state.name"
        label="Full Name"
        hide-bottom-space
      />

      <q-input
        class="q-mt-md"
        dense
        outlined
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please type your username',
        ]"
        v-model="state.username"
        label="Username"
        hide-bottom-space
      />

      <q-input
        dense
        outlined
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please type your email address',
        ]"
        class="q-mt-md"
        v-model="state.email"
        label="Email Address"
        hide-bottom-space
      />

      <q-input
        dense
        outlined
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please type your password',
        ]"
        class="q-mt-md"
        v-model="state.password"
        :type="state.isPwd ? 'text' : 'password'"
        label="Password"
        hide-bottom-space
      >
        <template v-slot:append>
          <q-icon
            :name="state.isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="state.isPwd = !state.isPwd"
          />
        </template>
      </q-input>

      <div v-if="content.status !== 200">
        <p class="text-red-500 mt-2">{{ content.message }}</p>
      </div>
    </q-form>

    <q-card-section>
      <q-btn
        color="secondary"
        rounded
        size="md"
        label="Create Account"
        no-caps
        class="full-width rounded-lg"
      />
    </q-card-section>
    <q-card-section class="text-center q-pt-none">
      <div class="text-grey-8">
        Alredy have an account ?
        <a href="/" class="text-secondary text-weight-bold no-underline"
          >Sign in</a
        >
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { reactive } from "vue";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { USER_ID, USER_TOKEN, USER_USERNAME } from "../variables/LocalStorage";
import { LocalStorage } from "quasar";

const router = useRouter();

const content = reactive({
  data: "",
  status: "",
  message: "",
});

const state = reactive({
  name: "",
  username: "",
  email: "",
  password: "",
  isPwd: false,
});

const clearState = () => {
  state.name = "";
  state.username = "";
  state.email = "";
  state.password = "";
  content.status = null;
  content.message = "";
};

const registerUser = (e) => {
  e.preventDefault();
  api
    .post("users/register", state)
    .then((response) => {
      if (response.data.status == 200) {
        router.push({
          name: "Home",
        });
        clearState();
      }
      LocalStorage.set(USER_TOKEN, response.data.data.token);
      LocalStorage.set(USER_ID, response.data.data.id);
      LocalStorage.set(USER_USERNAME, response.data.data.username);

      console.log(response.data.data);
    })
    .catch((error) => {
      console.log(error.response.data.message);
      content.status = error.response.data.status;
      content.message = error.response.data.message;
    });
};
</script>
