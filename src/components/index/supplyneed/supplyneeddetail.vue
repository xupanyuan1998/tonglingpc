<template>
  <div>
    <div class="top">
      <head-nav :title="toptitle" :clect="clectnav"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="golist">供需速递</span><b> ></b><span >供需详情</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="conBox">
      <div class="supply">
        <div class="topBOx">
          <span class="left">
            <img :src="content.smallimg" alt="" />
          </span>
          <div class="right">
            <div class="tit">{{content.productname}}</div>
            <div class="price">
              <span class="price_p">价格：</span>
              <span class="price_i">
                <i>￥</i>
                <em>{{content.price}}</em>
              </span>
            </div>
            <div class="time">
              <div class="pubTime">
                <span>发布时间:</span>
                <br />
                <span>{{start}}</span>
              </div>
              <div class="jdt">
                <el-progress
                  :stroke-width="14"
                  :percentage="state"
                  status="success"
                ></el-progress>
              </div>
              <div class="endTime">
                <span>结束时间:</span>
                <br />
                <span>{{end}}</span>
              </div>
            </div>

            <div class="djs">
              <em>距离供应产品结束还剩</em>
              <span v-if="jiezhi">已截止</span>
              <span v-else>{{time.d}}天{{time.h}}时{{time.m}}分{{time.s}}秒</span>
            </div>
          </div>
        </div>
        <!-- 下面部分 -->
        <div class="bottomBOx">
          <h3 class="product">产品介绍</h3>
          <div class="formBox">
            <div class="list">
              <span>企业名称</span>
              <span class="rig">{{content.productname}}</span>
            </div>
            <div class="list">
              <span>产品数量</span>
              <span class="rig">{{content.number}}</span>
            </div>
            <div class="list">
              <span>产品单价</span>
              <span class="rig">{{content.price}}</span>
            </div>
            <div class="list">
              <span>发货期限</span>
              <span class="rig">{{content.dueTime}}</span>
            </div>
            <div class="list">
              <span>所属行业</span>
              <span class="rig">{{content.industry}}</span>
            </div>
            <div class="list">
              <span>联系人</span>
              <span class="rig">{{content.industry}}</span>
            </div>
            <div class="list">
              <span>联系电话</span>
              <span class="rig">{{content.telephone}}</span>
            </div>
            <div class="list">
              <span>电子邮箱</span>
              <span class="rig">{{content.email}}</span>
            </div>
            <div class="list">
              <span>公司地址</span>
              <span class="rig">{{content.address}}</span>
            </div>
            <div class="list">
              <span>备注</span>
              <span class="rig">{{content.remarks}}</span>
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
import '../../../assets/css/mianbao.less'
import footerNav from "../../footer";
export default {
  name: "newsdetali",
  components: { headNav ,footerNav},
  data() {
    return {
      toptitle: "铜陵市民营经济云服务智慧平台",
        clectnav: 0,
      state:0,
      content:{},
      start:'',
      end:'',
      jiezhi:false,
      cSize: 1,
      timer:null,
      time:{
        d:'',
        h:'',
        m:'',
        s:''
      },
    };
  },
  methods: {
    goindex(){
      this.$router.push('/')
    },
    golist(){
      this.$router.push('/supplyneedlist')
    },
    clearFen(i) {
      return i.substr(0, i.indexOf(" "));
    },
    //倒计时
    dao(){
      //获取当前时间
      var date = new Date();
      var now = date.getTime();
      //设置截止时间
   /*   var a=this.content.endtime.splice(this.content.endtime.indexOf(""),1);*/
      var endDate = new Date(this.content.endtime);
      //获取开始的时间戳
      var starts=new Date(this.content.publishertime);
      var start=starts.getTime();//发布时间的时间戳
      var end = endDate.getTime();//截止时间的时间戳
      //计算已经 过去的时间占得百分比
      /*
      * (当前时间的时间戳-开始的时间戳)/(截止时间的时间戳-开始的时间戳) */
    var b= (now-start)/(end-start);
    this.state=Math.floor(b*100);

      //时间差
      var leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        var  d = addzero(Math.floor(leftTime / 1000 / 60 / 60 / 24));
        var h = addzero(Math.floor(leftTime / 1000 / 60 / 60 % 24));
        var m =addzero( Math.floor(leftTime / 1000 / 60 % 60));
        var s = addzero(Math.floor(leftTime / 1000 % 60));
        this.time.d=d;
        this.time.h=h;
        this.time.m=m;
        this.time.s=s;
        this.jiezhi=false;
      };
        if(this.time.d==""){
          this.jiezhi=true;
        }
      function addzero(i) {
       return  i<10?'0'+i:i
      }
      //递归每秒调用countTime方法，显示动态时间效果
    }
  },
  created() {
    var id = this.$route.query.id;
    this.axios.post("/web/supplyanddemand/supplyanddemand", { Id: id }).then(({ data }) => {
       // console.log(data.data);
      this.content = data.data;
      this.start=this.clearFen(data.data.publishertime);
      this.end=this.clearFen(data.data.endtime);
      // console.log(this.start);
      var that=this;
      this.$nextTick(function () {
        this.timer=setInterval( that.dao,1000);
      })
    });
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="less">
  /deep/.el-progress__text i{
    display: none;
  }
.container {
  width: 100%;
  height: 32px;
  background: #fff;
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
.conBox {
  width: 100%;
  border: none;
  .supply {
    width: 1200px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    margin: 20px auto;
    border: none;
    .topBOx {
      width: 1200px;
      height: 300px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
border: none;
      padding: 30px 20px;
      box-sizing: border-box;
      .left {
        display: inline-block;
        float: left;
      }
      .left {
        width: 520px;
        height: 240px;
        background: rgba(50, 164, 156, 1);
        img {
          width: 520px;
          height: 240px;
          background-color: pink;
        }
      }
      .right {
        float: left;
        margin-left: 20px;
        width: 600px;
        height: 240px;
        .tit {
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(69, 69, 69, 1);
        }
        .price {
          margin: 15px 0;
          .price_p {
            font-size: 20px;

            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(69, 69, 69, 1);
          }
          .price_i {
            display: inline-block;

            i {
              color: #e8390a;
              font-size: 12px;
            }
            em {
              font-size: 24px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(232, 57, 10, 1);
            }
          }
        }
        .time {
          width: 600px;
          height: 58px;
          overflow: hidden;
          font-size: 20px;
          margin: 20px 0 15px 0;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(89, 89, 89, 1);
          .pubTime {
            width: 112px;
            height: 58px;
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(89, 89, 89, 1);
            float: left;
          }
          .jdt {
            width: 345px;
            float: left;
            margin: 0 10px;
            .el-progress {
              position: relative;
              line-height: 2;
            }
            /deep/ .el-progress-bar__inner {
              background-color: #eaeaea;
            }
            /deep/ .el-progress.is-success .el-progress-bar__inner {
              background-color: #e8390a;
            }
            /deep/ .el-progress-bar__innerText {
              display: none;
            }
          }
          .endTime {
            float: left;
          }
        }
        .djs {
          height: 71px;
          line-height: 71px;
          em {
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(68, 68, 68, 1);
            display: inline-block;
            margin-right: 20px;
          }
          span {
            font-size: 24px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(232, 57, 10, 1);
          }
        }
      }
    }
    .bottomBOx {
      margin: 30px 0 70px 0;
      width: 1200px;
      border-radius: 4px;
      border: none;
      padding-bottom: 79px;
      .product {
        height: 40px;
        line-height: 40px;
        padding-left: 30px;
        background: rgba(234, 234, 234, 1);
      }
      .formBox {
        padding: 0 20px;
        .list {
          height: 63px;
          line-height: 63px;
          border-bottom: 1px dashed rgba(203, 203, 203, 1);
          span:first-child{
            text-align: right;
            width: 80px;
          }
          span{
            display: block;
            float: left;

          }
          .rig {
            margin-left: 30px;
          }
        }
      }
    }
  }
}

.content {
  padding-top: 30px;
}
</style>
