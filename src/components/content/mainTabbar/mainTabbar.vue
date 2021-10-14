<template>
  <router-view></router-view>
  <tabbar>
    <tabbar-item path="/home" activeColor="deeppink">
      <template v-slot:item-iconfont>
        <span class="icon iconfont">&#xe639;</span>
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tabbar-item>
    <tabbar-item path="/category" activeColor="deeppink">
      <template v-slot:item-iconfont>
      <span class="icon iconfont">&#xe62f;</span>
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tabbar-item>
    <tabbar-item path="/cart" activeColor="deeppink">
      <template v-slot:item-iconfont>
      <span class="icon iconfont">&#xe63f;</span>
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tabbar-item>
    <tabbar-item path="/profile" activeColor="deeppink">
      <template v-slot:item-iconfont>
      <span class="icon iconfont">&#xe600;</span>
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tabbar-item>
  </tabbar>
</template>

<script>
import tabbar from "@/components/common/tabbar/tabbar.vue";
import tabbarItem from "@/components/common/tabbar/tabbarItem.vue";
export default {
 components: {
    tabbar,
    tabbarItem,
  },
}
</script>

<style>

</style>