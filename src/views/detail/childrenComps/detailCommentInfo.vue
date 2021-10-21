<template>
  <div v-if="Object.keys(commentInfo).length!==0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
         更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="data">{{ getDate }}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <div v-if="commentInfo.images&&commentInfo.images.length!==0">
          <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
        </div>
        <div v-else class="no-imgs">
          <span>暂时没有评论喔！快来抢占沙发吧！</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {dateFormat} from "@/common/Util.js"
export default {
  props:{
    commentInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    getDate(){
     const date=new Date(this.commentInfo.created*1000);
      /* 
      const yy=date.getFullYear();
      const MM=date.getMonth()+1;
      const dd=date.getDate();
      return yy+'-'+(MM<10?'0'+MM:MM)+'-'+(dd<10?'0'+dd:dd); */
    return dateFormat('yyyy-MM-dd hh:mm:ss',date); 
    }
  }
}
</script>

<style scoped>
.comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: solid 5px #f2f5f8;
}
.info-header {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
}
.header-title{
  float: left;
  font-size: 13px;
}
.header-more{
  float: right;
  font-size: 13px;
  margin-right: 10px;
}
.info-user{
  padding: 10px 0 5px;
}
.info-user img{
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.info-user span{
  position: relative;
  font-size: 15px;
  top: -15px;
  margin-left: 10px;
}
.info-detail{
  padding: 0 5px 15px;
}
.info-detail p{
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.info-detail .info-other{
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.info-other .data{
  margin-right: 8px;
}
.info-imgs{
  margin-top: 10px;
}
.info-imgs img{
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
.no-imgs{
  margin-top: 20px;
}
.no-imgs span{
  color: #777;
  font-size: 14px;
}
</style>