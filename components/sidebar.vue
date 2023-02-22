<template>
  <div class="wrapper">
    <!-- sidebar -->
    <div class="sidebar">
      <div class="section-role">
        <!--  -->
        <div class="role-name">
          <div class="admin-name">
            <p>{{ this.$store.state.user.displayName }}</p>
          </div>
          <div class="admin-role">
            <p>{{ this.$store.state.user.role }}</p>
          </div>
        </div>
        <div class="right-icon">
          <div class="icon">
            <span><icon>admin_panel_settings</icon></span>
          </div>
          <div class="image">
            <img :src="$store.state.user.image"/>
          </div>
        </div>
        <!--  -->
      </div>
      <div class="section-content">
        <div class="page comment">
          <div class="inbox">
            <nuxt-link to="comment-manage">
              <a>จัดการคอมเมนต์</a>
            </nuxt-link>
          </div>
          <div class="right-icon">
            <span><icon>markunread_mailbox</icon></span>
          </div>
        </div>
        <div class="page product">
          <div class="inbox">
          <nuxt-link to="product-manage">
            <a>จัดการสินค้าภายในเว็บไซต์</a>
          </nuxt-link>
          </div>
          <div class="right-icon">
            <span><icon>store</icon></span>
          </div>
        </div>
      </div>
      <div class="section-logout">
        <button class="button--delete" @click="logout">ออกจากระบบ</button>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
import { signOut } from "@firebase/auth";
import { auth } from "~/plugins/firebase/index.js";
export default {
  data() {
    return {};
  },
  methods: {
    async logout() {
      await signOut(auth);
      this.$router.push("/admin/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: max-content;
  width: max-content;
  flex-direction: row;
  margin: 1rem;
  height:100%;
  .sidebar {
    display: flex;
    flex-direction: column; //border 0 aspec-radio:unset margin-inline 0 padding-inline 0 width:0 
    width: 20rem;
    height: 95vh;
    justify-content: center;
    align-items:center;
    background: rgba(255, 255, 255, 0.825);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    gap: 2rem;
    .section-role {
      display: flex;
      flex-direction: row;
      width: 80%;
      align-items: center;
      height: 5rem;
      margin-top: 1rem;
      background-color: #ab57f9;
      border-radius: 10px;
      .right-icon {
        display: flex;
        margin:1.5rem;
        width: 10%;
        position:relative;
        .icon{
          position:absolute;
          bottom:0;
          right:5px;
          span {
            color: darken($primary-color, 0%);
          }
        }
        img{
          width:50px;
          height:50px;
          border-radius: 999px;
          border:3px solid white;
        }
      }
      .role-name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left:2rem;
        .admin-name {
          p {
            font-weight: 600;
            font-size:1.3rem;
            color: lighten($primary-color, 10%);
          }
        }
        .admin-role {
          color: darken($primary-color, 5%);
        }
      }
    }
    .section-content {
      width: max-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      width: 100%;
      .page {
        display: flex;
        width: 80%;
        height: 3rem;
        border-radius: 5px;
        align-items: center;
        background-color: darken($primary-color, 50%);
        background-color:#46a2ff;
        .inbox {
          margin: 1rem;
          width: 70%;
          a {
            color: white;
            font-weight: 600;
            text-decoration: none;
          }
        }
        .right-icon {
          display: flex;
          width: 20%;
          span {
            color: $primary-color;
          }
        }
      }
    }
    .section-logout {
      display: flex;
      inset: 0;
      height: 100%;
      align-items: flex-end;
      justify-content: center;
      button {
        margin-bottom: 2rem;
      }
    }
  }
}
</style>
