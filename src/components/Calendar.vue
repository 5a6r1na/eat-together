<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          :events="events"
          color="primary"
          type="month"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
// import { VCalendar } from "vuetify/labs/VCalendar";
// import { VSheet } from "vuetify/components/VSheet";
import { useDate } from "vuetify";

const focus = "";
const events = [
  {
    title: "Weekly Meeting",
    start: new Date("2024-05-17 09:00"),
    end: new Date("024-05-17 10:00"),
  },
  {
    title: `Thomas' Birthday`,
    start: new Date("024-05-18"),
    end: new Date("2024-05-18"),
    allDay: true,
  },
  {
    title: "Mash Potatoes",
    start: new Date("024-05-27 12:30"),
    end: new Date("024-05-30 15:30"),
  },
];
const colors = [
  "blue",
  "indigo",
  "deep-purple",
  "cyan",
  "green",
  "orange",
  "grey darken-1",
];
const names = [
  "Meeting",
  "Holiday",
  "PTO",
  "Travel",
  "Event",
  "Birthday",
  "Conference",
  "Party",
];

const adapter = useDate();
const startOfMonth = adapter.startOfDay(adapter.startOfMonth(new Date()));
const endOfMonth = adapter.endOfDay(adapter.endOfMonth(new Date()));

const getEventColor = (event) => event.color;

const fetchEvents = ({ start, end }) => {
  const min = start;
  const max = end;
  const days = (max.getTime() - min.getTime()) / 86400000;
  const eventCount = rnd(days, days + 20);

  for (let i = 0; i < eventCount; i++) {
    const allDay = rnd(0, 3) === 0;
    const firstTimestamp = rnd(min.getTime(), max.getTime());
    const first = new Date(firstTimestamp - (firstTimestamp % 900000));
    const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000;
    const second = new Date(first.getTime() + secondTimestamp);

    events.push({
      title: names[rnd(0, names.length - 1)],
      start: first,
      end: second,
      color: colors[rnd(0, colors.length - 1)],
      allDay: !allDay,
    });
  }
};

const rnd = (a, b) => Math.floor((b - a + 1) * Math.random()) + a;
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
