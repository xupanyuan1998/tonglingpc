<template>
    <div class="hello">
      <div class="top">
        <head-nav :clect="clectnav" :title="toptitle"></head-nav>
      </div>
      <div class="warp">
        <div class="title">
          <h2>政策信息</h2>
          <div class="serch">
            <input type="text" placeholder="请输入关键字" v-model="serch">
            <button>搜索</button>
          </div>
        </div>
        <div class="list">
          <ul>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
            <li><router-link to="" tag="a"><b></b><span>关于组织开展减税惠企政策微信有奖答题活动的通知</span><em>2019-02-17</em></router-link></li>
          </ul>
        </div>
        <div class="page">
          <!--        分页组件-->
          <div>
            <!--          <page-component :page-config="pageConfigPageTotal"></page-component>-->
            <div class="pageComponent" v-if="pageConfig.total">
              <!--上一页-->
              <button @click="prePage" :disabled="currentPage === 1">上一页</button>
              <!--总页数小于8的-->
              <template v-if="pageTotal <= showPageNo">
                <button v-for="i in pageTotal" @click="changeCurrentPage(i)" :class="{active:i === currentPage}" :key="i">{{i}}</button>
              </template>
              <template v-else-if="currentPage < 4">
                <button v-for="i in 6" @click="changeCurrentPage(i)" :class="{active:i === currentPage}" :key="i">{{i}}</button>
                <button :disabled="true">···</button>
                <button @click="changeCurrentPage(pageTotal)">{{pageTotal}}</button>
              </template>
              <template v-else-if="currentPage > pageTotal - 4">
                <button @click="changeCurrentPage(1)">1</button>
                <button :disabled="true">···</button>
                <button v-for="i in 6" @click="changeCurrentPage(i + (pageTotal - 6))" :class="{active:(i + (pageTotal - 6)) === currentPage}" :key="i">{{i + (pageTotal - 6)}}</button>
              </template>
              <template v-else>
                <button @click="changeCurrentPage(1)">1</button>
                <button :disabled="true">···</button>
                <button @click="changeCurrentPage(currentPage - 2)">{{currentPage - 2}}</button>
                <button @click="changeCurrentPage(currentPage - 1)">{{currentPage - 1}}</button>
                <button class="active">{{currentPage}}</button>
                <button @click="changeCurrentPage(currentPage + 1)">{{currentPage + 1}}</button>
                <button @click="changeCurrentPage(currentPage + 2)">{{currentPage + 2}}</button>
                <button :disabled="true">···</button>
                <button @click="changeCurrentPage(pageTotal)">{{pageTotal}}</button>
              </template>
              <!--下一页-->
              <button @click="nextPage" :disabled="currentPage === pageTotal">下一页</button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <footer-nav></footer-nav>
      </div>
    </div>
</template>

<script>
    import headNav from "../../headNav";
    import footerNav from "../../footer";
    export default {
        name: "indexserch",
        components: {
            headNav,
            footerNav
        },
        data(){
            return {
                clectnav: 0,
                toptitle:'铜陵市民营经济云服务智慧平台',
                showPageNo:8,
                currentPage:1,
                current:1,
                pageTotal: 5,//总的页数
                pageConfig: {
                    pageSize: 5,     //一页的数据条数
                    total: 500,         //总的数据条数
                },
            }
        },
        methods:{
            prePage(){
                this.currentPage -= 1;
            },
            nextPage(){
                this.currentPage += 1;

            },
            changeCurrentPage(i){
                this.currentPage = i;
            },
        }
    }
</script>

<style scoped lang="less">
  .hello{
    background: #f3f3f3;
  }
.warp{
  width: 1200px;
  margin: 20px auto 30px auto;
  background:rgba(255,255,255,1);
  border:1px solid rgba(217,217,217,1);
  .title{
    height: 63px;
    margin-left: 22px;
    width: 1130px;
    border-bottom: 1px solid #E7390A;
    position: relative;
    h2{
      padding-top: 20px;
      height: 43px;
      line-height: 43px;
      width:81px;
      font-size:20px;
      font-weight:400;
      color:rgba(231,57,10,1);
    }
    .serch{
      position: absolute;
      top:16px;
      right: 34px;
      height: 36px;
      overflow: hidden;
      input{
        display:block;
        float: left;
        width:182px;
        padding: 0 10px;
        height:34px;
        line-height: 34px;
        border:1px solid rgba(179,179,179,1);
        border-radius:0px 4px 4px 0px;
      }
      input:focus{
        border:1px solid #ff744f;
        outline:none;
      }
      button{
        float: left;
        display:block;
        width:60px;
        height:36px;
        background:rgba(231,57,10,1);
        border-radius:0px 4px 4px 0px;
        border: none;
        outline:none;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
      button:hover{
        background: #ee4f23;
      }
    }
  }
  .list{
    margin-left: 33px;
    width: 1100px;
    ul{
      width: 1100px;
      li{
        height: 42px;
        line-height: 42px;
        border-bottom: 1px dashed #D9D9D9;
        a{
          display: block;
          height: 42px;
          width: 100%;
          >*{
            display: block;
            float: left;
          }
          b{
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;
            border-left: 4px solid #e53509;
            margin: 16px 10px 16px 4px;
            float: left;
          }
          span{
            height: 42px;
            line-height: 42px;
            width:950px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(69,69,69,1);
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
          }
          em{
            float: right;
            margin-right: 7px;
            height: 42px;
            line-height: 42px;
            font-size:12px;
            font-weight:400;
            color:rgba(189,189,189,1);
          }
        }
      }
      li:last-child{
        border-bottom: none;
      }
      li:hover{
        a{
          span{
            color: #e7390a;
          }
        }
      }
    }
  }
  .page{
    margin-top: 28px;
    padding-bottom: 40px;
    text-align: center;
    div{
      display: inline-block;
    }
  }
}
</style>
<style scoped lang="less">
  .pageComponent {
    button {
      margin: 0 5px;
      background-color: #fff;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background: #E7390A;
        color: #fff;
      }
    }

    span {
      height: 28px;
      line-height: 28px;
    }
  }
</style>
