<template>
  <div class="wrapper">
    <!-- sidebar -->
    <div class="sidebar">
      <div class="section-role">
        <div class="left-icon">
          <span><icon>admin_panel_settings</icon></span>
        </div>
        <div class="role-name">
          <div class="admin-name">
            <p>PORAMIN KEERINNON</p>
          </div>
          <div class="admin-role">
            <p>Admin</p>
          </div>
        </div>
      </div>
      <div class="section-content">
        <div class="page comment">
          <div class="inbox">
            <nuxt-link to="comment-manage">
              <p>จัดการคอมเมนต์</p>
            </nuxt-link>
          </div>
          <div class="right-icon">
            <span><icon>markunread_mailbox</icon></span>
          </div>
        </div>
        <div class="page product">
          <div class="inbox">
            <p>จัดการสินค้าภายในเว็บไซต์</p>
          </div>
          <div class="right-icon">
            <span><icon>store</icon></span>
          </div>
        </div>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: max-content;
  width: max-content;
  flex-direction: row;
  .sidebar {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    width: 20rem;
    height: 100vh;
    background-color: darken($primary-color, 65%);
    gap: 1rem;
    .section-role {
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
      height: 5rem;
      margin-top: 1rem;
      .left-icon {
        display: flex;
        margin: 2rem;
        width: 10%;
        span {
          color: darken($primary-color, 10%);
        }
      }
      .role-name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .admin-name {
          p {
            color: darken($primary-color, 10%);
          }
        }
        .admin-role {
          color: darken($primary-color, 10%);
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
        .inbox {
          margin: 1rem;
          width: 70%;
          p {
            color: white;
            font-weight: 600;
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
  }
}
</style>
