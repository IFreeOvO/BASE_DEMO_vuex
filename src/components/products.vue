<template>
  <div>
    <ul >
      <li v-for="good in products"
        :key="good.id">
        {{good.title}} - ${{good.price}} ------x {{good.inventory}}
        <br>
        <button @click="addProductToCart(good)">添加</button>
      </li>
    </ul>
    
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {

    };
  },

  computed: {
    ...mapState('products', {
      'products': 'all'
    })
  },

  methods: {
    ...mapActions('cart', ['addProductToCart'])
  },

  mounted() {
    this.$store.dispatch({ type: 'products/getAllProducts' })
    // eslint-disable-next-line
    // console.log(this.$store.dispatch)
  }



}
</script>
<style lang="scss"  r scoped>
</style>