<template>
    <div class="hello">
      <div class="top">
        <head-nav :clect="clectnav" :title="toptitle"></head-nav>
      </div>
      <div class="container">
        <div class="nav">
          <span @click="goindex">首页</span><b> ></b><span @click="golists">政策信息</span><b> ></b><span>本市政策详情</span>
        </div>
        <div class="line"></div>
      </div>
      <div class="warp">
        <div class="left">
          <h3 v-for="(item,idx) in leftList" :key="idx" :class="leftSelect==item.affairsId?'select':''" @click="golist(idx)">{{item.affairsName}}</h3>
        </div>
        <div class="right">
          <div class="top"><div><p>{{content.title}}</p><span v-if="content.isTop===1">置顶</span></div></div>
          <div class="Units"><p><span>发布单位&nbsp;:&nbsp;{{content.departmentName }}</span> <b>发布日期&nbsp;:&nbsp;{{addTime}}</b> </p></div>
          <div class="cate">
            <div>
              <span>分类&nbsp;:&nbsp;{{content.categoryName}}</span> <b>行业&nbsp;:&nbsp;全部</b> <strong v-if="content.classIcno">分类编号&nbsp;:&nbsp;{{content.classIcno}}</strong> <p v-if="shoucang==0"><img src="../../../../static/images/18.png" alt="" @click="collection(content.policyId)"><i>收藏</i></p> <p v-if="shoucang==1"><img src="../../../../static/images/77.png" alt="" @click="canclecollection(content.policyId)"><i class="shou">已收藏</i></p>
            </div>
          </div>
          <div class="content" v-html="content.content"></div>
          <p class="fu" v-if="content.attachmentName"><span>附件: </span> <a :href="content.attachment" :download="content.attachmentName">{{content.attachmentName}}</a></p>
        </div>
      </div>
      <div class="bottom">
        <footer-nav></footer-nav>
      </div>
      <place  :placeshow="placeshow"  @hide="placeshow = false"></place>
    </div>
</template>

<script>
    import headNav from "../../headNav";
    import footerNav from "../../footer";
    import place from '../../../place/place'
    import '../../../assets/css/mianbao.less'
    export default {
        name: "informationdetali",
        components: {
            headNav,
            footerNav,
          place,
        },
        data(){
            return{
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 0,
                leftList:'',
                leftSelect:0,
                content:'',
                userId:'',
                shoucang:'',
                success:0,
                placeshow:false,
              addTime:''
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
            this.axios.post('/web/policy/policycategory').then((data)=>{
                this.leftList=data.data.data.reverse();
            });
            this.axios.post('/web/policy/policy',{policyId:id,userId:this.userId}).then(({data})=>{
                console.log(data.data);
                this.content=data.data;
                this.shoucang=data.data.collState;
                this.leftSelect=data.data.categoryId;
              this.addTime=this.clearFen(data.data.publishTime);
            });
            this.$nextTick(function () {
                $('.content').children().css('font-size','14px');
              $('.content').find('p').css({'text-indent':'2em'});
            })
        },
        methods:{
            goindex(){
                this.$router.push('/')
            },
            golist(i){
                this.$router.push({
                  path:'/informationMore',
                  query:{
                    id:i
                  }
                })
            },
          golists(){
              this.$router.push('/informationMore')
          },
            //关闭
            choose(){
                this.placeshow=false;
            },
            //注册页面
            res(){
                this.$router.push('/registered')
            },
            //找回密码页面
            results(){
                alert(1);
                this.$router.push('/resultPassword')
            },
            cancleback(){
                this.placeshow=false;
            },
          //收藏
          collection(i){
            console.log(this.msg,i);
            var a='#'+this.$route.fullPath;
            if(this.msg==null){
              this.placeshow=true;
            }else{
              this.axios.post('/web/usercollection/usercollection',{contentId:i,state:1,type:2,userId:this.msg.userId,Url:a}).then(({data})=>{
                if(data.code==10001){
                  this.shoucang=1;
                }
              })
            }

          },
          //取消收藏
          canclecollection(i){
            this.axios.post('/web/usercollection/usercollection',{contentId:i,state:2,type:2,userId:this.userId,Url:' '}).then(({data})=>{
              if(data.code==10001){
                this.shoucang=0;
              }
            })
          },
          clearFen(i) {
            return i.substring(0, i.indexOf(" "));
          },
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
  }
</style>
