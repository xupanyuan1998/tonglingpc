<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="golist">办事指南</span><b> ></b><span>办事指南详情</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="left">
        <ul>
          <li  :class="showLest==0?'slec':''"  @click="leftS('')"><span>全部</span></li>
          <li v-for="(item,idx) in leftList" :key="idx" :class="showLest==item.deptId?'slec':''"  @click="leftS(item.deptId)"><span >{{item.deptName}}</span></li>
        </ul>
      </div>
      <div class="right">
        <div class="top"><div><p>{{content.title}}</p><span v-if="content.isTop===1">置顶</span></div></div>
        <div class="Units"><p><span>来源&nbsp;:&nbsp;{{content.departmentName }}</span> <b>发布日期&nbsp;:&nbsp;{{addTime}}</b> </p></div>
        <div class="cate">
          <div>
            <b>行业&nbsp;:&nbsp;全部</b>  <strong v-if="content.classIcno">分类编号&nbsp;:&nbsp;{{content.classIcno}}</strong> <p v-if="shoucang==0"><img src="../../../../static/images/18.png" alt="" @click="collection(content.guideId)"><i>收藏</i></p> <p v-if="shoucang==1"><img src="../../../../static/images/77.png" alt="" @click="canclecollection(content.guideId)"><i class="shou">已收藏</i></p>
          </div>
        </div>
        <div class="content" v-html="content.content"></div>
        <p class="fu" v-if="content.attachmentName"><span>附件: </span> <a :href="content.attachment" :download="content.attachmentName">{{content.attachmentName}}</a></p>
      </div>
    </div>
    <div class="footer">
      <footer-nav></footer-nav>
    </div>
    <place  :placeshow="placeshow"  @hide="placeshow = false"></place>
  </div>
</template>

<script>
    import headNav from "../../headNav";
    import footerNav from "../../footer"
    import place from '../../../place/place'
    import '../../../assets/css/mianbao.less'
    //var test=(/font-size:\w+;?/g,'');//过滤字体大小
    export default {
        name: "guidesDetali",
        data(){
            return{
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 1,
                id:'',
                content:'',
                leftList:'',
                showLest:'',
                cSize:2,
                fuList:[],
              shoucang:'',
              placeshow:false,
              addTime:'',
            }
        },
        components:{
            headNav,
            footerNav,
             place
        },
        methods:{
            goindex(){
                this.$router.push('/')
            },
            //新闻列表
            golist(){
                this.$router.push('/information/guides')
            },
          leftS(i){
              this.$router.push({
                path:'/information/guides',
                query:{
                  id:i
                }
              })
          },
          //收藏
          collection(i){
            console.log(this.msg,i);
            var a='#'+this.$route.fullPath;
            if(this.msg==null){
              this.placeshow=true;
            }else{
              this.axios.post('/web/usercollection/usercollection',{contentId:i,state:1,type:4,userId:this.msg.userId,Url:a}).then(({data})=>{
                if(data.code==10001){
                  this.shoucang=1;
                }
              })
            }

          },
          //取消收藏
          canclecollection(i){
            this.axios.post('/web/usercollection/usercollection',{contentId:i,state:2,type:4,userId:this.msg.userId,Url:' '}).then(({data})=>{
              if(data.code==10001){
                this.shoucang=0;
              }
            })
          },
          clearFen(i) {
            return i.substring(0, i.indexOf(" "));
          },
        },
        created() {
            var a=localStorage.getItem('personal');
          this.msg=JSON.parse(a);
          this.id=  this.$route.query.id;
          this.axios.post('/web/guide/guide',{guideId:this.id}).then(({data})=>{
              this.content=data.data.guide;
              this.leftList=data.data.departmentList;
              this.showLest=data.data.guide.departmentId;
            this.shoucang=data.data.guide.collState;
            this.addTime=this.clearFen(data.data.guide.publishTime);
              // console.log(data);
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
    padding-bottom: 30px;
    .left{
      float: left;
      margin-right: 20px;
      width:196px;
      ul{
        width: 196px;
        overflow: hidden;
        li{
          cursor: default;
          width: 89px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background:rgba(255,255,255,1);
          border:1px solid rgba(230,230,230,1);
          border-left: none;
          float: left;
          margin-right: 8px;
          margin-bottom: 10px;
          span{
            display: block;
            width: 85px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-left: 4px solid #FF6A42;
          }
        }
        li.slec{
          background: #E7390A;
          span{
            border: none;
            color: #fff;
          }
        }
      }
    }
    .right{
      background: #fff;
      float: left;
      width:980px;
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
  .page{
    margin: 30px 0;
    text-align: center;
    div{
      display: inline-block;
    }
  }
</style>
