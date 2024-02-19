<template>
  <div class="w-1/2 flex flex-1 gap-4 p-4">
    <q-card
      v-for="(routine, index) in state.routineList"
      v-bind:key="index"
      class="flex p-4 min-w-[45%] flex-col"
    >
      <q-btn @click="startButton(index)" label="Start" class="w-12" no-caps />

      <p class="text-3xl font-bold mb-2">{{ routine.name }}</p>
      <div v-if="routine.exercises.length > 0" class="flex flex-col gap-1">
        <div
          class="flex gap-1"
          v-for="exercise in routine.exercises"
          v-bind:key="exercise.id"
        >
          <p>{{ exercise.series }}x</p>

          <p>
            {{ exercise.name }}
          </p>
        </div>
      </div>

      <div v-else>
        <p class="text-center">Nenhum exercício adicionado</p>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { api } from "src/boot/axios";
import { LocalStorage } from "quasar";
import { USER_ID } from "src/variables/LocalStorage";

onMounted(() => {
  getRoutines();
});

const state = reactive({
  routineList: "",
});

const startButton = (index) => {
  console.log(state.routineList[index].name);
  state.routineList[index].exercises.forEach((exercise) => {
    console.log(exercise);
  });
};

const userID = LocalStorage.getItem(USER_ID);

const getRoutines = () => {
  api.get(`/routines/list/${userID}`).then((res) => {
    console.log(res.data.data);
    state.routineList = res.data.data;
    console.log(state.routineList);
  });
};
</script>
