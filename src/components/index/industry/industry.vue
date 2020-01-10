<template>
  <div>
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="warp">
      <div class="center">
        <div class="left">
          <h4><span>政策资金</span></h4>
          <ul class="mon">
            <li v-for="(item,idx) in content.policyfundlist" :key="idx">
              <img :src="item.fundUrl" alt="">
              <div>
                <h2>{{item.title}}</h2>
                <p>{{item.fundBrief}}</p>
                <router-link tag="a" :to="{path:'/industry/industrydetali',query:{id:item.fundId}}">详情</router-link>
              </div>
            </li>
          </ul>
        </div>
        <div class="right">
          <h4>
            <span>成果荟萃</span>
          </h4>
          <div class="top">
            <img :src="news.fundUrl" alt="">
            <p>{{news.fundBrief}}</p>
          </div>
          <ul class="new">
            <li v-for="(item,idx) in content.assemblelist" :key="idx">
              <router-link tag="a" :to="{path:'',query:{id:item.fundId}}">{{item.title}} </router-link><span>{{clearFen(item.addtTime)}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="center">
        <div class="left rong ">
          <h4><span>银行服务</span></h4>
          <ul class="jin">
            <router-link tag="li" :to="{path:'',query:{id:item.foundId}}" v-for="(item,idx) in content.financelist" :key="idx"  :class="{'cle_r':idx%3==2}">
              <img :src="item.fundUrl" alt="">
              <div>
                <h2>{{item.title}}</h2>
                <p>{{item.fundBrief}}</p>
              </div>
            </router-link>
          </ul>
        </div>
        <div class="right rong jins">
          <h4>
            <span>金融产品</span>
          </h4>
          <div>即将上线，敬请期待!!!!</div>
<!--          <ul class=" dai">-->
<!--            <li v-for="(item,idx) in content.banklist" :key="idx">-->
<!--              <h3>{{item.title}}</h3>-->
<!--              <p>{{item.fundBrief}}</p>-->
<!--              <router-link tag="a" :to="{path:'',query:{id:item.fundId}}">详情 </router-link>-->
<!--            </li>-->
<!--          </ul>-->
        </div>
      </div>
      <div class="banner">
        <img src="../../../../static/images/49.png" alt="">
      </div>
      <div class="he">
        <h2><span>合作机构</span></h2>
        <ul>
          <li v-for="(item,idx) in content.partnerslist"><img :src="item.partnersUrl" alt=""></li>
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
    import footerNav from '../../footer'
    //获取轮播图

    export default {
        name: "industry",
        components:{headNav,footerNav},
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 4,
                clecttu:0,
                size:0,
                imgWidth:0,
                clone:'',
                content:{
                    policyfundlist:'',
                    assemblelist:'',
                    financelist:'',
                    partnerslist:'',
                    banklist:''
                },
                news:{},
            }
        },
        methods:{
          sliceAway(arr,i){
              return arr.slice(0,i)
          },
            sliceFirst(arr){
                return arr.slice(1,8)
            },
            clearFen(i){
                return i.substring(0,i.indexOf(' '))
            },
        },
        created(){
          this.axios.post('/web/industryfund/index').then(({data})=>{
              console.log(data);
              this.content.policyfundlist=this.sliceAway(data.data.policyfundlist,3);//政策基金
              this.content.assemblelist=this.sliceFirst(data.data.assemblelist);//成果荟萃
              this.content.financelist=this.sliceAway(data.data.financelist,6);//金融产品
              this.content.banklist=this.sliceAway(data.data.banklist,4);//银行产品
              this.content.partnerslist=data.data.partnerslist;//合作机构
              this.news=data.data.assemblelist[0];
              console.log(this.news)
          })
        },

    }
</script>

