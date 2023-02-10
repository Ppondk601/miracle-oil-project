<template>
  <div class="product-manage-container">
    <sidebar />
    <div class="main-content">
      <div class="header">
        <div class="title">
          <h4>สินค้าภายในร้าน</h4>
        </div>
        <div class="add function">
          <button class="button--delete" @click="toggleModal">
            <icon>add_circle</icon>
            เพิ่มสินค้า
          </button>
        </div>
      </div>
      <div class="card-box">
        <div
          class="card product"
          v-for="product in this.$store.state.products"
          :key="product.id"
        >
          <div class="picture">
            <img :src="product.image.url" width="150px" />
          </div>
          <div class="name">
            <p>{{ product.name }}</p>
          </div>
          <button class="button--icon" @click="toggleUpdateData(product.id)">
            <icon>edit</icon>
            แก้ไขข้อมูล
          </button>
        </div>
      </div>
    </div>
    <!-- modal-form-add-data -->
    <modal ref="modal-add-product">
      <form @submit.prevent="confirmAdd">
        <div class="form add-data">
          <div class="header-form">
            <h2>เพิ่มข้อมูลสินค้าของคุณ</h2>
          </div>
          <div class="box-input">
            <div class="item-input">
              <div class="input-title name">
                <p>ชื่อสินค้า</p>
              </div>
              <input name="name" type="text" />
            </div>
            <div class="item-input">
              <div class="input-title url">
                <p>ลิงก์ร้านค้า</p>
              </div>
              <input name="url" type="url" />
            </div>
            <div class="item-input image">
              <div class="input-title">
                <p>อัพโหลดรูปภาพ</p>
              </div>
              <input
                name="image"
                type="file"
                accept="image/jpeg,image/png"
                @change="objectToUrl"
              />
              <div class="preview">
                <img :src="previewUrl" width="120px" />
              </div>
            </div>
          </div>
          <div class="decide-button">
            <button class="button--confirm">ยืนยัน</button>
            <button
              class="button--delete"
              @click="$refs['modal-add-product'].$el.classList.remove('active')"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </form>
    </modal>
    <!-- modal-update-data -->
    <div v-if="$fetchState.pending">"LOADING"</div>
    <modal ref="modal-update-data">
      <form v-if="productTemp.edit">
        <div class="form update-data">
          <div class="header-form">
            <h2>ข้อมูลสินค้าปัจจุบัน</h2>
          </div>
          <div class="current-image">
            <div class="text-title">
              <h4>รูปปัจจุบัน</h4>
            </div>
            <img src="" />
            <div class="text-title"><p>อัพโหลดรูปภาพใหม่</p></div>
            <input type="file" name="update-image" />
          </div>
          <div class="current-name">
            <div class="text-title">
              <h4>แก้ไขชื่อสินค้า</h4>
              <input type="text" name="name" v-model="productTemp.edit.name" />
            </div>
          </div>
          <div class="current-url">
            <div class="text-title">
              <h4>แก้ไขลิงก์ร้านค้า</h4>
            </div>
            <input type="url" name="url" v-model="productTemp.edit.url" />
          </div>
          <div class="confirm-cancle">
            <button class="button--confirm">ยืนยันการแก้ไข</button>
            <button class="button--delete">ยกเลิก</button>
          </div>
        </div>
        <div class="delete-product">
          <button class="button--delete" @click.prevent="removeProduct">
            ลบสินค้าออกจากคลัง
          </button>
        </div>
      </form>
    </modal>
  </div>
</template>

