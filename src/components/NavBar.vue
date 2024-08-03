<template>
  <nav class="nav-container">
    <!-- Logo -->
    <div class="logo-container">
      <img class="logo" src="/img/logo.png" alt="Logo" />
      <img class="logo-text" src="/img/logo-text.png" alt="Logo-text" />
    </div>

    <!-- Navigation links -->
    <div class="link-container">
      <!-- <router-link to="/" class="px-3 py-2 rounded-md text-sm font-medium"
        >首頁</router-link
      >
      <router-link to="/about" class="px-3 py-2 rounded-md text-sm font-medium"
        >關於計畫</router-link
      > -->
      <a class="contact-link" href="#footer">聯絡資訊</a>
      <a class="donate-link" href="https://neti.cc/LYZnWoW" target="_blank"
        >捐款資訊</a
      >
    </div>
  </nav>
</template>

<script setup></script>

<style>
.nav-container {
  background-color: #5c441b54;
  height: 60px;
  display: flex;
  justify-content: space-between;
  /* position: fixed; */
  /* width: 1280px; */
}

.logo-container {
  display: flex;
  align-items: center;
  height: 40px;
  gap: 20px;
  margin: 0.5rem 2rem;
}

.link-container {
  display: flex;
  align-items: center;
  height: 40px;
  gap: 20px;
  margin: 0.5rem 2rem;
  color: #fca421;
}

.contact-link,
.donate-link {
  color: #fca421;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.contact-link:hover,
.donate-link:hover {
  background-color: #7d694670;
}

.logo,
.logo-text {
  height: 30px;
  opacity: 1;
  width: auto;
}

/* .logo-text {
  display: none;
} */

@media (max-width: 480px) {
  .nav-container {
    background-color: #5c441b54;
    height: 40px;
  }
  .logo-container {
    display: flex;
    align-items: center;
    height: 40px;
    gap: 10px;
    margin: 0 1rem;
  }

  .logo,
  .logo-text {
    height: 20px;
    width: auto;
  }
  .link-container {
    display: none;
  }
}
</style>
