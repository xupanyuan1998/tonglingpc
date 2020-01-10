<template>
    <div>
      <div class="container" v-if="msg.roleId<2">
        <div class="title">
          <h3>诉求解答</h3>
        </div>
        <div v-show="addsuShow" class="ccc">
          <p class="place">如果您有需要协调事项或对接意愿请尝试与我们联系！</p>
          <div class="navs">
            <div class="t_l">
              <span>标题</span><b>*</b>
            </div>
            <input type="text" v-model="title" id="title" placeholder="请输入您要提交的诉求的标题">
            <div class="titot" id="titot">
              <div class="titots" id="titots"></div>
            </div>
          </div>
          <div class="navs">
            <div class="t_l">
              <span>诉求</span><b>*</b>
            </div>
            <textarea v-model="content"  ></textarea>
            <div class="sutot" id="sutot">
              最多只能输入500字
            </div>
          </div>
          <div class="file">
            <div class="t_l">
              <span>文件</span>
            </div>
            <h4>
              <p><button>上传文件</button>
                <input type="file" @change="addtu($event)" title="" ref="upFile">
              </p>
              <b v-if="cainame==''">请上传不大于10M的文件</b>
              <b v-if="cainame!=''">{{cainame}}</b>
            </h4>
          </div>
          <button class="save" @click="saveques">提交</button>
        </div>
      </div>
      <div class="ddd"  v-if="msg.roleId<2"></div>
      <div class="content" >
        <h5><span>我的诉求</span></h5>
        <div v-loading="fullscreenLoading">
          <template v-if="orderList.length>0">
            <ul>
              <li v-for="(item,idx) in orderList" :key="idx">
                <div class="l_title">
                  <h3>{{item.title}}</h3>
                  <el-tag v-if="item.state<2"  size="small" type="info" >待回复</el-tag>
                  <el-tag v-if="item.state>=4||item.state==2" size="small" type="success" >已完成</el-tag>
                  <el-tag v-if="item.state==3" size="small" type="warning" >办理中</el-tag>
                </div>
                <div class="int">
                  <span>{{item.operatorName}}</span><span>{{item.addTime}}</span>
                </div>
                <div class="msg">
                  <p>{{item.content.length>100?item.content.slice(0,100)+'...':item.content}}&nbsp;&nbsp;
                    <router-link :to="{path:'/Antonym/Antonymdetali',query:{id:item.orderId}}" tag="a">[查看全文]</router-link>
                  </p>
                </div>
                <div class="banli" v-if="item.state==4">
                  <button @click="goping(item.orderId)" >去评价</button>
                </div>
              </li>
            </ul>
          </template>
          <template v-else>
            <div class="wu">暂无诉求信息</div>
          </template>
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
      <place  :placeshow="placeshow" :success="success" @hide="placeshow = false" :errorshow="plas" :succmsg="succmsg"></place>
    </div>
</template>

