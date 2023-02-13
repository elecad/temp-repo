import { millisecondsInDay } from "src/parser/utils";

interface Week {
  monday: Date;
  sunday: Date;
  param: string;
}

export function getWeek(date: Date): Week {
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

export function getCalenderLabel(date: Date) {
  const monthNames = [
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
  ];

  const { monday, sunday } = getWeek(date);

  const mondayLabel = `${monday.toLocaleDateString().split(".")[0]} ${
    monthNames[monday.getMonth()]
  }`;

  const sundayLabel = `${sunday.toLocaleDateString().split(".")[0]} ${
    monthNames[monday.getMonth()]
  }`;

  return `${mondayLabel} - ${sundayLabel}`.toUpperCase();
}
