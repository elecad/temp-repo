<template>
  <q-layout view="lHh LpR fFf" class="gray-background">
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
            <div class="text-h6 text-bold">Группа 12001902</div>
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

        <div class="bottom-container">
          <q-card class="q-my-sm bg-white weekdays-card shadow-10">
            <q-card-section class="row items-center justify-between">
              <q-btn
                unelevated
                color="indigo-5"
                label="ПН"
                class="week-button"
              />
              <q-btn
                unelevated
                color="cyan"
                label="ВТ"
                class="text-bold week-button"
              />
              <q-btn
                unelevated
                color="indigo-5"
                label="СР"
                class="week-button"
              />
              <q-btn
                unelevated
                color="indigo-5"
                label="ЧТ"
                class="week-button"
              />
              <q-btn
                unelevated
                color="grey"
                label="ПТ"
                disable
                class="week-button"
              />
              <q-btn
                unelevated
                color="indigo-5"
                label="СБ"
                class="week-button"
              />
            </q-card-section>
          </q-card>
        </div>

        <div>
          <div class="text-h5">Понедельник</div>
          <div class="text-subtitle2">07.02.2023</div>
          <q-card class="q-my-sm">
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
          </q-card>

          <q-card v-for="i in 10" class="q-my-sm">
            <q-expansion-item class="bg-white">
              <template v-slot:header>
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
              </template>

              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-card>
        </div>
      </div>
    </q-page-container>
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
  bottom: 0px;
  z-index: 10;
  left: 0px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
}

.weekdays-card {
  border-radius: 10px;
}
</style>
