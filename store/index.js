import axios from 'axios'
import Vue from "vue";

export const state = () => ({
  authUser: null,
  logInState: false
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user;

    if (state.logInState){
      state.logInState = false;  
    }
    else{
      state.logInState = true;
    }
  }
}
export const getters = {
  
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
       commit('SET_USER', req.session.authUser);
       }
    },
  async login({ commit }, { username, password }) {
    await axios.post('/login',{username, password})
      .then((response) =>{
        localStorage.setItem('authToken', response.data.userId);
        localStorage.setItem('userName', response.data.fullName);
        commit('SET_USER',response.data);
        this.$router.push('/dishlist');
    })
      .catch((error)=>{
      if (error.response && error.response.status === 401) {
         throw new Error('Please enter the required field')
       }
      throw error
    })
  },
  async signup ({commit}, payload) {
      await axios.post('/signup', payload).then((response)=>{
          localStorage.setItem('authToken', response.data.userId);
          localStorage.setItem('userName', response.data.fullName);
          commit('SET_USER',response.data);
      }).catch((error)=>{
          console.log(error);
      })
  },
  async logout({ commit }, payload) {
    await axios.post('/logout', payload).then((res)=>{
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      commit('SET_USER', null);
    })
    .catch((err)=>{
      console.log('logout failed');
    })
  }     
}