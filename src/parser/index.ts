import { log } from "console";
import { Schedule, Search } from "./types";
import { capitalizeFirstLetter, parseDayHeader, parseLesson } from "./utils";

export function parse(tables: NodeListOf<HTMLTableElement>) {
  const [headerTable, scheduleTable] = tables;

  const result: Schedule = {
    header: headerTable.querySelector("#h2")?.textContent ?? "",
    days: [],
  };

  for (const row of scheduleTable.rows) {
    const currentDay = result.days[result.days.length - 1];
    switch (row.cells.length) {
      case 1:
        result.days.push(parseDayHeader(row));
        break;
      case 4:
        const lastPair = currentDay.pairs[currentDay.pairs.length - 1];
        lastPair.lessons.push(parseLesson(row).lessons[0]);
        break;
      case 6:
        currentDay.pairs.push(parseLesson(row, currentDay.date));
        break;
      default:
        throw Error("Необработанное число столбцов в таблице");
    }
  }
  return result;
}

export function parseSearch(nodes: NodeListOf<Element>) {
  const result: Search[] = [];
  let type: "t" | "g" | "l" = "g";
  for (const node of nodes) {
    if (node.className) {
      const table = node as HTMLTableElement;
      for (const row of table.rows) {
        const column = row.cells[0];
        const a = column.querySelector("a");
        const status = column.querySelector("small")?.textContent ?? "";
        let name = a?.textContent ?? "";
        const id = a?.href.split("=")[1] ?? "";
        name = `${capitalizeFirstLetter(status)} ${name}`;
        result.push({
          id,
          name,
          type,
        });
      }
    } else {
      const stringType = node.textContent?.split(",")[0] ?? "";
      switch (stringType) {
        case "Группы":
          type = "g";
          break;
        case "Преподаватели":
          type = "t";
          break;
        case "Аудитории":
          type = "l";
          break;
        default:
          throw Error("Неизвестный тип поисковых данных");
      }
    }
  }
  return result;
}
