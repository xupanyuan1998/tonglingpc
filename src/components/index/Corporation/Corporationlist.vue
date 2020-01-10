<template>
  <div>
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="warp">
      <div class="choose">
        <ul>
          <li class="item" v-for="(item,idx) in shaixuan" :key="idx"><div class="left">{{item.name}}：</div>
            <ol>
              <li v-for="(items,ids) in item.childcategorylist" :key="ids" :class="{'active':items.active}" @click="clectItem(idx,items)">{{items.name}}</li>
            </ol>
          </li>
        </ul>
        <div class="name">
          <div class="left">企业名称：</div>
          <input type="text" v-model="name">
        </div>
        <p>
          <button @click="serchs">搜索</button>
          <button @click="result">重置</button>
        </p>
      </div>
     <div class="list">
       <ul>
         <li v-for="(item,idx) in list" :key="idx">
           <img :src="item.companyLogo" alt="">
           <div>
             <h2  @click="goInt(item.companyId)">{{item.companyName}}</h2>
             <span> 所属行业:{{item.industry}}</span>
             <p>{{item.intro}}</p>
           </div>
         </li>
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
    import footerNav from '../../footer'
    export default {
        name: "Corporationlist",
        components:{headNav,footerNav},
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 5,
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
              shaixuan:'',
              tiao:'',
              name:''
            }
        },
        created(){
          var ais=this.$route.query.id;
          var b=this.$route.query.sousuo;
          /*
          * 判断 将页面传入的参数添加相应的选中效果*/
            this.axios.post('/web/companytype/companytype').then(({data})=>{
              console.log(data.data);
              var arr=data.data;
              for (var a=0;a<arr.length;a++){
                for (var i=0;i<arr[a].childcategorylist.length;i++){
                  arr[a].childcategorylist[i].active=false;
                }
              };
              //循环查找 页面传入的选中id
              console.log(ais,ais!='');
              if(ais!=null){
              var   arr1=ais.toString().split(',');
                if(arr1.length>0){
                  for(var c=0;c<arr1.length;c++){
                    for(var d=0;d<arr.length;d++){
                      for (var e=0;e<arr[d].childcategorylist.length;e++){
                        if(arr1[c]==arr[d].childcategorylist[e].categoryId){
                          arr[d].childcategorylist[e].active=true;
                        }
                      }
                    }
                  }
                }
              };
              this.shaixuan=arr;
            });
            if(b==undefined){
              this.name='';
            }else{
              this.name=b;
            };
            if(ais==''){
              ais=null;
            };
          var datas={
            current:this.currentPage,//页码
            size:this.pageConfig.pageSize,//每页的条数
            title:this.name,//搜索内容
            ids:ais
          };
            this.getList(datas)
        },
        methods:{
            prePage(){
                this.currentPage -= 1;
              if(this.tiao==''){
                this.tiao=null;
              }
              var datas={
                current:this.currentPage,//页码
                size:this.pageConfig.pageSize,//每页的条数
                title:this.name,//搜索内容
                ids:this.tiao
              };
              this.getList(datas)
            },
            nextPage(){
                this.currentPage += 1;
              if(this.tiao==''){
                this.tiao=null;
              }
              var datas={
                current:this.currentPage,//页码
                size:this.pageConfig.pageSize,//每页的条数
                title:this.name,//搜索内容
                ids:this.tiao
              };
              this.getList(datas)
            },
            changeCurrentPage(i){
                this.currentPage = i;
              if(this.tiao==''){
                this.tiao=null;
              }
              var datas={
                current:this.currentPage,//页码
                size:this.pageConfig.pageSize,//每页的条数
                title:this.name,//搜索内容
                ids:this.tiao
              };
              this.getList(datas)
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
            },
            //选择搜索条件
          clectItem(a,b){
              var that=this;
              console.log(a,b)
              /*
              * a:当前点击的选项的父级的下标
              * b：当前选择的选项的数据*/
              this.$nextTick(function () {
                this.shaixuan[a].childcategorylist.forEach(function (b) {
                  that.$set(b,'active',false);
                })
                this.$set(b,'active',true);
              })
          },
          serchs(){
            if(this.tiao==''){
              this.tiao=null;
            }
            var datas={
              current:this.currentPage,//页码
              size:this.pageConfig.pageSize,//每页的条数
              title:'',//搜索内容
              ids:this.tiao
            };
            this.getList(datas);
          },
          result(){
              let arr=this.shaixuan;
              this.tiao='';
              this.name='';
              for (var a=0;a<arr.length;a++){
              for (var i=0;i<arr[a].childcategorylist.length;i++){
                arr[a].childcategorylist[i].active=false;
              }
            }
          },
        },
      watch:{
        shaixuan:{
            handler(newVal){
              console.log(newVal);
              var str='';
              for(var a=0;a<newVal.length;a++){
                for (var i=0;i<newVal[a].childcategorylist.length;i++){
                  if(newVal[a].childcategorylist[i].active==true){
                    str+=newVal[a].childcategorylist[i].categoryId+',';
                  }
                }
              };
              this.tiao=str;
            },
          immediate: true,
          deep: true
        }
      }
    }
