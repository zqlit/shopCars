
import Vue, { reactive } from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAll:false,
    goods: [{
      id: 1,
      name: "商品1",
      price: 10
    },
    {
      id: 2,
      name: "商品2",
      price: 20
    },
    {
      id: 3,
      name: "商品3",
      price: 30
    },
    {
      id: 4,
      name: "商品4",
      price: 40
    },
    ],
    cars: [
      {
        id: 1,
        name: "商品1",
        price: 10,
        num:0,
        isCheck:false
      },
      {
        id: 2,
        name: "商品2",
        price: 20,
        num:0,
        isCheck:false
      },
      {
        id: 3,
        name: "商品3",
        price: 30,
        num:0,
        isCheck:false
      },
      {
        id: 4,
        name: "商品4",
        price: 40,
        num:0,
        isCheck:false
      },
    ]
  },
  getters: {
    //统计商品总价(指的是已勾选的商品 才会计算价格)
    sumTotal(state) {
      return state.cars.filter(item => item.isCheck).reduce((prev, item) => prev += item.price * item.num, 0);
    },
    //检测所有商品是否被勾选
    isAllChecked(state) {
      return state.cars.every(item => item.isCheck);
    }
  },
  mutations: {
    //添加功能
    addToCar(state, item) {
      const index = state.cars.findIndex(car => car.id == item.id)
      index !== -1 ? state.cars[index].num++ : ''
    },
    //删除功能
    delFromCar(state, item) {
      const index = state.cars.findIndex(car => car.id == item.id)
      index !== -1 ? state.cars.splice(index, 1) : ''
    },
    //购物车删除商品数量
    subsGood(state,index){
      state.cars[index].num == 0 ? state.cars[index].num = 0 : state.cars[index].num--
    },
    //购物车添加
    addGood(state,index){
      state.cars[index].num++
    },
    //全选逻辑
    checkAll(state){
      state.isAll = !state.isAll;
      state.cars.forEach(item => {
        item.isCheck = state.isAll;
      });
    }
  },
  actions: {
    toggleCheckAll({ commit }) {
      commit('checkAll');
    }
  },
  modules: {
  }
})
