<template>
  <div class="contact-container">
    <!-- header -->
    <div class="header-page">
      <h2>ช่องทางติดต่อของเรา</h2>
    </div>
    <!-- main-content -->
    <div class="product-site">
      <div class="header-section">
        <h3>สถานที่ผลิต</h3>
      </div>
      <div class="map-api">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1882.4700421972668!2d100.54558390732988!3d13.76311921234495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29e95a7412aab%3A0x8d99187de3c1ba32!2z4Lil4Li44Lih4Lie4Li04LiZ4Li1IOC4quC4p-C4teC4lyDguJTguLTguJnguYHguJTguIcgLSDguKPguLLguIrguJvguKPguLLguKPguKA!5e0!3m2!1sth!2sth!4v1672331086337!5m2!1sth!2sth"
          width="100%"
          height="100%"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    <div class="sub-shop">
      <div class="header-section">
        <h3>ร้านค้าตัวแทนจำหน่าย</h3>
      </div>
      <div class="map-api">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8734.710687032359!2d100.19323073571263!3d8.355853740391137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30531e26520b094f%3A0xf00fc38633e28d57!2z4LmC4LiB4LmA4Lih4Lio4Lii4Liy4LiZ4Lii4LiZ4LiV4LmM!5e0!3m2!1sth!2sth!4v1672331020398!5m2!1sth!2sth"
          width="100%"
          height="100%"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    <div class="contact-form">
      <div class="header-section">
        <h3>ส่งข้อความถึงเรา</h3>
      </div>
      <form-user />
    </div>
  </div>
</template>

<script>
export default {
  layout: "site",
};
</script>

<style lang="scss" scoped>
.contact-container {
  width: max-content;
  height: max-content;
  display: flex;
  flex-direction: column;
  .header-page {
    display: flex;
    width: 100vw;
    justify-content: center;
    margin-top: 5rem;
    margin-bottom: 2rem;
  }
  .product-site {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: max-content;
    .header-section {
      margin-bottom: 1rem;
      h3 {
        border: 2px solid black;
        padding: 0.5rem;
        border-radius: 5px;
      }
    }
    .map-api {
      width: 80vw;
      height: 80vh;
      border: 1px solid black;
    }
  }
  .sub-shop {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: max-content;
    margin-top: 2rem;
    .header-section {
      margin-bottom: 1rem;
      h3 {
        border: 2px solid black;
        padding: 0.5rem;
        border-radius: 5px;
      }
    }
    .map-api {
      width: 80vw;
      height: 80vh;
      border: 1px solid black;
    }
  }
  .contact-form {
    margin-top: 2rem;
    width: 100%;
    height: max-content;
    background-color: $background-section-color;
    padding-bottom: 2rem;
    .header-section {
      margin-top: 2rem;
      margin-bottom: 2rem;
      align-items: center;
      justify-content: center;
      display: flex;
      h3 {
        border: 2px solid rgb(255, 255, 255);
        color: white;
        padding: 0.5rem;
        border-radius: 5px;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .contact-container {
    // .header {
    //   &.normal {
    //     visibility: hidden;
    //   }
    //   &.mobile {
    //     visibility: visible;
    //   }
    // }
    .product-site {
      .map-api {
        height: 50vh;
      }
    }
    .sub-shop {
      .map-api {
        height: 50vh;
      }
    }
  }
}
</style>
