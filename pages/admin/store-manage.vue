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
      <div class="item-card">
        <div class="image">
          <p>demo</p>
        </div>
        <div class="product-name">
          <p>demo</p>
        </div>
        <button class="button">แก้ไขสินค้า</button>
      </div>
    </div>
    <!-- form-add-data -->
    <form>
      <div class="header-form">
        <h2>เพิ่มสินค้าที่ต้องการจะขาย</h2>
      </div>
      <div class="name">
        <div class="title name">
          <p>ชื่อสินค้า</p>
        </div>
        <input name="ชื่อสินค้า" type="text" />
      </div>
      <div class="url">
        <div class="title url">
          <p>ลิงก์ของร้านค้า</p>
        </div>
        <input name="url" type="text" />
      </div>
      <div class="name">
        <div class="title picture">
          <p>อัพโหลดรูปภาพ</p>
        </div>
        <input name="picture" type="file" />
      </div>
      <div class="decide-button">
        <button class="button--confirm">
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
export default {};
</script>

<style lang="scss" scoped>
.store-manage-container {
  display: flex;
  flex-direction: row;
  width: max-content;
  height: max-content;
  justify-content: center;
  align-items: center;
  .product-list {
    height: 90vh;
    width: 25rem;
    margin-left: 2rem;
    border-radius: 15px;
    background-color: #6787b8;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    .menu {
      width: 100%;
      height: 4.5rem;
      display: flex;
      justify-content: center;
      flex-direction: row;
      gap: 2.5rem;
      align-items: center;
      border-radius: 15px 15px 0px 0px;
      background-color: lighten($secondary-color, 5%);

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
}
</style>
