import { parse } from "src/parser";

export interface parserProps {
  html: string;
}

export default function useScheduleParser({ html }: parserProps) {
  const DP = new DOMParser();

  // document.querySelector("body")!.innerHTML = html;

  const tables = DP.parseFromString(html, "text/html").querySelectorAll(
    "table"
  );

  // const tables = document.querySelectorAll("table");
  if (!tables.length) throw Error("Отсутствие таблиц в ответе сайта");
  return parse(tables);
}
