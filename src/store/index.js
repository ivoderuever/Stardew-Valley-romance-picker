import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //male = 0
    //female = 1
    //unknown = 2
    vilagers: [
      {
        name: "Alex",
        gender: 0,
        image: 1
      },
      {
        name: "Elliott",
        gender: 0,
        image: 2
      },
      {
        name: "Harvey",
        gender: 0,
        image: 3
      },
      {
        name: "Sam",
        gender: 0,
        image: 4
      },
      {
        name: "Sabastian",
        gender: 0,
        image: 5
      },
      {
        name: "Shane",
        gender: 0,
        image: 6
      },
      {
        name: "Abigail",
        gender: 1,
        image: 7
      },
      {
        name: "Emily",
        gender: 1,
        image: 8
      },
      {
        name: "Haley",
        gender: 1,
        image: 9
      },
      {
        name: "Leah",
        gender: 1,
        image: 10
      },
      {
        name: "Maru",
        gender: 1,
        image: 11
      },
      {
        name: "Penny",
        gender: 1,
        image: 12
      },
      {
        name: "Krobus",
        gender: 2,
        image: 13
      },
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
