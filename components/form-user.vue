<template>
  <div class="form-contact">
    <div class="header-form"></div>

    <form @submit.prevent="sendMessage">
      <h4>ชื่อจริง</h4>
      <input
        type="text"
        placeholder=" กรุณาใส่ชื่อของคุณ"
        class="name"
        :class="checkUsername"
        v-model="username"
        required
      />
      <h4>อีเมลล์</h4>

      <input
        type="text"
        placeholder=" ใส่อีเมลล์ของคุณ เช่น '-miracle-oil@gmail.com' "
        class="email"
        :class="checkEmail"
        v-model="email"
        required
      />
      <h4>เบอร์โทรศัพท์</h4>
      <input
        type="text"
        @keypress="isNumber($event)"
        placeholder=" ใส่เบอร์โทรศัพท์ที่ติดต่อได้ของคุณ เช่น '081-xxx-xxxx' "
        class="phone"
        :class="checkTel"
        v-model="phoneNumber"
        maxlength="10"
        required
      />
      <h4>ติดต่อในเรื่องใด</h4>
      <input
        type="text"
        placeholder=" สนใจในด้านใด เช่น 'สนใจเป็นตัวแทนจำหน่าย' "
        :class="checkInterest"
        class="interest"
        v-model="interesting"
        required
      />
      <h4>ข้อความ</h4>
      <textarea
        cols="50"
        rows="10"
        type="text"
        class="comment"
        v-model="comment"
        :class="checkComment"
        required
      ></textarea>

      <button type="submit" class="button">ส่งความคิดเห็น</button>
    </form>
  </div>
</template>

<script>
const regEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
const regTelephone = /^(0[689]{1})+([0-9]{8})+$/;
import { db } from "~/plugins/firebase/index.js";
import {
  doc,
  getDoc,
  setDoc,
  Timestamp,
  docRef,
  collection,
} from "firebase/firestore";
export default {
  data() {
    return {
      username: "",
      email: "",
      phoneNumber: "",
      interesting: "",
      comment: "",
      userInput: [],
      regEmail:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      regTelephone: /^(0[689]{1})+([0-9]{8})+$/,
    };
  },
  async fetch() {
    await setDoc(doc(db, "comment", "user"), {
      name: "poramin",
      tel: "0950725914",
      email: "poramink601@gmail.com",
    });
  },
  computed: {
    checkUsername() {
      let resultUsername = this.username.length >= 2;
      if (this.username === "") {
        return "empty";
      } else if (resultUsername) {
        return "pass";
      } else {
        return "fail";
      }
    },
    checkEmail() {
      let resultEmail = this.regEmail.test(this.email);
      if (this.email === "") {
        return "empty";
      } else if (resultEmail) {
        return "pass";
      } else {
        return "fail";
      }
    },
    checkTel() {
      let resultTel = this.regTelephone.test(this.phoneNumber);
      if (this.phoneNumber === "") {
        return "empty";
      } else if (resultTel) {
        return "pass";
      } else {
        return "fail";
      }
    },
    checkInterest() {
      let resultInterest = this.interesting.length >= 3;
      if (this.interesting === "") {
        return "empty";
      } else if (resultInterest) {
        return "pass";
      } else {
        return "fail";
      }
    },
    checkComment() {
      let resultComment = this.comment.length >= 5;
      if (this.comment === "") {
        return "empty";
      } else if (resultComment) {
        return "pass";
      } else {
        return "fail";
      }
    },
  },
  methods: {
    sendMessage() {
      if (this.checkUsername && this.checkEmail === "pass") {
        this.userInput.push({
          userName: this.username,
          userEmail: this.email,
          userNumber: this.phoneNumber,
          userInterest: this.interesting,
          userComment: this.comment,
        });
        this.username = "";
        this.email = "";
        this.phoneNumber = "";
        this.interesting = "";
        this.comment = "";
      } else {
        console.log(this.checkUsername);
        console.log(this.checkEmail);
        alert("โปรดกรอกข้อมูลให้ครบ");
      }
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt;
      } else {
        return true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100vw;
  justify-content: center;
  align-items: center;
  .name {
    &.empty {
      background-color: #fff;
    }
    &.fail {
      background-color: rgb(251, 131, 131);
      box-shadow: 0px 0px 5px rgb(253, 109, 109);
    }
    &.pass {
      background-color: rgb(168, 255, 168);
      box-shadow: 0px 0px 5px rgb(168, 255, 168);
    }
  }
  .email {
    &.empty {
      background-color: #fff;
    }
    &.fail {
      background-color: rgb(251, 131, 131);
      box-shadow: 0px 0px 5px rgb(253, 109, 109);
    }
    &.pass {
      background-color: rgb(168, 255, 168);
      box-shadow: 0px 0px 5px rgb(168, 255, 168);
    }
  }
  .phone {
    &.empty {
      background-color: #fff;
    }
    &.fail {
      background-color: rgb(251, 131, 131);
      box-shadow: 0px 0px 5px rgb(253, 109, 109);
    }
    &.pass {
      background-color: rgb(168, 255, 168);
      box-shadow: 0px 0px 5px rgb(168, 255, 168);
    }
  }
  .interest {
    &.empty {
      background-color: $primary-color;
    }
    &.fail {
      background-color: rgb(251, 131, 131);
      box-shadow: 0px 0px 5px rgb(253, 109, 109);
    }
    &.pass {
      background-color: rgb(168, 255, 168);
      box-shadow: 0px 0px 5px rgb(168, 255, 168);
    }
  }
  h4 {
    color: $primary-color;
  }
  .comment {
    &.empty {
      background-color: $primary-color;
    }
    &.fail {
      background-color: rgb(251, 131, 131);
      box-shadow: 0px 0px 5px rgb(253, 109, 109);
    }
    &.pass {
      background-color: rgb(168, 255, 168);
      box-shadow: 0px 0px 5px rgb(168, 255, 168);
    }
  }
  textarea {
    border-radius: 5px;
  }
}
@media only screen and (max-width: 768px) {
  textarea {
    width: 80%;
  }
}
</style>
