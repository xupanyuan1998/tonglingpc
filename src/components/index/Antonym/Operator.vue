<template>
    <div class="Operator">
      <div class="tab">
        <ul>
          <li v-for="(item,idx) in tabList" :key="idx" :class="idx==showr?'slec':''" @click="clse(idx)">
            <router-link :to="item.path">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Operator",
    data(){
          return{
            tabList:[
              {path:'list',name:'我的工单'},
              {path:'tableMq',name:'我的办理企业'},
              {path:'tableMysuqiu',name:'诉求办理统计'},
            ],
            showr:''
          }
    },
      methods:{
        clse(i){
          this.showr=i;
        }
      }
    }
</script>

<style scoped lang="less">
.Operator{
  background: #fff;
  width: 1200px;
  .tab{padding-top: 10px;
  ul{
   height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 30px;
    li{
      padding: 0 15px;
      height: 50px;
      background: #f2f2f2;
      a{
        font-size: 18px;
        text-align: center;
        line-height: 50px;
      }
    }
    li:hover{
      background: #e7390a;
      border: 1px solid #e3dede;
      a{
        color: #fff;
      }
    }
    li.slec{
      background: #e7390a;
      border: 1px solid #f2f2f2;
      a{
        color: #fff;
      }
    }
  }
  }
  .content{
    background: #fff;
    min-height: 700px;
  }
}
</style>
