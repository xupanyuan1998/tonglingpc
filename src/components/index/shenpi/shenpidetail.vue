<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="golists">在线审批</span><b> ></b><span>在线审批详情</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="left">
        <h3 v-for="(item,idx) in leftList" :key="idx" :class="leftSelect==item.categoryId?'select':''" @click="golist(idx)">{{item.name}}</h3>
      </div>
      <div class="right">
        <div class="tips">
          <div class="top"><div><p>{{content.title}}</p><span v-if="content.isTop===1">置顶</span></div></div>
          <div class="Units"><p> <span>发布日期&nbsp;:&nbsp;{{addTime}}</span><b>截止时间&nbsp;:&nbsp;2020-01-01</b> </p></div>
          <div class="content" v-html="content.content"></div>
          <p class="fu" v-if="content.attachmentName"><span>附件: </span> <a :href="content.attachment" :download="content.attachmentName">{{content.attachmentName}}</a></p>
        </div>
        <div class="hui" >
          <h5>资质评定上报材料</h5>
          <div  class="container">
            <div class="navs">
              <div class="t_l">
                <span>申请人</span><b>*</b>
              </div>
              <input type="text" v-model="title" id="title1">
              <div class="titot" id="titot1">
                申请人不能为空
              </div>
            </div>
            <div class="navs">
              <div class="t_l">
                <span>单位</span><b>*</b>
              </div>
              <input type="text" v-model="names" id="title2">
              <div class="titot" id="titot2">
                单位不能为空
              </div>
            </div>
            <div class="navs">
              <div class="t_l">
                <span>标题</span><b>*</b>
              </div>
              <input type="text" v-model="titlename" id="title3">
              <div class="titot" id="titot3">
                标题不能为空
              </div>
            </div>
            <div class="navs">
              <div class="t_l">
                <span>备注</span>
              </div>
              <textarea v-model="contents" ></textarea>
            </div>
            <div class="file">
              <div class="t_l">
                <span>附件</span>
              </div>
              <h4>
                <p><button>上传文件</button>
                  <input type="file" @change="addtu($event)" title="" ref="addtu">
                </p>
                <b v-if="fujian.name==''">请上传不大于10M的文件</b>
                <b v-if="fujian.name!=''">{{fujian.name}}</b>
              </h4>
            </div>
            <button class="save" @click="saveques">提交</button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <footer-nav></footer-nav>
    </div>
    <place  :placeshow="placeshow"  @hide="placeshow = false" :success="success" :succmsg=" succmsg" :errorshow="errorshow"></place>
  </div>
</template>

