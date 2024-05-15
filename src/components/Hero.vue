<template>
  <div class="hero-container bg-gray-900">
    <div class="flex justify-between items-center px-4 py-8">
      <!-- Left side: Image -->
      <div class="flex-shrink-0">
        <img class="h-40 w-auto" src="/image.png" alt="Hero Image" />
      </div>

      <!-- Right side: Title -->
      <div class="ml-4">
        <h1 class="text-4xl font-bold text-white">Your Hero Title</h1>
        <p class="text-lg text-gray-300">Subtitle or description goes here</p>
        <button
          class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600"
        >
          Call to Action
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
  // Add props, data, methods, etc. as needed
};
</script>

<style>
/* Add custom styles here if needed */
</style>
