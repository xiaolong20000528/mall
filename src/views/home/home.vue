<template>
 <div id="home">
    <nav-bar class="home-nav">
     <template #center>
        <div>购物街</div>
     </template>
    </nav-bar>
    <scroll class="content" 
    ref="Scroll" 
    :probe-type="3"
     @scroll="contentScroll" 
     :pullUpLoad="true" 
     @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control  class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
 </div>
</template>

<script>
import navBar from "@/components/common/navbar/NavBar.vue"
import scroll from "@/components/common/scroll/scroll.vue"
import tabControl from "@/components/content/tabControl/tabControl.vue"
import goodsList from "@/components/content/goods/goodsList.vue"
import backTop from "@/components/content/backTop/backTop.vue"

import homeSwiper from "./childComps/homeSwiper.vue"
import recommendView from "./childComps/recommendsView.vue"
import featureView from "./childComps/featureView.vue"
import {getHomeMultidata,getHomeGoods} from "@/network/home.js"
export default {
  name:"home",
  components:{
    navBar,
    homeSwiper,
    recommendView,
    featureView,
    tabControl,
    goodsList,
    scroll,
    backTop
  },
  data(){
    return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        isShowBackTop:false
    }
  },
  computed:{
   showGoods(){
     return this.goods[this.currentType].list
   }
  },
  created(){
    //1.请求多个数据
     this.getHomeMultidata(),
     //2.请求商品数据
     this.getHomeGoods('pop'),
     this.getHomeGoods('new'),
     this.getHomeGoods('sell')
  },
  methods:{
    /* 
      事件监听相关的方法
    */
   //tabControl上的点击事件
    tabClick(index){
      switch(index){
        case 0:
          this.currentType="pop"
          break;
        case 1:
          this.currentType="new"
          break;
          case 2:
            this.currentType="sell"
            break;
      }
    },
    backClick(){
      this.$refs.Scroll.scrollTo(0,0);
    },
    contentScroll(position){
     this.isShowBackTop=(-position.y)>1000;
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    /* 
     网络请求相关的方法
    */
    getHomeMultidata(){
       getHomeMultidata().then(res=>{
       this.banners=res.data.banner.list;
       this.recommends=res.data.recommend.list;
     })
    },
    getHomeGoods(type){
        const page=this.goods[type].page+1;
        getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page+=1;
        this.$refs.Scroll.finishPullUp();
     }).then(()=>{
       this.$refs.Scroll.refresh();
     })
    }
  }
}
</script>

<style scoped>
#home{
  /* height: 9999px; */
  height: 100vh;
}
 .home-nav{
   background-color: var(--color-tint);
   color: white;
   position: fixed;
   top: 0;
   right: 0;
   left: 0;
   z-index: 9;
 }
 .tab-control{
   position: sticky;
   top:44px;
   z-index: 9
 }
 .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
 }
</style>