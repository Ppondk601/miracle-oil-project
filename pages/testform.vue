<template>
  <div class="test-container">
    <input placeholder="hello" v-model="name" />
    <input placeholder="hello" v-model="text" />
    <input placeholder="hello" v-model="comment" />
    <button class="button" @click="sendMessage">Submit</button>
    <p v-if="$fetchState.pending">Fetching</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <li v-for="item of userComments" :key="item.id">{{ item.userName }}</li>
    </div>
    <div class="vuex-test">
      <button @click="minus()" class="button">add</button>
      <button @click="plus()" class="button">remove</button>
      <h2>{{ countFromStore }}</h2>
      <h3>{{ getData }}</h3>
      <div
        class="test-loop"
        v-for="comment in this.$store.state.comments"
        :key="comment.id"
      ></div>
    </div>
    <div class="poke-test">
      <button @click="loadPokemon" class="button">hello</button>
      <div
        class="all-poke"
        v-for="pokemon in $store.state.pokemons"
        :key="pokemon.name"
      >
        {{ pokemon.name }}
        <img :src="pokemon.url" width="50px" />
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
} from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
export default {
  data() {
    return {
      userComments: [], //หัดใช้ ?
      name: "",
      text: "",
      comment: "",
    };
  },
  async fetch() {
    await setDoc(doc(db, "comment", "user"), {
      name: "poramon",
      tel: "0950725914",
      email: "poramink601@gmail.com",
    });
  },
  async fetch() {
    try {
      await this.$store.dispatch("fetch");
    } catch (error) {
      alert(error.message);
    }
  },
  methods: {
    async sendMessage() {
      const userRef = doc(db, "message", uuidv4());
      await setDoc(userRef, {
        userName: this.name,
        usertext: this.text,
        userComment: this.comment,
      });
    },
    async loadPokemon() {
      await this.$store.dispatch("fetchPoke");
    },
    plus() {
      this.$store.commit("increment");
    },
    minus() {
      this.$store.commit("decrement");
    },
  },
  computed: {
    countFromStore() {
      return this.$store.state.counter;
    },
    getData() {
      return this.$store.state.comments;
    },
  },
};
</script>

<style lang="scss" scoped>
.test-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  width: max-content;
  input {
    border: 1px solid black;
  }
  .vuex-test {
    border: 1px solid black;
    display: flex;
    width: 300px;
    height: 300px;
    button {
      width: 100px;
      height: 50px;
    }
  }
}
</style>
