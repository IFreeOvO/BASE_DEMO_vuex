<template>
  <div id="app">
    <h1>购物车例子</h1>
    <hr>
    <h3>商品:</h3>
    <products></products>
    <hr>
    <h3>购物车:</h3>
    <cart></cart>
  </div>
</template>

<script>
import products from './components/products'
import cart from './components/cart'

export default {
  name: 'app',
  components: {
    products,
    cart
  }
}
</script>

<style>
</style>
