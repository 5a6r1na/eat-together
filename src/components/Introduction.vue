<template>
  <div class="intro-container">
    <div class="intro-background">
      <div class="intro-text">
        <p>
          「赤貧者，不是社會的問題，而是為我們指出社會問題所在的人。透過深入貧者的視野，汲取他們的經驗，
          將為全體人類找到一條不再貧窮的道路。」
          <br />——
          <span style="color: #fca140">台灣街角家關懷協會</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.intro-container {
  /* position: fixed; */
  height: 350px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  margin-top: 50px;
}

.intro-background {
  background-image: url("/img/streetpic.jpg");
  background-size: cover;
  background-position: center;
  /* padding: 20px; */
  height: 100%;
}

.intro-text {
  font-size: 16px;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  /* Optional: Add a semi-transparent background for better text readability */
  padding: 10px;
  /* border-radius: 10px; */
  /* max-width: 90%; */
  margin: auto; /* Center the text container */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Ensures the text is centered vertically */
}
</style>
