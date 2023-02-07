import { ref } from "vue";
import useParser from "./useScheduleParser";

const millisecondsInDay = 86400000;
const weekNames = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

interface fetchProps {
  id: string;
  week: string;
  type: "group" | "teacher" | "location";
}

export default function getSchedule(date: Date) {
  const isLoading = ref(true);
  const result = ref<Schedule>({ days: [], header: "" });
  const errors = ref([]);

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
    return await response.text();
    // return saveGroupHtml;
  };

  const parsing = async () => {
    const { param: week } = getWeek(date);
    const text = await useFetch({
      id: "12002108",
      week,
      type: "group",
    });
    isLoading.value = false;
    try {
      result.value = useParser({ html: text });
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

interface Week {
  monday: Date;
  sunday: Date;
  param: string;
}

function getWeek(date: Date): Week {
  const weekdayPosition = date.getDay();

  const sunday = new Date(
    date.getTime() - weekdayPosition * millisecondsInDay + 7 * millisecondsInDay
  );
  const monday = new Date(sunday.getTime() - 6 * millisecondsInDay);

  const param =
    monday.toLocaleDateString().replace(/[.]/g, "") +
    sunday.toLocaleDateString().replace(/[.]/g, "");

  return { sunday, monday, param };
}
