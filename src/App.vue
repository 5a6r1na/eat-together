<template>
  <Hero></Hero>
  <DemandForm></DemandForm>
  <Calendar></Calendar>
</template>

<script setup>
import Hero from "./components/Hero.vue";
import Calendar from "./components/Calendar.vue";
import DemandForm from "./components/DemandForm.vue";
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
