<template>
  <div class="query">
    <div class="container">
      <h2>诉求信息</h2>
      <table class="biao">
        <tr>
          <td class="fa">发起人</td>
          <td>{{orderInfo.operatorName}}</td>
          <td class="fa">发起时间</td>
          <td>{{orderInfo.addTime}}</td>
        </tr>
        <tr>
          <td class="fa">标题</td>
          <td class="chang" colspan="3" >{{orderInfo.title}}</td>
        </tr>
        <tr>
          <td class="fa int">诉求信息</td>
          <td class="chang int" colspan="3">{{orderInfo.content}}</td>
        </tr>
        <tr>
          <td class="fa">材料</td>
          <td class="chang" colspan="3">
            <a
              v-if="orderInfo.attachmentName!=''"
              type="download"
              :href="orderInfo.attachment"
            >{{orderInfo.attachmentName}}</a>
          </td>
        </tr>
      </table>
      <h2>办理情况</h2>
      <table class="ban">
        <tr>
          <td class="fa">接收时间</td>
          <td class="times" cellpadding="5">{{orderInfo.auditTime}}</td>
          <td class="fa">办理状态</td>
          <td
            class="state"
          >{{orderInfo.state<5?"处理中":"已完成"}}</td>
          <td class="fa">结束时间</td>
          <td class="times">{{orderInfo.replyTime}}</td>
        </tr>
        <tr>
          <td class="fa int">回复</td>
          <td class="chang int" colspan="5">{{orderInfo.reply}}</td>
        </tr>
      </table>
      <div v-if="orderInfo.state>=4">
        <h2 >我要评价</h2>
        <div class="ping">
          <p v-if="orderInfo.state==6">感谢您的评价!!!</p>
          <p v-if="orderInfo.state==5">欢迎您对我们的服务做出评价,如果您感觉我们的服务效果良好,请推荐给身边的朋友!</p>
          <div v-if="orderInfo.state==6">
            <b v-for="(item,index) in itemClasslass" :key="index" :class="item"></b>
          </div>
          <div v-if="orderInfo.state==5">
            <b
              v-for="(item,index) in itemClasslass"
              :key="index"
              :class="item"
              @click="ping(index)"
            ></b>
            <span style="color: #e7390a;">{{msgStr}}</span>
          </div>
          <button v-if="orderInfo.state==5" class="save" @click="save()">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let that;
import Vue from "vue";
var bus = new Vue();
export default {
  data() {
    return {
      orderInfo: "",
      fullstar: 0,
      msgStr: "",
      orderId: 0,
      content: "",
      btnHidden: true
    };
  },
  created() {
    var localStorageStr = JSON.parse(localStorage.getItem("personal"));
    this.userId = localStorageStr.userId;
  },
  mounted() {
    bus.$on("getorderid", function(msg) {
      this.orderId = msg;
      console.log(this.orderId);
    });
  },
  methods: {
    backFunc() {
      this.orderInfo = "";
    },
    ping(i) {
      this.fullstar = i + 1;
    },
    save() {
      //评价接口
      that = this;
      this.axios
        .post("/web/order/ordervaluate", {
          orderId: this.orderId,
          content: this.content,
          start: this.fullstar,
          userId: this.userId
        })
        .then(({ data }) => {
          if ((data.code = "10001")) {
            this.$message({
              message: "评价成功",
              type: "success"
            });
            this.msgStr = "已评价";
            this.btnHidden = false;
            this.axios
              .post("/web/order/orderdetails", {
                orderId: that.orderId
              })
              .then(({ data }) => {
                console.log(data);
                if (data.code == 10001) {
                  that.orderInfo = data.data.workorder;
                  that.fullstar = data.data.workorder.satisfactionDegree;
                  that.orderId = data.data.workorder.orderId;
                }
              });
          } else {
            this.$message.error("评价失败");
          }
        });
    },
    querysuqiu(orderId) {
      this.orderId = orderId;
      this.axios
        .post("/web/order/orderdetails", {
          orderId: orderId
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == 10001) {
            this.orderInfo = data.data.workorder;
            this.fullstar = data.data.workorder.satisfactionDegree;
            this.orderId = data.data.workorder.orderId;
          }
        });
    }
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
};
</script>
<style lang="less" scoped>
.query {
  padding: 20px;
  background: #fff;
  h2 {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: #454545;
    font-weight: 500;
  }
  .biao {
    width: 800px;
    margin: 20px auto 50px;
    td {
      text-align: center;
      border: 1px solid #5b5a5a;
      height: 40px;
      line-height: 40px;
    }
    td.fa {
      width: 100px;
      background: #f2f2f2;
      text-align: left;
      padding-left: 10px;
    }
    td.chang{
      text-align: left;
      padding-left: 10px;
    }
  }
  .ban {
    width: 800px;
    margin: 20px auto 50px;
    td {
      text-align: center;
      border: 1px solid #5b5a5a;
      height: 40px;
      line-height: 40px;
    }
    td.fa {
      background: #f2f2f2;
      text-align: left;
      padding-left: 10px;
    }
    td.times {
      width: 200px;
      font-size: 14px;
    }
    td.state {
      width: 100px;
    }
    td.chang{
      text-align: left;
      padding-left: 20px;
    }
  }
  .ping {
    width: 650px;
    margin: 20px auto;
    overflow: hidden;
    div {
      padding: 20px 0;
      height: 20px;
      b {
        cursor: pointer;
        width: 20px;
        height: 20px;
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
    }
    .save {
      display: block;
      width: 120px;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      text-align: center;
      background: #ff4c4c;
      outline: none;
      border: none;
      border-radius: 5px;
      color: #fff;
      margin: 0 auto;
    }
    .save:hover {
      background: #f56c6c;
    }
  }
}
</style>
