<template>
    <div class="hello">
      <div>
        <head-nav :clect="clectnav" :title="toptitle"></head-nav>
      </div>
      <div class="warp">
        <div class="left">
          <ul>
            <li v-for="(item,idx) in leftList" :key="idx" @click="leftshow(idx)" :class="{'slec':clect==idx}">{{item}}</li>
          </ul>
        </div>
        <div class=" right jingyan" v-show="clect==0">
          <p class="places">我们认真聆听各地先进民营企业服务经验，如果您有好的建议或意见，请留言或上传相关材料，感谢您提出宝贵建议。</p>
          <ul>
            <li>
              <div class="lefts"><b>*</b><span> 标题</span></div><input type="text" v-model="title">
              <div class="title" id="title">标题不能为空</div>
            </li>
            <li>
              <div class="lefts"><b>*</b><span> 内容</span></div><textarea v-model="content"></textarea>
              <div class="title" id="content">内容不能为空</div>
            </li>
            <li>
              <div class="lefts"><span> 附件</span></div>
              <div class="rights">
                <div class="cc">
                  <button>点击上传相关材料</button>
                  <input type="file" title="" @change="addtu($event)" ref="addtu">
                </div>
                <em>{{fujian.name}}</em>
                <p>注意附件大小不超过10M，可上传txt，office文件，图片，音频，视频类型的文件</p>
              </div>
            </li>
          </ul>
          <button class="save" @click="save">提交</button>
        </div>
        <div class=" right zheng" v-show="clect==1">
          <div class="serch">
            <input type="text" placeholder="请输入关键字" v-model="serch">
            <button @click="serchsAs">搜索</button>
          </div>
          <h1>政策前瞻</h1>
          <ul class="addlist">
            <li v-for="(item,idx) in newsList" :key="idx"><b></b><router-link tag="a" :to="{path:'/gauge/gaugedeail',query:{id:item.newspolicyId}}">{{item.title}}</router-link><i v-if="item.isTop==1">置顶</i><span>{{clearFen(item.publishTime)}}</span></li>
          </ul>
          <div class="page">
            <!--        分页组件-->
              <!--          <page-component :page-config="pageConfigPageTotal"></page-component>-->
              <div class="pageComponent" v-if="pageConfig.total">
                <!--上一页-->
               <div>
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
      <div class="place" @mousewheel.prevent v-if="place" @click="cancle">
        <div class="dd"  v-if="waring==2">
          <img src="../../../../static/images/138.png" alt="">
          <p>您好!此功能仅供企业使用</p>
        </div>
      </div>
      <place  :placeshow="placeshow" :success="success" @hide="placeshow = false" :errorshow="plas" :succmsg="succmsg"></place>
    </div>
</template>

