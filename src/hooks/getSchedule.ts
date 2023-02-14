import { Schedule } from "src/parser/types";
import { millisecondsInDay } from "src/parser/utils";
import { Ref, ref } from "vue";
import useParser from "./useScheduleParser";
import { getWeek } from "./utils";

const weekNames = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export type Type = "group" | "teacher" | "location";

interface fetchProps {
  id: string;
  week: string;
  type: "group" | "teacher" | "location";
}

interface scheduleProps {
  id: string;
  type: "group" | "teacher" | "location";
}

export default function getSchedule({ id, type }: scheduleProps) {
  const isLoading = ref(true);
  const result = ref<Schedule>({ days: [], header: "" });
  const errors = ref([]);
  const date = ref(new Date());

  const setNewDate = (str: string) => {
    console.log(str);
    const [day, month, year] = str.split(".");
    date.value = new Date(`${year}-${month}-${day}`);
    parsing();
  };

  const changeWeek = (event: string) => {
    const numberDate = date.value.getTime();
    date.value = new Date(
      event == "forward"
        ? numberDate + 7 * millisecondsInDay
        : numberDate - 7 * millisecondsInDay
    );
    parsing();
  };

  const useFetch = async ({ id, week, type }: fetchProps) => {
    let paramName = "";
    switch (type) {
      case "group":
        paramName = "group";
        break;
      case "teacher":
        paramName = "teach";
        break;
      case "location":
        paramName = "aud";
        break;
    }
    const url = `/${type}?${paramName}=${id}&week=${week}`;

    const response = await fetch(url);
    isLoading.value = true;
    return await response.text();
    // return saveGroupHtml;
  };

  const parsing = async () => {
    const { param: week } = getWeek(date.value);
    const text = await useFetch({
      id,
      week,
      type,
    });
    isLoading.value = false;

    try {
      result.value = useParser({ html: text });

      // console.log(useParser({ html: text }));
    } catch (e) {
      console.error(e);
    }
  };

  parsing();

  return {
    isLoading,
    result,
    errors,
    changeWeek,
    setNewDate,
    date,
  };
}
