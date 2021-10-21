import backTop from "@/components/content/backTop/backTop.vue"
export const backTopMixin={
  data(){
    return {
      isShowBackTop:false,
    }
  },
  methods:{
    backClick(){
      this.$refs.Scroll.scrollTo(0,0);
    }
  },
  components:{
    backTop
  }
}