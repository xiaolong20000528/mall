<template>
  <div class="tabbar-item" :style="activeStyle" @click="itemClick">
    <slot name="item-iconfont"></slot>
    <slot name="item-text"></slot>
  </div>
</template>

<script>
export default {
  props:{
    path:String,
    activeColor:{
      type:String,
      defaults:"red"
    }
  },
  computed:{
     isActive(){
       return this.$route.path.indexOf(this.path)!=-1;
     },
     activeStyle(){
       return this.isActive?{color:this.activeColor}:{};
     }
  },
  methods:{
    itemClick(){
      this.$router.push(this.path);
    }
  }
}
</script>

<style>
 .tabbar-item{
    flex: 1;
    height: 49px;
    text-align: center;
    box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
    cursor: pointer;
 }
 .tabbar-item span{
   display: inline-block;
   margin: 3px;
   font-size: 16px;
 }
 .tabbar-item div{
   height: 30px;
  font-size: 12px;
  text-align: center;
 }
</style>