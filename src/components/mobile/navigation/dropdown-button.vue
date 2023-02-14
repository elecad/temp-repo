<template>
  <q-btn flat round dense icon="more_vert" color="grey-7" padding="10px">
    <q-menu transition-show="jump-down" transition-hide="jump-up">
      <q-list>
        <q-item @click="dropdownButtonClick('search')" v-ripple clickable>
          <q-item-section avatar>
            <q-avatar text-color="grey-7" icon="o_search" size="3.5em" />
          </q-item-section>
          <q-item-section>Поиск</q-item-section>
        </q-item>

        <q-item @click="dropdownButtonClick('session')" v-ripple clickable>
          <q-item-section avatar>
            <q-avatar text-color="grey-7" icon="o_auto_stories" size="3.5em" />
          </q-item-section>
          <q-item-section>Сессия</q-item-section>
        </q-item>

        <q-item @click="dropdownButtonClick('settings')" v-ripple clickable>
          <q-item-section avatar>
            <q-avatar text-color="grey-7" icon="o_settings" size="3.5em" />
          </q-item-section>
          <q-item-section>Настройки</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
export default {
  name: "dropdown-button",
  emits: ["dropdown-clck"],
  setup(props, context) {
    const dropdownButtonClick = (button: string) => {
      context.emit("dropdown-clck", button);
    };
    return {
      dropdownButtonClick,
    };
  },
};
</script>

<style lang="scss" scoped></style>
