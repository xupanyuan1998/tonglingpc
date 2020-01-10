<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="warp">
        <h2>金融创新产品</h2>
      <div class="con">
        <p>即将上线，敬请期待！</p>
      </div>
    </div>
    <div class="footer">
      <footer-nav></footer-nav>
    </div>
  </div>
</template>

<script>
  import headNav from "../../headNav";
  import footerNav from "../../footer"
  export default {
    name: "jinrong",
    components:{
      headNav,
      footerNav
    },
    data(){
      return {
        toptitle:'铜陵市民营经济云服务智慧平台',
        clectnav: 4,
        placeshow:false
      }
    },
    methods:{
    }
  }
</script>
<style scoped lang="less">
  .hello{
    background: #fff;
  }
  .warp{
    width: 1200px;
    margin: 20px auto;
    background: #fff;
    min-height: 500px;
    h2{
      height: 40px;
      line-height: 40px;
      padding: 10px;
      margin:0 10px ;
      font-size: 20px;
      color: #fe0000;
      font-weight: 500;
      border-bottom: 2px solid #fe0000;
    }
    .con{
      p{
        margin: 50px 0;
        text-align: center;
        font-size: 18px;
        color: #666;
        font-weight: bold;
      }
    }
  }
</style>
