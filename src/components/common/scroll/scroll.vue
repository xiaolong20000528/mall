<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props:{
     probeType:{
       type:Number,
       default:0
     },
     pullUpLoad:{
       type:Boolean,
       default:false
     }
  },
  data(){
   return {
     scroll:null
   }
  },
  mounted(){
    //1.创建滚动对象
     this.scroll=new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        click:true,
        observeDOM:true,
        observeImage:true
     });
     //2.监听滚动事件
     this.scroll.on("scroll",(position)=>{
       this.$emit("scroll",position);
     });
     //3.监听上拉事件
     this.scroll.on("pullingUp",()=>{
       this.$emit("pullingUp");
     })
  },
  methods:{
    scrollTo(x,y,time=500){
      this.scroll.scrollTo(x,y,time);
    },
    finishPullUp(){
      this.scroll.finishPullUp();
    },
    refresh(){
      this.scroll.refresh();
    }
  }
}
</script>

<style>

</style>