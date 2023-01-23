<template>
  <div class="navigation-bar" id="navbar" ref="nav-bar">
    <div class="logo">
      <h2>MIRACLE OIL</h2>
    </div>
    <div class="item-in-nuxt-link">
      <div class="item">
        <nuxt-link to="/">
          <p>หน้าหลัก</p>
        </nuxt-link>
      </div>
      <div class="item">
        <nuxt-link to="/about">
          <p>เกี่ยวกับเรา</p>
        </nuxt-link>
      </div>
      <div class="item">
        <nuxt-link to="/product">
          <p>สินค้าของเรา</p>
        </nuxt-link>
      </div>
      <div class="item">
        <nuxt-link to="/contact">
          <p>ติดต่อเรา</p>
        </nuxt-link>
      </div>
      <!-- dropdown -->
      <div class="dropdown" :class="{ toggle: toggle }">
        <button class="button--icon" @click="toggleDropdown">
          <p>สั่งซื้อ</p>
          <span><icon>arrow_drop_down</icon></span>
        </button>
        <div class="item-in-dropdown" id="hide">
          <div class="item" id="facebook">
            <icons-facebook />
            <a href="https://www.facebook.com/profile.php?id=100068586962598"
              >Facebook</a
            >
          </div>
          <!-- dropdown - indropdown -->
          <div class="item" id="shopee">
            <icons-shopee />
            <a href="google.com">Shopee</a>
          </div>
          <div class="item" id="lazada">
            <icons-lazada />
            <a href="google.com">Lazada</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener("scroll", this.navigationOnScrollHidden);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.navigationOnScrollHidden);
  },
  data() {
    return {
      toggle: false,
      prevScrollpos: 0,
    };
  },
  methods: {
    toggleDropdown() {
      this.toggle = !this.toggle;
    },
    navigationOnScrollHidden() {
      let currentScrollPos = window.pageYOffset;
      if (this.prevScrollpos > currentScrollPos) {
        this.$refs["nav-bar"].style.top = "0"; //this.$ref = document.getElementBy...
      } else {
        this.$refs["nav-bar"].style.top = "-5rem";
      }
      this.prevScrollpos = currentScrollPos;
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes dropdownY {
  0% {
    transform: scaleY(0);
  }

  70% {
    transform: scaleY(1.2);
  }

  85% {
    transform: scaleY(1.05);
  }

  100% {
    transform: scaleY(1);
  }
}

.navigation-bar {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 3.5rem;
  justify-content: center;
  align-items: center;
  background-color: rgba(19, 19, 19, 0.25);
  backdrop-filter: blur(5px);
  // box-shadow: 0px 1px 5px rgb(65, 65, 65);
  position: fixed;
  transition: top 0.3s;

  .logo {
    display: flex;
    height: 100%;
    width: min-content;
    justify-content: center;
    align-items: center;
    margin-right: 5%;

    h2 {
      width: max-content;
      color: rgb(255, 255, 255);
    }
  }

  .item-in-nuxt-link {
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin-left: 2%;

    .item {
      padding: 0;
      margin: 0;
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      margin: 0% 1.5% 0% 1.5%;

      p {
        width: max-content;
        margin: 0;
        padding: 0;
        font-size: 1.2rem;
        font-weight: 600;
        background-image: linear-gradient(
          to right,
          #ff9900,
          #f2970f 50%,
          rgb(243, 243, 243) 50%
        );
        background-size: 200% 100%;
        background-position: 100%;
        display: inline-block;
        position: relative;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all 0.1s ease-in-out;
      }

      p:before {
        content: "";
        background: #ff9900;
        display: block;
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 0;
        height: 3px;
        transition: all 0.1s ease-in-out;
      }

      p:hover {
        background-position: 0;
        text-decoration: none;
        border-bottom: 2.5px solid #ff9900;
      }

      .nuxt-link-exact-active {
        p {
          border-bottom: 2.5px solid #ff9900;
          padding-bottom: 5px;
          text-decoration: none;
        }
      }
    }
  }

  .dropdown {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin-left: 3%;

    button {
      p {
        margin: 0px 15px 0px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.1rem;
        font-weight: 600;
        color: $primary-color;
        width: max-content;
      }

      span {
        transform: rotate(0deg);
        transition-duration: 0.3s;
        color: $primary-color;
        display: flex;
      }
    }

    &.toggle {
      span {
        transition-duration: 0.3s;
        transform: rotate(180deg);
      }

      .item-in-dropdown {
        opacity: 1;
        animation: dropdownY 400ms ease-in-out forwards;
        transform-origin: top center;
        visibility: visible;
      }
    }

    .item-in-dropdown {
      background-color: darken($background-section-color, 5%);
      padding-top: 1rem;
      padding-bottom: 1rem;
      width: 12rem;
      height: max-content;
      display: flex;
      position: absolute;
      flex-direction: column;
      border-radius: 10px;
      top: 95%;
      z-index: -1;
      opacity: 0;
      visibility: hidden;
      justify-content: center;
      align-items: center;
      transition: all 0.2s ease-out;
      gap: 0.5rem;

      .item {
        width: 80%;
        display: flex;
        margin-top: 4px;
        padding: 0.4rem;
        border-radius: 10px;
        justify-content: flex-start;

        a {
          color: rgb(232, 232, 232);
          font-weight: 550;
          font-size: 1.1rem;
          padding: 0 0 0 15px;
          margin: 0;
          text-decoration: none;
        }
      }

      #facebook:hover {
        background-color: #4267b2;
        cursor: pointer;

        a {
          color: $primary-color;
          text-shadow: 1px 1px 8px $primary-color;
        }
      }

      #shopee:hover {
        background-color: #ee4d2d;
        cursor: pointer;

        a {
          color: $primary-color;
          text-shadow: 1px 1px 8px $primary-color;
        }
      }

      #lazada:hover {
        background-color: #000083;
        cursor: pointer;

        a {
          color: $primary-color;
          text-shadow: 1px 1px 8px $primary-color;
        }
      }
    }
  }
}

@media only screen and (max-width: 992px) {
  .navigation-bar {
    justify-content: space-between;

    .logo {
      margin-left: 2rem;
    }

    .item-in-nuxt-link {
      margin-right: 2rem;
      width: 60%;
      justify-content: center;
      flex: 1;

      .item {
        margin: 0% 1rem 0% 1rem;
      }
    }
    .dropdown {
      margin-right: 1rem;
    }
  }
}
</style>
