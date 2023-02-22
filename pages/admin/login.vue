<template>
  <div class="login-form">
    <form @submit.prevent="userLogin(username, password)">
      <div class="user email">
        <h4>อีเมลล์</h4>
        <div class="form__input">
          <div class="box__icon"><icon>account_circle</icon></div>

          <input type="text" name="username" v-model="username" />
        </div>
      </div>
      <div class="user password">
        <h4>พาสเวิร์ด</h4>
        <div class="form__input">
          <div class="box__icon"><icon>lock</icon></div>
          <input type="password" name="password" v-model="password" />
        </div>
      </div>
      <button class="button">ลงชื่อเข้าใช้</button>
    </form>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "~/plugins/firebase/index";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async userLogin(username, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          username,
          password
        );
        const user = userCredential.user;
        console.log(user)
        this.$store.commit("user/setUser", {
          id: user.uid,
          email: user.email,
          displayName : user.displayName,
          image : user.photoURL
  
        });
        this.$router.push("/admin/product-manage");
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  form {
    max-width:90vw;
    display: flex;
    flex-direction: column;
    width: 35rem;
    height: 22rem;
    border: 1px solid black;
    align-items: center;
    gap: 2rem;
    justify-content: center;
    background: rgba(255, 255, 255, 0.11);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.205);
    // box-shadow: inset 0 0 5px 5px #888;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    .user {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      gap:1rem;
      h4{
        color:white;
        text-shadow: 0px 0px 3px rgb(57, 57, 57);
      }
      .form__input {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 70%;
        .box__icon {
          background-color: #8ec5fc;
          padding: 0.3rem 0.5rem;
        
        }
        input {
          background-color:darken($primary-color,2%);
          padding: 0.62rem;
          width: 100%;
          border-radius: 0;
        }
      }
    }
    button{
      background-color: #ffffffd2;
      color:rgb(45, 45, 45);
    }
  }
}
</style>
