import { parseSearch } from "src/parser";
import { parserProps } from "./useScheduleParser";

export default function useSearchParser({ html }: parserProps) {
  const DP = new DOMParser();

  const nodes = DP.parseFromString(html, "text/html").querySelectorAll(
    ".typo-page > h2, table.search"
  );

  if (!nodes.length)
    throw Error("Отсутствие таблиц и заголовков в ответе сайта");
  return parseSearch(nodes);
}
