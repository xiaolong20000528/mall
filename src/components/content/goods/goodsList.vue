<template>
  <div class="goods">
    <goodsListItem v-for="(item,index) in goods" :key="index" :goodsItem="item"></goodsListItem>
   <!--  {{goods}} -->
  </div>
</template>

<script>
import goodsListItem from "./goodsListItem.vue"
export default {
  props:{
    goods:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  components:{
    goodsListItem
  }
}
</script>

<style scoped>
.goods {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-around;
    padding: 2px; */
    justify-content: space-evenly;
  }
</style>