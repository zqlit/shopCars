<template>
  <div class="home">
    <h3>商品</h3>
    <ul>
      <li v-for="(item,index) in goods">{{ item.name }} - ${{ item.price }} <button @click="addToCar(item)">添加至购物车</button></li>
    </ul>
    <h4>已添加至购物车的商品总价:{{ $store.getters.sumTotal }} 元</h4>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'HomeView',
  computed:{
    ...mapState(['goods'])
  },
  methods:{
    ...mapMutations(['addToCar'])
  }
}
</script>

<style>
li{
  list-style: none;
}
</style>