<script>
  var that;
  import headNav from "../../headNav";
  import footerNav from "../../footer";
  import '../../../assets/css/page.less';
  import  '../../../assets/css/list.less'
    export default {
        name: "gauge",
      components:{
        headNav,
        footerNav
      },
      data(){
          return{
            toptitle:'铜陵市民营经济云服务智慧平台',
            clectnav: 7,
            leftList:['经验推荐','政策前瞻'],
            clect:0,
            showPageNo:8,
            currentPage:1,
            pageTotal: 10,//总的页数
            pageConfig: {
              pageSize: 20,     //一页的数据条数
              total: 500,         //总的数据条数
            },
            placetitle:'',
            placeshow:false,
            success:2,
            plas:'',
            succmsg:'',
            title:'',
            content:'',
            fujian:{name:'',url:''},
            waring:0,
            serch:'',
            newsList:'',
            place:''
          }
      },
      beforeCreate(){
        that=this;
        this.token = localStorage.getItem("token");
        if(this.token==null){
          this.$router.push('/')
        }
      },
      created() {
        var a=JSON.parse(localStorage.getItem('personal'));
        this.msg=a;
        if (this.msg.roleId==3){
         this.leftList=['经验推荐','政策前瞻'];
        }else{
          this.leftList=['经验推荐'];
        }
        var id=this.$route.query.id;
        if(id==undefined){
         this.clect=0;
        }else{
          this.clect=id;
        }
      },
      methods:{
        clearFen(i){
          return i.substring(0,i.indexOf(' '))
        },
        leftshow(i){
          this.clect=i;
          if(i==1){
            var datas={
              categoryId:28,
              current:this.currentPage,
              size:this.pageConfig.pageSize,
              title:this.serch,
            };
            this.getlist(datas);
          }
        },
        save(){
          var that=this;
         if(this.msg.roleId!=1){
           this.place=true;
           this.waring=2;
         }else{
           $('#title').css({display:'none'});
           $('#content').css({display:'none'});
           if(this.title==''){
             $('#title').css({display:'block'});
           }else if(this.content==''){
             $('#content').css({display:'block'});
           }else{
             this.axios.post('/web/seeking/add',{
               title:this.title,
               content:this.content,
               attachmentName:this.fujian.name,
               attachment:this.fujian.url
             }).then(({data})=>{
               console.log(data);
               if (data.code==10001){
                 this.placeshow=true;
                 this.success=3;
                 this.succmsg=data.msg;
                 setTimeout(function () {
                   that.placeshow=false;
                   window.location.reload();
                 },2000)
               }else if(data.code==500){
                 this.placeshow=true;
                 this.success=5;
                 this.plas=data.msg;
                 setTimeout(function () {
                   this.placeshow=false;
                 },2000)
               }
             })
           }
         }
        },
        addtu(e){//提交文件
          var that=this;
          let formData = new FormData();
          let file=e.target.files[ 0 ];
          var fileSize = 0;
          var fileMaxSize = 10240;//10M
          if(file!=undefined){
            fileSize =file.size;
            var size = fileSize / 1024;
            if (size > fileMaxSize) {
              this.placeshow=true;
              this.success=5;
              this.plas='文件大小不能超过10MB';
              return false;
            }else if (size <= 0) {
              this.placeshow=true;
              this.success=5;
              this.plas='文件大小不能低于0MB'
              return false;
            }
            formData.append("img",file);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            };
            this.$http.post('/web/onlinework/file', formData, config).then(function (res) {
              that.fujian.name=res.data.data.name;
              that.fujian.url=res.data.data.url;
              that.$refs.addtu.value = null;
            })
          }else{
            return false;
          }

        },
        cancle(){
          this. place=false;
        },
        serchsAs(){
          var datas={
            categoryId:28,
            current:this.currentPage,
            size:this.pageConfig.pageSize,
            title:this.serch,
          };
          this.getlist(datas);
        },
        prePage(){
          this.currentPage -= 1;
          var datas={
            categoryId:28,
            current:this.currentPage,
            size:this.pageConfig.pageSize,
            title:this.serch,
          };
          this.getlist(datas);
        },
        nextPage(){
          this.currentPage += 1;
          var datas={
            categoryId:28,
            current:this.currentPage,
            size:this.pageConfig.pageSize,
            title:this.serch,
          };
          this.getlist(datas);
        },
        changeCurrentPage(i){
          this.currentPage = i;
          var datas={
            categoryId:28,
            current:this.currentPage,
            size:this.pageConfig.pageSize,
            title:this.serch,
          };
          this.getlist(datas);
        },
        //获取 政策前瞻列表
        getlist(datas){
          this.axios.post('/web/seeking/list',datas).then(({data})=>{
            console.log(data.data);;;
            this.pageTotal=data.data.pages;
            this.currentPage=data.data.current;
            this. pageConfig.pageSize=data.data.size;
            this. pageConfig.total=data.data.total;
            this.newsList=data.data.records;
          })
        },
      }
    }
</script>

<style scoped lang="less">
  .places{
    height: 76px;
    line-height: 76px;
    padding-left: 10px;
    font-size: 16px;
  }
  .hello{
    background: #f5f5f5;
  }
