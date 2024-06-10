## ShopCars

##### 前言

这个是基于vue2+vuex所做的vue购物车小demo（这个本是课堂上一个随堂测试小作业）

之前写购物车的时候大部分都是以vue3+pinia方式写的，习惯vue3的方式，反而vue2+vuex的方式不会写了，所以新开此仓库记录本此作业所遇到的问题，以及解决方法

如果您也想练习本项目,只需clone以下初始化项目文件

https://github.com/imzql/shopCars-dev

##### 项目展示

https://shop-cars-five.vercel.app

##### 项目启动

安装依赖

```
npm i
```

项目启动

```
npm run serve
```

##### 项目实现

###### 首先在vuex的state写好商品页面，购物车的数据，以及全选按钮的数据

```
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
```

###### 在mutations里写操作state数据的逻辑业务

添加功能

在购物车页面接收到传来的商品子项item 通过findIndex方法和carts进行对比

找到item在carts里的index索引值，然后进行添加删除操作

```
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
```

购物车商品的单个添加与删除

主要是删除功能 当单个商品的数量已经是0的时候 让其无法再 -  这里使用一个三元表达式实现

```
    //购物车删除商品数量
    subsGood(state,index){
      state.cars[index].num == 0 ? state.cars[index].num = 0 : state.cars[index].num--
    },
    //购物车添加
    addGood(state,index){
      state.cars[index].num++
    },
```

全选按钮切换逻辑

当全选按钮的checkboxs 被点击 对state里的isAll的全选按钮状态进行反向赋值

遍历购物车的数据 将每一个的商品项的isCheck赋值为当前的isAll值 达到全选所有商品的功能

```
   //全选逻辑
    checkAll(state){
      state.isAll = !state.isAll;
      state.cars.forEach(item => {
        item.isCheck = state.isAll;
      });
    }
```

书写actions的toggleCheckAll

当购物车页面的全选按钮状态改变，执行toggleCheckAll 将执行mutations的checkAll方法

```
  actions: {
    toggleCheckAll({ commit }) {
      commit('checkAll');
    }
  },
```

统计商品总价

统计商品总价，这里指的是已勾选的商品 才会计算价格

主要使用的filter数组过滤，将所有被勾选的单个商品过滤之后再用数组的reduce方法进行价格的累加求和

从而达到实现统计商品总价的业务逻辑

```
    //统计商品总价(指的是已勾选的商品 才会计算价格)
    sumTotal(state) {
      return state.cars.filter(item => item.isCheck).reduce((prev, item) => prev += item.price * item.num, 0);
    },
```

实时状态检测所有的单个商品是否被勾选

这里主要使用的是数组里的every方法，如果数组的每个item的ischeck状态是否都为true

就返回给函数体 true值 否则为false从而达到实时监测全选状态

```
    //检测所有商品是否被勾选
    isAllChecked(state) {
      return state.cars.every(item => item.isCheck);
    }
```

购物车页面的实现

```
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
```

`<input type="checkbox" :checked="isAllChecked" @change="toggleCheckAll">`

其中checked状态通过v-bind绑定试试接受vuex的getters的isAllChecked变化

如果所有单个商品被选择则返回true 如果全选按钮被更改状态就执行vuex的actions的toggleCheckAll

从而达到全选按钮实现
