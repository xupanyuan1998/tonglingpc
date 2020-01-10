<template>
  <div class="hello">
    <div>
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="warp">
      <div class="top">
        <div class="t_l">
          <div class="inl">
            <div>
              <img :src="company.companyLogo" alt="">
            </div>
          </div>
          <div class="int">
            <h2>{{company.companyName}}</h2>
            <p>{{company.intro}}</p>
          </div>
        </div>
        <div class="t_r">
          <h3><span>企业信息</span></h3>
          <ul>
            <li><span>所属行业&nbsp;:</span> <b>{{company.industry}}</b></li>
            <li><span>注册资金&nbsp;:</span> <b>{{company.startupCapital}}万</b></li>
            <li><span>所在地址&nbsp;:</span>  <b>{{company.address}}</b> </li>
            <li><span>联系电话&nbsp;:</span> <b>{{company.telephone}}</b> </li>
            <li><span>服务邮箱&nbsp;:</span> <b>{{company.email}}</b></li>
            <li><span>单位信用&nbsp;:</span><b>{{company.creditName}}</b></li>
            <li><span>单位规模&nbsp;:</span> <b></b></li>
          </ul>
        </div>
      </div>
      <div class="server">
        <div class="s_l">
          <h4><span>产品/服务</span></h4>
          <div class="places" v-if="serviceList.length==0">
            暂无数据
          </div>
          <ul v-else>
            <li v-for="(item,idx) in serviceList" :key="idx" :class="idx%3==2?'selec':''">
              <div><img :src="item.smallImg" alt=""></div>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="c_l">
          <h4><span>近期需求</span></h4>
          <div class="places" v-if="supplyanddemandlist.length==0">
            暂无数据
          </div>
         <template v-else>
           <p><b>供需</b><em>名称</em><i>数量</i><span>截止时间</span></p>
           <ul>
             <li v-for="(item,idx) in supplyanddemandlist" :key="idx"><b v-if="item.type==1" class="xu">[供应]</b><b v-if="item.type==2" >[需求]</b><router-link tag="a" :to="{path:'/supplyneedlist/supplyneeddetail',query:{id:item.supplyanddemandId}}">{{item.productname}}</router-link><i>{{item.number}}</i><span>{{clearFen(item.endtime)}}</span></li>
           </ul>
         </template>
        </div>
      </div>
      <div class="zheng">
        <h4><span>企业资质</span></h4>
        <div class="places" v-if="qualificationsList.length==0">
          暂无数据
        </div>
        <ul v-else>
          <li v-for="(item,idx) in qualificationsList" :key="idx"><img :src="item.smallImg" alt=""></li>
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
    import $ from 'jquery'
    export default {
        name: "myspace",
        data () {
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 6,
                user:'',
                password:'',
                company:'',
                serviceList:'',//产品服务
                qualificationsList:'',//企业资质
                supplyanddemandlist:'',//供需
            }
        },
        created(){
            // this.axios.post('/web/index/index').then((data)=>{console.log(data)})
            var id=this.$route.query.id;
            this.axios.post('/web/company/company',{companyId:id}).then(({data})=>{
                console.log(data.data);
                this.company=data.data.company;
                this.serviceList=this.sliceAway(data.data.servicelist,6);//产品服务
                this.qualificationsList=this.sliceAway(data.data.qualificationslist,8);//企业资质
                this.supplyanddemandlist=data.data.supplyanddemandlist;//供需
            })
        },
        methods:{
            clearFen(i){
                return i.substring(0,i.indexOf(' '))
            },
            //切割数组
            sliceAway(arr,i){
                //arr=数组  i切割结束的下标
                return arr.slice(0,i);
            },
        },
        components:{
            headNav,
            footerNav
        }
    }
</script>

