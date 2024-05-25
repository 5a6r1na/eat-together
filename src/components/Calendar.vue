<template>
  <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="台中火車站" name="台中火車站">台中火車站</el-tab-pane>
    <el-tab-pane label="民權地下道" name="民權地下道">民權地下道</el-tab-pane>
    <el-tab-pane label="光復國小" name="光復國小">光復國小</el-tab-pane>
  </el-tabs> -->
  <div class="calendar">
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="900">
          <v-calendar
            ref="calendar"
            :events="events"
            color="primary"
            type="month"
            @click=""
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
// import { VCalendar } from "vuetify/labs/VCalendar";
// import { VSheet } from "vuetify/components/VSheet";
import { useDate } from "vuetify";
import { db } from "../firebase";
import { ref } from "vue";

const activeName = ref("first");

const handleClick = (tab, event) => {
  console.log(tab, event);
};

const focus = "";
const events = [
  {
    title: "Weekly Meeting",
    start: new Date("2024-05-17 09:00"),
    end: new Date("2024-05-17 10:00"),
  },
  {
    title: `Thomas' Birthday`,
    start: new Date("2024-05-18"),
    end: new Date("2024-05-18"),
    allDay: true,
  },
  {
    title: "Mash Potatoes",
    start: new Date("2024-05-27 12:30"),
    end: new Date("2024-05-30 15:30"),
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

const eventTitle = ref("");
const eventTime = ref("");
const selectedDate = ref(null);

const handleEventClick = (day) => {
  console.log("Event clicked:", day);
};

const showEvent = ({ e }) => {
  console.log(e[0]);
  // selectedDate.value = date;
  // isModalOpen.value = true;
};

// const showEvent = ({ nativeEvent, event }) => {
//   console.log(nativeEvent);
//   console.log(event);
//   const open = () => {
//     this.selectedEvent = event;
//     this.selectedElement = nativeEvent.target;
//     requestAnimationFrame(() =>
//       requestAnimationFrame(() => (this.selectedOpen = true))
//     );
//   };

//   if (this.selectedOpen) {
//     this.selectedOpen = false;
//     requestAnimationFrame(() => requestAnimationFrame(() => open()));
//   } else {
//     open();
//   }

//   nativeEvent.stopPropagation();
// };
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