<script>
  var that;
  import '../../../assets/css/page.less';
  //引入图片上传的方法
  import '../../../assets/js/updateFile'
    export default {
        name: "faren",
      data() {
        return {
          fullscreenLoading:false,
          clectnav: 1,
          toptitle:'铜陵市民营经济云服务在线办理系统',
          content:'',
          showPageNo:8,
          currentPage:1,
          pageTotal: '',//总的页数
          pageConfig: {
            pageSize: 10,     //一页的数据条数
            total: '',         //总的数据条数
          },
          cainame:'',
          url:'',
          addsuShow:true,
          success:2,
          placeshow:false,
          username:'',
          pass:'',
          userId:'',
          title:'',
          orderList:0,
          msg:'',
          plas:'文件过大',
          succmsg:'',
        }
      },
      beforeCreate(){
        that=this;
      },
      created() {
        var a=JSON.parse(localStorage.getItem('personal'));
        this.msg=a;
        this.userId=a.userId;
        var data={
          userId: this.userId,
          state: -1,
          title: this.title,
          current: this.currentPage,
          size: this.pageConfig.pageSize
        };;;
        this.getOrderList(data);
      },
      watch:{
        content(newVal){
          $('#sutot').css({display:'none'});
          if(newVal.length>500){
            $('#sutot').css({display:'block'});
            $('#sutot').html('内容最多不能超过500字');
          }
        }
        },
      methods:{
        addsu(){
          if(this.addsuShow){
            this.addsuShow=false;
          }else{
            this.addsuShow=true;
          }
        },
        prePage(){
          this.currentPage -= 1;
          var data={
            userId: this.userId,
            state: -1,
            title: this.title,
            current: this.currentPage,
            size: this.pageConfig.pageSize
          };;;
          this.getOrderList(data);
        },
        nextPage(){
          this.currentPage += 1;
          var data={
            userId: this.userId,
            state: -1,
            title: this.title,
            current: this.currentPage,
            size: this.pageConfig.pageSize
          };;;
          this.getOrderList(data);
        },
        changeCurrentPage(i){
          this.currentPage = i;
          var data={
            userId: this.userId,
            state: -1,
            title: this.title,
            current: this.currentPage,
            size: this.pageConfig.pageSize
          };;;
          this.getOrderList(data);
        },
        saveques(){//提交诉求
          var status=localStorage.getItem('token');
          let that=this;
          if (status==null){
            this.placeshow=true;
            this.success=2;
          }else{
            if(this.title==''){
              $('#title').css({display:'none'});
              $('#titot').css({display:'block'});
              $('#titots').fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300);
              setTimeout(function () {
                $('#title').css({display:'block'});
                $('#titot').css({display:'none'});
              },2000)
            }else if(this.content==''){
              $('#sutot').css({display:'block'});
              $('#sutot').html('内容不能为空');
            }else if(this.content.length>500){
              $('#sutot').css({display:'block'});
              $('#sutot').html('内容最多不能超过500字');
            } else{
              var data={
                content:this.content,
                userId:this.msg.userId,
                title:this.title,
                attachment:this.url,
                attachmentName:this.cainame
              };
              this.axios.post('/web/order/add',data).then((res)=>{
                if(res.data.code==10001){
                  //提交成功
                  this.succmsg=res.data.msg;
                  this.success=3;
                  this.placeshow=true;

                  that.title='';
                  that.content='';
                  that.cainame='';
                  that.url='';
                  var sudata={
                    userId: this.userId,
                    state: -1,
                    title: this.title,
                    current: this.currentPage,
                    size: this.pageConfig.pageSize
                  };
                  setTimeout(function () {
                    that.getOrderList(sudata);
                    that.placeshow=false;
                  },2000);
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
                that.cainame=res.data.data.name;
                that.url=res.data.data.url;
                that.$refs.upFile.value='';
              })
            }else{
              return false;
            }
          },
        goping(i){
          this.$router.push({
            path:'/Antonym/Antonymdetali',
            query:{
              id:i
            }
          })
        },
        clearFen(i) {
          return i.substring(0, i.indexOf(" "));
        },
        //获取自己的在线诉求
        getOrderList(datas) {
          this.axios.interceptors.request.use((config)=>{
            // 在发送请求之前做些什么
            this.fullscreenLoading=true;
            //请求时让loading动画显示
            return config;
          }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
          });

          // 添加响应拦截器
          this.axios.interceptors.response.use((response)=> {
            // 对响应数据做点什么
            this.fullscreenLoading=false;
            //让loading动画隐藏
            return response;
          }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
          });
          this.axios
            .post("/web/order/list", datas)
            .then(({ data }) => {
              if (data.code == 10001) {
                this.orderList = data.data.records;
                this.pageTotal=data.data.pages;
                this.currentPage=data.data.current;
                this. pageConfig.pageSize=data.data.size;
                this. pageConfig.total=data.data.total;
              }
              if(data.code == 401){
                localStorage.clear();
                that.$router.push('/')
              }
            });
        },
      }
    }
</script>