<script>
import { db, storage } from "~/plugins/firebase/index.js";
import { deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";

export default {
  data() {
    return {
      previewUrl: "",
      productId: "",
      productTemp: {
        edit: undefined,
        backup: null,
      },
    };
  },
  async fetch() {
    try {
      await this.$store.dispatch("fetchProduct");
    } catch (error) {
      alert("error");
    }
  },
  methods: {
    toggleModal() {
      this.$refs["modal-add-product"].$el.classList.add("active");
    },
    toggleUpdateData(id) {
      // this.productId = id;
      // this.$store.commit("clickedId", id);
      this.productTemp.edit = JSON.parse(
        JSON.stringify(this.$store.state.products.find((el) => el.id === id))
      );
      console.log("Edit", this.productTemp.edit);
      this.productTemp.backup = JSON.parse(
        JSON.stringify(this.$store.state.products.find((el) => el.id === id))
      );
      console.log("Backup", this.productTemp.backup);
      this.$refs["modal-update-data"].$el.classList.add("active");
    },

    async confirmAdd(e) {
      let fd = new FormData(e.target);
      if (fd.get("image").size > 500_000) {
        alert("รูปของคุณใหญ่เกินไป");
        return;
      }
      try {
        const productId = uuidv4();
        const imageRef = `/products/${fd.get("name")}_${productId}.jpeg`;
        const storageRef = ref(storage, imageRef);
        let uploadResult = await uploadBytes(storageRef, fd.get("image"));
        let downloadUrl = await getDownloadURL(uploadResult.ref);
        const productRef = doc(db, "products", productId);
        let uploadingData = {
          id: productId,
          name: fd.get("name"),
          url: fd.get("url"),
          image: {
            path: imageRef,
            url: downloadUrl,
          },
          createAt: Timestamp.now(),
        };
        await setDoc(productRef, uploadingData);
        this.$store.commit("pushProduct", uploadingData);
        e.target.reset();
        this.previewUrl = "";
      } catch (error) {
        alert("error");
      }
    },
    objectToUrl(e) {
      this.previewUrl = URL.createObjectURL(e.target.files[0]);
    },
    async removeProduct() {
      try {
        console.log(this.productTemp.edit.id);
        await deleteDoc(doc(db, "products", this.productTemp.edit.id));
        await deleteObject(ref(storage, this.productTemp.edit.image.path));
        this.$store.commit("removeProduct", this.productTemp.edit.id);
        this.$refs["modal-update-data"].$el.classList.remove("active");
        alert("ลบสำเรด");
      } catch (error) {
        alert("error");
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.product-manage-container {
  display: flex;
  flex-direction: row;
  width: max-content;
  height: max-content;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  form {
    border: 1px solid white;
    background-color: #fff;
    width: 70vw;
    height: 80vh;
    border-radius: 10px;
    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 1.5rem;
      gap: 2.5rem;
      .box-input {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: max-content;
        height: max-content;
        align-items: center;
        width: 80%;
        .item-input {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: center;
          &.image {
            display: flex;
            flex-direction: column;
            border: 1px solid black;
            gap: 1rem;
            justify-content: center;
            align-items: center;
            .input-title {
              margin-top: 1rem;
              width: 20%;
              display: flex;
              justify-content: center;
            }
            input {
              border: none;
              margin-left: 60%;
            }
            .preview {
              margin-bottom: 1rem;
            }
          }
          .input-title {
            background: #e1e1e1;
            padding: 0.7rem;
            border-radius: 5px;
            p {
              font-weight: 600;
            }
          }
          input {
            margin-left: 1rem;
            border: 1px solid black;
            width: 80%;
            height: 100%;
          }
        }
      }
    }
  }
  .main-content {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    width: max-content;
    height: max-content;
    align-items: center;
    margin-left: 2rem;

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 1rem;
      justify-content: space-between;
      width: 90%;

      .title {
        background-color: #fad03af1;
        width: 10rem;
        height: 3rem;
        align-items: center;
        display: flex;
        justify-content: center;
        box-shadow: 3px 3px 5px rgb(68, 68, 68);
        border-radius: 5px;
        h4 {
          color: white;
          text-shadow: 1px 1px 2px black;
        }
      }
    }
    .card-box {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: auto;
      margin: 1rem;

      .card {
        display: flex;
        flex-direction: column;
        width: 15vw;
        border: 1px solid red;
        height: 35vh;
        padding: 1rem;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        gap: 1rem;
        margin: 1rem;
      }
    }
  }
}
</style>
