<template>
    <div>
      <div class="top">
        <head-nav :clect="clectnav" :title="toptitle"></head-nav>
      </div>
      <div class="warp">
        <div class="left">
          <h1><span class="xuan">通知公告</span> <router-link tag="a" to="/policy">更多 >></router-link></h1>
          <ul class="addlist">
            <li v-for="(item,idx) in zhengData.notice" :key="idx"><b></b> <router-link tag="a" :to="{path:'/policy/policydetali',query:{id:item.noticeid}}">{{item.title}}</router-link> <span>{{clearFen(item.addTime)}}</span></li>
          </ul>
        </div>
        <div class="right left">
            <h1><span class="xuan">办事指南</span> <router-link tag="a" to="/information/guides">更多>></router-link></h1>
            <ul class="addlist">
              <li v-for="(item,idx) in  zhengData.guidelist" :key="idx"><b></b> <router-link tag="a" :to="{path:'/information/guides/guidesDetali',query:{id:item.guideId}}">{{item.title}}</router-link> <span>{{clearFen(item.publishTime)}}</span></li>
            </ul>
        </div>
        <div class="left news">
          <h1><span class="xuan">新闻资讯</span> <p><i :class="showlist==idx?'clect':''" v-for="(item,idx) in newslists" @mouseover="xinwen(idx,item.cateogryId)">{{item.name}}</i></p></h1>
          <div class="new">
            <img :src="int.newsImg" alt="">
            <div>
              <p >{{int.pressBrief}}</p>
              <router-link tag="a" :to="{path:'/newslist/newsdetali',query:{id:int.newsId}}">查看更多</router-link>
            </div>
          </div>
          <ul class="addlist">
            <li v-for="(item,idx) in zhengData.newslist" :key="idx"><b></b> <router-link tag="a" :to="{path:'/newslist/newsdetali',query:{id:item.newsId}}">{{item.title}}</router-link> <span>{{clearFen(item.addTime)}}</span></li>
          </ul>
        </div>
        <div class="right left">
          <h1><span class="xuan">本市政策</span>  <router-link tag="a" to="/information/informationMore">更多>></router-link></h1>
          <ul class="addlist">
            <li v-for="(item,idx) in zhengData.policycitylist" :key="idx"><b></b> <router-link tag="a" :to="{path:'/information/informationMore/informationdetali',query:{id:item.policyId,leftId:0}}">{{item.title}}</router-link> <span>{{clearFen(item.publishTime)}}</span></li>
          </ul>
        </div>
        <div class="con">
          <img src="../../../../static/images/19.png" alt="">
        </div>
        <div class="left">
          <h1><span class="xuan">事项服务</span> <router-link tag="a" to="">更多 >></router-link></h1>
          <ul class="addlist">
            <li v-for="(item,idx) in zhengData.onlineworklist" :key="idx"><b></b> <router-link tag="a" :to="{path:'',query:{id:item.onlineworkcusformId}}">{{item.formname}}</router-link> <span>{{clearFen(item.createTime)}}</span></li>
          </ul>
        </div>
        <div class="right left">
          <h1><span v-for="(item,idx) in zheng" :class="idx==zhengClect?'xuan':''" @mouseover="xuanz(idx)">{{item}}</span></h1>
          <ul class="addlist" v-if="zhengClect==0">
            <li v-for="(item,idx) in zhengData.provincepolicylist" :key="idx" ><b></b> <router-link tag="a" :to="{path:'/information/informationMore/informationdetali',query:{id:item.policyId,leftId:1}}">{{item.title}}</router-link> <span>{{clearFen(item.publishTime)}}</span></li>
          </ul>
          <ul class="addlist" v-if="zhengClect==1">
            <li v-for="(item,idx) in zhengData.centerpolicylist" :key="idx" ><b></b> <router-link tag="a" :to="{path:'/information/informationMore/informationdetali',query:{id:item.policyId,leftId:2}}">{{item.title}}</router-link> <span>{{clearFen(item.publishTime)}}</span></li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <footer-nav></footer-nav>
      </div>
    </div>
</template>

