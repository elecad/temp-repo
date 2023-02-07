<template>
  <q-header
    class="bg-grey-2 row items-center s-header"
    style="height: 60px"
    elevated
  >
    <q-toolbar>
      <q-toolbar-title style="font-size: 1.25rem">
        <q-avatar>
          <q-icon
            name="o_school"
            size="24px"
            class="s-header-icon"
            color="grey-7"
          />
        </q-avatar>
        Расписание
      </q-toolbar-title>
      <q-btn
        flat
        round
        dense
        icon="o_bookmarks"
        color="grey-7"
        padding="10px"
      />

      <dropdown-button></dropdown-button>
    </q-toolbar>
  </q-header>
</template>

<script>
import dropdownButton from "./dropdown-button.vue";

export default {
  name: "navbar",
  components: { dropdownButton },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.s-header {
  color: rgba(0, 0, 0, 0.87);
}
.s-header-icon {
  position: absolute;
  top: 5px;
}

.q-item__section--avatar {
  min-width: 10px;
}

.q-item__section--side {
  padding-right: 5px;
}

.q-item {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 20px;
}
</style>
