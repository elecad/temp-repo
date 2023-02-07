import { log } from "console";
import { ref } from "vue";
import useScheduleParser from "./useScheduleParser";
import useSearchParser from "./useSearchParser";

export default function getSearch() {
  const isLoading = ref(true);
  const result = ref<Search[]>();
  const errors = ref([]);

  const useFetch = async (strock: string) => {
    const url = `/search?query=${strock}`;

    const response = await fetch(url);
    return await response.text();
  };

  const parsing = async () => {
    const text = await useFetch("%%%");
    isLoading.value = false;

    try {
      result.value = useSearchParser({ html: text });
    } catch (e) {
      console.error(e);
    }
  };

  parsing();

  return {
    isLoading,
    result,
    errors,
  };
}
