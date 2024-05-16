<template>
  <NavBar></NavBar>
  <Hero></Hero>
  <Menu></Menu>
  <Calendar></Calendar>
  <Map></Map>
  <Footer></Footer>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import Hero from "./components/Hero.vue";
import Menu from "./components/Menu.vue";
import Calendar from "./components/Calendar.vue";
import Map from "./components/Map.vue";
import Footer from "./components/Footer.vue";
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