.warp{
  width: 1200px;
  overflow: hidden;
  margin: 0 auto;
  padding:30px 0;
  .left{
    display: block;
    float: left;
    margin-right: 20px;
    width:186px;
    border:1px solid rgba(230,230,230,1);
    border-top: none;
    background: #fff;
    ul{
      li{
        padding: 0 15px;
        height: 50px;
        background: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        border-top: 1px solid rgba(230,230,230,1);
        cursor: pointer;
      }
      li:hover{
          color: #e7390a;
        border-top: 1px solid #e7390a;
      }
      li.slec{
        color: #e7390a;
        border-top: 1px solid #e7390a;
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
  .jingyan{
    ul{
      width: 800px;
      margin: 20px 0;
      li{
        margin-bottom: 20px;
        overflow: hidden;
        .rights{
          width: 672px;
          float: left;
          overflow: hidden;
        }
        input{
          display: block;
          float: left;
          width:650px ;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          outline: none;
          border: 1px solid #ccc;
          cursor: pointer;
        }
        .title{
          width: 670px;
          float: left;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          margin-left: 80px;
          color: #FF4C4C;
          display: none;
        }
        input:focus{
          border:1px solid #ff744f;
        }
        em{
          display: block;
          float: left;
          height: 30px;
          line-height: 30px;
          font-weight: 400;
          font-size: 14px;
          margin-left: 20px;
        }
        .lefts{
          width: 60px;
          text-align: right;
          height: 30px;
          line-height: 30px;
          display: block;
          float: left;
          margin-right: 20px;
          font-size: 16px;
          color: #333;
          font-weight: 600;
          b{
            font-size: 16px;
            color: #ff0000;
          }
          span{
            font-size: 16px;
          }
        }
        textarea{
          display: block;
          float: left;
          width:650px ;
          height: 100px;
          padding: 10px;
          resize: none;
          line-height: 20px;
          font-size: 14px;
          outline: none;
          border: 1px solid #ccc;
          cursor: pointer;
        }
        textarea:focus{
          border:1px solid #ff744f;
        }
        .cc{
          float: left;
          height: 30px;
          width: 120px;
          position: relative;
          button{
            display: block;
            outline: none;
            border: none;
            height: 30px;
            width: 120px;
            position: absolute;
            top: 0;
            left: 0;
            background:#66CCFF;
            font-size: 12px;
            border-radius: 5px;
            color: #fff;
          }
          input{
            display: block;
            outline: none;
            border: none;
            height: 30px;
            width: 120px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            opacity: 0;
          }
        }
        .cc:hover{
          button{
            background: #2BB4F8;
          }
        }
        p{
          display: block;
          height: 30px;
          line-height: 30px;
          float: right;
          color: #a94442;
          font-size: 12px;
          margin-left: 20px;
          width: 100%;
        }
      }
    }
    .save{
      display: block;
      outline: none;
      border: none;
      width: 220px;
      height: 46px;
      border-radius: 5px;
      line-height: 46px;
      text-align: center;
      background:#66CCFF;
      color: #fff;
      margin-left: 200px;
      margin-top: 50px;
      cursor: pointer;
    }
    .save:hover{
      background:#2BB4F8 ;
    }
  }
  .zheng {
    position: relative;
    .serch {
      position: absolute;
      top: 50px;
      right: 81px;
      width: 204px;
      height: 36px;
      border-radius: 0px 4px 4px 0px;
      input {
        display: block;
        float: left;
        outline: none;
        border: 1px solid rgba(179, 179, 179, 1);
        height: 34px;
        line-height: 34px;
        width: 122px;
        padding: 0 10px;
      }

      input:focus {
        border: 1px solid #ff744f;
        width: 122px;
        height: 34px;
        outline: none;
      }

      button {
        cursor: pointer;
        display: block;
        float: left;
        border: none;
        outline: none;
        width: 60px;
        height: 36px;
        background: rgba(231, 57, 10, 1);
        border-radius: 0px 4px 4px 0px;
        text-align: center;
        line-height: 36px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }

      button:hover {
        background: #f00;
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
      margin-top: 30px;
    }
    .page {
      margin: 30px 0;
      text-align: center;
      div{
        display: inline-block;
      }
    }
  }
}
</style>
<style scoped lang="less">
  .place{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0,0,0,.16);
    .cc{
      width: 200px;
      height: 100px;
      background: #fff;
      position: absolute;
      border-radius: 5px;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      div{
        height: 30px;
        margin: 20px ;
        background: #fff;
        img{
          width: 30px;
          height: 30px;
          display: block;
          float: left;
        }
        b{
          display: block;
          float: left;
          height: 30px ;
          line-height: 30px;
          margin-left: 20px;
          font-weight: 400;
        }
      }
      span{
        display: block;
        width: 60px;
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        border:1px solid #4e4e4e;
       margin: 0 auto;
        cursor: pointer;
      }
    }
    .dd{
      width: 200px;
      height: 150px;
      background: #fff;
      position: absolute;
      border-radius: 5px;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      img{
        display: block;
        width: 40px;
        height: 40px;
        margin: 20px auto;
      }
      p{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #4e4e4e;
        text-align: center;
      }
    }
  }
</style>
