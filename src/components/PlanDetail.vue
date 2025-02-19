<template>
  <div class="detail-container">
    <div class="detail-background">
      <div class="detail-text">
        <p>
          <span style="color: #fca140">『物資不浪費，需求被看見』</span><br />
          <br />
          在田野時，我們發現物資發放時間重疊及物資類型不均等現象。<br />
          因此，我們希望透過物資登記的方式，讓更多街上的需求被照顧。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.detail-container {
  /* position: fixed; */
  height: 350px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  margin-top: 50px;
}

.detail-background {
  background-image: url("/img/streetpic.jpg");
  background-size: cover;
  background-position: center;
  /* padding: 20px; */
  height: 100%;
}

.detail-text {
  font-size: 16px;
  text-align: center;
  color: white;
  background: rgba(
    0,
    0,
    0,
    0.5
  ); /* Optional: Add a semi-transparent background for better text readability */
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
