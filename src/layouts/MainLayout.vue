<template>
  <q-layout class="" view="lhh lpR lFf">
    <q-drawer
      show-if-above
      side="left"
      behavior="desktop"
      width="200"
      class="bg-primary overflow-hidden"
    >
      <div class="flex flex-col p-4 items-center h-full justify-between">
        <div class="flex w-full p-4 flex-col gap-5">
          <img
            class="self-center w-[100px]"
            src="../assets/svg/logo.svg"
            alt=""
          />

          <a href="/" class="flex text-white self-center items-center gap-2">
            <q-icon name="home" />
            <p class="text-md">Home</p>
          </a>

          <a
            href="/routines"
            class="flex text-white self-center items-center gap-2"
          >
            <q-icon name="assignment" />
            <p class="text-md">Routines</p>
          </a>

          <a
            href="/exercises"
            class="flex text-white self-center items-center gap-2"
          >
            <q-icon name="fitness_center" />
            <p class="text-md">Exercises</p>
          </a>
        </div>

        <q-separator color="white" inset />

        <div class="flex">
          <div class="flex items-center gap-2">
            <img
              class="rounded-full w-8 h-8"
              src="../assets/svg/blankAvatar.svg"
            />
            <p class="text-white text-sm">
              {{ userName }}
            </p>
          </div>

          <q-btn icon="logout" flat color="secondary" />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { LocalStorage } from "quasar";
import { USER_USERNAME } from "src/variables/LocalStorage";

const userName = LocalStorage.getItem(USER_USERNAME);

console.log(userName);
</script>
