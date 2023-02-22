<template>
  <div class="footer">
    <div class="logo">
      <h2>MIRACLE OIL</h2>
    </div>
    <div class="location">
      <div class="address">
        <h2>ที่อยู่ของเรา</h2>
      </div>
      <div class="text">
        <p>22 ถนนชายทะเล</p>
        <p>ตำบลปากพนัง อำเภอปากพนัง</p>
        <p>จังหวัดนครศรีธรรมราช 80140</p>
      </div>
      <div class="map-location">
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
    <div class="contact-list">
      <div class="contact-text">
        <p>ช่องทางติดต่อเรา</p>
      </div>
      <div class="icon">
        <div class="item facebook">
          <icons-facebook />
          <p>Facebook</p>
        </div>
        <div class="item line">
          <icons-line />
          <p>Line</p>
        </div>
        <div class="item shopee">
          <icons-shopee />
          <p>Shopee</p>
        </div>
        <div class="item lazada">
          <icons-lazada />
          <p>Lazada</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  display: grid; 
  grid-template-columns: 30% 40% 30%;
  height: 100%;
  width: 100vw;
  min-height: 330px;
  background-color: darken(#233145, 5%);

  .logo {
    display: grid;
    height: max-content;
    width: 100%;
    justify-content: center;
    position: relative;
    left: 10px;
    top: 30px;

    h2 {
      color: white;
      width: max-content;
    }
  }

  .location {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;
    .address {
      position: relative;
      top: 30px;
      justify-self: start;
      h2 {
        font-weight: 300;
        font-size: 1.7rem;
        color: white;
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      top: 50px;

      p {
        font-size: 1.25rem;
        color: white;
      }
    }

    .map-location {
      position: relative;
      top: 60px;
      width: 60%;
      height: 45%;
      display: flex;
      justify-content: center;
      iframe {
        border-radius: 20px;
      }
    }
  }

  .contact-list {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;

    .contact-text {
      position: relative;
      top: 30px;
      p {
        color: white;
        font-size: 1.5rem;
      }
    }

    .icon {
      display: flex;
      color: white;
      flex-direction: column;
      position: relative;
      top: 50px;
      .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 5px;

        p {
          margin-left: 10px;
          font-size: 1rem;
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .footer {
    min-height: 550px;
    height: max-content;
    display: flex;
    flex-direction: column;
    .logo {
      left: 0px;
      width: 100%;
      h2 {
        font-size: 1.1rem;
      }
    }
    .location {
      margin-top: 30px;
      .address {
        margin-top: 10px;
        h2 {
          font-size: 1.1rem;
        }
      }
      .text {
        width: 80%;
        p {
          font-size: 0.7rem;
          text-align: center;
          width: 100%;
        }
      }
    }
    .contact-list {
      .contact-text {
        width: 60%;
        p {
          font-size: 1.1rem;
          text-align: center;
        }
      }
      .icon {
        margin-top: 20px;
        .item {
          p {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}
</style>
