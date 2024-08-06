<template>
  <a name="footer"></a>
  <div class="footer-container">
    <div class="footer-content flex justify-evenly items-center px-4 py-8">
      <!-- Left side: Image -->
      <div>
        <img
          class="h-80 w-auto m-4"
          src="/img/full-logo.png"
          alt="Footer Image"
        />
      </div>
      <!-- Mid side: Title -->
      <div class="mid-container text-left">
        <h1 class="text-2xl font-bold">街角家</h1>
        <p>HomeStreetHome</p>
        <p>聯繫我們 | homestreethome2022@gmail.com</p>
        <p>地址 | 台中市西區自治街65號4樓</p>
        <p>抬頭 | 社團法人台灣街角家關懷協會</p>
        <div class="social-icons">
          <a
            href="https://www.facebook.com/profile.php?id=100064500682133"
            target="_blank"
          >
            <img
              style="height: 50px; margin-top: 10px; margin-right: 5px"
              src="/img/facebook-150.png"
              alt="facebook"
            />
          </a>
          <a href="https://www.instagram.com/homestreethome.tc" target="_blank">
            <img
              style="height: 70px"
              src="/img/instagram-150.png"
              alt="instagram"
            />
          </a>
        </div>
      </div>
      <!-- Right side: Title -->
      <div class="right-container text-left">
        <h1 class="text-2xl font-bold">捐款資訊</h1>
        <p>成為貧窮者的盟友， <br />支持組織開展更多元有效的扶貧工作</p>
        <a class="donate-link" href="https://neti.cc/LYZnWoW" target="_blank"
          >https://neti.cc/LYZnWoW</a
        >
      </div>
    </div>
    <div class="copyright">
      <p style="font-size: small">© HomeStreetHome. All rights reserved.</p>
    </div>
  </div>

  <!-- <img class="h-90 w-full" src="/img/footer.png" alt="Footer Image" /> -->
</template>

<style scoped>
.copyright {
  background-color: #5c441b54;
  height: auto;
  margin: auto;
  padding: 5px 0;
}
a {
  color: #ffffff;
  text-decoration: underline;
}
a:hover {
  color: #fca421;
}

.footer-container {
  background-color: #2f3334;
}

.footer-content {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 2rem 1rem;
}

.mid-container,
.right-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  margin-top: 4rem;
}

.mid-container h1,
.right-container h1 {
  margin-bottom: 0.5rem;
}

.mid-container p,
.right-container p {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.social-icons {
  margin-top: 10px;
  display: flex;
}

/* @media (max-width: 900px) {
  .footer-content {
    flex-direction: column;
    margin-left: 1rem;
  }

  .mid-container,
  .right-container {
    margin-top: 2rem;
    text-align: left;
  }

  .social-icons {
    justify-content: flex-start;
  }
} */

@media (max-width: 480px) {
  .footer-content {
    flex-direction: column;
    margin-left: 1rem;
    padding: 1rem 0.5rem;
  }

  .mid-container,
  .right-container {
    margin-top: 1rem;
    text-align: left;
  }

  .mid-container h1,
  .right-container h1 {
    font-size: 1.5rem;
  }

  .mid-container p,
  .right-container p {
    font-size: 0.875rem;
  }

  .social-icons {
    justify-content: flex-start;
  }
}
</style>
