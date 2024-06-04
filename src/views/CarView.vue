<template>
  <div class="about">
    <h3>购物车</h3>
    <input type="checkbox" :checked="isAllChecked" @change="toggleCheckAll">全选
    <ul>
      <li v-for="(item,index) in cars">
        <input type="checkbox" v-model="item.isCheck"> {{ item.name }} - ${{ item.price }} <button @click="subsGood(index)">-</button> {{ item.num }} <button @click="addGood(index)">+</button> <button @click="delFromCar(item)">删除</button></li>
    </ul>
    <h4>已添加至购物车的商品总价:{{ $store.getters.sumTotal }} 元</h4>
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: 'car',
  computed:{
    ...mapState(['cars']),
    ...mapGetters(['sumTotal', 'isAllChecked'])
  },
  methods:{
    ...mapMutations(['delFromCar','subsGood','addGood','checkAll']),
    ...mapActions(['toggleCheckAll'])
  }
}
</script>