<style scoped lang="less">
  .hello{
    background: #fff;
  }
  .warp{
    width: 1200px;
    margin: auto;
    .top{
      height: 275px;
      margin-top: 20px;
      .t_l{
        float: left;
        width: 860px;
        height:275px;
        .inl{
          display: block;
          float: left;
          margin: 20px;
          position: relative;
          width:312px;
          height:234px;
          overflow: hidden;
          div{
            width: 100%;
            height: 100%;
            overflow: hidden;
            img{
             display: block;
              width: 100%;
              height: 100%;
              transition: all 0.3s;
            }
          }
          div:hover{
            img{
              transform: scale(1.2);
            }
          }

        }
        .int{
          float: left;
          width: 466px;
          h2{
            margin-top: 10px;
            line-height: 40px;
            height: 40px;
            font-size:20px;
            font-weight:400;
            color:rgba(69,69,69,1);
          }
          h4{
            height: 26px;
            line-height: 26px;
            font-size:14px;
            font-weight:400;
            color:rgba(179,179,179,1);
            span{
              display: block;
              float: left;
              height: 26px;
              line-height: 26px;
            }
            span:last-child{
              margin-left: 17px;
            }
          }
          p{
            margin-top: 9px;
            height: 192px;
            line-height: 24px;
            font-size:16px;
            font-weight:400;
            color:rgba(102,102,102,1);
            overflow: hidden;
          }
        }
      }
      .t_r{
        width:316px;
        height:275px;
        float: left;
        margin-left: 20px;
        overflow: hidden;
        h3{
          width:316px;
          height:36px;
          background:#fff;
          border-bottom: 2px solid #ccc;
          span{
            height:36px;
            margin-left: 10px;
            display: block;
            line-height: 36px;
            font-size:20px;
            font-weight:bold;
            color:#0e0d0d;
          }
        }
        ul{
          width: 265px;
          height: 172px;
          padding: 10px 20px 20px 20px;
          li{
            width: 265px;
            font-size:16px;
            font-weight:400;
            color:rgba(69,69,69,1);
            overflow: hidden;
            >*{
              display: block;
              float: left;
            }
            span{
              height: 28px;
              width: 80px;
              font-weight: bold;
              font-size: 16px;
              line-height: 28px;
            }
            b{
              width: 170px;
              margin-left: 5px;
              max-height: 56px;
              line-height: 28px;
              font-weight: 400;
              overflow: hidden;
            }
          }
        }
      }
    }
    .server{
      height: 350px;
      margin-top: 20px;
      .s_l {
        float: left;
        width:590px;
        height:342px;
        h4{
          width:590px;
          height:36px;
          border-bottom: 2px solid #ccc;
          span{
            display: block;
           margin-left: 10px;
            height:36px;
            line-height: 36px;
            font-size:20px;
            font-family:Microsoft YaHei;
            font-weight:bold;
            color:#0e0d0d;
          }
        }
        ul{
          padding: 30px 20px 13px 20px;
          width: 549px;
          height: 263px;
          li{
            cursor: pointer;
            width: 160px;
            float: left;
            height: 123px;
            margin-right: 30px;
            margin-bottom: 8px;
            div{
              width: 160px;
              height: 91px;
              overflow: hidden;
              img{
                display: block;
                width: 160px;
                height: 91px;
                transition:all 0.5s;
              }
            }
            span{
              display: block;
              height: 32px;
              line-height: 32px;
              text-align: center;
              font-size:16px;
              overflow: hidden;
              font-weight:400;
              color:rgba(69,69,69,1);
            }
          }
          li.selec{
            margin-right: 0;
          }
          li:hover{
            img{
              transform: scale(1.2);
            }
          }
        }
      }
      .c_l{
        float: left;
        margin-left: 19px;
        width:585px;
        height:342px;
        h4{
          width:590px;
          height:36px;
          border-bottom: 2px solid #ccc;
          span{
            display: block;
            width:120px;
            height:36px;
            line-height: 36px;
            font-size:20px;
            font-weight:bold;
            color:#0e0d0d;
          }
        }
        p{
         height: 40px;
          line-height: 40px;
          padding-left: 20px;
          background: #f8f8f8;
          >*{
            display: block;
            float: left;
            height: 40px;
            font-size: 18px;
            font-weight: normal;
          }
          b{
            width: 40px;
          }
          em{
            width: 60px;
            margin-left: 20px;
          }
          i{
            width: 80px;
            margin-left:194px;
          }
          span{
            float: right;
            margin-right: 44px;
          }
        }
        ul{
          height: 280px;
          overflow: hidden;
          margin: 0 20px;
          li{
            height: 38px;
            line-height: 38px;
            overflow: hidden;
            margin-top: 8px;
            >*{
              display: block;
              float: left;
              height: 38px;
              line-height: 38px;
              font-size: 16px;
            }
            b{
              font-weight:400;
              color:rgba(50,164,156,1);
            }
            b.xu{
              color: #df4c39;
            }
            a{
              width: 240px;
              overflow: hidden;
              margin-left: 20px;
              font-weight:400;
              color:rgba(68,68,68,1);
            }
            i{
              margin-left: 10px;
              width: 70px;
              font-weight:400;
              color:rgba(69,69,69,1);
              overflow: hidden;
            }
            span{
              float: right;
              margin-right: 8px;
              font-weight:400;
              color:rgba(69,69,69,1);
              line-height:36px;
              overflow: hidden;
            }
          }
          li:last-child{
            border-bottom: none;
          }
        }
      }
    }
    .zheng{
      width:1198px;
      height:285px;
      margin: 20px 0;
      h4{
        height:36px;
        border-bottom:2px solid #ccc;
        span{
          display: block;
          height:36px;
          line-height: 36px;
          font-size:20px;
          font-weight:bold;
          color:#0e0d0d;
        }
      }
      ul{
        margin: 32px 67px 32px 50px;
        width: 1081px;
        height: 180px;
        overflow: hidden;
        li{
          width:125px;
          height:180px;
          float: left;
          margin-right: 55px;
          img{
            width:125px;
            height:180px;
          }
        }
      }
    }
    .places{
      font-size: 20px;
      font-weight:500;
      text-align: center;
      padding:40px 0;
    }
  }
</style>
