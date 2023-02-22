<template>
  <div class="product-manage-container">
    <div class="sidebar">
      <sidebar />
    </div>
    <div class="main-content">
      <div class="header">
        <div class="title">
          <h4>สินค้าภายในร้าน</h4>
        </div>
        <div class="add function">
          <button class="button--delete" @click="toggleModal" style="opacity:0">
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
          <div class="create-time">
            <p>สร้างเมื่อ : วันที่ {{  convertTimestamp(product.createAt) }}</p>
          </div>
          <div class="name">
            <h4>{{ product.name }}</h4>
          </div>
          <div class="edit-product" @click="toggleUpdateData(product.id)">
            <icon>edit</icon>
            <p>แก้ไขข้อมูล</p>
          </div>
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
              @click.prevent="
                $refs['modal-add-product'].$el.classList.remove('active')
              "
              บัค
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
  middleware(context) {
    if (context.store.state.user.id == "") {
      context.redirect("/admin/login");
    }
  },
  methods: {
    toggleModal() {
      this.$refs["modal-add-product"].$el.classList.add("active");
    },
    convertTimestamp(timestamp) {
      console.log(timestamp)
      const date =  new Date(timestamp.seconds * 1000)
      return date.toLocaleString('th-th', {
      timeStyle: 'short',
      dateStyle: 'medium',
    }) 
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
        alert("ลบสำเร็จ");
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
  width: 100vw;
  height: 100vh;
  align-items: center;
  overflow-y: hidden;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  .modal {
    form {
      display: flex;
      .form {
        width: 100%;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin: 0;
        .header-form {
          padding: 1rem;
          border-radius: 10px;
          background-color: #ab57f9d1;
          h2 {
            color: white;
          }
        }
        .box-input {
          .item-input {
            .input-title {
              background-color: #64aef9;
              p {
                color: white;
              }
            }
          }
        }
      }
    }
  }
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
    width: 72vw;
    height: 95vh;
    align-items: center;
    margin-left: 2rem;
    background: rgba(255, 255, 255, 0.825);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border-radius: 10px 10px 0px 0px;
      background-color: #ab57f9d1;
      padding: 1rem;
      margin-bottom: 2rem;
      .title {
        margin-left: 5rem;
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
      .add {
        margin-right: 5rem;
        button {
          display: flex;
          padding: 0.5rem 2rem;
          gap: 0.5rem;
        }
      }
    }
    .card-box {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
      gap: 1rem;
      width: 90%;
      align-items: center;
      overflow-y: scroll;
      overflow-x: hidden;
      padding: 0.5rem;
      .card {
        display: flex;
        flex-direction: column;
        width: 320px;
        height: 400px;
        align-items: center;
        justify-content: space-between;
        border-radius: 10px;
        box-shadow: 1px 1px 10px rgba(45, 45, 45, 0.399);
        gap: 1rem;
        .picture {
          display: flex;
          width: 100%;
          height: 220px;
          justify-content: center;

          img {
            width: 100%;
            border-radius: 10px 10px 0px 0px;
            object-fit: cover;
          }
        }
        .create-time {
          p {
            color: #eb0565;
          }
        }
        .name {
          display: flex;
          width: 100%;
          justify-content: center;
          h4 {
            font-weight: 600;
          }
        }
        .edit-product {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: center;
          border-radius: 0px 0px 10px 10px;
          align-items: center;
          height: 50px;
          background-color: #eb0565;
          color: white;
          cursor: pointer;
          p {
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
