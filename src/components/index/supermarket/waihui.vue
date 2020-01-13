<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="goshe">金融超市</span><b> ></b><span >外汇宝</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="int">
        <div class="cc">
          <ul>
            <li>
              <b>产品名称：</b>
              <span>外汇宝(个人实盘外汇买卖)</span>
            </li>
            <li>
              <b>产品简介：</b>
              <span>外汇宝是中国银行个人实盘外汇买卖业务的简称，是指在中国银行开立本外币活期一本通存折且持有外币现钞（汇）的客户，可以按照中行报出的买入/卖出价格，将某种外币（汇）的存款换成另一种外币（汇）的存款。支持即时买卖和挂单委托。
                客户可以利用国际外汇市场上外汇汇率的频繁波动性，在不同的存款货币间转换并赚取一定的汇差，以达到保值、盈利的目的。
                </span>
            </li>
            <li>
              <b>交易币种：</b>
              <span>美元、欧元、英镑、澳元、港币、瑞士法郎、日元、加拿大元、新加坡元，可做直接盘交易与交叉盘交易。</span>
            </li>
            <li>
              <b>交易方式：</b>
              <span>柜台、电话、自助终端和网上银行等多种交易方式。</span>
            </li>
            <li>
              <b>产品优势：</b>
              <span>提高收益：使投资者有机会在获取外币存款利息的同时，通过外汇交易进行保值甚至赚得额外的汇差收益。
                交易方法多样：目前可以通过柜面服务人员、电话交易设备等方式进行。交易方式灵活，既可进行市价交易，又可进行委托交易。一日可进行多次交易，提供更多投资机遇。
                </span>
            </li>
            <li>
              <b>适用对象：</b>
              <span>凡持有个人有效身份证件，拥有完全民事行为能力的境内、外个人，并持有中国银行外汇宝支持交易
                的货币，均可进行个人实盘外汇交易。</span>
            </li>
            <li>
              <b>办理流程：</b>
              <span>凭本人有效身份证件在中国银行开立活期一本通或定期一本通存折并存入一定数量的外币现汇或现钞，以及持有外币现钞的客户均可在中国银行开办外汇宝业务的网点进行交易。
                凭本人有效身份证件和长城电子借记卡到柜台即可开通电话银行服务。
                </span>
            </li>
            <li>
              <b>提交证件：</b>
              <span>本人有效身份证件。</span>
            </li>
            <li>
              <b>风险提示：</b>
              <span>交易时间为星期一早7点至星期六凌晨5点（除周六、日、休市和其他非交易日外）。
                    因受国际上各种政治、经济因素，以及各种突发事件的影响，汇价经常处于剧烈的波动之中，因此，进行个
                人实盘外汇买卖，风险与机遇并存。基于任何投资产品都具有风险特性，在决定买卖前，
                投资者应先了解交易的风险，并考虑个人对风险的承受力、期望回报等。
</span>
            </li>
          </ul>
        </div>
        <button @click="place">我要购买</button>
      </div>
    </div>
    <div class="footer">
      <footer-nav></footer-nav>
    </div>
    <div class="place" @mousewheel.prevent v-show="placeshow">
      <div class="ti">
        <h2>提示</h2>
        <p>即将开通,敬请关注!</p>
        <img src="../../../../static/images/96.png" alt="" @click="cloose">
      </div>
    </div>
  </div>
</template>

