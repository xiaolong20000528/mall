<template>
  <div id="detail">
     <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
     <scroll class="content"
      ref="Scroll" 
     :pullUpLoad="true"
      :probeType="3"
      @scroll="contentScroll"
     >
       <detail-swiper :topImages="topImages"></detail-swiper>
       <detail-base-info :goods="goods"></detail-base-info>
       <detail-shop-info :shop="shop"></detail-shop-info>
       <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
       <detail-params-info ref="params" :paramsInfo="paramsInfo"></detail-params-info>
       <detail-comment-info  ref="comment" :commentInfo="commentInfo"></detail-comment-info>
       <goods-list :goods="recommends" ref="recommend"></goods-list>
     </scroll>
     <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
     <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import detailNavBar from "./childrenComps/detailNavBar.vue"
import detailSwiper from "./childrenComps/detailSwiper.vue"
import detailBaseInfo from "./childrenComps/detailBaseInfo.vue"
import detailShopInfo from "./childrenComps/detailShopInfo.vue"
import detailGoodsInfo from './childrenComps/detailGoodsInfo.vue'
import detailParamsInfo from "./childrenComps/detailParamsInfo.vue"
import detailCommentInfo from "./childrenComps/detailCommentInfo.vue"
import detailBottomBar from './childrenComps/detailBottomBar.vue'
import goodsList from "@/components/content/goods/goodsList.vue"

import scroll from "@/components/common/scroll/scroll.vue"
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail.js"
import {backTopMixin} from "@/common/mixin.js"
export default {
  name:"detail",
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramsInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      flag:false,
      currentIndex:0
    }
  },
  mixins:[backTopMixin],
  components:{
   scroll,
   detailNavBar,
   detailSwiper,
   detailBaseInfo,
   detailShopInfo,
   detailGoodsInfo,
   detailParamsInfo,
   detailCommentInfo,
   goodsList,
   detailBottomBar

  },
  methods:{
    imageLoad(){
      this.$refs.Scroll.refresh();
      if(this.flag){
       this.themeTopYs=[];
       this.themeTopYs.push(0);
       this.themeTopYs.push(this.$refs.params.$el.offsetTop);
       this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
       this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
     }else{
      this.flag=true;
      this.themeTopYs=[];
       this.themeTopYs.push(0);
       this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
       this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
       this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
     }  
    },
    titleClick(index){
      this.$refs.Scroll.scrollTo(0,-this.themeTopYs[index]);
    },
    contentScroll(position){
      this.isShowBackTop=(-position.y)>800;
      const positionY=-position.y;
      let length=this.themeTopYs.length;
      for(let i=0;i<length;i++){
        if(this.currentIndex!==i && ((i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i===length-1&&positionY>=this.themeTopYs[i]))){
          this.currentIndex=i;
          this.$refs.nav.currentIndex=this.currentIndex;
        }
      } 
    },
    addCart(){
      const product={};
      product.image=this.topImages[0];
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.price=this.goods.realPrice;
      product.idd=this.iid;

      this.$store.commit("addCart",product);
    }
  },
  created(){
    //1.保存传入的iid
    this.iid=this.$route.params.iid;
    //2.根据iid获取详细数据
    getDetail(this.iid).then(res=>{
     //1.获取顶部轮播图的数据
     const data=res.result;
     this.topImages=res.result.itemInfo.topImages;
     //2.获取商品信息
     this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services);
     //3.获取店铺信息
     this.shop=new Shop(data.shopInfo);
     //4.获取商品详细信息
     this.detailInfo=data.detailInfo;
     //5.商品参数信息
     this.paramsInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule);
     //6.取出评论信息
     if(data.rate.cRate!==0){
        this.commentInfo=data.rate.list[0];
     }; 
    })
    getRecommend().then(res=>{
      this.recommends=res.data.list;
    })
  },
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
 height: calc(100% - 93px);
}
</style>