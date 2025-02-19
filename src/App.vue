<template>
  <NavBar></NavBar>
  <Hero></Hero>
  <FullCalendar></FullCalendar>
  <Map></Map>
  <div class="introduction-container">
    <Introduction :class="{ open: isOpen }" class="introduction"></Introduction>
    <PlanDetail :class="{ open: isOpen }" class="plandetail"></PlanDetail>
  </div>
  <Footer></Footer>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import Hero from "./components/Hero.vue";
import Introduction from "./components/Introduction.vue";
import PlanDetail from "./components/PlanDetail.vue";
import Map from "./components/Map.vue";
import Footer from "./components/Footer.vue";
import FullCalendar from "./components/FullCalendar.vue";

import { ref, onMounted, onBeforeUnmount } from "vue";

const isOpen = ref(true);
let lastScrollTop = 0;

const handleScroll = () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // Scrolling down
    isOpen.value = false;
  } else {
    // Scrolling up
    isOpen.value = true;
  }
  lastScrollTop = Math.max(scrollTop, 0); // Ensure the lastScrollTop is non-negative
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* .introduction {
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2; 
  transition: transform 1s ease-in-out, opacity 1s ease-in-out; 
  transform: translateY(0);
  opacity: 1;
} */

.introduction-container {
  position: relative;
  width: 100%;
}

.introduction {
  position: relative;
  width: 100%;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.plandetail {
  position: absolute;
  width: 100%;
  top: 1vh;
  left: 0;
  z-index: 10;
  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
  transform: translateY(0);
  opacity: 1;
}

.plandetail.open {
  transform: translateY(0);
  opacity: 0;
}

.plandetail:not(.open) {
  transform: translateY(-10%);
  opacity: 1;
}

.introduction.open {
  transform: translateY(0);
  opacity: 1;
}

.introduction:not(.open) {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
