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
        <q-card>
          <q-card-section class="row justify-between items-center">
            <div class="text-h6 text-bold">{{ result.header }}</div>
            <q-btn
              flat
              round
              dense
              :icon="inFavorite ? 'r_star' : 'r_star_border'"
              color="grey-7"
              padding="3px"
              size="12pt"
              @click="inFavorite = !inFavorite"
            />
          </q-card-section>

          <q-separator />

          <q-card-actions class="row justify-center items-center">
            <q-btn-group unelevated>
              <q-btn
                color="white"
                text-color="calender"
                icon="chevron_left"
                unelevated
                fab
              />
              <q-btn
                color="white"
                text-color="calender"
                label="30 Янв - 5 Фев"
                icon-right="r_edit_calendar"
                unelevated
                class="text-bold"
              />
              <q-btn
                color="white"
                text-color="calender"
                icon="chevron_right"
                fab
                unelevated
              />
            </q-btn-group>
          </q-card-actions>
        </q-card>

        <!-- <div class="bottom-container">
          <q-card class="q-my-sm bg-white weekdays-card shadow-10">
            <q-card-section class="row items-center justify-around q-py-sm">
              <q-btn
                unelevated
                color="white"
                text-color="black"
                label="ПН"
                class="week-button"
              />
              <q-btn
                unelevated
                color="indigo"
                text-color="white"
                label="ВТ"
                class="text-bold week-button"
              />
              <q-btn
                unelevated
                color="white"
                text-color="black"
                label="СР"
                class="week-button"
              />
              <q-btn
                unelevated
                color="white"
                text-color="black"
                label="ЧТ"
                class="week-button"
              />
              <q-btn
                unelevated
                color="grey-4"
                text-color="black"
                label="ПТ"
                disable
                class="week-button"
              />
              <q-btn
                unelevated
                color="white"
                label="СБ"
                class="week-button"
                text-color="black"
              />
            </q-card-section>
          </q-card>
        </div> -->

        <div v-for="day in result.days">
          <q-card class="q-my-sm day-header">
            <q-card-section
              class="row items-center justify-between no-wrap bg-indigo text-white q-py-sm"
            >
              <div class="text-h6 q-ml-sm">{{ day.dayWeekName }}</div>
              <div class="text-subtitle2 q-mr-sm">{{ day.date }}</div>
            </q-card-section>
          </q-card>

          <!-- <q-card v-for="pair in day.pairs" class="q-my-sm">
            <q-card-section class="row align-center no-wrap">
              <div class="column items-center justify-center">
                <div class="start-time text-subtitle1">8:30</div>
                <div class="number text-h4">1</div>
                <div class="end-time text-subtitle1">10:15</div>
              </div>
              <q-separator vertical class="q-mx-sm" />
              <div>
                <div class="chips q-mb-xs">
                  <q-chip color="purple-8" text-color="white">лек.</q-chip>
                  <q-chip color="indigo" text-color="white">онлайн</q-chip>
                </div>

                <div class="name text-subtitle1 text-weight-bold">
                  Компьютерные технологии обработки аудиоданных
                </div>
                <div class="subname text-grey-6 text-subtitle2">
                  (с видеотрансляцией)
                </div>

                <div class="row items-center q-mt-xs no-wrap">
                  <q-icon
                    name="r_person"
                    size="24px"
                    color="grey-7"
                    class="q-mr-xs"
                  />
                  <div>Трубицына Диана Игоревна (доц.)</div>
                </div>
                <div class="row items-center no-wrap">
                  <q-icon
                    name="r_location_on"
                    size="24px"
                    class="q-mr-xs"
                    color="grey-7"
                  />
                  <div>Онлайн курс</div>
                </div>
              </div>
            </q-card-section>
          </q-card> -->

          <div v-for="pair in day.pairs">
            <q-card v-for="lesson in pair.lessons" class="q-my-sm">
              <q-expansion-item class="bg-white">
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
                  <div>
                    <div class="chips q-mb-xs">
                      <q-chip
                        v-for="chips in lesson.chips"
                        color="purple-8"
                        class="text-caption lesson-chip"
                        text-color="white"
                        >{{ chips.text }}</q-chip
                      >
                      <!-- <q-chip color="purple-8" text-color="white">лек.</q-chip>
                      <q-chip color="indigo" text-color="white">онлайн</q-chip> -->
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
                    <!-- <div class="row items-center q-mt-xs no-wrap">
                      <q-icon
                        name="r_person"
                        size="24px"
                        color="grey-7"
                        class="q-mr-xs"
                      />
                      <div>Трубицына Диана Игоревна (доц.)</div>
                    </div> -->
                    <!-- <div class="row items-center no-wrap">
                      <q-icon
                        name="r_location_on"
                        size="24px"
                        class="q-mr-xs"
                        color="grey-7"
                      />
                      <div>Онлайн курс</div>
                    </div> -->
                  </div>
                </template>

                <q-card>
                  <q-card-section
                    class="row items-center justify-between no-wrap"
                  >
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
                      <!-- <q-btn
                        class="q-mr-xs"
                        round
                        color="indigo"
                        icon="r_person"
                      />
                      <q-btn round color="indigo" icon="r_location_on" /> -->
                    </div>

                    <div
                      class="course-button row items-center justify-end wrap"
                    >
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
      </div>
    </q-page-container>

    <q-footer class="transparent q-mx-md" reveal>
      <q-card class="q-my-sm bg-white weekdays-card shadow-10">
        <q-card-section class="row items-center justify-around q-py-sm">
          <q-btn
            unelevated
            color="white"
            text-color="black"
            label="ПН"
            class="week-button"
          />
          <q-btn
            unelevated
            color="indigo"
            text-color="white"
            label="ВТ"
            class="text-bold week-button"
          />
          <q-btn
            unelevated
            color="white"
            text-color="black"
            label="СР"
            class="week-button"
          />
          <q-btn
            unelevated
            color="white"
            text-color="black"
            label="ЧТ"
            class="week-button"
          />
          <q-btn
            unelevated
            color="grey-4"
            text-color="black"
            label="ПТ"
            disable
            class="week-button"
          />
          <q-btn
            unelevated
            color="white"
            label="СБ"
            class="week-button"
            text-color="black"
          />
        </q-card-section>
      </q-card>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import getSchedule from "src/hooks/getSchedule";
import { ref } from "vue";
import navBar from "../components/mobile/navigation/Navigation.vue";

export default {
  components: { navBar },
  setup() {
    const leftDrawerOpen = ref(false);
    const date = ref(new Date());
    const inFavorite = ref(false);

    const { result } = getSchedule(date.value);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      result,
      inFavorite,
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