<script>
  import headNav from "../../headNav";
  import footerNav from "../../footer";
  import '../../../assets/css/mianbao.less'
  export default {
    name: "shenpidetali",
    components: {
      headNav,
      footerNav,
    },
    data(){
      return{
        toptitle:'铜陵市民营经济云服务智慧平台',
        clectnav: 0,
        leftList:'',
        leftSelect:0,
        content:'',
        title:'',
        userId:'',
        shoucang:'',
        success:2,
        placeshow:false,
        huifu:'',
        contents:'',
        names:'',
        titlename:'',
        addTime:"",
        infoId:'',
        fujian:{
          name:'',
          url:''
        },
        succmsg:'',
        errorshow:''
      }
    },
    created() {
      let id=this.$route.query.id;
      var a=localStorage.getItem('personal');
      this.msg=JSON.parse(a);
      if(a==null){
        this.userId=' ';
      }else{
        this.userId=JSON.parse(a).userId;
      }
      this.axios.post('/web/onlineapproval/categorylist').then((data)=>{
        this.leftList=data.data.data;
      });
      this.axios.post('/web/onlineapproval/details',{approvalId:id}).then(({data})=>{
        console.log(data.data);
        this.content=data.data;
        this.leftSelect=data.data.categoryId;
        this.addTime=this.clearFen(data.data.addTime);
        this.infoId=data.data.approvalId;
      });
      var b=localStorage.getItem('token');
      if(a==null){
        this.placeshow=true;
        this.success=2;
      }else{
        this.title=JSON.parse(a).userName;
      }
      this.$nextTick(function () {
        $('.content').children().css('font-size','14px')
      })
    },
    methods:{
      goindex(){
        this.$router.push('/')
      },
      golists(){
        this.$router.push('/shenpi');
      },
      golist(i){
       this.$router.push({
         path:'/shenpi',
         query:{
           id:i
         }
       })
      },
      clearFen(i) {
        return i.substr(0, i.indexOf(" "));
      },
      addtu(e){//提交文件
        let formData = new FormData();
        let file=e.target.files[ 0 ];
        if(file!=undefined){
          formData.append("img",file);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
          var that=this;
          this.$http.post('/web/onlinework/file', formData, config).then(function (res) {
            that.fujian.name=res.data.data.name;
            that.fujian.url=res.data.data.url;
            that.$refs.addtu.value = null;
          })
        }
      },
      saveques(){
          let that=this;
        $('#titot2').css({display:'none'});
        $('#titot3').css({display:'none'});
        $('#titot1').css({display:'none'});
        //提交资质评定信息
        if(this.names==''){
          $('#titot2').css({display:'block'});
        }else if(this.titlename==''){
          $('#titot3').css({display:'block'})
        }else if(this.title==''){
          $('#titot1').css({display:'block'})
        }else{
          this.axios({
            method: 'post',
            url: '/web/onlineapproval/add',
            data: {
              approvalId: this.infoId,
              attachment: this.fujian.url,
              attachmentName: this.fujian.name,
              title: this.titlename,//标题
              content: this.contents,//备注
              operatorName: this.title,//添加人员
              departmentName: this.names//
            }
          }).then(({data}) => {
            if (data.code == 10001) {
              this.placeshow=true;
              this.success=3;
              this.succmsg='提交成功';
              setTimeout(function () {
                that.placeshow=false;
                window.location.reload();
              },2000)
            } else {
              this.placeshow=true;
              this.success=5;
              this.errorshow=data.msg;
                setTimeout(function () {
                    that.placeshow=false;
                },2000)
            }
          })
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  .hello{
    background: #fff;
  }
  .tips{
    background: #fff;
  }
  .warp{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding: 21px 0;
    .left{
      background: #fff;
      float: left;
      margin-right: 20px;
      width:186px;
      border:1px solid rgba(230,230,230,1);
      border-top: none;
      h3{
        width:186px;
        height: 50px;
        line-height: 50px;
        border-top: 1px solid rgba(230,230,230,1);
        text-align: center;
        font-size:20px;
        font-weight:400;
        color:#454545;
        cursor: pointer;
      }
      h3.select{
        color: #E84012;
        border-top: 1px solid #FF6A42;
      }
    }
    .right{
      background: #fff;
      float: left;
      width:989px;
      min-height: 700px;
      border:1px solid rgba(217,217,217,1);
      .top{
        padding-top: 40px;
        height: 30px;
        text-align: center;
        margin-bottom: 20px;
        div{
          display: inline-block;
          p{
            display: block;
            float: left;
            height: 30px;
            line-height: 30px;
            font-size:26px;
            font-weight:400;
            color:rgba(69,69,69,1);
          }
          span{
            display: block;
            float: left;
            width:40px;
            height:18px;
            background:rgba(255,106,66,1);
            border-radius:4px;
            font-size:12px;
            font-weight:400;
            color:rgba(254,254,254,1);
            text-align: center;
            margin-left: 10px;
          }
        }
      }
      .Units{
        padding-bottom: 14px;
        cursor: default;
        height: 30px;
        text-align: center;
        p{
          display: inline-block;
          span{
            display: block;
            float: left;
            height: 48px;
            line-height: 48px;
            font-size:16px;
            font-weight:400;
            color:rgba(115,115,115,1);
            margin-right: 47px;
          }
          b{
            float: left;
            display: block;
            height: 48px;
            line-height: 48px;
            font-size:16px;
            font-weight:400;
            color:rgba(115,115,115,1);
          }
        }
      }
      .cate{
        height:50px;
        margin: 10px 88px 10px 93px;
        cursor: default;
        text-align: center;
        background:rgba(245,245,245,1);
        div{
          display: inline-block;

          overflow: hidden;
          padding:0 40px;
          >*{
            display: block;
            float: left;
            height: 50px;
            line-height: 50px;
            font-size:16px;
          }
        }

        span{
          font-weight:400;
          color:rgba(69,69,69,1);
        }
        b{
          margin-left: 50px;
          font-weight:400;
          color:rgba(69,69,69,1);
        }
        strong{
          margin-left: 39px;
          font-weight:400;
          color:rgba(69,69,69,1);
        }
        p{
          float: right;
          cursor: pointer;
          margin-left: 32px;
          overflow: hidden;
          img{
            display: block;
            float: left;
            margin: 18px 10px;
          }
          i{
            display: block;
            float: left;
          }
        }
      }
      .content{
        padding: 32px 88px 58px 93px;
        line-height: 40px;
        min-height: 700px;
        font-size: 18px;
      }
      .fu{
        width:730px;
        height:40px;
        padding-bottom: 50px;
        margin-left: 90px;
        overflow: hidden;
        >*{
          display: block;
          float: left;
          height:40px;
          line-height: 40px;
        }
        span{
          margin-left: 21px;
          font-size:14px;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
        a{
          font-size:14px;
          font-weight:400;
          color:rgba(11,0,255,1);
          margin-left: 15px;
        }
      }
    }
    .hui{
      h5{
        width: 820px;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        color: #fe0000;
        font-weight: 500;
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 2px dashed #c6c6c6;
        margin-bottom: 20px;
      }
      margin-top: 30px;
      background: #fff;
      padding: 32px 88px 100px 93px;
      margin-bottom: 50px;
      .container {
        width: 790px;
        margin:33px auto 0 auto;
        .place {
          margin-left: 55px;
          width: 650px;
          height: 55px;
          line-height: 55px;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(232,57,10,1);
        }
        .navs{
          overflow: hidden;
          margin-bottom: 20px;
          .t_l{
            float: left;
            margin-right: 16px;
            width: 100px;
            text-align: right;
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
              font-weight:bold;
              color:rgba(51,51,51,1);
            }
          }
          input{
            display: block;
            float: left;
            padding: 0 10px;
            width:650px;
            height:34px;
            line-height: 34px;
            border:1px solid rgba(203,203,203,1);
            border-radius:4px;
            outline: none;
          }
          .titot{
            float: right;
            display: none;
            width:670px;
            height:30px;
            line-height: 30px;
            color: #fe0000;
          }
          input:focus{
            border:1px solid #ff744f;
            outline:none;
          }
          textarea:focus{
            outline:1px solid #ff744f;
          }
          textarea{
            padding: 0 10px;
            width:650px;
            height:178px;
            line-height: 29px;
            border:1px solid rgba(203,203,203,1);
            border-radius:4px;
            font-size: 14px;
            outline: none;
            resize: none;
          }
          .sutot{
            float: left;
            display: none;
            width:650px;
            height:178px;
            border:1px solid rgba(203,203,203,1);
            .sutots{
              width: 650px;
              margin:10px ;
              background: #ffa2a2;
              height: 158px;
            }
          }
        }
        .file{
          height: 34px;
          line-height: 34px;
          margin-bottom: 27px;
          .t_l{
            float: left;
            width: 100px;
            height: 34px;
            line-height: 34px;
            font-size:16px;
            font-weight:bold;
            color:rgba(69,69,69,1);
            margin-right:16px;
            text-align: right;
          }
          h4{
            float: left;
            overflow: hidden;
            p{
              width:92px;
              height:32px;
              background:#1abbf9;
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
                background:#1abbf9;
                outline: none;
                border: none;
                font-size:16px;
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
              background: #40c3f5;
              button{
                background: #40c3f5;
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
          background:#1abbf9;
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
          background:#40c3f5 ;
        }
      }
    }
  }
</style>

