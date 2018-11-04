import Vue from 'vue'
import Vuex from 'vuex'

import products from './modules/products'
import cart from './modules/cart'
import * as plugins from './plugins'
import createLogger from 'vuex/dist/logger'
import createPresistedState from 'vuex-persistedstate'


import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  plugins: [...(debug ? [createLogger()] : []), createPresistedState()],
  modules: {
    products,
    cart
  },
  state,
  mutations,
  actions,
  getters
})