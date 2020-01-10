<template>
  <div>
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="warp">
      <div class="posi">
        <span>当前位置 ：</span><b @click="gosuqiu">在线诉求</b><em> ></em><b>工单详情</b>
      </div>
      <div class="content" v-loading=" fullscreenLoading">
       <div class="top_nav">
         <h3>{{orderInfo.title}}</h3>
         <el-tag v-if="orderInfo.state<2"  size="small" type="info" >待回复</el-tag>
         <el-tag v-if="orderInfo.state==4||orderInfo.state==2||orderInfo.state==5" size="small" type="success" >已完成</el-tag>
         <el-tag v-if="orderInfo.state==3||orderInfo.state==6" size="small" type="warning" >办理中</el-tag>
       </div>
        <div class="msg">
          <span>{{orderInfo.operatorName}}</span>
          <b>{{orderInfo.addTime}}</b>
        </div>
        <p class="con">{{orderInfo.content}}</p>
        <div class="file" v-if="orderInfo.attachmentName!=''">
          <span>附件</span><a :href="orderInfo.attachment" type="download">{{orderInfo.attachmentName}}</a>
        </div>
        <div class="state" v-if="orderInfo.state==3">
          <h4>认领交办</h4>
          <p>您的留言我们已经收到！我们已将您反映的问题转相关部门进行处理您的留言我们已经收到！</p>
         <div class="date">
           <span>交办时间：{{orderInfo.auditTime}}</span>
         </div>
        </div>
        <div class="hui" v-if="orderInfo.state>=4||orderInfo.state==2">
          <h4>回复</h4>
          <div class="ba_color">
            <p>{{orderInfo.backResult}}</p>
            <div class="date">
              <span>回复时间：{{orderInfo.replyTime}}</span>
            </div>
          </div>
        </div>
        <div class="ping" v-if="orderInfo.state==4||orderInfo.state==5">
          <h4 >评价</h4>
          <div class="ba_color">
            <template v-if="orderInfo.state==4">
              <h3 >欢迎您对我们的服务做出评价,如果您感觉我们的服务效果良好,请推荐给身边的朋友!</h3>
              <p >
                <span v-if="fullstar==0">糟糕透顶</span>
                <span v-if="fullstar==1">糟糕</span>
                <span v-if="fullstar==2">一般</span>
                <span v-if="fullstar==3">良好</span>
                <span v-if="fullstar==4">满意</span>
                <span v-if="fullstar==5">非常满意</span>
                <b v-for="(item,index) in itemClasslass"
                   :key="index"
                   :class="item"
                   @click="ping(index)"></b></p>
              <div class="nei" >
                <textarea placeholder="请输入您要评价的内容" v-model="content"></textarea>
                <b id="place">评价内容不能为空</b>
              </div>
              <button  @click="save">提交评价</button>
            </template>
            <template v-if="orderInfo.state==5">
              <h3 >感谢您的评价！</h3>
              <p >
                <span v-if="fullstar==0">糟糕透顶</span>
                <span v-if="fullstar==1">糟糕</span>
                <span v-if="fullstar==2">一般</span>
                <span v-if="fullstar==3">良好</span>
                <span v-if="fullstar==4">满意</span>
                <span v-if="fullstar==5">非常满意</span>
                <b v-for="(item,index) in itemClasslass"
                   :key="index"
                   :class="item"
                ></b></p>
              <div class="ppp">
              <span>评价内容：</span> <div>{{orderInfo.appraise}}</div>
              </div>
              <div class="date" >
                <span>评价时间：{{orderInfo.evaluateTime}}</span>
              </div>
            </template>
          </div>
        </div>
      </div>

    </div>
    <div class="bottom">
      <footer-nav></footer-nav>
    </div>
    <place  :placeshow="placeshow" :success="success" @hide="placeshow = false" :errorshow="plas" :succmsg="succmsg"></place>
  </div>
</template>

<script>
  import headNav from "../../headNav";
    import footerNav from "../../footer";
    export default {
        name: "Antonymdetali",
        components: {
            headNav,
            footerNav
        },
        data(){
            return{
                clectnav: 2,
                toptitle:'铜陵市民营经济云服务在线办理系统',
                content:'',
              fullstar:3,
              orderId:'',
              orderInfo:'',
              userId: '',
              contents:'',
              fullscreenLoading:false,
              placeshow:false,
              success:2,
              plas:'',
              succmsg:''
            }
        },
        created() {
          var a=JSON.parse(localStorage.getItem('personal'));
          this.userId=a.userId;
          this.orderId=this.$route.query.id;
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
              .post("/web/order/orderdetails", {
                orderId:this.orderId
              })
              .then(({ data }) => {
                console.log(data);
                if (data.code == 10001) {
                  this.orderInfo = data.data.workorder;
                  if(this.orderInfo.state==4){
                    this.fullstar=5;
                  }else{
                    this.fullstar = data.data.workorder.satisfactionDegree;
                  }
                }
              });
        },
        methods:{
          gosuqiu(){
            this.$router.push('/Antonym')
          },
          ping(i) {
            this.fullstar = i + 1;
          },
          save() {
            //评价接口
            $('#place').css({'display':'none'})
           var that = this;
           if(this.content==''){
             $('#place').css({'display':'block'})
           }else{
             this.axios
               .post("/web/order/ordervaluate", {
                 orderId: this.orderId,
                 content: this.content,
                 start: this.fullstar,
                 userId: this.userId
               })
               .then(({ data }) => {
                 if (data.code =="10001") {
                    this.placeshow=true;
                    this.success=3;
                    this.succmsg=data.msg;
                    setTimeout(function () {
                      that.placeshow=false;
                      that.axios
                        .post("/web/order/orderdetails", {
                          orderId:that.orderId
                        })
                        .then(({ data }) => {
                          console.log(data);
                          if (data.code == 10001) {
                            that.orderInfo = data.data.workorder;
                            if(this.orderInfo.state==4){
                              that.fullstar=5;
                            }else{
                              that.fullstar = data.data.workorder.satisfactionDegree;
                            }
                          }
                        });
                    },2000)
                 } else if(data.code =="500") {
                   this.placeshow=true;
                   this.success=5;
                   this.plas=data.msg;
                   setTimeout(function () {
                     this.placeshow=false;
                   },2000)
                 }
               });
           }


          },
        },
      computed: {
        itemClasslass() {
          //星星的数组
          let result = [];
          for (var i = 0; i < this.fullstar; i++) {
            //放全星
            result.push("shi");
          }
          if (result.length < 5) {
            //如果没有满到五个星就用灰色的星星补齐9
            var offstar = 5 - result.length;
            for (var i = 0; i < offstar; i++) {
              result.push("xu");
            }
          }
          return result;
        }
      }
    }
