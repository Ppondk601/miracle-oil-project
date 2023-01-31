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
  comments: [],
  pokemons: [],
  selectedId:"",
});
export const mutations = {
  pushComment(state,comment) {
    state.comments.push(comment)
  },
  setPokemon(state,pokemons){
    state.pokemons = pokemons
  },
  clickId(state,payload){
    state.selectedId = payload
  },
  removeComments(state,ids){
    state.comments =state.comments.filter(comment => !ids.includes(comment.id))
  }
};
export const actions = {
  async fetch(store) {
    const querySnapshot = await getDocs(collection(db, "messageFromUser"));
    querySnapshot.forEach((doc) => {
      store.commit("pushComment",doc.data());
    });
    console.log(querySnapshot)
  },
  async fetchPoke(store) {
    const pokemonsDeck = await fetch("https://pokeapi.co/api/v2/pokemon");
    const {results,count} = await pokemonsDeck.json()
    store.commit("setPokemon",results)
  }
};
export const getters = {
  checkId(state) {
    return selectedId => {
      return state.comments.find(comment => comment.id === selectedId)
    }
  },
  sizeOfComment(state) {
    return state.comments.length
  }
}