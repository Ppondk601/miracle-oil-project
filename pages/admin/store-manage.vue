<template>
  <div class="store-manage-container">
    <!-- sidebar -->
    <sidebar />
    <!-- menu-bar -->
    <div class="product-list">
      <div class="menu">
        <button class="button--confirm">
          <icon>add_shopping_cart</icon>
          <p>เพิ่มสินค้าใหม่</p>
        </button>
        <button class="button--delete">
          <icon>delete_outline</icon>
          <p>ลบสินค้าในรายการ</p>
        </button>
      </div>
      <div
        class="item-card"
        v-for="product in this.$store.state.products"
        :key="product.id"
      >
        <div class="image">
          <p>demo</p>
        </div>
        <div class="product-name">
          <p>{{ product.name }}</p>
        </div>
        <button class="button">แก้ไขสินค้า</button>
      </div>
    </div>
    <!-- form-add-data -->
    <form @submit.prevent="addNewProduct">
      <div class="header-form">
        <h2>เพิ่มสินค้าที่ต้องการจะขาย</h2>
      </div>
      <div class="input name">
        <div class="title name">
          <p>ชื่อสินค้า</p>
        </div>
        <input name="productName" type="text" />
      </div>
      <div class="input url">
        <div class="title url">
          <p>ลิงก์ของร้านค้า</p>
        </div>
        <input name="url" type="text" />
      </div>
      <div class="input-piture">
        <div class="title picture">
          <p>อัพโหลดรูปภาพ</p>
        </div>
        <input
          name="picture"
          type="file"
          accept="image/jpeg,image/png,image/gif"
          @change="objectToUrl"
        />
        <div class="preview">
          <img :src="previewUrl" width="100px" />
          {{ previewUrl }}
        </div>
      </div>
      <div class="decide-button">
        <button class="button--confirm" type="submit">
          <p>ยืนยัน</p>
        </button>
        <button class="button--delete">
          <p>ยกเลิก</p>
        </button>
      </div>
    </form>
    <!-- form-update-data -->
  </div>
</template>

<script>
import { db, storage } from "~/plugins/firebase/index.js";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { uploadBytes, ref, getDownloadURL } from "@firebase/storage";
export default {
  data() {
    return {
      newProducts: [],
      previewUrl: "",
    };
  },
  async fetch() {
    try {
      this.$store.dispatch("fetchProduct");
    } catch (error) {
      alert("error");
    }
  },
  methods: {
    async addNewProduct(e) {
      let fd = new FormData(e.target);
      // console.log(fd.get("picture"));
      if (fd.get("picture").size > 100_500_000) {
        alert("ใหญ่เบิ้ม");
        return;
      }
      console.log(storage);
      try {
        const productId = uuidv4();
        const storageRef = ref(
          storage,
          `/products/${fd.get("productName")}_${productId}.jpeg`
        );
        let uploadResult = await uploadBytes(storageRef, fd.get("picture"));
        let downloadUrl = await getDownloadURL(uploadResult.ref);
        const productRef = doc(db, "products", productId);
        await setDoc(productRef, {
          id: productId,
          name: fd.get("productName"),
          url: fd.get("url"),
          image: {
            path: `/products/${fd.get("productName")}_${productId}.jpeg`,
            url: downloadUrl,
          },
          createdAt: Timestamp.now(),
          // createdBy: this.$store.state.user.name || "system",
          // updatedAt: Timestamp.now(),
          // updatedBy: this.$store.state.user.name || "system",
        });
        // this.previewUrl = "";
        e.target.reset();
        this.previewUrl = "";
        alert("Upload Complete");
      } catch (error) {
        alert("error");
        console.log(error);
      }
    },
    objectToUrl(e) {
      this.previewUrl = URL.createObjectURL(e.target.files[0]);
    },
  },
};
</script>

<style lang="scss" scoped>
.store-manage-container {
  display: flex;
  flex-direction: row;
  width: max-content;
  height: max-content;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  .product-list {
    height: 30rem;
    width: 25rem;
    margin-left: 2rem;
    border-radius: 15px;
    background-color: #6787b8;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    overflow-y: scroll;
    position: relative;
    .menu {
      height: 4.5rem;
      display: flex;
      justify-content: center;
      flex-direction: row;
      gap: 2.5rem;
      padding: 1rem;
      align-items: center;
      border-radius: 15px 15px 0px 0px;
      background-color: lighten($secondary-color, 5%);
      position: fixed;
      button {
        display: flex;
        flex-direction: row;
        padding: 0.5rem 0.8rem;
        gap: 0.2rem;
        .icon {
          color: white;
        }
        p {
          font-weight: 600;
        }
      }
    }
    .item-card {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 70%;
      height: max-content;
      background-color: #fff;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      margin-bottom: 1rem;
      .image {
        background-color: rgb(202, 202, 202);
        width: 250px;
        height: 120px;
        border-radius: 10px;
        margin-top: 1rem;
      }
      button {
        margin-bottom: 1rem;
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45vw;
    height: max-content;
    border: 1px solid black;
    margin-left: 2.5rem;
    border-radius: 10px;
    gap: 2rem;
    .header-form {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      width: 100%;
      height: 4rem;
    }
    .input {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      input {
        border: 1px solid black;
      }
      p {
        font-weight: 600;
      }
    }
    .decide-button {
      display: flex;
      margin-bottom: 2rem;
      gap: 2rem;
    }
  }
}
</style>
