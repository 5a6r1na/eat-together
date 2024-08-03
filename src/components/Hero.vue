<template>
  <div class="hero-container">
    <div class="hero-image">
      <img :src="currentImageSrc" alt="Hero Image" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const largeImage = "/img/banner.jpg";
const smallImage = "/img/banner-small.png";

const currentImageSrc = ref(largeImage);

const updateImageSrc = () => {
  const windowWidth = window.innerWidth;
  currentImageSrc.value = windowWidth <= 480 ? smallImage : largeImage;
};

onMounted(() => {
  updateImageSrc();
  window.addEventListener("resize", updateImageSrc);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateImageSrc);
});
</script>

<style scoped>
.hero-container {
  background-color: #2f3334;
  width: 100%;
  height: auto;
  padding: 20px;
  z-index: 1;
}

.hero-image img {
  width: 100%;
  height: auto;
}

@media (max-width: 900px) {
  .hero-container {
    padding: 10px;
  }

  .hero-image img {
    height: auto;
    max-height: 250px;
  }
}

@media (max-width: 480px) {
  .hero-container {
    padding: 10px;
  }

  .hero-image img {
    height: auto;
    max-height: 200px;
  }
}
</style>