<style scoped lang="less">
  .warp{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .center{
      margin-top: 30px;
      overflow: hidden;
      .left{
        float: left;
        width:672px;
        border:1px solid rgba(196,196,196,1);
        h4{
          height:36px;
          background:rgba(245,245,245,1);
          span{
            display: block;
            width:96px;
            height:36px;
            line-height: 36px;
            text-align: center;
            background:rgba(232,57,10,1);
            font-size:16px;
            font-weight:bold;
            color:rgba(255,255,255,1);
          }
        }
        .mon{
          padding:16px 37px 19px 20px ;
          width: 618px;
          height: 408px;
          li{
            height: 135px;
            border-bottom: 1px dashed #E6E6E6;
            img{
              display: block;
              float: left;
              width:160px;
              height:108px;
              margin-right: 19px;
              margin-top: 13px;
            }
            div{
              float: left;
              width: 419px;
              margin-right: 20px;
              margin-top: 13px;
              overflow: hidden;
              h2{
                float: left;
                height: 38px;
                width: 100%;
                line-height: 38px;
                font-size:16px;
                font-weight:bold;
                color:rgba(69,69,69,1);
              }
              p{
                width: 100%;
                float: left;
                height: 60px;
                overflow: hidden;
                font-size:14px;
                line-height: 20px;
                font-weight:400;
                color:rgba(153,153,153,1);
              }
              a{
                display: block;
                height:16px;
                font-size:14px;
                font-weight:400;
                color:rgba(153,153,153,1);
                float: right;
                margin-right: 30px;
              }
            }
          }
          li:last-child{
            border: none;
          }
        }
        .jin{
          padding: 0 10px;
          overflow: hidden;
          margin-top: 34px;
          li{
            width: 205px;
            height: 104px;
            margin-bottom: 40px;
            margin-right: 18px;
            float: left;
            cursor: default;
            img{
              width:100px;
              height:100px;
              box-shadow:0px 4px 7px 0px rgba(0, 0, 0, 0.22);
              display: block;
              float: left;
              margin-right: 11px;
            }
            div{
              width: 88px;
              height: 100px;
              float: left;
              h2{
                height: 36px;
                line-height: 36px;
                font-size:14px;
                font-weight:400;
                color:rgba(69,69,69,1);
                overflow: hidden;
              }
              p{
                width:84px;
                height:64px;
                font-size:12px;
                font-weight:400;
                color:rgba(115,115,115,1);
                line-height:18px;
                overflow: hidden;
              }
            }
          }
          li.cle_r{
            margin-right: 0;
          }
        }
      }
      .right{
        float: right;
        width:503px;
        height:480px;
        border:1px solid rgba(197,197,197,1);
        h4{
          height:36px;
          background:rgba(245,245,245,1);
          span{
            display: block;
            width:96px;
            height:36px;
            line-height: 36px;
            text-align: center;
            background:rgba(232,57,10,1);
            font-size:16px;
            font-weight:bold;
            color:rgba(255,255,255,1);
          }
        }
        .top{
          margin-top: 13px;
          padding: 18px 15px;
          width: 476px;
          height: 87px;
          img{
            display: block;
            width:132px;
            height:87px;
            margin-right: 14px;
            float: left;
          }
          p{
            float: left;
            width: 330px;
            height: 87px;
            font-size:14px;
            overflow: hidden;
            font-weight:400;
            color:rgba(115,115,115,1);
            line-height:18px;
          }
        }
        .new{
          width: 476px;
          height: 283px;
          margin: 10px 15px;
          li{
            height: 38px;
            line-height: 38px;
            border-bottom: 1px dashed #e6e6e6;
            a{
              font-size:14px;
              font-weight:400;
              color:rgba(68,68,68,1);
              line-height:38px;
              display: block;
              float: left;
              width: 380px;
              height: 38px;
              overflow: hidden;
            }
            span{
              display: block;
              float: right;
              font-size:12px;
              font-weight:400;
              color:rgba(115,115,115,1);
              line-height:38px;
              height: 38px;
              overflow: hidden;
            }
          }
          li:last-child{
            border: none;
          }
        }
        .dai{
          margin: 24px 0 0 20px;
          width: 485px;
          height: 295px;
          li{
            float: left;
            width:186px;
            height:110px;
            padding: 10px 12px 0;
            border:1px solid rgba(232,57,10,1);
            border-radius:4px;
            margin-right: 29px;
            margin-bottom: 30px;
            h3{
              float: left;
              height: 35px;
              line-height: 35px;
              width:56px;
              font-size:14px;
              font-weight:bold;
              color:rgba(69,69,69,1);
            }
            p{
              float: left;
              height: 54px;
              font-size:12px;
              font-weight:400;
              color:rgba(115,115,115,1);
              line-height:18px;
              width: 100%;
            }
            a{
              display: block;float: right;
              font-size:12px;
              font-weight:400;
              color:rgba(115,115,115,1);
            }
          }
        }
      }
      .rong{
        height: 352px;
      }
      .jins{
        div{
          margin-top: 30px;
          width: 100%;
          height: 70px;
          line-height: 70px;
          text-align: center;
          font-size: 30px;
          color: #c00;
        }
      }
    }
    .banner{
      width: 1200px;
      margin-top: 30px;
    }
    .he{
      width: 1198px;
      margin-top: 30px;
      height:221px;
      border:1px solid rgba(197,197,197,1);
      h2{
        width:1198px;
        height:36px;
        background:rgba(245,245,245,1);
        span{
          display: block;
          width:96px;
          height:36px;
          line-height: 36px;
          background:rgba(232,57,10,1);
          font-size:16px;
          font-weight:bold;
          color:rgba(255,255,255,1);
          text-align: center;

        }
      }
      ul{
        padding: 34px 62px 9px 85px;
        width: 1053px;
        height: 145px;
        li{
          float: left;
          margin-right: 30px;
          width: 230px;
          height: 47px;
          overflow: hidden;
          margin-bottom: 26px;
          img{
            width: 230px;
          }
        }
      }
    }
  }
  .footer{
    margin-top: 20px;
  }
</style>

