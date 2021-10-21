//格式化时间
export function dateFormat(fmt,date){
  var o = {
   "M+" : date.getMonth()+1, //月份
   "d+" : date.getDate(), //日
   "h+" : date.getHours(), //小时
   "m+" : date.getMinutes(), //分
   "s+" : date.getSeconds(), //秒
   "q+" : Math.floor((date.getMonth()+3)/3), //季度
   "S" : date.getMilliseconds() //毫秒
  };
  if(/(y+)/.test(fmt))
   fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
   if(new RegExp("("+ k +")").test(fmt))
   fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
   return fmt;
 }
  
 //格式化标准时间、获取当前时间
 export function formatdate(flat,strtime){
  var d;
  var da = [];
  var dt = [];
  if(isNaN(strtime)&&!isNaN(Date.parse(strtime))){
   d = new Date(strtime);
  }else{
   d = new Date();
  }
  da[0] = d.getFullYear();
  da[1] = (d.getMonth()+1)<10?'0'+(d.getMonth() + 1):(d.getMonth() + 1);
  da[2] = d.getDate()<10?'0'+d.getDate():d.getDate();
  dt[0] = d.getHours()<10?'0'+d.getHours():d.getHours();
  dt[1] = d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes();
  dt[2] = d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds();
  if(flat==0){
   return da.join("-");
  }else{
   return da.join("-")+" "+dt.join(":");
  }
 }