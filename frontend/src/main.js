import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

import App from './App.vue'

Vue.config.productionTip = false

const apiBaseURL = 'https://ss8rdg6nid.execute-api.eu-west-1.amazonaws.com/Prod'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    accessToken: null,
    notes: [],
  },

  mutations: {
    setAccessToken (state, token) {
      axios.defaults.headers.common['Authorization'] = `${token}`
      state.accessToken = token
    },

    setNotes(state, notes) {
      state.notes = notes
    }
  },

  actions: {
    addNote({ dispatch }, data) {
      axios({
        method: 'POST',
        url: `${apiBaseURL}/notes`,
        data:data,
      })
      .then(() => {
        dispatch('fetchNotes')
      })
    },

    fetchNotes({ commit }) {
      axios({
        method: 'GET',
        url: `${apiBaseURL}/notes`,
      })
      .then(res => {
        commit('setNotes', res.data)
      })
    },

    removeNote({ dispatch }, noteID) {
      axios({
        method: 'DELETE',
        url: `${apiBaseURL}/notes/${noteID}`,
      })
      .then(() => {
        dispatch('fetchNotes')
      })
    }
  }
})

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
