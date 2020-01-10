<template>
  <div>
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="warp">
      <div class="posi">
        <span>当前位置 ：</span><b @click="gosuqiu">在线诉求</b><em> ></em><b>工单详情</b>
      </div>
      <div class="content" >
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
        <div class="hui">
          <h4>办理情况</h4>
          <div class="ba_color">
            <ul>
              <li v-for="(item,idx) in banli " :key="idx">
                <div class="tit"><i>{{item.processTitle}}</i><span>时间：{{item.addTime}}</span></div>
                <p>{{item.content}}</p>
                <div class="fujian" v-if="item.attachmentName.length>1">
                  <em>附件：</em><a :href="item.attachment" :download="item.attachmentName">{{item.attachmentName}}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="bans" v-show="orderInfo.isHandle==0&&orderInfo.state==3">
          <h4>办理</h4>
          <div class="ba_color">
            <div class="beizhu">
              <textarea placeholder="办理信息" v-model="beizhu"></textarea>
              <b id="places">办理信息不能为空</b>
            </div>
            <div class="wen">
              <span>附件：</span>
              <p>
                <input type="file" title="" @change="addtu($event)" ref="addtu">
                <button>上传文件</button>
              </p>
              <b v-if="cai.name==''" STYLE="color: #c00">文件大小不能超过10MB</b>
              <b>{{cai.name}}</b>
            </div>
            <div class="save">
              <button @click="jiaoban">交办</button>
              <button @click="end">完成</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <footer-nav></footer-nav>
    </div>
    <div class="jiao"  v-show="jiaos" @mousewheel.prevent>
      <div class="cc" @mousewheel.stop>
        <h2>派发工单</h2>
        <ul class="selec">
          <li class="bu"><b>分管部门:</b>
            <em @click="chooseTree">{{bumen.deptName}}</em>
            <div class="tree" v-show="treeShow">
              <el-tree :data="datas" node-key="deptId"  default-expand-all @node-click="handleNodeClick"  :props="defaultProps">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span>
                          <i :class="data.icon"></i>{{ node.label }}
                      </span>
                  </span>
              </el-tree>
            </div>
          </li>
          <li class="bu">
            <b>经办人:</b>
            <em  @click="choosebu">{{jingban.nickname}}</em>
            <template v-if="renShow">
              <ul class="ren" v-if="jingbanlist!=''">
                <li v-for="(item,idx) in jingbanlist" :key="idx" @click="chooseren(item)">{{item.nickname}}</li>
              </ul>
              <div class="ppp" v-else>
                暂无经办人
              </div>
            </template>
          </li>
        </ul>
        <button class="save" @click="savepai">提交</button>
        <strong class="el-icon-close" @click="cloose"></strong>
      </div>
    </div>
    <place  :placeshow="placeshow" :success="success" @hide="placeshow = false" :errorshow="plas" :succmsg="succmsg"></place>
  </div>
</template>

