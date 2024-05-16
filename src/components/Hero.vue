<template>
  <div class="hero-container bg-orange-50">
    <div class="flex justify-center items-center px-4 py-8">
      <!-- Left side: Image -->
      <div class="flex-shrink-0">
        <img class="h-80 w-auto" src="/img/banner.png" alt="Hero Image" />
      </div>

      <!-- Right side: Title -->
      <div class="ml-4">
        <h1 class="text-2xl font-bold text-black">資源不浪費</h1>
        <p class="text-lg text-gray-800">無家者的生活保障</p>
        <!-- <button
          class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600"
        >
          表單
        </button> -->
        <DemandForm></DemandForm>
      </div>
    </div>
  </div>
</template>

<script setup>
import DemandForm from "./DemandForm.vue";
</script>

<style>
/* Add custom styles here if needed */
</style>
