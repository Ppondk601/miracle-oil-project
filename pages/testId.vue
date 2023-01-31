<template>
  <div class="contain-testId">
    <modal ref="modal-confirm-remove">
      <div class="check">คุณต้องการลบใช่หรือไม่?</div>
      <button class="button">ยืนยัน</button>
      <button
        class="button"
        @click="$refs['modal-confirm-remove'].$el.classList.remove('active')"
      >
        ยกเลิก
      </button>
    </modal>
    <div class="box name">
      <button>Check</button>
    </div>
    <div class="box email">
      <button>Check</button>
    </div>
    <div
      class="item-selected"
      v-for="item in details"
      :key="item.id"
      :class="{ active: item.id === selectedId }"
    >
      <input
        type="checkbox"
        @click="pickingId(item.id)"
        v-model="item.checked"
      />
      <div class="yeet" @click="choosingId(item.id)">{{ item }}</div>
    </div>
    <button
      class="button"
      @click="$refs['modal-confirm-remove'].$el.classList.add('active')"
    >
      Remove
    </button>
    {{ selectedItem }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedId: "",
      checkboxId: [],

      details: [
        { name: "Test1", email: "mailTest1", id: "1", checked: false },
        { name: "Test2", email: "mailTest2", id: "2", checked: false },
        { name: "Test3", email: "mailTest3", id: "3", checked: false },
        { name: "Test4", email: "mailTest4", id: "4", checked: false },
        { name: "Test5", email: "mailTest5", id: "5", checked: false },
        { name: "Test6", email: "mailTest6", id: "6", checked: false },
      ],
    };
  },
  computed: {
    selectedItem() {
      return this.details.find((detail) => detail.id === this.selectedId);
    },
  },
  methods: {
    selectThis() {
      this.details.find((detail) => detail.id === this.selectedId);
      // console.log(this.selectedId);
    },
    choosingId(id) {
      this.selectedId = id;
    },
    pickingId(id) {
      if (!this.checkboxId.includes(id)) {
        this.checkboxId.push(id);
      } else {
        this.checkboxId.splice(this.checkboxId.indexOf(id), 1);
      }
      console.log(this.checkboxId);
    },
    deletePicking() {
      this.details = this.details.filter(
        (item) => !this.checkboxId.includes(item.id)
      );
    },
  },
};
</script>

<style lang="scss">
.contain-testId {
  display: flex;
  flex-direction: column;
  width: max-content;
  height: max-content;
  gap: 2rem;
  .box {
    display: flex;
    width: 10rem;
    height: 4rem;
    background-color: darken($primary-color, 30%);
    margin-top: 4rem;
    margin-left: 4rem;
  }
}
</style>
