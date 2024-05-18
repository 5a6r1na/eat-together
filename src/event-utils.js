let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "Happy Birthday",
    start: todayStr + "T09:00:00",
    extendedProps: {
      content: "衣服",
    },
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T14:00:00",
    extendedProps: {
      content: "衣服",
    },
  },
  {
    id: createEventId(),
    title: "Hey",
    start: "2024-05-17T17:30:00",
    extendedProps: {
      content: "衣服",
    },
  },
];

export function createEventId() {
  return String(eventGuid++);
}
