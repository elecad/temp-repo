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
        <q-expansion-item
          class="bg-white"
          :class="{
            'today-lesson': day.date == now.toLocaleDateString(),
            'now-lesson': +pair.start < +now && +now < +pair.end,
          }"
          group="lesson"
        >
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
                    :href="button.href"
                  />
                </div>
              </div>

              <div class="course-button row items-center justify-end wrap">
                <div v-for="course in lesson.courses">
                  <q-btn
                    class="text-bold q-mr-xs q-mb-xs"
                    color="indigo"
                    :label="course.name"
                    :href="course.href"
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

    const now = ref(new Date());
    // console.log(props.schedule);

    const findNowAndTodayLesson = () => {
      // now.value = new Date("2023-02-13T08:20:54.882Z");
      // console.log(
      //   "Дата на самом деле:",
      //   now.value.toLocaleDateString(),
      //   now.value.toLocaleTimeString()
      // );

      console.log("Обновление данных!");

      now.value = new Date();

      let delay = +now.value;
      let delayNotification = +now.value;
      for (const day of props.schedule.days) {
        for (const pair of day.pairs) {
          const deltaStart = +pair.start - +now.value;
          const deltaEnd = +pair.end - +now.value;

          if (deltaStart > 0) {
            if (deltaStart < delay) {
              delay = deltaStart;
            }
            if (deltaEnd < delay) {
              delay = deltaEnd;
            }
            if (deltaStart < delayNotification) {
              delayNotification = deltaStart;
            }
          }
        }
      }
      // console.log("Следующее обновление через: ", delay);
      // const temp = new Date(+now.value + delay);

      // console.log(
      //   "Дата: ",
      //   temp.toLocaleDateString(),
      //   temp.toLocaleTimeString()
      // );
      // =================
      // console.log("Следующее оповещение через: ", delayNotification);
      // const temp = new Date(+now.value + delayNotification);

      // console.log(
      //   "Дата: ",
      //   temp.toLocaleDateString(),
      //   temp.toLocaleTimeString()
      // );

      setTimeout(findNowAndTodayLesson, delay);
      setTimeout(notification, delayNotification);
    };

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "visible") {
        findNowAndTodayLesson();
      }
    });

    const notification = () => {
      Notification.requestPermission(function (permission) {
        // Если пользователь разрешил, то создаём уведомление
        if (permission === "granted") {
          const options: NotificationOptions = {
            icon: "../icons/android-chrome-192x192.png",
            body: "Начинается новое занятие",
          };
          var notification = new Notification("Расписание", options);
        }
      });
    };

    notification();
    findNowAndTodayLesson();

    return { inFavorite, schedule: props.schedule, now };
  },
});
</script>

<style scoped>
.today-lesson {
  border-inline-start: 5px solid rgba(63, 81, 181, 0.4);
}
.now-lesson {
  border-inline-start: 6px solid #3f51b5;
}
</style>
