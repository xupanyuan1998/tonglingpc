<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="goshe">金融超市</span><b> ></b><span >中信银行</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="int">
        <h4>银行简介</h4>
        <div class="yin">
          <img src="../../../../static/images/228.jpg" alt="">
          <p>本行成立于1987年，是中国改革开放中最早成立的新兴商业银行之一，是中国最早参与国内外金融市场融资的商业银行，并以屡创中国现代金融史上多个第一而蜚声海内外，为中国经济建设做出了积极贡献。2007年4月，本行实现在上海证券交易所和香港联合交易所A+H股同步上市。
            本行以建设最佳综合金融服务企业为发展愿景，充分发挥中信集团金融与实业并举的独特竞争优势，坚持“以客为尊”，秉承“平安中信、合规经营、科技立行、服务实体、市场导向、创造价值”的经营理念，向企业客户和机构客户提供公司银行业务、国际业务、金融市场业务、机构业务、投资银行业务、保理业务、托管业务等综合金融解决方案，向个人客户提供零售银行、信用卡、消费金融、财富管理、私人银行、出国金融、电子银行等多元化金融产品及服务，全方位满足企业、机构及个人客户的综合金融服务需求。
          </p>
        </div>
      </div>
      <div class="int">
        <h4>利率政策</h4>
        <div class="zheng">
          <template>
            <el-table
              :data="tableData"
              border>
              <el-table-column
                type="index"
                label="编号"
                width="80"
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="详情"
                width="100"
                align="center">
                <template>
                  <el-button
                    size="mini"
                  >查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <template>
            <div style="display: none">
              <h3>中信银行存款利率政策</h3>
              <div class="li">
                <table border="1" >
                  <tr>
                    <th>城乡居民存款</th>
                    <th>非保证金存款利率</th>
                    <th>非保证金存款利率</th>
                  </tr>
                  <tr>
                    <td>活期</td>
                    <td>0.30</td>
                    <td>0.30</td>
                  </tr>
                  <tr>
                    <td>定期</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="left">整存整取</td>
                  </tr>
                  <tr>
                    <td>三个月</td>
                    <td>1.40</td>
                    <td>1.10</td>
                  </tr>
                  <tr>
                    <td>半年</td>
                    <td>1.65</td>
                    <td>1.30</td>
                  </tr>
                  <tr>
                    <td>一年</td>
                    <td>1.95</td>
                    <td>1.50</td>
                  </tr>
                  <tr>
                    <td>两年</td>
                    <td>2.40</td>
                    <td>2.10</td>
                  </tr>
                  <tr>
                    <td>三年</td>
                    <td>3.00</td>
                    <td>2.75</td>
                  </tr>
                  <tr>
                    <td>五年</td>
                    <td>3.00</td>
                    <td>2.75</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="left">零存整取、整存零取、存本取息</td>
                  </tr>
                  <tr>
                    <td>一年</td>
                    <td>1.40</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>一年</td>
                    <td>1.40</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>三年</td>
                    <td>1.65</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>五年</td>
                    <td>1.65</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>定活两便</td>
                    <td>按一年以内定期整存整取同档次利率打六折执行</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="left">通知存款</td>
                  </tr>
                  <tr>
                    <td>一天</td>
                    <td>0.55</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>七天</td>
                    <td>1.10</td>
                    <td>-</td>
                  </tr>
                </table>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="int">
        <h4>申请材料</h4>
        <div class="banli">
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);    white-space: normal;">
            　　1、身份证、结婚证，户口本的原件及其复印件；
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);    white-space: normal;">
            　　2、个人最近半年的银行流水账，税单证明；
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);    white-space: normal;">
            　　3、抵押物的归属证明原件；
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);    white-space: normal;">
            　　4、您可以提供的其他财力证明材料，如股票，定期存款，理财产品，保单，汽车等。&nbsp;
          </p>
        </div>
        <div class="save">
          我要申贷
        </div>
      </div>
      <div class="int">
        <h4>我要评价</h4>
        <template>
          <div class="stars">
            <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </div>
        </template>
      </div>
    </div>
    <div class="footer">
      <footer-nav></footer-nav>
    </div>
  </div>
</template>

<script>
  import headNav from "../../headNav";
  import footerNav from "../../footer";
  import '../../../assets/css/stars.css';
  import '../../../assets/css/mianbao.less'
  export default {
    name: "bank",
    components:{
      headNav,
      footerNav
    },
    data(){
      return {
        toptitle:'铜陵市民营经济云服务智慧平台',
        clectnav: 4,
        placeshow:false,
        tableData: [{
            name: '中信银行存款利率政策',
        }],
        value: 4.8,
      }
    },
    methods:{
        //回首页
        goindex(){
            this.$router.push('/')
        },
        //金融超市
        goshe(){
            this.$router.push('/chaoshi')
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
    margin: 20px auto;
    .int{
      margin-bottom: 30px;
      h4{
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 10px;
        color: #0e0d0d;
        border-bottom: 2px solid #ff4c4c;
        margin-bottom: 20px;
      }
      .ji{
        padding: 20px;
        overflow: hidden;
        li{
          width: 130px;
          height: 130px;
          float: left;
          margin-right: 40px;
          margin-bottom: 20px;
          img{
            display: block;
            width: 90px;
            height: 90px;
            margin: 0 auto;
          }
          span{
            margin-top: 10px;
            display: block;
            line-height: 30px;
            width: 100%;
            height: 30px;
            overflow: hidden;
            text-align: center;
          }
        }
      }
      .yin{
        overflow: hidden;
        img{
          display: block;
          float: left;
          width: 200px;
          height: 200px;
          margin: 30px;
        }
        p{
          text-indent: 2em;
          padding: 20px;
          line-height: 40px;
          font-size: 18px;
        }
      }
      .banli{
        padding: 20px;
        font-size: 18px;
        line-height: 40px;
      }
      .save{
        cursor: pointer;
        display: block;
        height: 30px;
        line-height: 30px;
        text-align: center;
        width: 100px;
        color: #fff;
        font-size: 18px;
        border-radius: 5px;
        background:#66CCFF;
        border: none;
        outline: none;
        margin: 50px auto;
      }
      .save:hover{
        background: #2BB4F8;
      }
      h3{
        text-align: center;
        height: 40px;
        margin-bottom: 20px;
        font-size: 18px;

      }
      .li{
       table{
         margin:  0 auto;
         display: block;
         width: 900px;
       }
        td,th{
          width:260px;
          padding: 10px 20px;
          height: 40px;
          text-align: center;
          font-size: 16px;
        }
        td.left{
          text-align: left;
          background: #efefef;
        }
      }
      .zheng{
        padding: 20px;
      }
    }
  }
</style>

