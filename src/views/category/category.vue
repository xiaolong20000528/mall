<template>
  <div class="wrapper">
    <div class="content">
      <ul>
        <li>lala1</li>
        <li>lala2</li>
        <li>lala3</li>
        <li>lala4</li>
        <li>lala5</li>
        <li>lala6</li>
        <li>lala7</li>
        <li>lala8</li>
        <li>lala9</li>
        <li>lala10</li>
        <li>lala11</li>
        <li>lala12</li>
        <li>lala13</li>
        <li>lala14</li>
        <li>lala15</li>
        <li>lala16</li>
        <li>lala17</li>
        <li>lala18</li>
        <li>lala19</li>
        <li>lala20</li>
        <li>lala21</li>
        <li>lala22</li>
        <li>lala23</li>
        <li>lala24</li>
        <li>lala25</li>
        <li>lala26</li>
        <li>lala27</li>
        <li>lala28</li>
        <li>lala29</li>
        <li>lala30</li>
        <li>lala31</li>
        <li>lala32</li>
        <li>lala33</li>
        <li>lala34</li>
        <li>lala35</li>
        <li>lala36</li>
        <li>lala37</li>
        <li>lala38</li>
        <li>lala39</li>
        <li>lala40</li>
        <li>lala41</li>
        <li>lala42</li>
        <li>lala43</li>
        <li>lala44</li>
        <li>lala45</li>
        <li>lala46</li>
        <li>lala47</li>
        <li>lala48</li>
        <li>lala49</li>
        <li>lala50</li>
        <li>lala51</li>
        <li>lala52</li>
        <li>lala53</li>
        <li>lala54</li>
        <li>lala55</li>
        <li>lala56</li>
        <li>lala57</li>
        <li>lala58</li>
        <li>lala59</li>
        <li>lala60</li>
        <li>lala61</li>
        <li>lala62</li>
        <li>lala63</li>
        <li>lala64</li>
        <li>lala65</li>
        <li>lala66</li>
        <li>lala67</li>
        <li>lala68</li>
        <li>lala69</li>
        <li>lala70</li>
        <li>lala71</li>
        <li>lala72</li>
        <li>lala73</li>
        <li>lala74</li>
        <li>lala75</li>
        <li>lala76</li>
        <li>lala77</li>
        <li>lala78</li>
        <li>lala79</li>
        <li>lala80</li>
        <li>lala81</li>
        <li>lala82</li>
        <li>lala83</li>
        <li>lala84</li>
        <li>lala85</li>
        <li>lala86</li>
        <li>lala87</li>
        <li>lala88</li>
        <li>lala89</li>
        <li>lala90</li>
        <li>lala91</li>
        <li>lala92</li>
        <li>lala93</li>
        <li>lala94</li>
        <li>lala95</li>
        <li>lala96</li>
        <li>lala97</li>
        <li>lala98</li>
        <li>lala99</li>
        <li>lala100</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name:"category",
  data(){
    return {
      scorll:null
    }
  },
  mounted(){
    const wrapper=document.querySelector('.wrapper')
     this.scroll=new BScroll(wrapper,{
       probeType:3,
       pullUpLoad: true,
       click:true
     });
     this.scroll.on("scroll",(position)=>{
       /*  console.log(position); */
     });
     this.scroll.on("pullingUp",()=>{
       console.log("上拉加载更多");
       this.scroll.finishPullUp();
     })
  }
}
</script>

<style scoped> 
 .wrapper{
   height: 200px;
   background-color: #bfa;
   overflow: hidden;
 }
</style>