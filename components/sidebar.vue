<template>
  <div class="wrapper">
    <!-- sidebar -->
    <div class="sidebar">
      <div class="section-role">
        <!--  -->
        <div class="right-icon">
          <div class="icon">
            <span><icon>admin_panel_settings</icon></span>
          </div>
          <div class="image">
            <img :src="$store.state.user.image" />
          </div>
        </div>
        <div class="role-name">
          <div class="admin-name">
            <p>{{ this.$store.state.user.displayName }}</p>
          </div>
          <div class="admin-role">
            <p>{{ this.$store.state.user.role }}</p>
          </div>
        </div>
        <!--  -->
      </div>
      <div class="section-content">
        <div class="page comment">
          <div class="inbox">
            <nuxt-link to="comment-manage" class="route page">
              <a>จัดการคอมเมนต์</a>
              <div class="right-icon">
                <span><icon>markunread_mailbox</icon></span>
              </div>
            </nuxt-link>
          </div>
        </div>
        <div class="page product">
          <div class="inbox">
            <nuxt-link to="product-manage" class="route page">
              <a>จัดการสินค้าภายในเว็บไซต์</a>
              <div class="right-icon">
                <span><icon>store</icon></span>
              </div>
            </nuxt-link>
          </div>
        </div>
        <div class="page main">
          <div class="inbox">
            <div class="route disabled">
              <a>จัดการข้อมูลหน้าหลัก</a>
              <div class="right-icon">
                <span><icon>grade</icon></span>
              </div>
            </div>
          </div>
        </div>
        <div class="page map">
          <div class="inbox">
            <div class="route disabled">
              <a>จัดการแผนที่ลูกค้า</a>
              <div class="right-icon">
                <span><icon>map</icon></span>
              </div>
            </div>
          </div>
        </div>
        <div class="page about">
          <div class="inbox">
            <div class="route disabled">
              <a>จัดการประวัติร้านค้า</a>
              <div class="right-icon">
                <span><icon>history_edu</icon></span>
              </div>
            </div>
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
  height: 100%;
  .sidebar {
    display: flex;
    flex-direction: column; //border 0 aspec-radio:unset margin-inline 0 padding-inline 0 width:0
    width: 20rem;
    min-width:18vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.825);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    // border: 1px solid rgba(255, 255, 255, 0.18);
    gap: 1rem;
    .section-role {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      height:40%;
      margin-top: 1rem;
      gap:1rem;
      .right-icon {
        display: flex;
        justify-content: center;
        margin-top:1rem;
        width: 100%;
        position: relative;
        .icon {
          position: absolute;
          bottom: 0;
          left:180px;
          span {
            color: darken(#ffa200, 0%);
          }
        }
        img {
          width: 120px;
          height: 120px;
          border-radius: 999px;
          border: 3px solid #ffa200;
        }
      }
      .role-name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .admin-name {
          p {
            font-weight: 600;
            font-size: 1.3rem;
            color: lighten($secondary-color, 10%);
          }
        }
        .admin-role {
          color: lighten($secondary-color, 15%);
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
        width: 100%;
        height: 3.5rem;
        align-items: center;
        position:relative;
        .inbox {
          display:flex;
          margin: 1rem;
          width: 100%;
          height:100%;
          margin:0;
          .route {
            padding:1rem;
            width: 100%;
            height: 100%;
            display:flex;
            justify-content: space-between;
            a{
              color:rgb(100, 100, 100);
            }
            .right-icon{
              span{
                color:rgb(100, 100, 100);
              }
            }
            &.disabled{
              align-items: center;
              a{
                color:rgb(190, 190, 190)
              }
              .right-icon{
                span{
                  color:rgb(190, 190, 190)
                }
              }
              &:hover{
                border:none;
                background-color:rgb(245, 245, 245);
                .right-icon{
              span{
                color:rgb(190, 190, 190);
              }
            }
              }
            }
            &:hover{
              border-left:5px solid #ffa200;
            background-color:rgba(195, 195, 195, 0.5);
            a{
              color:black;
            }
            .right-icon{
              span{
                color:#ffa200;
              }
            }
            }
          }
          .nuxt-link-exact-active{
            border-left:5px solid #ffa200;
            background-color:rgba(130, 130, 130, 0.25);
            a{
              color:black;
            }
            .right-icon{
              span{
                color:#ffa200;
              }
            }
          }
          .right-icon {
            display: flex;
            width: 20%;
            span {
              color: $secondary-color;
            }
          }
          a {
            color: $secondary-color;
            font-weight: 600;
            text-decoration: none;
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
