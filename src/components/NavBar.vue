<template>
  <nav class="bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <img
            class="block lg:hidden h-32 w-auto"
            src="/img/logo.png"
            alt="Logo"
          />
          <img
            class="hidden lg:block h-32 w-auto"
            src="/img/logo.png"
            alt="Logo"
          />
        </div>

        <!-- Navigation links -->
        <div class="hidden lg:block">
          <div class="flex space-x-4">
            <router-link
              to="/"
              class="text-orange hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >首頁</router-link
            >
            <router-link
              to="/about"
              class="text-orange hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >關於計畫</router-link
            >
            <router-link
              to="/contact"
              class="text-orange hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >聯絡資訊</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style>
/* Add custom styles here if needed */
</style>
