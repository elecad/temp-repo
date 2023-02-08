<template>
  <div v-for="day in schedule.days">
    <q-card class="q-my-sm day-header">
      <q-card-section
        class="row items-center justify-between no-wrap bg-indigo text-white q-py-sm"
      >
        <div class="text-h6 q-ml-sm">{{ day.dayWeekName }}</div>
        <div class="text-subtitle2 q-mr-sm">{{ day.date }}</div>
      </q-card-section>
    </q-card>

    <div v-for="pair in day.pairs" class="q-mb-md">
      <q-card v-for="lesson in pair.lessons" class="q-my-sm">
        <q-expansion-item class="bg-white" group="lesson">
          <template v-slot:header>
            <div class="column items-center justify-center">
              <div class="start-time text-subtitle1">
                {{ pair.start.toLocaleTimeString().slice(0, -3) }}
              </div>
              <div class="number text-h4">{{ pair.pairNumber }}</div>
              <div class="end-time text-subtitle1">
                {{ pair.end.toLocaleTimeString().slice(0, -3) }}
              </div>
            </div>
            <q-separator vertical class="q-mx-sm" />
            <div class="q-mr-md">
              <div class="chips q-mb-xs">
                <q-chip
                  v-for="chips in lesson.chips"
                  color="purple-8"
                  class="text-caption lesson-chip"
                  text-color="white"
                  >{{ chips.text }}</q-chip
                >
              </div>

              <div class="name text-subtitle1 text-weight-bold">
                {{ lesson.header.name }}
              </div>
              <div class="subname text-grey-6 text-subtitle2">
                {{ lesson.header.subname }}
              </div>

              <div
                v-for="subHeader in lesson.subHeaders"
                class="row items-center q-mt-xs no-wrap"
              >
                <q-icon
                  :name="subHeader.icon"
                  size="24px"
                  color="grey-7"
                  class="q-mr-xs"
                />
                <div>{{ subHeader.text }}</div>
              </div>
            </div>
          </template>

          <q-card>
            <q-card-section v-if="lesson.promts.length">
              <div
                v-for="promt in lesson.promts"
                class="row items-center no-wrap"
              >
                <q-icon
                  :name="promt.icon"
                  size="24px"
                  color="grey-7"
                  class="q-mr-md"
                />
                <div class="text-caption">{{ promt.text }}</div>
              </div>
            </q-card-section>
            <q-card-section class="row items-center justify-between no-wrap">
              <div class="redirect-button row items-center no-wrap">
                <div v-for="(button, index) in lesson.buttons">
                  <q-btn
                    :class="{ 'q-mr-xs': index == 0 }"
                    round
                    color="indigo"
                    :icon="button.icon"
                    :disable="!button.active"
                  />
                </div>
              </div>

              <div class="course-button row items-center justify-end wrap">
                <div v-for="course in lesson.courses">
                  <q-btn
                    class="text-bold q-mr-xs q-mb-xs"
                    color="indigo"
                    :label="course.name"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Schedule } from "../parser/types";

export default defineComponent({
  props: {
    schedule: {
      type: Object as PropType<Schedule>,
      required: true,
    },
  },
  setup(props) {
    const inFavorite = ref(false);
    console.log(props);
    return { inFavorite, schedule: props.schedule };
  },
});
</script>

<style scoped></style>
