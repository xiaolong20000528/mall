<template>
 <div id="home">
    <nav-bar class="home-nav">
     <template #center>
        <div>购物街</div>
     </template>
    </nav-bar>
     <tab-control ref="tabControl1" class="tab-control" v-show="isTabFixed" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    <scroll class="content" 
    ref="Scroll" 
    :probe-type="3"
     @scroll="contentScroll" 
     :pullUpLoad="true" 
     @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
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

import homeSwiper from "./childComps/homeSwiper.vue"
import recommendView from "./childComps/recommendsView.vue"
import featureView from "./childComps/featureView.vue"
import {getHomeMultidata,getHomeGoods} from "@/network/home.js"
import {backTopMixin} from "@/common/mixin.js"
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
  },
  mixins:[backTopMixin],
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
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
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
  mounted(){
     
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
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    contentScroll(position){
      //1.判断BackTop是否显示
     this.isShowBackTop=(-position.y)>1000;
     //2.决定tabControl是否吸顶
     this.isTabFixed=(-position.y)>this.tabOffsetTop  
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
       this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
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
  },
  activated(){
    this.$refs.Scroll.refresh();
    this.$refs.Scroll.scrollTo(0,this.saveY);
  },
  deactivated(){
    this.saveY=this.$refs.Scroll.getScrollY();
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
   /* position: fixed;
   top: 0;
   right: 0;
   left: 0;
   z-index: 9; */
 }
 .tab-control{
   position: relative;
   z-index: 2;
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