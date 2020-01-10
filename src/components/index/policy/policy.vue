<template>
    <div class="hello">
      <div class="top">
        <head-nav :clect="clectnav" :title="toptitle"></head-nav>
      </div>
      <div class="container">
        <div class="nav">
          <span @click="goindex">首页</span><b> ></b><span >通知公告</span>
        </div>
        <div class="line"></div>
      </div>
      <div class="warp">
        <div class="left">
          <h3 v-for="(item,idx) in leftList" :key="idx" :class="idx==left_show?'select':''" @click="showslect(idx,item)">{{item.name}}</h3>
      </div>
        <div class="right">
          <div class="serch">
            <input type="text" placeholder="请输入关键字">
            <button @click="serchsAs">搜索</button>
          </div>
          <h1 >{{title}}</h1>
          <ul class="addlist">
            <li v-for="(item,idx) in newsList" :key="idx" :class="idx%5==4?'five':''"><b></b><router-link tag="a" :to="{path:'/policy/policydetali',query:{id:item.noticeId,cate:cates}}">{{item.title}}</router-link><span>{{clearFen(item.publishTime)}}</span></li>
          </ul>
          <div class="page">
            <!--        分页组件-->
            <div>
              <!--          <page-component :page-config="pageConfigPageTotal"></page-component>-->
              <div class="pageComponent" v-if="pageConfig.total">
                <!--上一页-->
                <button @click="prePage" :disabled="currentPage === 1" class="pagess">上一页</button>
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
                <button @click="nextPage" :disabled="currentPage === pageTotal" class="pagess">下一页</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <footer-nav></footer-nav>
      </div>
      <place :placeshow="placeshow"  @hide="placeshow = false" :success="success"></place>
    </div>
</template>

<script>
  import headNav from "../../headNav";
  import footerNav from '../../footer'
  import '../../../assets/css/page.less';
  import place  from '../../../place/place'
  import  '../../../assets/css/list.less'
  //分页组件
    export default {
        name: "policy",
        components:{headNav,footerNav,place},
        data(){
            return {
                clectnav: 0,
                toptitle:'铜陵市民营经济云服务智慧平台',
                newsList:[],
                showPageNo:6,
                currentPage:1,
                pageTotal: '',//总的页数
                pageConfig: {
                    pageSize: '',     //一页的数据条数
                    total: '',         //总的数据条数
                },
                left_show:0,
                serch: '',
                categoryId:'',
                leftList:'',
                placeshow:false,
                success:2,
              title:'',
              //提示弹框
              //用户信息和登录状态;
              token:'',
              personal:'',
              cates:'',

            }
        },
        methods:{
            goindex(){
                this.$router.push('/')
            },
            serchsAs(){
                this.getnewList(20,this.currentPage,this.serch,this.categoryId);
            },
            prePage(){
                this.currentPage -= 1;
                this.getnewList(20,this.currentPage,this.serch,this.categoryId);
            },
            nextPage(){
                this.currentPage += 1;
                this.getnewList(20,this.currentPage,this.serch,this.categoryId);
            },
            changeCurrentPage(i){
                this.currentPage = i;
                this.getnewList(20,this.currentPage,this.serch,this.categoryId);
            },
            getnewList(a,b,c,d){
                this.axios.post('/web/newnotice/noticelist',{title:c,categoryId:d,size:a,current:b}).then(({data})=>{
                    // console.log(data);
                   this.pageTotal=data.data.pages;
                   this.currentPage=data.data.current;
                   this. pageConfig.pageSize=data.data.size;
                   this. pageConfig.total=data.data.total;
                    this.newsList=data.data.records;
                })
            },
            showslect(i,b){
              if(b.name=='征求意见') {
                if (this.token == null) {
                  this.placeshow = true;
                  return
                }
                console.log(this.personal);;;
                if (this.personal.roleId !=1) {
                  this.placeshow = true;
                  this.success=0;
                  return
                }
              }
                this.left_show=i;
                this.categoryId=b.cateogryId;
                this.title=b.name;
                this.getnewList(20,this.currentPage,this.serch,this.categoryId);
            },
            clearFen(i){
                return i.substring(0,i.indexOf(' '))
            },
        },
        created() {
          var leftCate=this.$route.query.cate;
          this.token=localStorage.getItem('token');
          this.personal=JSON.parse(localStorage.getItem('personal'));
          if(leftCate==undefined){
            this.left_show=0;
            this.axios.post('/web/newnotice/newcategory',{type:2}).then((data)=>{
              console.log(data.data);
              this.leftList=data.data.data;
              this.categoryId=data.data.data[0].cateogryId;
              this.title=data.data.data[0].name;
              var a='';
              for (var i=0;i<data.data.data.length;i++){
                if(data.data.data[i].name=='征求意见'){
                  a=data.data.data[i].cateogryId
                }
              }
              this.cates=a;
              this.getnewList(20,1,this.serch,this.categoryId);
            });
          }else{
            this.left_show=leftCate;
            this.axios.post('/web/newnotice/newcategory',{type:2}).then((data)=>{
              console.log(data.data);
              this.leftList=data.data.data;
              this.categoryId=data.data.data[3].cateogryId;
              this.title=data.data.data[3].name;
              var a='';
              for (var i=0;i<data.data.data.length;i++){
                if(data.data.data[i].name=='征求意见'){
                  a=data.data.data[i].cateogryId
                }
              }
              this.cates=a;
              this.getnewList(20,1,this.serch,this.categoryId);
            });
          }
          //获取用户登录状态和个人信息


        }
    }
</script>

<style scoped lang="less">
  .hello{
    background: #fff;
  }
  .warp{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 21px;
    padding-bottom: 30px;
    .left{
      float: left;
      margin-right: 20px;
      background: #fff;
      width:186px;
      border:1px solid rgba(230,230,230,1);
      border-top: none;
      cursor: default;
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
      border:1px solid rgba(217,217,217,1);
      padding:17px 20px ;
      position: relative;
      .serch{
        position: absolute;
        top: 12px;
        right: 81px;
        width:204px;
        height:36px;
        border-radius:0px 4px 4px 0px;
        input{
          display: block;
          float: left;
          outline: none;
          border:1px solid rgba(179,179,179,1);
          height: 34px;
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
      h1{
        width: 949px;
        height: 50px;
        line-height: 50px;
        border-bottom: 5px solid #efefef;
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


