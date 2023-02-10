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
  // pokemons: [],
  selectedId: "",
  products: [],
  modalToggleId: "",
});
export const mutations = {
  pushComment(state, comment) {
    state.comments.push(comment);
  },
  // setPokemon(state,pokemons){
  //   state.pokemons = pokemons
  // },
  clickId(state, payload) {
    state.selectedId = payload;
  },
  removeComments(state, ids) {
    state.comments = state.comments.filter(
      (comment) => !ids.includes(comment.id)
    );
  },
  // store-manage
  pushProduct(state, product) {
    state.products.push(product);
  },
  clickedId(state, payload) {
    state.modalToggleId = payload;
  },
  removeProduct(state, id) {
    state.products.splice(
      state.products.findIndex((product) => product.id === id),
      1
    );
  },
};

export const actions = {
  // get-comment
  async fetch(store) {
    const querySnapshot = await getDocs(collection(db, "messageFromUser"));
    querySnapshot.forEach((doc) => {
      store.commit("pushComment", doc.data());
    });
    // console.log(querySnapshot);
  },
  // ---------------------------------------------------------------------------------
  // get-product
  async fetchProduct(store) {
    const snap = await getDocs(collection(db, "products"));
    let items = [];
    snap.forEach((doc) => {
      store.commit("pushProduct", doc.data());
      items.push(doc.data());
    });
    return items;
    // console.log(snap);
  },
  // async fetchPoke(store) {
  //   const pokemonsDeck = await fetch("https://pokeapi.co/api/v2/pokemon");
  //   const {results,count} = await pokemonsDeck.json()
  //   store.commit("setPokemon",results)
  // }
};
export const getters = {
  // comment-manage
  checkId(state) {
    return (selectedId) => {
      return state.comments.find((comment) => comment.id === selectedId);
    };
  },
  sizeOfComment(state) {
    return state.comments.length;
  },
  // -------------------------------------------------------------------------------------
  // product-manage
  // detectedId(state) {
  //   return (modalToggleId) => {
  //     return state.products.find((product) => product.id === modalToggleId);
  //   };
  // },
};
