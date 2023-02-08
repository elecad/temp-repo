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
          @click="changeWeek('forward')"
        />
      </q-btn-group>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  emits: ["week-change"],
  setup(props, { emit }) {
    const inFavorite = ref(false);

    const changeWeek = (mode: string) => {
      emit("week-change", mode);
    };
    return {
      inFavorite,
      header: props.name,
      changeWeek,
    };
  },
});
</script>

<style scoped></style>
