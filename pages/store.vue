<template>
  <div class="store-container">
    <!-- header -->
    <div class="header normal">
      <newNavbar />
    </div>
    <div class="header mobile">
      <mobile-nav />
    </div>
    <!-- main-content -->
    <div class="header-store"><h1>สินค้าของเรา</h1></div>
    <div class="card">
      <div v-for="item in product" :key="item" class="image-card">
        <div class="backdrop"></div>
        <img :src="item.img" />
        <div class="title">
          <h3>{{ item.name }}</h3>
          <div class="quantity">
            <p>สินค้าทั้งหมด {{ item.amount }} ชนิด</p>
          </div>
          <button class="button--store" @click="clickStore">
            <p>เลือกซื้อ</p>
          </button>
        </div>
      </div>
    </div>
    <!-- footer -->
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: [
        {
          name: "น้ำมันเหลือง",
          amount: 2,
          link: "",
          img: "https://scontent.fbkk28-1.fna.fbcdn.net/v/t39.30808-6/251785899_197893525822136_6015640979506909459_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=NT8TYPB1k7cAX-I_3b0&_nc_pt=1&_nc_ht=scontent.fbkk28-1.fna&oh=00_AfDTTM9E8YzVJQt4XbsS2fJ69ATFk_Q2Vm1nvPuZGkRKzg&oe=63B5FCE9",
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
  .header {
    z-index: 999;
    transition: top 0.3s;
    position: fixed;
    &.mobile {
      visibility: hidden;
    }
  }
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
      }
      .title {
        display: flex;
        flex-direction: column;
        position: absolute;
        align-items: center;
        gap: 5px;
        top: 265px;
        left: 150px;
        transition: margin 0.4s ease-in-out;
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
          opacity: 0;
          transition: margin 0.4s ease-in-out;
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
@media only screen and (max-width: 768px) {
  .store-container {
    .header {
      &.normal {
        visibility: hidden;
      }
      &.mobile {
        visibility: visible;
      }
    }
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
