// @ts-ignore: Unreachable code error
interface Schedule {
  header: string;
  days: Day[];
}

interface Day {
  date: string;
  dayWeekName: string;
  pairs: Pairs[];
}

interface Pairs {
  pairNumber: number;
  start: Date;
  end: Date;
  now: boolean;
  lessons: Card[];
}

interface Card {
  chips: Chip[];
  header: Header;
  subHeaders: SubHeader[];
  promts: Promt[];
  buttons: Button[];
  courses: Course[];
}

interface Chip {
  color: string;
  text: string;
}

interface Header {
  name: string;
  subname: string;
}

interface SubHeader {
  icon: string;
  text: string;
}

interface Promt extends SubHeader {}

interface Button {
  icon: string;
  href: string;
  hint: string;
  active: boolean;
}

interface Course {
  name: string;
  href: string;
}

interface Search {
  type: "g" | "t" | "l";
  id: string;
  name: string;
}
