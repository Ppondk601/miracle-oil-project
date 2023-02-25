<template>
  <div class="comment-container">
    <modal ref="modal-confirm-remove">
      <div class="box-submit">
        <h3>ยืนยันที่จะลบใช่หรือไม่?</h3>
        <div class="decide-button">
          <button class="button confirm" @click="removeComment">ยืนยัน</button>
          <button
            class="button cancle"
            @click="
              $refs['modal-confirm-remove'].$el.classList.remove('active')
            "
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </modal>
    <!-- sidebar -->
    <sidebar />
    <!-- content all commment -->
    <div v-if="$fetchState.pending">"LOADING"</div>
    <div class="current-comment" v-else>
      <!-- header -->
      <div class="header">
        <h2>ข้อความทั้งหมดภายในกล่องข้อความ</h2>
      </div>
      <!-- inbox-comment -->
      <div class="wrapper-comment">
        <div class="inbox-title">
          <div class="tool">
            <div class="amount">
              <span><icon>inbox</icon></span>
              <h4>ข้อความทั้งหมด:</h4>
              <p>{{ this.$store.getters.sizeOfComment }}</p>
            </div>
            <button
              :disabled="checkboxIds.length === 0"
              class="remove"
              @click="$refs['modal-confirm-remove'].$el.classList.add('active')"
            >
              <p>ลบข้อความ</p>
              <span><icon>delete</icon></span>
            </button>
          </div>
          <div
            class="user-comment"
            v-for="message in this.$store.state.comments"
            :key="message.id"
            @click="clickForToggleId(message.id)"
              :class="{ chosen: message.id === uid }"
          >
            <input type="checkbox" @click="checkboxSelected(message.id)" />
            <div
              class="all-message"
              
            >
              <div class="message name">
                <p>{{ message.userName }}</p>
              </div>
              <div class="message interest">
                <p>{{ message.userInterest }}</p>
              </div>
              <div class="message comment">
                <p>{{ message.userComment }}</p>
              </div>
              <div class="message timestamp">
                <p>วันที่:{{ setTimestamp(message.currentTime) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="full-comment" v-if="uid !== ''">
          <div class="active">
            <div class="author">
              <span><icon>face</icon></span>
              <p>
                ชื่อผู้เขียนข้อความ :
                {{ this.$store.getters.checkId(uid).userName }}
              </p>
            </div>
            <div class="box-detail">
              <div class="detail">
                <div class="title tel">
                  <span><icon>smartphone</icon></span>
                  <p>เบอร์โทรศัพท์</p>
                </div>
                <div class="reply tel">
                  <p>{{ this.$store.getters.checkId(uid).userNumber }}</p>
                </div>
              </div>
              <div class="detail">
                <div class="title email">
                  <span><icon>email</icon></span>
                  <p>อีเมลล์</p>
                </div>
                <div class="reply email">
                  <p>{{ this.$store.getters.checkId(uid).userEmail }}</p>
                </div>
              </div>
              <div class="detail">
                <div class="title interest">
                  <span><icon>interests</icon></span>
                  <p>ความสนใจของลูกค้า</p>
                </div>
                <div class="reply interest">
                  <p>{{ this.$store.getters.checkId(uid).userInterest }}</p>
                </div>
              </div>
              <div class="box-message">
                <div class="title-comment">
                  <span><icon>chat</icon></span>
                  <p>ความคิดเห็น</p>
                </div>
                <div class="reply-comment">
                  <p>{{ this.$store.getters.checkId(uid).userComment }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase/index.js";
import {
  getDocs,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  docRef,
  collection,
  writeBatch,
} from "firebase/firestore";
export default {
  data() {
    return {
      uid: "",
      activate: "",
      checkboxIds: [],
      size: "",
    };
  },
  middleware(context) {
    if (context.store.state.user.id == "") {
      context.redirect("/admin/login");
    }
  },
  async fetch() {
    try {
      this.$store.dispatch("fetch");
    } catch (error) {
      alert("error");
    }
  },
  methods: {
    clickForToggleId(id) {
      this.uid = id;
      this.$store.commit("clickId", id); //this.$store.commit(/nestfile/)
    },
    checkboxSelected(id) {
      if (!this.checkboxIds.includes(id)) {
        this.checkboxIds.push(id);
      } else {
        this.checkboxIds.splice(this.checkboxIds.indexOf(id), 1);
      }
      console.log(this.checkboxIds);
    },
    setTimestamp(timestamp){
      let date = new Date(timestamp.seconds*1000)
      return date.toLocaleString("th-th", {
        dateStyle: "short",
      });
    },
    async removeComment() {
      let ids = this.checkboxIds;
      let batch = writeBatch(db);
      ids.forEach((checkboxId) => {
        let docRef = doc(db, "messageFromUser", checkboxId);
        batch.delete(docRef);
      });
      try {
        await batch.commit();
        this.$store.commit("removeComments", ids);
        console.log(batch);
      } catch (error) {
        console.error("Error", error);
      }
      this.$refs["modal-confirm-remove"].$el.classList.remove("active");
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  .modal {
    .box-submit {
      display: flex;
      flex-direction: column;
      padding: 4rem;
      border-radius: 10px;
      justify-content: center;
      align-items: center;
      border: 1px solid black;
      background-color: $primary-color;
      gap: 2rem;
      .decide-button {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        .button {
          &.confirm {
            background-color: rgb(53, 56, 234);
          }
          &.cancle {
            background-color: red;
          }
        }
      }
    }
  }
  .current-comment {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    .header {
      display:flex;
      width:82vw;
      align-items: center;
      justify-content: center;
      height: 10vh;
      background-color: #fff;
    }
    .wrapper-comment {
      display: flex;
      flex-wrap: wrap;
      width: 100vw;
      height: 100vh;
      max-height: 100vh;
      overflow-y: scroll;
      overflow-x:hidden;
      .inbox-title {
        height: 90vh;
        width: 82vw;
        background: rgb(221, 224, 237);
        background: linear-gradient(
          176deg,
          rgba(221, 224, 237, 1) 0%,
          rgba(221, 224, 237, 1) 44%,
          rgba(246, 246, 250, 1) 100%
        );
        display: flex;
        flex-direction: column;
        align-items: center;
        .tool {
          padding:1rem 2rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: lighten($secondary-color, 5%);
          .amount {
            display: flex;
            justify-content: center;
            align-items: center;
            gap:.5rem;
            span{
              color:$primary-color;
            }
            h4 {
              color: $primary-color;
            }
            p {
              aspect-ratio: 1/1;
              width: 25px;
              height: 25px;
              background-color: darken($accent-color, 10%);
              box-shadow: 2px 2px 5px $secondary-color;
              margin-left: 5px;
              border-radius: 999px;
              display: flex;
              justify-content: center;
              align-items: center;
              color: white;
            }
          }
          .remove {
            display: flex;
            align-items: center;
            width: 8rem;
            height: 2.5rem;
            justify-content: center;
            border-radius: 5px;
            background-color: $delete-color;
            border: none;
            cursor: pointer;
            &:disabled {
              opacity: 0.5;
              pointer-events: none;
            }
            &:hover {
              background-color: darken($delete-color, 20%);
            }
            p {
              color: white;
              font-weight: 600;
            }
            span {
              color: white;
            }
          }
        }
        .user-comment {
          display: flex;
          width: 100%;
          background-color: #ffffffc5;
          padding:0.5rem;
          border-bottom:0.5px solid rgb(176, 176, 176);
          input {
            display: flex;
            margin-top: 0.5rem;
            margin-left:2rem;
            width: 20px;
            height: 20px;
          }
          .all-message {
            display: flex;
            width: 100%;
            height: 2.5rem;
            gap:2rem;
            justify-content: space-evenly;
            align-items: center;
            cursor: pointer;
            .message{
              &.name{
                width:20%;
                p{
                  font-weight: 600;
                  font-size: 1.2rem;
                }
              }
              &.interest{
                width:20%;
                p{
                  font-weight: 500;
                  color: rgb(54, 54, 54);
                }
              }
              &.comment{
                width:20%;
                p{
                  color:rgb(95, 95, 95);
                }
              }
              &.timestamp{
                width:20%;
                p{
                  font-weight: 600;
                }
              }
            }
          }
          &.chosen {
            background-color: lighten(#a9a9a9,8%);
            p {
              color: $secondary-color;
              font-weight: 600;
            }
          }
        }
      }
      .full-comment {
        display: flex;
        flex-direction: column;
        width: max-content;
        height: max-content;
        margin-left: 2.5rem;
        .author {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          width: 40vw;
          background-color: #263147;
          height: 3rem;
          border-radius: 5px;
          margin-bottom: 1rem;
          span {
            color: $primary-color;
          }
          p {
            color: $primary-color;
            font-weight: bold;
          }
        }
        .box-detail {
          display: flex;
          flex-direction: column;
          height: max-content;
          width: max-content;
          background-color: #6787b8;
          padding: 1rem 1rem 1rem 0rem;
          gap: 1rem;
          border-radius: 5px;
          .detail {
            display: flex;
            flex-direction: row;
            gap: 1rem;
            .title {
              display: flex;
              flex-direction: row;
              background-color: darken($primary-color, 2%);
              width: 12vw;
              height: 2.5rem;
              border-radius: 5px;
              gap: 0.5rem;
              margin-left: 1rem;
              align-items: center;
              span {
                margin-left: 0.4rem;
                color: darken($primary-color, 60%);
              }
              p {
                font-weight: 600;
              }
            }
            .reply {
              display: flex;
              flex-direction: row;
              background-color: #85e249;
              border-radius: 5px;
              width: 30vw;
              align-items: center;
              p {
                margin-left: 1rem;
                color: black;
                font-weight: 600;
              }
            }
          }
          .box-message {
            display: flex;
            flex-direction: column;
            width: max-content;
            height: max-content;
            gap: 1rem;
            align-items: center;
            .title-comment {
              display: flex;
              flex-direction: row;
              background-color: darken($primary-color, 2%);
              width: 12vw;
              height: 2.5rem;
              border-radius: 5px;
              gap: 0.5rem;
              margin-left: 1rem;
              align-items: center;
              p {
                font-weight: 600;
              }
              span {
                color: darken($primary-color, 60%);
                margin-left: 0.5rem;
              }
            }
            .reply-comment {
              display: flex;
              flex-direction: row;
              background-color: #85e249;
              border-radius: 5px;
              width: 43vw;
              padding: 1rem;
              height: 20vh;
              margin-left: 1rem;
            }
          }
        }
      }
    }
  }
}
</style>
