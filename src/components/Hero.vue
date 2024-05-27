<template>
  <div class="hero-container bg-orange-100">
    <div class="flex justify-center items-center px-4 py-8">
      <!-- Left side: Image -->
      <div class="flex-shrink-0 hero-image">
        <img class="h-80 w-auto" src="/img/banner.png" alt="Hero Image" />
      </div>

      <!-- Right side: Title -->
      <div class="ml-4 hide-on-small-screen">
        <h1 class="text-2xl font-bold text-black">資源不浪費</h1>
        <p class="text-lg text-gray-800">無家者的生活保障</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
@media (max-width: 600px) {
  .h-80 {
    height: 7em;
  }

  .hide-on-small-screen {
    display: none;
  }
}
</style>
