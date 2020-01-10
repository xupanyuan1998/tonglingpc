
<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="warp">
      <ul>
        <li>
          <div class="title">
            <img src="../../../../static/images/169.png" alt="">
            <span></span>
          </div>
          <p>铜陵皖江农村商业银行股份有限公司是经中国银行业监督管理委员会批准，在原铜陵皖江农村合作银行及所辖分支机构基础上，由国有企业、城乡居民和其他经济组织入股组成的铜陵地区首家股份制法人农村商业银行。 本行实行一级法人、统一核算、分级管理、授权经营的管理体制，现有注册资本53900.99万元。法人治理结构完善，内部控制制度健全，总行内设12个职能部门，全辖共有19个支行、1个营业部、6个分理处，分支机构遍布铜陵市三区。</p>
        </li>
        <li>
          <div class="title">
            <img src="../../../../static/images/170.png" alt="">
            <span>铜陵分行</span>
          </div>
          <p> 1912年2月，经孙中山先生批准，中国银行正式成立。从1912年至1949年，中国银行先后行使中央银行、国际汇兑银行和外贸专业银行职能，坚持以服务大众、振兴民族金融业为己任，稳健经营，锐意进取，各项业务取得了长足发展。新中国成立后，中国银行成为国家外汇外贸专业银行，为国家对外经贸发展和国内经济建设作出了重大贡献。1994年，中国银行改为国有独资商业银行。2003年，中国银行开始股份制改造。2004年8月，中国银行股份有限公司挂牌成立。2006年6月、7月，先后在香港联交所和上海证券交易所成功挂牌上市，成为首家在内地和香港发行上市的中国商业银行。</p>
        </li>
        <li>
          <div class="title">
            <img src="../../../../static/images/171.png" alt="">
            <span>铜陵分行</span>
          </div>
          <p>中国工商银行股份有限公司是一家资金雄厚、管理先进、经验丰富、国际知名的股份制商业银行，连续5年被英国《银行家》杂志评选为全球1000家大银行之一，连续三次被美国《环球金融》杂志评为“中国最佳银行”，连续两次被香港《亚洲货币》杂志评为“中国最佳内地商业银行”</p>
        </li>
        <li>
          <div class="title">
            <img src="../../../../static/images/172.png" alt="">
            <span>铜陵分行</span>
          </div>
          <p>
            中国农业银行股份有限公司成立于1986年12月18日，注册地位于北京市东城区建国门内大街69号，法人代表为周慕冰。经营范围包括吸收公众存款；发放短期、中期、长期贷款；办理国内外结算；办理票据承兑与贴现；发行金融债券；代理发行、代理兑付、承销政府债券；买卖政府债券、金融债券；从事同业拆借；买卖、代理买卖外汇；结汇、售汇；从事银行卡业务；提供信用证服务及担保；代理收付款项；提供保管箱服务；代理资金清算；各类汇兑业务；代理政策性银行、外国政府和国际金融机构贷款业务；贷款承诺；组织或参加银团贷款</p>
        </li>
      </ul>
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
    name: "supermarket",
    components:{
      headNav,
      footerNav
    },
    data(){
      return {
        toptitle:'铜陵市民营经济云服务智慧平台',
        clectnav: 4,
      }
    },
    methods:{

    }
  }
</script>
<style scoped lang="less">
  .hello{
    background: #f5f5f5;
  }
  .warp{
    width: 1200px;
    margin: 20px auto;
    background: #fff;
    padding-top: 20px;
    ul{
      padding:40px;
      li:first-child{
        margin-top: 0;
      }
      li{
        margin-top:40px;
        .title{
          height: 30px;
          img{
            display: block;
            float: left;
            height:30px;
            max-width: 380px;
          }
          span{
            display: block;
            float: left;
            height: 30px;
            line-height:30px;
            margin-left: 30px;
            font-weight: bold;
            font-size: 20px;
            color: #333;
          }
        }
        p{
          margin: 20px 0;
          background: #f5f5f5;
          padding:10px 40px;
          font-size: 18px;
          color: #333;
          line-height: 30px;
        }
      }
    }
  }
</style>

