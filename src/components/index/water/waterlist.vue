<template>
    <div>
      <div class="top">
        <head-nav :title="toptitle"></head-nav>
      </div>
      <div class="container">
        <div class="nav">
          <span>首页</span><b> ></b><span>水</span>
        </div>
      </div>
      <div class="warp">
        <h2>水服务</h2>
        <div class="serch">
          <input type="text" placeholder="请输入关键字" v-model="serch">
          <button @click="serchas">搜索</button>
        </div>
        <ul>
          <li v-for="(item,idx) in newsList" :key="idx"><b></b> <router-link :to="{path:'/newslist/newsdetali',query:{id:item.newsId}}" tag="a">{{item.title}}</router-link> <span>{{clearFen(item.addTime)}}</span></li>
        </ul>
      </div>
      <div class="page">
        <!--        分页组件-->
        <div>
          <!--          <page-component :page-config="pageConfigPageTotal"></page-component>-->
          <div class="pageComponent" v-if="pageConfig.total">
            <!--上一页-->
            <button @click="prePage" :disabled="currentPage === 1" style="border: none">上一页</button>
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
            <button @click="nextPage" :disabled="currentPage === pageTotal" style="border: none">下一页</button>
            <button style="background: #fff;font-size:16px;font-weight:400;color:rgba(51,51,51,1);border: none;">共 <b style="color: #E7390A;">{{ pageConfig.total}}</b>条数据</button>
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
    import footerNav from '../../footer'
    export default {
        name: "newslist",
        components:{headNav,footerNav},
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 1,
                showPageNo:8,
                currentPage:1,
                pageTotal: '',//总的页数
                pageConfig: {
                    pageSize: '',     //一页的数据条数
                    total: '',         //总的数据条数
                },
                newsList:[],
                serch:''
            }
        },
        created(){
            this.getnewList(20,this.currentPage,this.serch);
        },
        methods:{
            serchas(){
                this.getnewList(20,this.currentPage,this.serch);
            },
            prePage(){
                this.currentPage -= 1;
                this.getnewList(20,this.currentPage,this.serch);
            },
            nextPage(){
                this.currentPage += 1;
                this.getnewList(20,this.currentPage,this.serch);
            },
            changeCurrentPage(i){
                this.currentPage = i;
                this.getnewList(20,this.currentPage,this.serch);
            },
            getnewList(a,b,c){
                this.axios.post('/web/newnotice/newlist',{title:c,categoryId:' ',size:a,current:b}).then(({data})=>{
                    console.log(data);;;
                    this.pageTotal=data.data.pages;
                    this.currentPage=data.data.current;
                    this. pageConfig.pageSize=data.data.size;
                    this. pageConfig.total=data.data.total;
                    this.newsList=data.data.records;
                })
            },
            showslect(i){
                this.left_show=i;
            },
            clearFen(i){
                return i.substring(0,i.indexOf(' '))
            },
        },
    }
</script>

<style scoped lang="less">
  .container {
    width: 100%;
    height: 32px;
    background: rgba(245, 245, 245, 1);
    .nav {
      width: 1200px;
      height: 32px;
      margin: 0 auto;
      span {
        display: block;
        float: left;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-right: 10px;
      }
      b {
        display: block;
        float: left;
        height: 32px;
        line-height: 32px;
        margin-right: 10px;
      }
    }
  }
  .warp{
    width: 1130px;
    margin: 0 auto;
    padding: 34px 50px 0 20px;
    position: relative;
    .serch{
      position: absolute;
      top: 33px;
      right: 81px;
      width:204px;
      height:36px;
      border:1px solid rgba(179,179,179,1);
      border-radius:0px 4px 4px 0px;
      input{
        display: block;
        float: left;
        border: none;
        outline: none;
        height: 36px;
        line-height: 36px;
        width: 124px;
        padding:0 10px;
      }
      button{
        cursor: pointer;
        display: block;
        float: left;
        border: none;
        outline: none;
        width:60px;
        height:36px;
        background:rgba(231,57,10,1);
        border-radius:0px 4px 4px 0px;
        text-align: center;
        line-height: 36px;
        font-size:14px;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
    h2{
      height: 49px;
      border-bottom: 1px solid #E7390A;
      line-height: 49px;
      font-size:20px;
      font-weight:400;
      color:rgba(231,57,10,1);
    }
    ul{
      width: 1100px;
      height: 650px;
      padding:  0 18px 12px;
      li{
        height: 41px;
        line-height: 41px;
        border-bottom: 1px dashed #c5c5c5;
        b{
          display: block;
          float: left;
          margin: 16px 10px 16px 6px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 4px 0 4px 4px;
          border-color: transparent transparent transparent #e53509;
        }
        a{
          display: block;
          float: left;
          height: 41px;
          line-height: 41px;
          width: 990px;
          overflow: hidden;
          margin-right: 7px;
          font-size:14px;
          font-weight:400;
          color:rgba(69,69,69,1);
        }
        span{
          display: block;
          float: right;
          height: 41px;
          line-height: 41px;
          font-size: 12px;
          color: #bdbdbd;
        }
      }
      li:hover{
        a{
          color: #e7390a;
        }
      }
      li:last-child{
        border: none;
      }
    }
  }
  .page{
    margin: 30px 0;
    text-align: center;
    div{
      display: inline-block;
    }
  }
</style>
<style scoped lang="less">
  .pageComponent {
    button{
      margin: 0 5px;
      background-color: #fff;
      color: #333;
      outline:none;
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
      border:1px solid rgba(101,101,101,1);
      &[disabled]{
        color: #c0c4cc;
        cursor: not-allowed;
      }
      &.active{
        cursor: not-allowed;
        background:#E7390A;
        color: #fff;
        border: none;
      }
    }
  }
</style>
