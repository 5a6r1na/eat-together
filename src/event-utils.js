let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "",
    start: todayStr + "T17:30:00",
    backgroundColor: "#fca421",
    textColor: "#ffffff",
    extendedProps: {
      name: "李先生",
      org: "個人",
      phone: "0912345678",
      item: "衣服",
      quantity: "10",
      type: "food",
      location: "1",
    },
  },
  {
    id: createEventId(),
    title: "",
    start: todayStr + "T14:00:00",
    backgroundColor: "#3ac976",
    textColor: "#ffffff",
    extendedProps: {
      name: "林先生",
      org: "街角家",
      phone: "0912345678",
      item: "衣服",
      quantity: "10",
      type: "clothes",
      location: "1",
    },
  },
  {
    id: createEventId(),
    title: "",
    start: "2024-05-17T17:30:00",
    backgroundColor: "#498ae6",
    textColor: "#ffffff",
    extendedProps: {
      name: "林先生",
      org: "街角家",
      phone: "0912345678",
      item: "衣服",
      quantity: "10",
      type: "hygiene",
      location: "1",
    },
  },
];

export function createEventId() {
  return String(eventGuid++);
}
