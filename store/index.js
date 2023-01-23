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
export const state = () => ({
  counter: 0,
  comments: [],
  pokemons: [],
});
export const mutations = {
  increment(state) {
    state.counter++;
  },
  decrement(state) {
    state.counter--;
  },
  pushComment(state,comment) {
    state.comments.push(comment)
  },
  setPokemon(state,pokemons){
    state.pokemons = pokemons
  }
};
export const actions = {
  async fetch(store) {
    const querySnapshot = await getDocs(collection(db, "message"));
    querySnapshot.forEach((doc) => {
      store.commit("pushComment",doc.data());
    });
    console.log(querySnapshot)
  },
  async fetchPoke(store) {
    const pokemonsDeck = await fetch("https://pokeapi.co/api/v2/pokemon");
    const {results,count} = await pokemonsDeck.json()
    console.log(count)
    store.commit("setPokemon",results)
  }
};
exports.action = {
  
}