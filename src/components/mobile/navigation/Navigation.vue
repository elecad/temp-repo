<template>
  <q-header
    class="bg-grey-2 row items-center s-header"
    style="height: 60px; position: absolute"
    elevated
    reveal
  >
    <q-toolbar v-if="isSearch">
      <q-btn
        @click="isSearch = !isSearch"
        class="q-mr-xs"
        flat
        round
        dense
        icon="arrow_back"
        color="grey-7"
        padding="10px"
      />

      <div class="search-input">
        <q-input
          filled
          v-model="searchText"
          :loading="isLoading"
          @update:model-value="searchFunction"
        />
        <q-menu fit separate-close-popup no-focus>
          <q-list v-for="el in result">
            <q-item clickable v-ripple @click="selectItem(el)">
              <q-item-section>{{ el.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </q-toolbar>

    <q-toolbar v-else>
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

      <dropdown-button @dropdown-clck="dropdownButtonClick"></dropdown-button>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import getSearch from "src/hooks/getSearch";
import { Search } from "src/parser/types";
import { ref } from "vue";
import { useRouter } from "vue-router";
import dropdownButton from "./dropdown-button.vue";

export default {
  name: "navbar",
  components: { dropdownButton },
  setup() {
    const router = useRouter();
    const isSearch = ref(false);
    const searchText = ref("");

    const { isLoading, result, runSearch } = getSearch();

    const dropdownButtonClick = (button: string) => {
      if (button == "search") {
        isSearch.value = !isSearch.value;
      }
    };

    const searchFunction = async () => {
      await runSearch(searchText.value);
    };

    const selectItem = (selected: Search) => {
      console.log(selected);
      router.push({ path: `/${selected.type}/${selected.id}` });
      // Переход
    };
    return {
      isSearch,
      dropdownButtonClick,
      searchText,
      searchFunction,
      result,
      isLoading,
      selectItem,
    };
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

.search-input {
  width: 100%;
}
</style>
