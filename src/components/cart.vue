<template>
  <div>
      <ul >
      <li v-for="good in cartProducts"
        :key="good.id">
        {{good.title}} - ${{good.price}} ------x {{good.quantity}}
        <br>
      </li>
    </ul>
    <p v-if="cartProducts.length === 0">请添加商品</p>
    <p>总价: ${{totalPrice}}</p>
    <button :disabled="!cartProducts.length" @click="checkout">结算</button>
    <p v-show="checkoutState">Check {{checkoutState}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      
    };
  },

  computed: {
    ...mapState('cart', ['checkoutState']),

    ...mapGetters('cart', ['cartProducts', 'totalPrice'])
  },

  methods: {
    ...mapActions('cart', ['checkout'])
  }
}
</script>
<style lang="scss"   scoped>
  
</style>