</script>
<style scoped lang="less">
  .warp{
    width: 1200px;
    margin: 20px auto ;
    overflow: hidden;
    position: relative;
    .choose{
      border-bottom: 30px;
      ul{
        width: 100%;
        .item{
          overflow: hidden;
          font-size: 16px;
          color: #666;
          margin-bottom:20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #efefef;
          .left{
            float: left;
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: right;
          }
          ol{
            float: left;
            width: 1080px;
            overflow: hidden;
            li{
              float: left;
              height: 30px;
              padding: 0 10px;
              cursor: pointer;
              line-height: 30px;
              margin-right: 20px;
              margin-bottom: 10px;
              text-align: center;
            }
            li.active{
              background: #e7390a;
              color: #fff;
            }
          }
        }
      }
      p{
        margin: 20px 0;
        height: 30px;
        padding-left: 110px;
        button{
          cursor: pointer;
          width: 80px;
          height: 30px;
          line-height: 30px;
          display: inline-block;
          text-align: center;
          margin-right: 30px;
          border: none;
          outline: none;
          border-radius: 4px;
        }
        button:hover{
          background:#ccc ;
        }
        button:first-child{
          background: #66CCFF;
          color: #fff;

        }
        button:first-child:hover{
          background:#2BB4F8 ;
        }
      }
      .name{
        overflow: hidden;
        .left{
          height: 30px;
          line-height: 30px;
          width: 100px;
          font-size: 16px;
          float: left;
          text-align: right;
        }
        input{
          margin-left: 10px;
          font-size: 16px;
          height: 28px;
          line-height: 28px;
          display: block;
          float: left;
          outline: none;
          border: 1px solid #666;
          width: 240px;
          padding: 0 10px;
        }
        input:focus{
          border:1px solid #e7390a ;
        }
      }
    }
    .list{
      ul{
        padding-top: 17px;
        height:1200px;
        padding-bottom: 110px;
        li{
          width: 1200px;
          height: 100px;
          border-bottom: 1px dashed #e6e6e6;
          padding: 30px 0;

          img{
            display: block;
            float: left;
            width:140px ;
            height: 100px;
            cursor: pointer;
          }
          div{
            float: left;
            margin-left: 30px;
            width: 1030px;
            height: 122px;
            overflow: hidden;
            h2{
              height:30px;
              font-size:20px;
              font-weight:bold;
              color:rgba(69,69,69,1);
              line-height:30px;
              cursor: pointer;
            }
            h2:hover{
              color: #e7390a;
            }
            span{
              display: block;
              height:30px;
              font-size:16px;
              font-weight:400;
              color:rgba(69,69,69,1);
              line-height:30px;
            }
            p{
              width:1030px;
              height:60px;
              font-size:16px;
              font-weight:400;
              color:rgba(69,69,69,1);
              line-height:30px;
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
  }
  .page {
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
