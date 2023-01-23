<template>
  <div class="store-container" id="contain">
    <!-- header-section -->
    <div class="header-store"><h1>สินค้าของเรา</h1></div>
    <!-- main-content -->
    <div class="card">
      <div v-for="(item, i) in products" :key="i" class="image-card">
        <div class="backdrop"></div>
        <div class="filter"></div>
        <img :src="item.img" />
        <div class="title-wrapper">
          <div class="title">
            <h3>{{ item.name }}</h3>
            <div class="quantity">
              <p>สินค้าทั้งหมด {{ item.amount }} ชนิด</p>
            </div>
            <button
              class="button--store animate__animated animate__bounceIn"
              @click="clickStore"
            >
              <icon>shopping_bag</icon>
              <p>เลือกซื้อ</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "site",
  data() {
    return {
      products: [
        {
          name: "น้ำมันเหลือง",
          amount: 2,
          link: "",
          img: "https://firebasestorage.googleapis.com/v0/b/miracle-oil-store.appspot.com/o/251785899_197893525822136_6015640979506909459_n.jpg?alt=media&token=81e302cc-d09b-49ba-9de9-4b846a57e8e3",
        },
        {
          name: "สบู่โมจิ",
          amount: 4,
          link: "",
          img: "https://cf.shopee.co.th/file/12a9908f6ee8c739f6a12e1164022491",
        },
        {
          name: "Coming soon..",
          amount: 0,
          link: "",
          img: "https://static.vecteezy.com/system/resources/previews/004/243/615/original/creative-coming-soon-teaser-background-free-vector.jpg",
        },
        {
          name: "Coming soon..",
          amount: 0,
          link: "",
          img: "https://static.vecteezy.com/system/resources/previews/004/243/615/original/creative-coming-soon-teaser-background-free-vector.jpg",
        },
        {
          name: "Coming soon..",
          amount: 0,
          link: "",
          img: "https://static.vecteezy.com/system/resources/previews/004/243/615/original/creative-coming-soon-teaser-background-free-vector.jpg",
        },
        {
          name: "Coming soon..",
          amount: 0,
          link: "",
          img: "https://static.vecteezy.com/system/resources/previews/004/243/615/original/creative-coming-soon-teaser-background-free-vector.jpg",
        },
      ],
    };
  },
  methods: {
    clickStore() {
      alert("coming..soon");
    },
  },
};
</script>

<style lang="scss" scoped>
.store-container {
  width: max-content;
  height: max-content;
  display: flex;
  flex-direction: column;
  .header-store {
    margin-top: 5rem;
    display: flex;
    justify-content: center;
    width: 100vw;
    h1 {
      border-bottom: 2px solid black;
      padding-bottom: 5px;
    }
  }
  .card {
    height: max-content;
    justify-content: center;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 2rem;
    margin-top: 2rem;
    .image-card {
      display: inline-block;
      aspect-ratio: 1/1;
      width: 420px;
      overflow: hidden;
      position: relative;
      margin: 10px;
      transition: margin 0.4s ease-in-out;
      img {
        width: 100%;
        height: 100%;
        transition: transform 0.4s ease-in-out;
      }
      .backdrop {
        opacity: 1;
        display: inline-block;
        aspect-ratio: 1/1;
        width: 420px;
        position: absolute;
        background-color: rgba(19, 19, 19, 0.5);
        z-index: 4;
      }
      .filter {
        position: absolute;
        inset: 0;
        background-color: white;
        backdrop-filter: saturate(0);
        opacity: 1;
        mix-blend-mode: color;
        z-index: 1;
        pointer-events: none;
      }
      .title-wrapper {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .title {
          display: flex;
          flex-direction: column;
          position: absolute;
          align-items: center;
          transform: translateY(30px);
          gap: 0.5rem;
          transition: margin 0.4s ease-in-out;
          z-index: 10;
          h3 {
            color: $primary-color;
            font-weight: 500;
          }
          .quantity {
            opacity: 0;
            transition: margin 0.4s ease-in-out;
            p {
              color: $primary-color;
            }
          }
          button {
            display: none;
            transition: margin 0.4s ease-in-out;
          }
        }
      }
    }
    .image-card:hover {
      transition: margin 0.4s ease-in-out;

      img {
        transform: scale(1.2);
        transition: transform 0.4s ease-in-out;
      }
      .backdrop {
        background-color: rgba(19, 19, 19, 0.2);
        transition: background-color 0.4s;
      }
      .filter {
        opacity: 0;
        backdrop-filter: blur(2px);
      }
      .title {
        border-radius: 10px;
        padding: 20px 16px;
        background-color: rgba(0, 0, 0, 0.525);
        transform: translateY(0);
        transition: transform 0.4s ease-in-out;
        backdrop-filter: blur(5px);
        h3 {
          // text-shadow: 1px 1px 5px $primary-color;
          color: $primary-color;
        }
        .quantity {
          opacity: 1;
          transition: opacity 0.4s ease-in-out;
          p {
            color: $primary-color;
          }
        }
        button {
          display: flex;
          transition: margin 0.4s ease-in-out;
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .store-container {
    // .header {
    //   &.normal {
    //     visibility: hidden;
    //   }
    //   &.mobile {
    //     visibility: visible;
    //   }
    // }
    .card {
      .image-card {
        width: 300px;
        .title {
          position: relative;
          top: -150px;
          left: 0px;
          .quantity {
            opacity: 1;
          }
          button {
            opacity: 1;
          }
        }
      }
      .image-card:hover {
        transition: margin 0s ease-in-out;

        img {
          transform: scale(1);
          transition: transform 0s ease-in-out;
        }
        .backdrop {
          background-color: rgba(19, 19, 19, 0.5);
          transition: background-color 0.4s;
        }
        .title {
          margin-top: -50px;
          .quantity {
            opacity: 1;
            transition: opacity 0.4s ease-in-out;
          }
          button {
            opacity: 1;
            transition: margin 0.4s ease-in-out;
          }
        }
      }
    }
  }
}
</style>
