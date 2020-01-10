<template>
  <div>
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="warp">
      <div class="left">
        <h3 v-for="(item,index) in leftList" :key="index" :class="leftSelect==index?'select':''" @click="select(index)">{{item}}</h3>
      </div>
      <div class="right">
        <h4>铜陵市民营经济智慧云平台简介</h4>
        <p>为贯彻落实国家、省民营企业座谈会上重要精神，市委市政府成立民营经济促进局，负责统筹民营经济服务平台建设。旨在促进我市民营经济健康发展，建设高效便捷的贵阳市民营经济服务体系，建成以政务服务为核心，具备投诉、咨询、政务、市场、金融等多维度服务内容的平台，打造政府与企业沟通的有效渠道，协调解决民营经济发展面临的重大问题。</p>
        <p>依托我市大数据发展优势，通过大数据技术搭建一站式、全方位的民营经济服务平台，提升政府部门服务意识，加强政府对民营企业的引导，拓展政府政策发布渠道，打通政策执行的“最后一公里”，进一步优化营商环境，营造“重企亲商”文化氛围、构建“亲”“清”新型政商关系，加快构建良好的“民营经济”服务生态体系。</p>
        <p> 平台汇聚中央、省、市、区各级政府惠及民营企业的政策文件和通知公告，整合全市四十多家政府单位的事项办理流程，开放数百项政府公共数据，提供银行和其他金融机构金融服务，实时更新行政许可、行政处罚、红榜名单、黑榜名单、联合惩戒、失信被执行人六大类信用数据，为企业提供便利、规避信用风险。通过该平台，市、区县、乡镇社区三级党政部门可以实时响应民营企业的咨询、投诉、建议和各类服务申请，并全程监督各级党政部门的受理情况。</p>
        <span> 官网：www.tlmyy.com</span>
        <span> 手机客户端APP：铜陵民营（各大应用市场搜索下载）</span>
        <span>微信服务号：铜陵民营</span>
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
        name: "tellme",
        components:{
            headNav,
            footerNav
        },
        data(){
            return{
                clectnav: 7,
                toptitle:'铜陵市民营经济云服务智慧平台',
                leftList:['平台简介','移动端','在线留言'],
                leftSelect:0,
            }
        },
        methods:{
            select(i){
                this.leftSelect=i;
            }
        }
    }
</script>

<style scoped lang="less">
  .warp{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 21px;
    .left{
      float: left;
      margin-right: 20px;
      width:186px;
      height:150px;
      border:1px solid rgba(230,230,230,1);
      border-top: none;
      h3{
        cursor: pointer;
        width:186px;
        height: 50px;
        line-height: 50px;
        border-top: 1px solid rgba(230,230,230,1);
        text-align: center;
        font-size:18px;
        font-weight:400;
        color:#454545;
      }
      h3.select{
        color: #E84012;
        border-top: 1px solid #FF6A42;
      }
      h3:hover{
        color: #E84012;
        border-top: 1px solid #FF6A42;
      }
    }
    .right{
      float: left;
      width:770px;
      height:748px;
      padding: 25px 110px 35px;
      border:1px solid rgba(217,217,217,1);
      h4{
        font-size:18px;
        font-weight:400;
        color:rgba(69,69,69,1);
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
      p{
        width:770px;
        font-size:18px;
        font-weight:400;
        color:rgba(69,69,69,1);
        margin-top: 32px;
        line-height: 30px;
        text-indent: 2em;
      }
      span{
        display: block;
        margin-top: 24px;
        height: 38px;
        line-height: 38px;
        font-size:18px;
        font-weight:400;
        color:rgba(69,69,69,1);
      }
    }
  }
  .footer{
    margin-top: 20px;
  }
</style>