<script>
  import headNav from "../../headNav";
  import footerNav from "../../footer"
    export default {
        name: "information",
        data(){
           return{
               clectnav: 1,
               toptitle:'铜陵市民营经济云服务智慧平台',
               zheng:['本省政策','中央政策'],
               zhengClect:0,
               newslists:['铜陵','安徽','全国'],
               showlist:0,
               zhengData:{
                   notice:'',
                   guidelist:'',
               },
               int:'',
           }
        },
        components:{
            headNav,
            footerNav
        },
        created(){
            this.axios.post('/web/policy/information').then(({data})=>{
                console.log(data);
                this.zhengData.notice=this.sliceAway(data.data.noticelist,7);//公告
                this.zhengData.guidelist=this.sliceAway(data.data.guidelist,7);//办事指南;
                this.zhengData.newslist=this.sencted(data.data.newslist);//新闻
                this.zhengData.policycitylist=this.sliceAway(data.data.policycitylist,7);//本市政策
                this.zhengData.provincepolicylist=this.sliceAway(data.data.provincepolicylist,7);//本省政策
                this.zhengData.centerpolicylist=this.sliceAway(data.data.centerpolicylist,7);//中央政策
                this.zhengData.onlineworklist=this.sliceAway(data.data.onlineworklist,7);//中央政策
                this.int=data.data.newslist[0];//新闻部分第一条
                this.newslists=data.data.noticecateogrylist;
            })
        },
        methods:{
            xuanz(i){
                this.zhengClect=i;
            },
            xinwen(i,b){
              this.showlist=i;
              this.axios.post('/web/policy/newlist',{type:b}).then(({data})=>{
                  this.zhengData.newslist=this.sencted(data.data,1);//新闻
                  this.int=data.data[0];//新闻部分第一条
                })
            },
            clearFen(i){
                return i.substring(0,i.indexOf(' '))
            },
            //切割数组
            sliceAway(arr,i){
                //arr=数组  i切割结束的下标
                return arr.slice(0,i);
            },
            //截取数组第二位到最后
            sencted(arr){
                //arr=数组  i切割结束的下标
                return arr.slice(1,5);
            }
        }
    }
</script>

<style scoped lang="less">
.warp{
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  padding-bottom: 20px;
  .left{
    float: left;
    width:588px;
    height:322px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(213, 213, 213, 0.68);
    margin-top: 20px;
    overflow: hidden;
    h1{
      width:588px;
      height:36px;
      background:rgba(245,245,245,1);
      cursor: default;
      span{
        cursor: pointer;
        float: left;
        display: block;
        width:120px;
        height:36px;
        text-align: center;
        line-height: 36px;
        color: #454545;
        font-size:20px;
        font-weight:400;

      }
      span.xuan{
        background:rgba(231,57,10,1);
        color:rgba(255,255,255,1);
      }
      a{
        display: block;
        float: right;
        line-height: 36px;
        height: 36px;
        font-size:12px;
        font-weight:400;
        color:rgba(122,122,122,1);
        margin-right: 30px;
      }
    }
    .addlist{
      width: 535px;
      margin: 7px 30px 0 24px;
      li{
        width: 515px;
        height: 35px;
        line-height: 35px;
        border-bottom: 1px dashed #c5c5c5;
        font-size: 14px;
        b{
          display: block;
          float: left;
          margin: 11px 10px 11px 6px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 4px 0 4px 4px;
          border-color: transparent transparent transparent #e53509;
        }
        a{
          display: block;
          overflow: hidden;
          float: left;
          height: 35px;
          line-height: 35px;
          width: 400px;
          margin-right: 7px;
        }
        span{
          display: block;
          float: right;
          height: 35px;
          line-height: 35px;
          color: #bdbdbd;
        }
      }
      li:hover{
        a{
          color: #e7390a;
        }
      }
      li:last-child{
        border-bottom: none;
      }
    }
  }
  .right{
    margin-left: 20px;
  }
  .news{
    h1{
      p{
        height:17px;
        float: right;
        margin: 9px 33px;
        i:hover {
          cursor: pointer;
        }
        i{
          display: block;
          height: 17px;
          line-height: 17px;
          font-size:16px;
          font-weight:400;
          color: #454545;
          float: left;
          padding-right: 10px;
          border-right: 2px solid #E7390A;
          margin-left: 10px;
        }
        i:last-child{
          border-right: none;
          padding-right: 0;
        }
        i.clect{
          color:rgba(231,57,10,1);
        }
      }
    }
    .new{
      width:536px;
      height: 93px;
      padding: 14px 28px 10px 28px;
      img{
        width: 133px;
        height: 93px;
        display: block;
        float: left;
      }
      div{
        float: left;
        margin-left: 22px;
        width: 378px;
        height: 93px;
        overflow: hidden;
        p{
          width: 375px;
          height: 75px;
          line-height: 18px;
          overflow: hidden;
          font-size:14px;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
        a{
          display: block;
          float: right;
          font-size:12px;
          font-weight:400;
          color:rgba(189,189,189,1);
          line-height:18px;
        }
      }
    }
  }
  .con{
    float: left;
    width: 1200px;
    margin-top: 20px;
    img{
      width: 1200px;
    }
  }
}
</style>
