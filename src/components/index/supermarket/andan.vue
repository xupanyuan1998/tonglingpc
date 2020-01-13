<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="goshe">金融超市</span><b> ></b><span >安徽省信用担保集团</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="int">
        <h4>公司简介</h4>
        <div class="yin">
          <div>
            <img src="../../../../static/chao/15.png" alt="">
            <b>安徽省信用担保集团</b>
          </div>
          <p>
            安徽省信用担保集团成立于2005年，是由省人民政府出资设立的国有大型政策性融资担保机构。目前，集团注册资本186.86亿元，总资产254.45亿元，净资产200.11亿元。主营业务覆盖担保、投资、资产管理三大板块，直保在保责任余额、再担保在保余额、补偿型再担保责任余额等主要指标稳居全国行业第一，主体信用评级连续三年获得行业最高等级AAA，是国家首批“中央与地方财政担保风险分担补偿”试点单位、中德经济顾问委员会成员，是国家融资担保基金首批合作单位。
            集团自成立以来，以坚持政策性定位，践行普惠金融，服务实体经济，促进地方经济发展为经营宗旨，秉承专业专注创新创业的企业文化精神，积极探索创新符合中国国情、具有安徽特色、能够有效破解小微企业融资难融资贵问题的担保模式，努力成为政府资金的“放大器”、银行信贷风险的“减压器”、培育中小企业的“孵化器”和支持县域经济发展的“助推器”。据不完全统计，截至2018年底，集团累计为21.4万户企业提供担保再担保8747.89亿元，其中直接担保2499.4亿元，再担保6248.49亿元。自2014年底新型政银担业务试点以来，累计完成2495.92亿元、服务企业58085户（次），有力支持了小微企业和“三农”发展，促进了地方经济发展，为推动现代化五大发展美好安徽建设作出了积极贡献。
            近年来，集团积极推进转型发展、创新发展，经济效益和社会效益逐年提高，品牌影响力不断增强，已跃升为全国行业标杆，先后荣获第五届全国文明单位、中国最具竞争力融资担保机构、中国担保500亿上榜机构、全国万亿担保规模上榜机构30强、全国中小企业融资担保创新奖、全国最具公信力中小企业信用担保机构、全省金融机构支持地方发展经营业绩考核优秀单位、安徽省文明单位、全省“五一”劳动奖状等荣誉称号。
          </p>
        </div>
      </div>
      <div class="int">
        <h4>组织架构</h4>
        <div class="jia">
          <img src="../../../../static/chao/17.png" alt="">
        </div>
      </div>
      <div class="int">
        <h4>联系我们</h4>
        <div class="ren">
          <template>
            <el-table
              :data="tableData"
              border
              style="width: 600px;display: block;margin: 0 auto">
              <el-table-column
                prop="bumen"
                label="部门（公司）"
                width="200"
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                label="联系人"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系电话"
                align="center">
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
      <div class="int">
        <h4>企业服务</h4>
        <button @click="place">我要融资</button>
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
        name: "andan",
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

      h4 {
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 10px;
        color: #0e0d0d;
        border-bottom: 2px solid #ff4c4c;
        margin-bottom: 20px;
      }

      ol {
        padding: 20px;

        li {
          height: 30px;
          line-height: 30px;
          font-size: 16px;

          span {
            display: inline-block;
          }

          span:first-child {
            font-weight: bold;
          }
        }
      }

      .gu {
        overflow: hidden;

        img {
          display: block;
          margin: 0 auto;
        }
      }

      .ji {
        padding: 20px;
        overflow: hidden;

        li {
          width: 130px;
          height: 130px;
          float: left;
          margin-right: 40px;
          margin-bottom: 20px;

          img {
            display: block;
            width: 90px;
            height: 90px;
            margin: 0 auto;
          }

          span {
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

      .yin {
        overflow: hidden;

        div {
          width: 230px;
          margin-right: 20px;
          margin-left: 20px;
          float: left;

          img {
            display: block;
            width: 100%;
            margin-bottom: 10px;
          }

          b {
            display: block;
            text-align: center;
            line-height: 30px;
            font-size: 18px;
          }

        }

        p {
          text-indent: 2em;
          padding: 20px;
          line-height: 40px;
          font-size: 18px;
        }
      }

      .banli {
        padding: 20px;
        font-size: 18px;
        line-height: 40px;
      }

      .save {
        cursor: pointer;
        display: block;
        height: 30px;
        line-height: 30px;
        text-align: center;
        width: 100px;
        color: #fff;
        font-size: 18px;
        border-radius: 5px;
        background: #66CCFF;
        border: none;
        outline: none;
        margin: 50px auto;
      }

      .save:hover {
        background: #2BB4F8;
      }

      h3 {
        text-align: center;
        height: 40px;
        margin-bottom: 20px;
        font-size: 18px;

      }

      .li {
        table {
          margin: 0 auto;
          display: block;
          width: 900px;
        }

        td, th {
          width: 260px;
          padding: 10px 20px;
          height: 40px;
          text-align: center;
          font-size: 16px;
        }

        td.left {
          text-align: left;
          background: #efefef;
        }
      }
    }

    .jia {
      padding: 0 20px;

      img {
        display: block;
        width: 800px;
        margin: 0 auto;
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
