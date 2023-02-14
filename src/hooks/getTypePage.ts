import { Type } from "./getSchedule";

export default function getTypePage(path: string) {
  const letter = path.split("/")[1];
  let type: Type = "group";
  switch (letter) {
    case "g":
      type = "group";
      break;
    case "t":
      type = "teacher";
      break;
    case "l":
      type = "location";
      break;
  }

  return type;
}
