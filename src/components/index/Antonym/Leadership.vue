<template>
  <div class="content">
    <div class="left">
      <ul>
        <li v-for="(item,idx) in leftList" :key="idx"  @click="cleft(item,idx)">
<!--          <router-link :to="item.path" tag="a" :class="leftShow==idx?'select':''" >{{item.name}}</router-link>-->
          <a href="javascript:" :class="leftShow==idx?'select':''">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Leadership",
      data(){
          return {
            leftList:[
              {path:'tableMysuqiu',name:'在线诉求统计'},
              {path:'tableSqbl',name:'诉求办理统计'},
            ],
            leftShow:0
          }
      },
      created() {


      },
      methods:{
        cleft(a,i){
          this. leftShow=i;

          this.$router.push(a.path);
        },
      }
    }
</script>

<style scoped lang="less">
.content{
  width: 1200px;
  overflow: hidden;
  .left{
    float: left;
    margin-right: 20px;
    width:186px;
    border:1px solid rgba(230,230,230,1);
    border-top: none;
    background: #fff;
    li{
      a{
        display: block;
        cursor: pointer;
        width:166px;
        height: 50px;
        line-height: 50px;
        border-top: 1px solid rgba(230,230,230,1);
        font-size:18px;
        font-weight:400;
        color:#454545;
        padding-left: 20px;
      }
      a.select{
        color: #E84012;
        border-top: 1px solid #FF6A42;
      }
      a:hover{
        color: #E84012;
        border-top: 1px solid #FF6A42;
      }
    }

  }
  .right{
    float: left;
    width:949px;
    background: #fff;
    min-height: 780px;
    border:1px solid rgba(217,217,217,1);
    padding:17px 20px ;
  }
}
</style>
