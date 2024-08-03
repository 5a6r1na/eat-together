<template>
  <h2
    style="
      color: #ffffff;
      margin-top: 30px;
      text-align: left;
      font-weight: bold;
      padding: 0 2rem;
    "
  >
    周邊地圖
  </h2>
  <!-- <div style="margin-top: 30px"> -->
  <div class="map-container">
    <el-carousel :interval="5000" arrow="always" height="500px">
      <el-carousel-item v-for="(image, index) in selectedImages" :key="index">
        <img
          :src="image"
          :alt="'Image ' + (index + 1)"
          class="carousel-image"
        />
        <div v-if="!image">暫時無法顯示圖片</div>
      </el-carousel-item>
    </el-carousel>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { computed } from "vue";
import { useEventStore } from "../stores/eventStore";

import taichungStation from "/img/taichungstation.jpg";
import taichungStationMap from "/img/taichungstationMap.png";
import mingquan from "/img/mingquan.png";
import mingquanMap from "/img/mingquanMap.jpg";
import guangfu from "/img/guangfu.jpg";
import guangfunMap from "/img/guangfuMap.png";

const store = useEventStore();

const taichungStationImages = [taichungStation, taichungStationMap];
const mingquanImages = [mingquan, mingquanMap];
const guangfuImages = [guangfu, guangfunMap];

const selectedImages = computed(() => {
  if (store.selectedTab == "1") {
    return taichungStationImages;
  } else if (store.selectedTab == "2") {
    return mingquanImages;
  } else if (store.selectedTab == "3") {
    return guangfuImages;
  }
});
</script>

<style>
.map-container {
  padding: 0 2rem;
}

.carousel-image {
  width: 100%;
  height: 600px;
  object-fit: cover;
  display: block;
  border-radius: 8px;
}
</style>