<style scoped lang="less">
  .ddd{
    width: 100%;
    height: 20px;
    background: #f5f5f5;
  }
  .warp{
    background: #f3f3f3;
  }
  .container {
    width: 1106px;
    background: #fff;
    margin:33px auto 0 auto;
    padding:0px 56px 30px 38px;
    .title{
      padding-top: 9px;
      height: 43px;
      border-bottom: 2px solid #FF0000;
      h3{
        float: left;
        width:80px;
        height: 43px;
        line-height: 43px;
        font-size:20px;
        font-weight:bold;
        color:rgba(232,57,10,1);
      }
      p{
        float: right;
        margin-right: 5px;
        cursor: pointer;
        overflow: hidden;
        img{
          display: block;
          float: left;
        }
        span{
          display: block;
          float: left;
          margin-left: 7px;
          height: 43px;
          line-height: 43px;
          font-size:18px;
          font-weight:400;
          color:rgba(0,115,255,1);
        }
      }
    }
    .car{
      margin-top: 3px;
      width:1084px;
      height:56px;
      background:url("../../../../static/images/114.png") no-repeat;
      border-radius:4px 4px 0px 0px;
      line-height: 56px;
      font-size:20px;
      font-weight:bold;
      color:rgba(255,255,255,1);
      padding-left: 22px;
    }
    .place {
      margin-left: 55px;
      width: 902px;
      height: 55px;
      line-height: 55px;
      font-size:16px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:#666;
    }
    .navs{
      width: 900px;
      overflow: hidden;
      margin-left: 55px;
      margin-bottom: 20px;
      .t_l{
        float: left;
        width: 47px;
        margin-right: 16px;

        >*{
          display: block;
          float: right;
          height: 36px;
          line-height: 36px;
        }
        b{
          font-size:16px;
          font-weight:400;
          color:rgba(255,0,0,1);
          margin-right: 5px;
        }
        span{
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(51,51,51,1);
        }
      }
      input{
        display: block;
        float: left;
        padding: 0 10px;
        width:815px;
        height:34px;
        line-height: 34px;
        border:1px solid rgba(203,203,203,1);
        border-radius:4px;
        outline: none;
      }
      .titot{
        float: left;
        display: none;
        width:835px;
        height:34px;
        border:1px solid #ccc;
        .titots{
          background: #ffa2a2;
          margin: 10px;
          width:815px ;
          height: 14px;
        }
      }
      input:focus{
        border:1px solid #ff744f;
        outline:none;
      }
      textarea:focus{
        border:1px solid #ff744f;
      }
      textarea{
        padding: 0 10px;
        width:815px;
        height:178px;
        line-height: 29px;
        border:1px solid #ccc;
        border-radius:4px;
        font-size: 14px;
        outline: none;
        resize: none;
      }
      .sutot{
        float: right;
        display: none;
        width:835px;
        height:40px;
        line-height: 40px;
        font-size: 14px;
        color: #ff4d4d;
      }
    }
    .file{
      margin-left: 55px;
      height: 34px;
      line-height: 34px;
      margin-bottom: 27px;
      .t_l{
        float: left;
        width: 47px;
        height: 34px;
        line-height: 34px;
        font-size:16px;
        font-weight:bold;
        color:rgba(69,69,69,1);
        margin-right: 16px;
        text-align: right;
      }
      h4{
        float: left;
        overflow: hidden;
        p{
          width:92px;
          height:32px;
          background:rgba(27,140,255,1);
          position: relative;
          float: left;
          cursor: pointer;
          button{
            cursor: pointer;
            position: absolute;
            display: block;
            height: 32px;
            width: 92px;
            text-align: center;
            line-height: 32px;
            top: 0;
            left: 0;
            background:#66CCFF;
            outline: none;
            border: none;
            font-size:16px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
          input{
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            height: 32px;
            width: 92px;
            text-align: center;
            line-height: 32px;
            z-index: 1;
            opacity: 0;
          }
        }
        p:hover{
          button{
            background: #2BB4F8;
          }
        }
        b{
          display: block;
          float: left;
          margin-left: 12px;
          height: 32px;
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(255,77,77,1);
        }
      }
    }
    .save{
      cursor: pointer;
      display: block;
      width:250px;
      height:50px;
      background:#66CCFF;
      box-shadow:0px 3px 6px 0px rgba(100, NaN, 0, 0.35);
      border-radius:4px;
      outline: none;
      border: none;
      line-height: 50px;
      font-size:20px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      margin: 0 auto;
    }
    .save:hover{
      background:#2BB4F8 ;
    }
  }
  .content{
    margin:0 auto;
    background: #fff;
    min-height: 500px;
    h5{
      margin-top: 20px;
      display: flex;
      font-size: 20px;
      padding: 10px 0;
      font-weight: 500;
      border-bottom: 4px solid #efefef;
      align-items: center;
      span{
        border-left: 5px solid #fe0000;
        padding-left: 10px;
        font-size: 20px;
        color: #666;
      }
    }
    ul{
      background: #fff;
      margin: 0 73px 0 38px;
      padding-bottom: 20px;
      li{
        padding: 20px 0;
        height: auto;
        border-bottom: 1px dashed #b7b7b7;
        .l_title{
          h3{
            display: inline-block;
            height: 24px;
            line-height: 24px;
            color: #333;
            font-size: 18px;
            font-weight: 500;
            max-width: 900px;
            margin-right: 20px;
          }
          span{
            display:inline-block;
            font-size: 14px;
            line-height: 24px;
            padding: 0 15px;
          }
          span.dai{
            color: #999;
          }
          span.ban{
            color: #ff9000;
          }
          span.ok{
            color: #d73140;
          }
          span.ping{
            color: #1b8cff;
            cursor: pointer;
          }
          span.ping:hover{
            color: #2c6af8;
          }
        }
        .int{
          height: 42px;
          span{
            display: block;
            height: 42px;
            line-height: 42px;
            font-size: 16px;
            color: #666;
            float: left;
            margin-right: 20px;
          }
        }
        .msg{
          margin-top: 10px;
          line-height: 40px;
          p{
            display: block;
            font-size: 16px;
            a{
              color: #d73240;
            }
          }
        }
        .banli{
          margin-top: 20px;
        }
        .banli button{
          border: none;
          outline: none;
          width: 68px;
          height: 28px;
          border-radius: 4px;
          background: #FF8D22;
          color: #fff;
        }
        .banli button:hover{
          background: #FD8412;
        }
      }
      li:last-child{
        border-bottom: none;
      }
    }
    div.wu{
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      font-weight: 500;
      text-align: center;
      color: #ccc;
      padding: 40px;
    }
  }
  .page{
    margin: 30px 0;
    padding-bottom: 40px;
    text-align: center;
    div{
      display: inline-block;
    }
  }
</style>
