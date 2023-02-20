import {
  Button,
  Card,
  Chip,
  Course,
  Day,
  Header,
  Pairs,
  Promt,
  SubHeader,
} from "./types";

export const millisecondsInDay = 86400000;

const RG =
  /^(\(.*?[^\(]*\))?\s?((?:.*(?=\s\(Э))|(?:.*(?=\s\(с))|.*)\s?(?:\(Э.*(?=\())?(\(с видеотрансляцией\))?.*$/;

export function parseDayHeader(row: HTMLTableRowElement): Day {
  const headerArray = row.textContent?.trim().split(" ");
  if (headerArray?.length != 2 && headerArray?.length != 3) {
    throw Error(
      `Не удалось получить коррекный заголовок для дня недели: ${row.innerHTML}`
    );
  }
  const [date, dayWeekName] = headerArray;
  return { date, dayWeekName, pairs: [] };
}

type IDs = "num" | "time" | "lesson" | "teacher" | "aud" | "group";

export function parseLesson(
  row: HTMLTableRowElement,
  currentDate: string = ""
): Pairs {
  const lessons: Card[] = [];

  let pairNumber = 0;
  let start: Date = new Date();
  let end: Date = new Date();
  let chips: Chip[] = [];
  let header: Header = { name: "", subname: "" };
  let subHeaders: SubHeader[] = [];
  let courses: Course[] = [];
  let promts: Promt[] = [];
  let buttons: Button[] = [];

  for (const tr of row.cells) {
    let sh: SubHeader[] = [];
    let p: Promt[] = [];
    let b: Button = { active: false, hint: "", href: "", icon: "" };
    let cp: Chip[] = [];
    let cs: Course[] = [];
    let h: Header = { name: "", subname: "" };
    switch (tr.id as IDs) {
      case "num":
        if (currentDate) pairNumber = +parseNumber(tr);
        break;
      case "time":
        if (currentDate) [start, end] = parseTime(tr, currentDate);
        break;
      case "lesson":
        if (tr.width == "1%") chips.push(parseType(tr));
        else {
          // занятие
          [h, cs, cp] = parseDiscipline(tr);
          header = h;
          chips = [...chips, ...cp];
          courses = [...courses, ...cs];
        }
        break;
      case "teacher":
        [sh, p, b] = parseTeacher(tr);
        subHeaders = [...subHeaders, ...sh];
        promts = [...promts, ...p];
        buttons.push(b);
        break;
      case "aud":
        [sh, p, cp, b] = parseLocation(tr);
        subHeaders = [...subHeaders, ...sh];
        promts = [...promts, ...p];
        chips = [...chips, ...cp];
        buttons.push(b);
        break;
      case "group":
        [sh, p, b] = parseGroup(tr);
        subHeaders = [...subHeaders, ...sh];
        promts = [...promts, ...p];
        buttons.push(b);
        break;
      default:
        throw Error(`Необработанный id элемента: ${tr.outerHTML}`);
    }
  }
  lessons.push({ buttons, chips, courses, header, promts, subHeaders });
  return { start, end, lessons, pairNumber, now: false };
}

function parseNumber(tr: HTMLTableCellElement) {
  const num = tr.textContent?.trim().split(" ") ?? [];
  if (num.length != 2)
    throw Error(
      `Не удалось получить корректный номер занятия: ${tr.innerHTML}`
    );

  return num[0];
}

function parseTime(tr: HTMLTableCellElement, currentDate: string) {
  const times =
    tr.textContent
      ?.trim()
      .split("-")
      .map((t) => t.trim()) ?? [];
  if (times.length != 2)
    throw Error(
      `Не удалось получить корректное время начала/конца занятия: ${tr.innerHTML}`
    );

  const [t, e] = times;

  const start = toISO8601({ time: t, date: currentDate });
  const end = toISO8601({ time: e, date: currentDate });

  return [start, end];
}

interface toISO8601Props {
  time: string;
  date: string;
}
function toISO8601({ time, date }: toISO8601Props) {
  const ds = date.split(".");
  if (ds.length != 3) {
    throw Error(`Не удалось перевести дату в ISO 8601: ${date}`);
  }
  const [day, month, year] = ds;

  return new Date(
    `${year}-${month}-${day}T${time.length == 5 ? time : "0" + time}+03:00`
  );
}

function parseType(tr: HTMLTableCellElement): Chip {
  return { color: "-", text: tr.textContent?.trim() ?? "" };
}

function parseDiscipline(tr: HTMLTableCellElement): [Header, Course[], Chip[]] {
  const text = tr.textContent?.trim() ?? "";

  const rg = RG.exec(text);

  const header: Header = { name: "", subname: "" };
  const chips: Chip[] = [];

  if (rg !== null) {
    if (rg[1]) chips.push({ color: "-", text: replacer(rg[1]) });
    header.name = rg[2] ?? "";
    header.subname = rg[3] ?? "";
  } else {
    header.name = text;
  }

  const courses: Course[] = [];
  const mainCourse = tr.querySelector("#lesson > a") as HTMLLinkElement;
  if (mainCourse) {
    courses.push({ name: "В курс", href: mainCourse.href });
  }

  for (let c of tr.querySelectorAll("#lesson > small > a")) {
    const cc = c as HTMLAnchorElement;
    courses.push({ name: cc.textContent ?? "", href: cc.href });
  }

  return [header, courses, chips];
}

function parseTeacher(
  tr: HTMLTableCellElement
): [SubHeader[], Promt[], Button] {
  const subHeaders: SubHeader[] = [];
  const promts: Promt[] = [];
  const button: Button = {
    icon: "r_person",
    active: false,
    hint: "-",
    href: "",
  };
  const t = tr.querySelector("a") as HTMLAnchorElement;

  if (tr.children.length == 3 && t.textContent) {
    const status = tr.querySelector("small")?.textContent?.trim();
    const fullName = t ? t.textContent?.trim() : "";
    const id = t ? t.href.split("=")[1] : "";
    const promt = tr.querySelector("img")?.title.trim() ?? "";
    subHeaders.push({ icon: "r_person", text: `${fullName} (${status})` });
    promts.push({ icon: "r_account_circle", text: promt });
    button.active = true;
    button.href = `/t/${id}`;
  }

  return [subHeaders, promts, button];
}

function parseLocation(
  tr: HTMLTableCellElement
): [SubHeader[], Promt[], Chip[], Button] {
  const subHeaders: SubHeader[] = [];
  const promts: Promt[] = [];
  const button: Button = {
    icon: "r_location_on",
    active: false,
    hint: "-",
    href: "",
  };
  const chips: Chip[] = [];

  const l = tr.querySelector("a") as HTMLAnchorElement;

  if (l) {
    // Аудитория

    if (l.textContent) {
      const nobr = tr.querySelector("nobr");
      const area = nobr?.textContent?.trim() ?? "";
      const adress = nobr?.querySelector("img")?.title.trim() ?? "";
      const id = l.href.split("=")[1];

      if (nobr) {
        tr?.removeChild(nobr);
      }

      const name = tr.textContent?.trim().slice(0, -1);

      subHeaders.push({ icon: "r_location_on", text: `${name} ${area}` });
      promts.push({ icon: "r_not_listed_location", text: adress });
      button.active = true;
      button.href = `/l/${id}`;
    }
  } else {
    // Онлайн / МООК
    subHeaders.push({
      icon: "r_location_on",
      text: tr.textContent?.trim() ?? "",
    });
    chips.push({ text: "Онлайн", color: "-" });
  }

  return [subHeaders, promts, chips, button];
}

function parseGroup(tr: HTMLTableCellElement): [SubHeader[], Promt[], Button] {
  const subHeaders: SubHeader[] = [];
  const promts: Promt[] = [];
  const button: Button = {
    icon: "r_groups",
    active: false,
    hint: "-",
    href: "",
  };

  const a = tr.querySelector("a") as HTMLAnchorElement;
  if (a.textContent) {
    const t = a.textContent?.trim();
    subHeaders.push({ icon: "r_groups", text: t });
    promts.push({
      icon: "r_groups",
      text: tr.querySelector("img")?.title ?? "",
    });
    button.active = true;
    button.href = `/g/${t}`;
  }

  return [subHeaders, promts, button];
}

function replacer(text: string) {
  return text
    .replace("(", "")
    .replace(")", "")
    .replace("п/г ", "")
    .replace("подгруппа", "п/г")
    .replace("русский язык как иностранный", "рус. яз.")
    .replace("русский язык как иностанный", "рус. яз.")
    .replace("иностранный язык", "ин. яз.")
    .replace("немецкий язык", "нем. яз.");
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
