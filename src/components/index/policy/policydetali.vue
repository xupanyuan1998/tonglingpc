<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="golist">通知公告</span><b> ></b><span>通知公告详情</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="left">
        <h3 v-for="(item,idx) in leftList" :key="idx" :class="item.cateogryId== left_show?'select':''" @click="golist">{{item.name}}{{item.categoryId}}</h3>
      </div>
      <div class="right">
       <div class="tips">
         <div class="top"><div><p>{{content.title}}</p><span v-if="content.isTop==1">置顶</span></div></div>
         <div class="Units"><p><span>发布单位:{{content.departmentName}}</span> <b>发布日期:{{addTime}}</b> </p></div>
         <div class="cate"><div><span>分类:{{content.name}}</span> <b>行业:全部</b> <strong v-if="content.classIcno !=''">分类编号:{{content.classIcno}}</strong> <p v-if="shoucang==0"><img src="../../../../static/images/18.png" alt="" @click="collection(content.noticeId)"><i>收藏</i></p> <p v-if="shoucang==1"><img src="../../../../static/images/77.png" alt="" @click="canclecollection(content.noticeId)"><i class="shou">已收藏</i></p></div></div>
         <div class="content" v-html="content.content"></div>
         <p class="fu" v-if="content.attachmentName"><span>附件: </span> <a :href="content.attachment" :download="content.attachmentName">{{content.attachmentName}}</a></p>
       </div>
        <div class="hui" v-if="content.isReply==1">
          <p>请填写您的意见</p>
          <textarea v-model="huifu" ></textarea>
          <button @click="huifus">提交</button>
        </div>
      </div>
    </div>
    <div class="bottom">
      <footer-nav></footer-nav>
    </div>
    <place  :placeshow="placeshow" :success="success"  @hide="placeshow = false" :errorshow="errorshow"></place>
  </div>
</template>

<script>
    import headNav from "../../headNav";
    import footerNav from "../../footer";
    import '../../../assets/css/mianbao.less'
    export default {
        name: "policydetali",
        components: {
            headNav,
            footerNav
        },
        data(){
            return{
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 0,
                content:'',
                shoucang:'',
                msg:'',
                userId:'',
                leftList:'',
                left_show:'',
                success:3,
                huifu:'',
              categoryId:'',
              placeshow:false,
              infoId:'',
              addTime:'',
              errorshow:''
            }
        },
        methods:{
          huifus(){
            var that=this;
            if(this.huifu==''){
              this.placeshow=true;
              this.success=5;
              this.errorshow='提交内容不能为空！'
            }else{
              this.axios.post('/web/seeking/reply',{content:this.huifu,infoId:this.infoId}).then(({data})=>{
                if(data.code==10001){
                  this.placeshow=true;
                  this.success=3;
                  setTimeout(function () {
                    that.placeshow=false;
                    that.huifu='';
                  },2000)
                }
              })
            }

          },
            //面包屑返回首页
            goindex(){
                this.$router.push('/')
            },
            //通知公告列表
            golist(){
                this.$router.push('/policy')
            },
            //收藏
            collection(i){
                console.log(this.$route.path);
                var a='#'+this.$route.fullPath;
                console.log(a);
                if(this.msg==null){
                    this.placeshow=true;
                    this.success=2;
                }else{
                    this.axios.post('/web/usercollection/usercollection',{contentId:i,state:1,type:3,userId:this.msg.userId,Url:a}).then(({data})=>{
                        if(data.code==10001){
                            this.shoucang=1;
                        }
                    })
                }

            },
            cloose(){
              this.placess=false;
            },
            //取消收藏
            canclecollection(i){
                this.axios.post('/web/usercollection/usercollection',{contentId:i,state:2,type:3,userId:this.userId,Url:' '}).then(({data})=>{
                    if(data.code==10001){
                        this.shoucang=0;
                    }
                })
            },
            //注册页面
            res(){
                this.$router.push('/registered')
            },
            //找回密码页面
            results(){
                this.$router.push('/resultPassword')
            },
            cancleback(){
                this.placeshow=false;
            },
          clearFen(i) {
            return i.substring(0, i.indexOf(" "));
          },
        },
        created() {
            var a=localStorage.getItem('personal');
           this.msg=JSON.parse(a);
            this.axios.post('/web/newnotice/newcategory',{type:2}).then((data)=>{
                this.leftList=data.data.data;
            });
            if(a==null){
                this.userId=' ';
            }else{
                this.userId=JSON.parse(a).userId;
            }
            this.categoryId=this.$route.query.cate;
          //获取数据
            this.axios.post('/web/newnotice/notice',{noticeId:this.$route.query.id,userId:this.userId}).then(({data})=>{
                console.log(data.data);
                this.content=data.data;
                this.infoId=data.data.noticeId;
                this.shoucang=data.data.collState;
                this.left_show=data.data.categoryId;
              this.addTime=this.clearFen(data.data.publishTime);
              this.$nextTick(function () {
                $('.content').find('img').css({'display':'block','margin':'0 auto',width:'300px'});
                $('.content').find('p').css({'text-indent':'2em'});
              })
            })
        }
    }
</script>

<style scoped lang="less">
  .hello{
    background: #fff;
  }

  .warp{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 21px;
    .left{
      float: left;
      margin-right: 20px;
      width:186px;
      border:1px solid rgba(230,230,230,1);
      border-top: none;
      background: #fff;
      h3{
        width:186px;
        height: 50px;
        line-height: 50px;
        border-top: 1px solid rgba(230,230,230,1);
        text-align: center;
        font-size:18px;
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
      float: left;
      width:989px;
      min-height: 800px;
      /*border:1px solid rgba(217,217,217,1);*/
      margin-bottom: 20px;
      .tips{
        background: #fff;
      }
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
      .hui{
        margin-top: 30px;
        background: #fff;
        padding: 32px 88px 16px 93px;
        margin-bottom: 50px;
        p{
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
        textarea{
          width: 800px;
          height: 200px;
          padding:  0 10px;
          border:1px solid #ccc;
          line-height: 30px;
          font-size: 14px;
          outline: none;
          display: block;
          margin: 0 auto;
          resize: none;
          border-radius: 5px;
        }
        textarea:focus{
          border: 1px solid #fe0000;
        }
        button{
          width: 70px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          border: none;
          outline: none;
          color: #fff;
          background: #ea0505;
          border-radius: 5px;
          display: block;
          margin: 30px auto;
        }
        button:hover{
          background: #fe0000;
          cursor: pointer;
        }
      }
    }
  }
  .place{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0,0,0,.16);
    .su{
      width: 320px;
      height: 150px;
      border-radius: 10px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      img{
        display: block;
        margin: 20px auto;
        width: 50px;
        height: 50px;
      }
      span{
        display: block;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
      }
    }
  }
</style>
