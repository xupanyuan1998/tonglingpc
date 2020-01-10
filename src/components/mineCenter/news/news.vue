<template>
  <div class="xi">
    <h1>
      系统消息
      <template v-if="total!=0">
        [ <span>{{total}}</span> ]
      </template>
    </h1>
    <div class="line"></div>
    <div class="xiaoc"  v-loading="fullscreenLoading">
      <template v-if="newslist.length>0">
       <div>
         <ul >
           <li v-for="(item,idx) in newslist" :key="idx">
             <b></b>
             <span>{{item.content}}</span>
             <strong>{{item.publishTime}}</strong>
             <img @click="delmessage(item.messagesId)" src="../../../../static/images/74.png" alt />
           </li>
         </ul>
       </div>
      </template>
      <template v-if="newslist.length==0">
        <div class="wu">
          暂无内容
        </div>
      </template>
    </div>
    <div v-if="newslist.length>0" class="page">
      <div>
        <button>上一页</button>
        <button>
          第
          <b>1</b> 页
        </button>
        <button>
          共
          <b>1</b> 页
        </button>
        <button>下一页</button>
      </div>
    </div>
    <place
      :placeshow="placeshow"
      :success="success"
      @hide="placeshow = !placeshow"
      :msgok="msgok"
      :succmsg="succmsg"
    ></place>
  </div>
</template>
<script>
var that;
export default {
  data() {
    return {
      currents: 1,
      zhsize: 10,
      zhpages: "",
      newslist:1,
      total: 0,
      token:'',
      placeshow:false,
      success:4,
      delid:'',
      succmsg:'',
      userId:'',
      fullscreenLoading: true
    };
  },
created() {
    that=this;
    var a=JSON.parse(localStorage.getItem('personal'));
    console.log(a);
    this.token=a.tokenSign;
    this.userId=a.userId;
  var datas = {
    current: this.currents,
    size: this.zhsize,
    token: this.token,
    userId: this.userId
  };
  this.getnews(datas)
},
  methods: {
    getnews(datas) {
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
      this.axios.post("/web/messages/usermessages", datas).then(({data}) => {
        this.newslist = data.data.records;
        this.total = data.data.total;
      });
    },
    msgok() {
      this.axios.post("/web/messages/delete", {
        Id: this.delid,
        token: this.token
      }).then(({data}) => {
        if (data.code == 10001) {
          this.success=3;
          this.succmsg='删除成功';
          setTimeout(function () {
            that.placeshow=false;
            var datas = {
              current: that.currents,
              size: that.zhsize,
              token: that.token,
              userId: that.userId
            };
            that.getnews(datas)
          },2000)
        }
      });
    },
    delmessage(id) {
      this.placeshow = true;
      this.delid = id;
    },
  }
};
</script>
<style lang="less" scoped>
.xi {
  background: #fff;
  h1 {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 400;
    color: rgba(69, 69, 69, 1);
    position: relative;
    margin-left: 30px;
    padding-bottom: 10px;
    span {
      font-size: 20px;
      font-weight: 400;
      color: #e8390a;
    }
  }
  .line {
    height: 2px;
    background: rgba(255, 76, 76, 1);
    margin-bottom: 10px;
  }
  .xiaoc{
    margin-left: 57px;
    width: 793px;
    min-height: 300px;
    .wu{
      height: 50px;
      line-height: 50px;
      padding: 20px 0;
      font-size: 16px;
      color: #ccc;
      text-align: center;
    }
  }
  ul {
    li {
      position: relative;
      padding: 0 6px;
      width: 781px;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px dashed #d9d9d9;
      > * {
        display: block;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        float: left;
      }
      b {
        width: 0;
        height: 0;
        margin-right: 10px;
        border-style: solid;
        border-width: 4px 0 4px 4px;
        border-color: transparent transparent transparent #e54923;
        margin-top: 20px;
      }
      span {
        width: 552px;
        margin-right: 20px;
        overflow: hidden;
      }
      strong {
        width: 95px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(69, 69, 69, 1);
      }
      img {
        position: absolute;
        width: 17px;
        height: 19px;
        top: 15px;
        right: 20px;
      }
    }
    li:hover {
      cursor: pointer;
      background: #e7f5ff;
    }
    li:last-child {
      border-bottom: none;
    }
  }
}
.page {
  position: absolute;
  bottom: 24px;
  left: 0;
  width: 100%;
  height: 35px;
  div {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    height: 35px;
    button {
      cursor: pointer;
      display: block;
      float: left;
      border: none;
      outline: none;
      height: 35px;
      line-height: 35px;
      font-size: 18px;
      font-weight: 400;
      color: rgba(69, 69, 69, 1);
      background: #fff;
      b {
        color: #e8390a;
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
}
</style>
