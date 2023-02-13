<template>
  <q-card>
    <q-card-section class="row justify-between items-center">
      <div class="text-h6 text-bold">{{ name }}</div>
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
          @click="changeWeek('back')"
        />
        <q-btn
          color="white"
          text-color="calender"
          :label="calenderLabel"
          icon-right="r_edit_calendar"
          unelevated
          class="text-bold"
          @click="alert = !alert"
        />
        <q-btn
          color="white"
          text-color="calender"
          icon="chevron_right"
          fab
          unelevated
          @click="changeWeek('forward')"
        />
      </q-btn-group>
    </q-card-actions>

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section class="q-pa-none">
          <q-date
            v-model="selectedDate"
            flat
            first-day-of-week="1"
            mask="DD.MM.YYYY"
            :locale="locale"
            no-unset
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="primary"
            v-close-popup
            @click="setNewDate"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { getCalenderLabel } from "../hooks/utils";

export default defineComponent({
  props: {
    date: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  emits: ["week-change", "date-change"],
  setup(props, { emit }) {
    const inFavorite = ref(false);
    const alert = ref(false);
    const selectedDate = ref(props.date.toLocaleDateString());
    const changeWeek = (mode: string) => {
      emit("week-change", mode);
    };

    const setNewDate = () => {
      emit("date-change", selectedDate.value);
    };

    const locale = {
      days: [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
      ],
      daysShort: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      months: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      monthsShort: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Мая",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ],
    };
    const calenderLabel = computed(() => getCalenderLabel(props.date));
    return {
      inFavorite,
      header: props.name,
      changeWeek,
      calenderLabel,
      alert,
      selectedDate,
      locale,
      setNewDate,
    };
  },
});
</script>

<style scoped></style>
