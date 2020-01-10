<template>
  <div>
    <div class="top">
      <head-nav :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span>首页</span><b> ></b><span>园区风采</span><b> ></b><span>企业</span>
      </div>
    </div>
    <div class="warp">
      <ul>
        <li v-for="(item,idx) in list" :key="idx" @click="goInt(item.companyId)">
          <img :src="item.companyLogo" alt="">
          <div>
            <h2>{{item.companyName}}</h2>
            <span> 所属行业:{{item.industry}}</span>
            <p>{{item.intro}}</p>
          </div>
        </li>
      </ul>
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
    import footerNav from '../../footer'
    export default {
        name: "Corporationlist",
        components:{headNav,footerNav},
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 3,
                showPageNo:8,
                currentPage:1,
                pageTotal: '',//总的页数
                pageConfig: {
                    pageSize: 7,     //一页的数据条数
                    total: '',         //总的数据条数
                },
                serch:{
                    chan:'',
                    gui:'',
                    di:'',
                    sousuo:''
                },
                list:'',
            }
        },
        created(){
            let datas;
            if(JSON.stringify(this.$route.query)==="{}"){
                datas={
                    current:this.currentPage,//页码
                    size:this.pageConfig.pageSize,//每页的条数
                    title:' ',//搜索内容
                    industryId:' ',//产业id
                    regionId:' ',//地区id
                    scaleId:' ',//规模id
                };

            }else{
                this.serch=this.$route.query;
                datas={
                    current:this.currentPage,//页码
                    size:this.pageConfig.pageSize,//每页的条数
                    title:this.serch.sousuo,//搜索内容
                    industryId:this.serch.chan,//产业id
                    regionId:this.serch.di,//地区id
                    scaleId:this.serch.gui,//规模id
                };
            }


            this.getList(datas)

        },
        methods:{
            prePage(){
                this.currentPage -= 1;
                var datas={
                    current:this.currentPage,//页码
                    size:this.pageConfig.pageSize,//每页的条数
                    title:this.serch.sousuo,//搜索内容
                    industryId:this.serch.chan,//产业id
                    regionId:this.serch.di,//地区id
                    scaleId:this.serch.gui,//规模id
                };
                this.getList(datas)
            },
            nextPage(){
                this.currentPage += 1;
                var datas={
                    current:this.currentPage,//页码
                    size:this.pageConfig.pageSize,//每页的条数
                    title:this.serch.sousuo,//搜索内容
                    industryId:this.serch.chan,//产业id
                    regionId:this.serch.di,//地区id
                    scaleId:this.serch.gui,//规模id
                };
                this.getList(datas);
            },
            changeCurrentPage(i){
                this.currentPage = i;
                var datas={
                    current:this.currentPage,//页码
                    size:this.pageConfig.pageSize,//每页的条数
                    title:this.serch.sousuo,//搜索内容
                    industryId:this.serch.chan,//产业id
                    regionId:this.serch.di,//地区id
                    scaleId:this.serch.gui,//规模id
                };
                this.getList(datas);
            },
            //获取列表
            getList(datas){
                this.axios.post('/web/company/companylist',datas).then(({data})=>{
                    console.log(data.data);
                    this.pageTotal=data.data.pages;
                    this.currentPage=data.data.current;
                    this. pageConfig.pageSize=data.data.size;
                    this. pageConfig.total=data.data.total;
                    this.list=data.data.records;
                })
            },
            //企业详情
            goInt(i){
                this.$router.push({path:'/Corporation/myspace',query:{
                    id:i
                    }})
            }
        }
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
    width: 1200px;
    margin: 0 auto 20px auto;
    overflow: hidden;
    margin-top: 21px;
    height:1200px;
    position: relative;
    border:1px solid rgba(230,230,230,1);
    border-bottom: none;
    ul{
      padding-top: 17px;
      padding-bottom: 110px;
      li:hover{
        div{
          h2{
            color: #e7390a;
          }
        }
      }
      li{
        cursor: pointer;

        width: 1024px;
        margin-left: 20px;
        height: 100px;
        border-bottom: 1px dashed #e6e6e6;
        padding: 30px 0;

        img{
          display: block;
          float: left;
          width:140px ;
          height: 100px;
        }
        div{
          float: left;
          margin-left: 30px;
          width: 854px;
          height: 100px;
          overflow: hidden;
          h2{
            height:30px;
            font-size:20px;
            font-weight:bold;
            color:rgba(69,69,69,1);
            line-height:30px;
          }
          span{
            display: block;
            height:21px;
            font-size:14px;
            font-weight:400;
            color:rgba(69,69,69,1);
            line-height:21px;
          }
          p{
            width:849px;
            height:42px;
            font-size:14px;
            font-weight:400;
            color:rgba(69,69,69,1);
            line-height:21px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;

          }
        }
      }
      li:last-child{
        border-bottom: none;
      }
    }
  }
  .page {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%);
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
      background-color: #f4f4f5;
      color: #606266;
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
      border: 0;
      &[disabled]{
        color: #c0c4cc;
        cursor: not-allowed;
      }
      &.active{
        cursor: not-allowed;
        background:#E7390A;
        color: #fff;
      }
    }
  }
</style>
