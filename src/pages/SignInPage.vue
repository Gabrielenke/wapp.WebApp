<template>
  <q-card class="q-pa-md w-[400px] shadow-2 rounded-lg" bordered>
    <q-card-section class="text-center">
      <p class="text-secondary text-3xl text-weight-bold">Wapp</p>
      <p class="text-grey-8 text-2xl">Welcome to Wapp!</p>
      <p class="text-grey-8 text-md">Access your account!</p>
    </q-card-section>

    <q-form @submit="loginUser">
      <q-input
        dense
        outlined
        v-model="state.identification"
        label="Email or Username"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Please type your email or username',
        ]"
        hide-bottom-space
      />

      <q-input
        dense
        outlined
        class="q-mt-md"
        v-model="state.password"
        :type="state.isPwd ? 'text' : 'password'"
        label="Password"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please type your password',
        ]"
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
    </q-form>

    <q-card-section>
      <q-btn
        color="secondary"
        rounded
        size="md"
        label="Sign in"
        no-caps
        class="full-width rounded-lg"
      />
    </q-card-section>
    <q-card-section class="text-center q-pt-none">
      <div class="text-grey-8">
        Don't have an account yet?
        <a href="/register" class="text-secondary text-weight-bold no-underline"
          >Sign up.</a
        >
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { reactive } from "vue";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { LocalStorage } from "quasar";
import { USER_TOKEN, USER_ID, USER_USERNAME } from "src/variables/LocalStorage";

const router = useRouter();

const state = reactive({
  identification: "",
  password: "",
  isPwd: false,
});

const loginUser = () => {
  console.log(state);
  api
    .post("users/login", state)
    .then((response) => {
      if (response.data.status == 200) {
        router.push({
          name: "Home",
        });
      }
      LocalStorage.set(USER_TOKEN, response.data.data.token);
      LocalStorage.set(USER_ID, response.data.data.id);
      LocalStorage.set(USER_USERNAME, response.data.data.username);

      console.log(response.data.data);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
};
</script>