<script>
    import headNav from "../../headNav";
    import footerNav from "../../footer";
    import '../../../assets/css/stars.css';
    import '../../../assets/css/mianbao.less';
    export default {
        name: "waihui",
        data() {
            return {
                toptitle: '铜陵市民营经济云服务智慧平台',
                clectnav: 4,
                placeshow: false,
                tableData: [
                    {
                        bumen: ' 办公室',
                        name: ' 杨剑平',
                        phone: '65227257'
                    },
                    {
                        bumen: ' 综合计划部',
                        name: ' 齐智洲 ',
                        phone: '65227561'
                    },
                    {
                        bumen: '担保一部',
                        name: '周 剑',
                        phone: ' 65227263'
                    },
                    {
                        bumen: '  担保二部',
                        name: ' 巫 惠',
                        phone: '65227273'
                    },
                    {
                        bumen: '担保三部',
                        name: '  孙小虎',
                        phone: ' 65227105'
                    },
                    {
                        bumen: ' 担保四部',
                        name: ' 朱玉友',
                        phone: ' 65227245'
                    },
                    {
                        bumen: ' 担保五部',
                        name: '  朱安国',
                        phone: '65227255'
                    },
                    {
                        bumen: '  担保六部\n' +
                            '(宿州市分公司)',
                        name: ' 邰成华',
                        phone: '67186096'
                    },
                    {
                        bumen: '再担保总部',
                        name: ' 袁 野',
                        phone: '65227521'
                    },
                    {
                        bumen: '投资管理部',
                        name: '冷苏明',
                        phone: '65227571'
                    },
                    {
                        bumen: '资产质量和风险管理部',
                        name: '程 岱',
                        phone: '65227100'
                    },
                    {
                        bumen: '项目评审部',
                        name: '程  云',
                        phone: ' 65227612'
                    },
                    {
                        bumen: ' 合规法律部',
                        name: ' 朱晓平',
                        phone: ' 67186089'
                    },
                    {
                        bumen: '业务研发部',
                        name: '  滕 青',
                        phone: ' 65227591'
                    },
                    {
                        bumen: '  稽核审计部',
                        name: '  吴金荣',
                        phone: ' 65227529'
                    },
                    {
                        bumen: ' 信息技术部',
                        name: ' 汪 磐',
                        phone: ' 65227515'
                    },
                    {
                        bumen: ' 财务管理部',
                        name: ' 王晶晶',
                        phone: ' 65227260'
                    },
                    {
                        bumen: '  人力资源部',
                        name: '  李 震',
                        phone: '65227262'
                    },
                    {
                        bumen: ' 监察室',
                        name: '  吴泽同',
                        phone: ' 65227246'
                    },
                    {
                        bumen: ' 党群工作部\n' +
                            '（工会办公室）\n',
                        name: '  郭 晗',
                        phone: '65227552'
                    },
                    {
                        bumen: ' 督查室 ',
                        name: '  吕洁丽',
                        phone: '67186085'
                    },
                    {
                        bumen: ' 集团工会',
                        name: '  汤   闽',
                        phone: ' 65227259'
                    },
                    {
                        bumen: '  金寨分公司',
                        name: '  郭尔翰',
                        phone: ' 65292612'
                    },
                    {
                        bumen: '  省开发投资公司',
                        name: '  冷苏明',
                        phone: ' 65227571'
                    },
                    {
                        bumen: '  省科技融资担保公司',
                        name: '  董 青',
                        phone: ' 65227511'
                    },
                    {
                        bumen: '  安徽担保资产管理公司',
                        name: '  徐文卿',
                        phone: ' 65227517'
                    },
                    {
                        bumen: ' 省科技产业投资公司',
                        name: ' 江闽涛',
                        phone: ' 66195753'
                    },
                    {
                        bumen: '  黄山公司',
                        name: ' 朱晓平',
                        phone: ' 67186089'
                    }
                ],
                value:4.5
            }
        },
        components: {
            headNav,
            footerNav
        },
        methods: {
            place() {
                this.placeshow = true;
            },
            cloose() {
                this.placeshow = false;
            },
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
  .warp {
    width: 1200px;
    margin: 20px auto;
    .int {
      margin-bottom: 30px;
      button{
        display: block;
        height: 50px;
        line-height: 50px;
        width: 200px;
        outline: none;
        border: none;
        background:#1abbf9;
        cursor: pointer;
        color: #fff;
        border-radius: 5px;
        box-shadow: 0px 4px 10px 0 rgba(62, 62, 62, 0.1);
        margin:60px auto;
      }
      button:hover{
        background:#1b8cff;
      }
      .cc{
        padding: 20px;
        ul{
          li{
            overflow: hidden;
            margin-bottom: 20px;
            >*{
              display: block;
              float: left;
            }
            b{
              width:150px;
              font-size: 18px;
              height: 40px;
              line-height: 40px;
              text-align: right;
            }
            span{
              width: 980px;
              margin-left: 10px;
              font-size: 18px;
              line-height: 40px;
            }
          }
        }
      }
    }

  }

</style>
<style scoped lang="less">
  .place {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .16);
    position: fixed;
    top: 0;
    left: 0;
    transition: all 0.5s;

    .ti {
      position: absolute;
      width: 300px;
      height: 200px;
      background: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 5px;

      h2 {
        height: 30px;
        font-size: 18px;
        color: #fe0000;
        font-weight: 500;
        line-height: 30px;
        padding-left: 20px;
        border-bottom: 1px solid #fe0000;
        margin-top: 10px;
      }

      p {
        padding: 20px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        line-height: 80px;
      }

      img {
        position: absolute;
        top: -15px;
        right: -15px;
        transition: all 0.2s;
      }

      img:hover {
        transform: rotate(360deg);
      }
    }
  }
</style>
