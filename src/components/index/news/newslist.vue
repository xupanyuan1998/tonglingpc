<template>
    <div class="hello">
      <div class="top">
        <head-nav :clect="clectnav" :title="toptitle"></head-nav>
      </div>
      <div class="container">
        <div class="nav">
          <span @click="goindex">首页</span><b> ></b><span >新闻列表</span>
        </div>
        <div class="line"></div>
      </div>
      <div class="warp">
        <div class="left">
          <h3 v-for="(item,index) in leftList" :key="index" :class="leftShow==item.cateogryId?'select':''" @click="cleft(item)">{{item.name}}新闻</h3>
        </div>
        <div class="right">
          <h2>{{titop}}新闻</h2>
          <div class="serch">
            <input type="text" placeholder="请输入关键字" v-model="serch">
            <button @click="serchas">搜索</button>
          </div>
          <ul class="addlist">
            <li v-for="(item,idx) in newsList" :key="idx" :class="idx%5==4?'five':''"><b></b> <router-link :to="{path:'/newslist/newsdetali',query:{id:item.newsId}}" tag="a">{{item.title}}</router-link> <span>{{clearFen(item.addTime)}}</span></li>
          </ul>
          <div class="page">
            <!--        分页组件-->
            <div>
              <!--          <page-component :page-config="pageConfigPageTotal"></page-component>-->
              <div class="pageComponent" v-if="pageConfig.total">
                <!--上一页-->
                <button @click="prePage" :disabled="currentPage === 1"  class="pagess">上一页</button>
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
                <button @click="nextPage" :disabled="currentPage === pageTotal"  class="pagess">下一页</button>
              </div>
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
    import footerNav from '../../footer'
    import '../../../assets/css/page.less'
    import  '../../../assets/css/list.less'
    export default {
        name: "newslist",
        components:{headNav,footerNav},
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 0,
                showPageNo:8,
                currentPage:1,
                pageTotal: '',//总的页数
                pageConfig: {
                    pageSize: '',     //一页的数据条数
                    total: '',         //总的数据条数
                },
                newsList:[],
                serch:'',
                leftList:'',
                leftShow:'',
                titop:'',
            }
        },
        beforeCreate(){

        },
        created(){
          let id=this.$route.query.id;
          if(id==undefined){
            this.axios.post('/app/newnotice/newcategory',{type:1}).then((res)=>{
              console.log(res.data.data);
              this.leftList=res.data.data;
              this.leftShow=res.data.data[0].cateogryId;
              console.log(res.data.data[0].cateogryId);
              this.titop=res.data.data[0].name;
              this.getnewList(20,this.currentPage,this.serch,this.leftShow);
            })
          }else {
            this.axios.post('/app/newnotice/newcategory',{type:1}).then((res)=>{
              console.log(res.data.data);
              this.leftList=res.data.data;
              this.leftShow=res.data.data[id].cateogryId;
              this.titop=res.data.data[id].name;
              this.getnewList(20,this.currentPage,this.serch,this.leftShow);
            })
          }

        },
        methods:{
            cleft(i){
                this.leftShow=i.cateogryId;
                this.titop=i.name;
                this.getnewList(20,this.currentPage,this.serch,this.leftShow);
            },
            goindex(){
                this.$router.push('/')
            },
            serchas(){
                this.getnewList(20,this.currentPage,this.serch,this.leftShow);
            },
            prePage(){
                this.currentPage -= 1;
                this.getnewList(20,this.currentPage,this.serch,this.leftShow);
            },
            nextPage(){
                this.currentPage += 1;
                this.getnewList(20,this.currentPage,this.serch,this.leftShow);
            },
            changeCurrentPage(i){
                this.currentPage = i;
                this.getnewList(20,this.currentPage,this.serch,this.leftShow);
            },
            getnewList(a,b,c,d){
                this.axios.post('/web/newnotice/newlist',{title:c,categoryId:d,size:a,current:b}).then(({data})=>{
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
  .hello{
    background: #ffff;
  }
  .warp{
    width: 1200px;
    margin: 0 auto 30px auto;
    padding-top: 21px ;
    overflow: hidden;
    .left{
      float: left;
      margin-right: 20px;
      width:186px;
      border:1px solid rgba(230,230,230,1);
      border-top: none;
      background: #fff;

      h3{
        cursor: pointer;
        width:186px;
        height: 50px;
        line-height: 50px;
        border-top: 1px solid rgba(230,230,230,1);
        text-align: center;
        font-size:18px;
        font-weight:400;
        color:#454545;
      }
      h3.select{
        color: #E84012;
        border-top: 1px solid #FF6A42;
      }
      h3:hover{
        color: #E84012;
        border-top: 1px solid #FF6A42;
      }
    }
    .right{
      background: #fff;
      float: left;
      width:949px;
      min-height: 780px;
      border:1px solid rgba(217,217,217,1);
      padding:17px 20px ;
      position: relative;
      .serch{
        position: absolute;
        top: 15px;
        right: 81px;
        width:204px;
        height:36px;
        border-radius:0px 4px 4px 0px;
        input{
          display: block;
          float: left;
          outline: none;
          height: 34px;
          border:1px solid rgba(179,179,179,1);
          line-height: 34px;
          width: 122px;
          padding:0 10px;
        }
        input:focus{
          border:1px solid #ff744f;
          width: 122px;
          height: 34px;
          outline:none;
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
        button:hover{
          background:#f00;
        }
      }
      h2{
        height: 49px;
        border-bottom: 5px solid #efefef;
        line-height: 49px;
        font-size:20px;
        font-weight:400;
        color:rgba(231,57,10,1);
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
