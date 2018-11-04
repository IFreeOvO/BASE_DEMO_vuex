import * as shop from '@/api/shop'

const state = {
  all: [] // 全部商品
}

const mutations ={
  setProducts(state, {products}) {
    state.all = products
  },

  decrementProductInventory(state, payload) {
    const item = state.all.find( ({id}) => {
      return id === payload.id
    } )
    item.inventory --
  }
}

const actions = {
  async getAllProducts({commit}) {
    const products = await shop.getAllProducts()
    commit({
      type: 'setProducts',
      products
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}