<script>
  import headNav from "../../headNav";
  import footerNav from "../../footer";
  import Treeselect from '@riophae/vue-treeselect'
  export default {
    name: "listdetail",
    components: {
      headNav,
      footerNav,
      Treeselect
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
        banli:'',
        treeShow:false,
        renShow:false,
        jiaos:false,
        datas:[],
        bumen:'',
        succmsg:'',
        defaultProps: {
          children: 'childlist',
          label: 'deptName'
        },
        jingban:'',
        jingbanlist:'',
        beizhu:'',
        cai:{
          name:'',
          url:''
        },
        placeshow:false,
        success:5,
        plas:'文件过大',
        fullscreenLoading:false,
      }
    },
    created() {
      var a=JSON.parse(localStorage.getItem('personal'));
      this.userId=a.userId;
      this.orderId=this.$route.query.id;
      this.axios
        .post("/web/order/orderdetails", {
          orderId:this.orderId
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == 10001) {
            this.orderInfo = data.data.workorder;
            this.fullstar = data.data.workorder.satisfactionDegree;
            this.banli=data.data.orderprocess;
            this.banli.shift();
          }
        });
    },
    methods:{
      gosuqiu(){
        this.$router.push('/Antonym')
      },
      handleNodeClick(data) {
        this.treeShow=false;
        this.bumen=data;
        this.axios.post(`/web/department/distribution`,{deptId:data.deptId}).then(({data})=>{
          console.log(data);;;
          this.jingbanlist=data.data;
          //this.jingban=data.data[0];
        })
      },
      append(data) {
        console.log("当前data为：",data);
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      //选择分管部门
      chooseTree(){
        if( this.treeShow==false){
          this.treeShow=true;
        }else{
          this.treeShow=false;
        }
      },
      //选择经办人
      choosebu(){
        if( this.renShow==false){
          this.renShow=true;
        }else{
          this.renShow=false;
        }
      },
      //工单派发
      savepai(){
        let that=this;
        if(this.bumen!=''&&this.jingban!=''){
          this.axios.post('/web/order/distribution',{
            operatorId:this.jingban.id,
            orderId:this.orderId,
            userId:this.userId,
            attachment:this.cai.url,
            attachmentName:this.cai.name,
            content:this.beizhu
          }).then(({data})=>{
            if(data.code==10001){
              //交办成功
              this.placeshow=true;
              this.success=3;
              this.succmsg=data.msg;
              setTimeout(function () {
                that.placeshow=false;
                that.jiaos=false;
                that.axios
                  .post("/web/order/orderdetails", {
                    orderId:that.orderId
                  })
                  .then(({ data }) => {
                    if (data.code == 10001) {
                      that.orderInfo = data.data.workorder;
                      that.banli=data.data.orderprocess;
                      that.banli.shift();
                    }else if (data.code == 500){
                      that.placeshow=true;
                      that.success=5;
                      that.plas=data.code.msg;
                    }
                  });
              },2000)

            }else if (data.code == 500){
                this.placeshow=true;
                this.success=5;
                this.plas=data.msg;
                setTimeout(function () {
                  this.placeshow=false;
                },2000)
              }
          })
        }
      },
      //已完成
      end(){
        let that=this;
        $('#places').css({display:'none'});
        if(this.beizhu==''){
          $('#places').css({display:'block'});
        }else{
          this.axios.post('/web/order/handlereturns',{
            content:this.beizhu,
            orderId:this.orderId,
            replyAttachment:this.cai.url,
            replyAttachmentName:this.cai.name,
            state:6,
            userId:this.userId,
          }).then(({data})=>{
            if(data.code==10001){
              this.placeshow=true;
              this.success=3;
              this.succmsg=data.msg;
              setTimeout(function () {
                that.placeshow=true;
                that.axios
                  .post("/web/order/orderdetails", {
                    orderId:this.orderId
                  })
                  .then(({ data }) => {
                    if (data.code == 10001) {
                      that.orderInfo = data.data.workorder;
                      that.banli=data.data.orderprocess;
                      that.banli.shift();
                    }
                  });
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
      },
      chooseren(i){
        this.renShow=false;
        this.jingban=i;
      },
      cloose(){
        this.jiaos=false;
      },
      jiaoban(){
        $('#places').css({display:'none'});
        if(this.beizhu==''){
          $('#places').css({display:'block'});
        }else{
          this.jiaos=true;
          //获取分管部门列表
          this.axios.post('/web/department/department',).then(({data})=>{
            // console.log(data.data);
            this.datas=data.data;
            this.bumen=data.data[0];
          })

        }

      },
      //上传图片
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
            that.cai.name=res.data.data.name;
            that.cai.url=res.data.data.url;
            console.log(that.cai)
          })
        }else{
          return false;
        }

      },
    },
  }
</script>

<style scoped lang="less">
  .warp{
    width: 1200px;
    margin: 0 auto;
    background: #fff;
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
      .file{
        margin-top: 10px;
        display: flex;
        height: 20px;
        flex-direction: row;
        align-items: center;
        span{
          font-size: 14px;
          color: #454545;
        }
        a{
          font-size: 14px;
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
        font-size: 12px;
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
      .hui,.ping,.bans{
        margin-top: 30px;
        h4{
          background: #d73140;
          height: 28px;
          width: 65px;
          padding: 0 15px;
          color: #fff;
          line-height: 25px;
          border-radius: 4px 4px 0 0;
          font-size: 16px;
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
            padding-bottom: 20px;
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
              font-size: 14px;
              line-height: 24px;
              margin-right: 10px;
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
        }
      }
      .hui{
        ul{
          li:last-child{
            border-bottom: none;
          }
          li{
            border-bottom:1px solid #ccc ;
            padding-bottom: 10px;
            margin-bottom: 10px;
            .tit{
              height: 30px;
              line-height: 30px;
              margin-bottom: 10px;
              >*{
                height: 30px;
                line-height: 30px;
                float: left;
                font-size: 18px;
              }
              i{
                color: #4d4d4d;
                font-weight: bold;
              }
              span{
                float: right;
                font-size: 16px;
              }
            }
            p{
              padding:0 20px;
              margin-bottom: 10px;
            }
            .fujian{
              padding: 0 20px;
              a{
                color: #3a8ee6;
              }
            }
          }
        }
      }
      .bans{
        .beizhu{
          margin-top: 10px;
          height: 150px;
          b{
            display: none;
            color: #fe0000;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            margin-left: 10px;
          }
        }
        textarea{
          background: none;
          display: block;
          padding: 10px 20px;
          height: 100px;
          resize: none;
          outline: none;
          border-radius: 4px;
          line-height: 25px;
          width: 1000px;
          font-size: 16px;
        }
        textarea:focus{
          border:1px solid #ff744f;
        }
        .wen{
          height: 30px;
          line-height: 30px;
          margin-top:20px;
          span{
            display: block;
            float: left;
            height: 30px;
          }
          p{
            float: left;
            height: 30px;
            width: 80px;
            line-height: 30px;
            position: relative;
            margin-top: 0;
            cursor: pointer;
            input{
              position: absolute;
              display: block;
              float: left;
              height: 30px;
              width: 80px;
              top: 0;
              left: 0;
              z-index: 2;
              opacity: 0;
              cursor: pointer;
            }
            button{
              position: absolute;
              top: 0;
              left: 0;
              display: block;
              float: left;
              height: 30px;
              width: 80px;
              border: none;
              outline: none;
              background: #1b8cff;
              color: #fff;
              border-radius: 4px;
              cursor: pointer;
            }
            button:hover{
              background: #2c6af8;
            }
          }
          b{
            height: 30px;
            line-height: 30px;
            margin-left: 10px;
            font-size: 16px;
            font-weight: normal;
            color: #b3b3b3;
          }

        }
        .save{
          margin: 110px 20px 20px 0;
          button{
            border: none;
            outline: none;
            width: 68px;
            height: 28px;
            border-radius: 4px;
            color: #fff;
            margin-right: 30px;
            cursor: pointer;
          }
          button:first-child{
            background: #FF8D22;
          }
          button:last-child{
            background:  #1b8cff;
          }
          button:first-child:hover{
            background: #FD8412;
          }
          button:last-child:hover{
            background: #2c6af8;
          }
        }
      }
    }
  }
</style>
<style scoped lang="less">
  .jiao{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.16);
    position: fixed;
    top: 0;
    left: 0;
    .cc::-webkit-scrollbar {display:none}
    .cc{
      width: 1200px;
      height: 800px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      overflow-y:auto ;
      overflow-x:hidden ;
      h2{
        height: 40px;
        line-height: 40px;
        font-weight: 400;
        font-size: 18px;
        background: #f2f2f2;
        padding:0 40px;
      }
      .selec{
        width: 800px;
        margin: 30px auto;
        .bu{
          position: relative;
          width: 100%;
          padding: 0;
          margin-bottom: 20px;
          border: none;
          overflow: hidden;
          b{
            display:block;
            height: 30px;
            line-height: 30px;
            float: left;
            width: 80px;
            font-weight: 400;
          }
          em{
            float: left;
            display: block;
            margin-left: 18px;
            height: 30px;
            line-height: 30px;
            width: 680px;
            border: 1px solid #e6e6e6;
            padding-left: 20px;
          }
          .tree{
            width: 700px;
            background: #fff;
            display: block;
            float: right;
            border: 1px solid #e6e6e6;
            max-height: 300px;
            overflow-y: auto;
          }
          .ren{
            width: 700px;
            background: #fff;
            display: block;
            float: right;
            border: 1px solid #e6e6e6;
            padding-bottom: 0;
            max-height: 200px;
            overflow-y: auto;
            li{
              height: 30px;
              line-height: 30px;
              padding:0 20px;
              font-size: 16px;
              border-bottom: 1px solid #e6e6e6;
              cursor: pointer;
            }
            li:last-child{
              border: none;
            }
            li:hover{
              background: #e6e6e6;
            }
          }
          .ppp{
            width: 680px;
            background: #fff;
            display: block;
            float: right;
            border: 1px solid #e6e6e6;
            padding-bottom: 0;
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
          }
        }
      }
      .save{
        width: 130px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        display: block;
        margin:0 auto;
        border: none;
        outline: none;
        background: #ff4c4c;
        color: #fff;
        cursor: pointer;
        border-radius: 4px;
      }
      .save:hover{
        background: #f56c6c;
      }
      strong{
        display: block;
        font-size: 30px;
        position: absolute;
        right: 0px;
        top: 0;
        color: #4d4d4d;
      }
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    i{
      width: 19px;
    }
  }
</style>
