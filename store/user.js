 const state = () => ({
  id : '',
  email: '',
  displayName: '',
  image: '',
  role:'',
});
 const mutations = {
  setUser(state, user) {
    state.id = user.id
    state.email = user.email
    state.displayName = user.displayName
    state.image = user.image
    state.role = user.role
    console.log(user)
  },
};
export default {
  state,
  mutations,
}