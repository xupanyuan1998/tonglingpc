<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
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
      <div class="int">
        <h4>理财产品</h4>
        <ul class="ji">
          <li>
            <img src="../../../../static/images/212.png" alt="">
            <span>中欧新蓝筹</span>
          </li>
          <li>
            <img src="../../../../static/images/212.png" alt="">
            <span>国投资源前收费基金</span>
          </li>
          <li>
            <img src="../../../../static/images/212.png" alt="">
            <span>中欧新蓝筹</span>
          </li>
          <li>
            <img src="../../../../static/images/212.png" alt="">
            <span>国投资源前收费基金</span>
          </li>
          <li class="four">
            <img src="../../../../static/images/212.png" alt="">
            <span>中欧新蓝筹</span>
          </li>
        </ul>
      </div>
      <div class="int">
        <h4>贷款须知</h4>
        <div class="banli">
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            <strong>　一、中信银行个人贷款条件：</strong>
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　1、是中信银行优质高端客户或代发工资客户
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　中信银行喜欢跟老客户打交道，无论是个人信用贷款还是个人网络消费贷款，适用对象都是中信银行代发工资客户或优质高端客户，一般人很难申请。
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　2、年满十八周岁
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　不止是中信银行，其他商业银行也都要求借款人必须年满18周岁，所以如果你未满18周岁，那么最好还是别去申请银行个人贷款，否则只会浪费不必要的时间和精力。
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　3、没有不良贷款记录
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　贷款的周期一般比较长，这就要求借款人要有良好的信用，中信银行很看重借款人的信用情况，申请中信银行个人贷款的，借款人必须要信用良好，个人征信报告上没有任何不良贷款记录。
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　4、稳定的工作和收入
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　借款人的还款能力也是中信银行很看重的内容，若想顺利申请中信银行个人贷款，借款人必须要有稳定的工作和收入，否则就不具备贷款资格。
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　5、中信银行认可的资产作为质押或抵押。
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　6、借款目的为本人或家庭装修住房、家庭旅游、购买家庭大额耐用消费品（大额耐用消费品是指单价 2000 元（含）以上、 10 万元（含）以下，正常使用寿命在二年以上的家庭耐用商品，包括家用电器、家具、厨具、卫生洁具、电脑、乐器、健身器材等，不包括住房、汽车）或其他明确的消费用途;
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　7、申请住房装修贷款的，应有与中信银行认可的装修公司签订的住房装修合同;申请旅游贷款的，应有中信银行认可的旅行社出具的相关证明;
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　8、能支付所购商品或服务的首付款;
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　9、满足中信银行其它的要求。
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            <strong>二、申请资料</strong>
          </p>
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
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            <strong>三、中信银行个人贷款用途应该注意哪些问题？</strong>
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　1、个人贷款要有明确用途，且应符合法律法规规定和国家有关政策，交易背景真实，不得虚构交易背景和贷款用途;
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　2、个人贷款的使用应遵循诚信原则，符合借款合同中约定的用途，根据国家现行规定，贷款资金不得违规进入股市、房地产开发等国家明令禁止进入的领域;
          </p>
          <p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(51, 51, 51);     white-space: normal;">
            　　3、贷款购买住房的，应按照国家规定申请个人住房贷款，根据国家现行规定，消费性贷款禁止用于购买住房。一般来说，申请正规个人贷款，其机构都会考量您的还款能力。为了规避风险，避免不必要的麻烦，千万不要相信一张身份证就能获得贷款，所以在分辨不清真假的时候，可以去工商局网站上查询此类公司的名称和注册信息。最重要的一点就是在贷款到账前一定不要支付任何费用
          </p>
        </div>
        <div class="save">
          我要申贷
        </div>
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
    name: "bank",
    components:{
      headNav,
      footerNav
    },
    data(){
      return {
        toptitle:'铜陵市民营经济云服务智慧平台',
        clectnav: 4,
        placeshow:false
      }
    },
    methods:{
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
    }
  }
</style>
