<template>
  <q-layout view="hHh lpR fFf" class="gray-background">
    <nav-bar></nav-bar>
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="400"
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <div class="q-mx-sm q-my-sm">
        <schedule-header
          :name="result.header"
          :date="date"
          @week-change="changeWeek"
          @date-change="setNewDate"
        ></schedule-header>
        <schedule-list v-if="!isLoading" :schedule="result"></schedule-list>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import getSchedule from "src/hooks/getSchedule";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import scheduleHeader from "../components/Header.vue";
import scheduleList from "../components/LessonList.vue";
import navBar from "../components/mobile/navigation/Navigation.vue";
import getTypePage from "src/hooks/getTypePage";

export default {
  components: { navBar, scheduleList, scheduleHeader },
  setup() {
    const router = useRouter();
    const { params, path } = useRoute();
    const leftDrawerOpen = ref(false);
    const type = getTypePage(path);
    const id = params.id as string;
    const inFavorite = ref(false);
    let { result, isLoading, changeWeek, setNewDate, date } = getSchedule({
      id: id,
      type: type,
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      result,
      inFavorite,
      isLoading,
      date,
      changeWeek,
      alert,
      setNewDate,
    };
  },
};
</script>

<style>
.bar {
  background-color: #f5f5f5;
  color: #202020;
}

.gray-background {
  background-color: #ebecee;
}

.text-calender {
  color: #4d4d4d !important;
}
.bg-calender {
  background: #4d4d4d !important;
}

.week-button {
  border-radius: 10px;
  height: 45px;
}

.name {
  line-height: 1;
}

.bottom-container {
  position: fixed;
  bottom: 5px;
  z-index: 10;
  left: 0px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
}

.weekdays-card {
  border-radius: 10px;
}

.day-header {
  position: sticky;
}

.lesson-chip {
  max-width: 80px;
}

.q-chip__content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

[aria-expanded="true"] {
  background-color: #e2edfc;
  color: #0c63e4;
}

.q-item__section.column.q-item__section--side.justify-center.q-focusable.relative-position.cursor-pointer {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
