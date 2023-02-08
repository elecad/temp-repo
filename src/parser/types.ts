export interface Schedule {
  header: string;
  days: Day[];
}

export interface Day {
  date: string;
  dayWeekName: string;
  pairs: Pairs[];
}

export interface Pairs {
  pairNumber: number;
  start: Date;
  end: Date;
  now: boolean;
  lessons: Card[];
}

export interface Card {
  chips: Chip[];
  header: Header;
  subHeaders: SubHeader[];
  promts: Promt[];
  buttons: Button[];
  courses: Course[];
}

export interface Chip {
  color: string;
  text: string;
}

export interface Header {
  name: string;
  subname: string;
}

export interface SubHeader {
  icon: string;
  text: string;
}

export interface Promt extends SubHeader {}

export interface Button {
  icon: string;
  href: string;
  hint: string;
  active: boolean;
}

export interface Course {
  name: string;
  href: string;
}

export interface Search {
  type: "g" | "t" | "l";
  id: string;
  name: string;
}
