import { Search } from "src/parser/types";
import { ref } from "vue";
import useSearchParser from "./useSearchParser";

export default function getSearch() {
  const isLoading = ref(false);
  const result = ref<Search[]>([]);
  const errors = ref([]);

  const useFetch = async (strock: string) => {
    const url = `/search?query=${strock.replace(/[ ]/g, "%20")}`;

    const response = await fetch(url);
    return await response.text();
  };

  const parsing = async (query: string) => {
    isLoading.value = true;
    const text = await useFetch(`${query}%`);

    isLoading.value = false;

    try {
      result.value = useSearchParser({ html: text }).slice(0, 4);
    } catch (e) {
      console.error(e);
    }
  };

  const runSearch = async (query: string) => {
    await parsing(query);
  };

  return {
    isLoading,
    result,
    errors,
    runSearch,
  };
}
