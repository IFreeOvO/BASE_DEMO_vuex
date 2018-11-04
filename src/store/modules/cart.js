import * as shop from '@/api/shop'

const state = {
  items: [], // 购物车数据{id, quantity}
  checkoutState: null
}

const mutations = {
  incrementItemQuantity(state, payload) {
    var cartItem = state.items.find(({
      id
    }) => {
      return id === payload.id
    })
    cartItem.quantity++
  },

  pushProductToCart(state, payload) {
    state.items.push({
      id: payload.id,
      quantity: 1
    })
  },

  setCheckoutStatus(state, payload) {
    state.checkoutState = payload.status
  },

  setItems(state, payload) {
    state.items = payload.data
  }
}

const actions = {
  addProductToCart({
    state,
    commit
  }, product) {
    // console.log(product)
    // 如果商品>0, 则添加
    if (product.inventory === 0) {
      console.log('无库存')
      return
    }

    const cartItem = state.items.find(({
      id
    }) => {
      return id === product.id
    })

    // 如果购物车里已存在该商品,则购物车里商品+1
    if (cartItem) {
      commit({
        type: 'incrementItemQuantity',
        id: cartItem.id
      })
    } else { // 如果购物车里没有,购物车商品默认为1
      commit({
        type: 'pushProductToCart',
        id: product.id
      })
    }

    // 让商品本身数量-1
    commit({
      type: 'products/decrementProductInventory',
      id: product.id,
    }, {
      root: true
    })
  },

  checkout({commit, getters}) {
    // 备份购物车数据
    const savedCardProducts = getters. cartProducts
    // 清空支付状态
    commit({
      type: 'setCheckoutStatus',
      status: null
    })
    // 清空购物车
    commit({
      type: 'setItems',
      data: []
    })
    // 发起结束请求
    shop.buyProducts(
      savedCardProducts, 
      () => {
        commit({
          type: 'setCheckoutStatus',
          status: 'success'
        })
      },
      () => {
        commit({
          type: 'setCheckoutStatus',
          status: 'fail'
        })

        commit({
          type: 'setItems',
          data: savedCardProducts
        })
      }
    )
    // 成功,设置成功状态
    // 失败,设置失败状态,回滚购物车数据
  }
}

const getters = {
  cartProducts(state, getters, rootState) {
    return state.items.map(product => {
      const {
        id,
        title,
        price
      } = rootState.products.all.find(item => {
        return item.id === product.id
      })

      return {
        id,
        title,
        price,
        quantity: product.quantity
      }
    })
  },

  totalPrice(state, getters) {
    return getters.cartProducts.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}