</script>

<style scoped lang="less">
.warp{
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 30px;
  .posi{
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 2px solid #d83240;
    >*{
      font-size: 14px;
      color: #7a7a7a;
    }
    em{
      margin-left: 5px;
    }
    b{
      margin-left: 5px;
      font-weight: 400;
      cursor:pointer;
    }
    b:hover{
      border-bottom: 1px solid #7a7a7a;
    }
  }
  .content{
    margin-top: 30px;
    min-height: 500px;
    .file{
      margin-top: 10px;
      display: flex;
      height: 20px;
      flex-direction: row;
      align-items: center;
      span{
        font-size: 16px;
        color: #454545;
      }
      a{
        font-size: 16px;
        margin-left: 5px;
        color: #3a8ee6;
      }
    }
    .top_nav{
      display: flex;
      flex-direction: row;align-items: center;
      h3{
        color: #555;
        font-size: 24px;
        line-height: 50px;
        font-weight: 500;
        max-width: 1000px;
      }
      span{
        font-size: 16px;
        margin-left: 10px;
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
    }
    .con{
      font-size: 16px;
      line-height: 36px;
      margin-top: 10px;
    }
    .msg{
      height: 24px;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 16px;
      color: #666;
      b{
        margin-left: 20px;
        font-weight: 400;
      }
    }
    .state{
      margin-top: 30px;
      padding:30px 20px;
      background: #f2f2f2;
      h4{
       font-size: 18px;
        line-height: 22px;
        font-weight: 700;
        color: #d73140;
      }
        p{
          font-size: 18px;
          line-height: 32px;
        }
       .date{
         width: 100%;
         height: 22px;
         span{
           display: block;
           float: right;
           font-size: 16px;
           line-height: 22px;
         }
       }
    }
    .hui,.ping{
      margin-top: 30px;
      h4{
        background: #d73140;
        width: 28px;
        height: 28px;
        padding: 0 15px;
        color: #fff;
        line-height: 25px;
        border-radius: 4px 4px 0 0;
        font-size: 14px;
      }
      .ba_color{
        padding: 15px 20px;
        background: #eff1f7;
        h5{
          font-size: 18px;
          font-weight: 700;
          line-height: 22px;
          color: #d73140;
        }
        p{
          margin-top: 5px;
          font-size: 16px;
          line-height: 32px;
        }
      }
      .date{
        width: 100%;
        height: 22px;
        span{
          display: block;
          float: right;
          font-size: 16px;
          line-height: 22px;
        }
      }
    }
    .ping{
    .ba_color{
      padding: 15px 20px;
      background: #f7f7f7;
      h3{
        font-size: 18px;
        font-weight: 500;
        color: #666;
        height: 40px;
        line-height: 40px;
      }
      p{
        height: 24px;
        padding: 20px 0;
        b {
          cursor: pointer;
          width: 24px;
          height: 24px;
          display: block;
          float: left;
          margin-right: 29px;
        }
        b.shi {
          background: url("../../../../static/images/67.png") no-repeat;
          background-size: 100%;
        }
        b.xu {
          background: url("../../../../static/images/68.png") no-repeat;
          background-size: 100%;
        }
        span{
          display: block;
          float: left;
          font-size: 18px;
          line-height: 24px;
          margin-right: 10px;
          width: 80px;
        }
      }
      button{
        display: block;
        width: 120px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #ff4c4c;
        border-radius: 4px;
        border: none;
        outline: none;
        color: #fff;
       margin-left: 40px;
      }
      button:hover{
        background: #f56c6c;
      }
      div.nei{
        padding-bottom: 30px;
        textarea{
          display: block;
          resize: none;
          width: 700px;
          height:100px;
          line-height: 30px;
          background: none;
          border-radius: 4px;
          border: 1px solid #ccc;
          outline: none;
          padding: 0 20px;
          font-size: 16px;
        }
        b{
          display: none;
          height: 50px;
          line-height: 50px;
          font-weight: normal;
          color: #fe0000;
        }
        textarea:focus{
          border:1px solid #ff744f;
        }
      }
      .ppp{
        overflow: hidden;
        padding-bottom: 20px;
        span{
          display: block;
          float: left;
        }
        div{
          display: block;
          float: left;
          width: 80%;
        }
      }
    }
    }
  }
}

</style>
