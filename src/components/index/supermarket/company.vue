<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="warp">
      <div class="int">
        <h4>公司简介</h4>
        <div class="yin">
          <div>
            <img src="../../../../static/images/242.jpg" alt="">
            <b>铜陵有色金属（集团）公司</b>
            <span>法人代表：杨军</span>
          </div>
          <p>铜陵有色金属集团控股有限公司1950年恢复建设，1952年6月正式投产，是新中国最早建设起来的铜工业基地，中国铜工业的摇篮。经过半个世纪的建设，现已发展成为以铜金属、化工、装备制造等三大产业为主营业务，集房地产、建筑安装、井巷施工、旅游服务为一体的大型企业集团。公司现为全国300家重点扶持和安徽省重点培育的大型企业集团之一。2006年，公司阴极铜产量达到54.48万吨，全国第一，位居世界大型铜精炼企业第8位。2006年按销售收入排序，名列中国企业500强第155位、中国制造业500强第59位和安徽省大型工业企业第2位。
            铜陵有色金属集团控股有限公司拥有国家级技术中心，为安徽省高新技术企业。公司主产品"铜冠"牌高纯阴极铜为中国名牌产品和全国用户满意产品；"金豚"牌、"铜冠"牌高纯阴极铜在伦敦金属交易所注册，成为国际知名品牌；无氧铜杆、圆铜漆包线、五水硫酸铜、塑料电缆等产品均为安徽省名牌产品。《地下矿山连续开采工艺及装备》、《常温变量喷射--动力波洗涤闪速炼铜技术》先后荣获国家科技进步一等奖。
            公司与世界30多个国家和地区建立了经济技术和贸易合作关系，数十种产品分别出口到日本、德国、美国、新加坡等10多个国家和地区。公司现为全国有外贸经营权100强企业，进出口贸易总额名列中国进出口额最大500强企业之一。
            “十一五”期间，铜陵有色金属集团控股有限公司将以“三个代表”重要思想为指导，全面落实科学发展观，坚持“改革、调整、重组、再造”的方针，按照“创造条件控制资源，深挖潜力提升冶炼，优化结构发展加工，高新技术培育非铜产业”的发展战略和 “主业优化升级，辅业分立改制，管理规范有效，人企共同发展”的目标，继续深化改革，调整结构，加快发展，努力把企业建设成为国内一流、世界先进的现代企业集团。
            该企业在中国企业联合会、中国企业家协会联合发布的2006年度中国企业500强排名中名列第一百五十五。</p>
        </div>
      </div>
      <div class="int"->
        <h4>服务内容</h4>
        <div class="c">
          <template>
            <el-table
              border
              :data="tableData"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="服务名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                width="150"
              >
                <template>
                  <el-button type="primary" round>主要按钮</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
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
        name: "company",
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
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
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
       div{
         width: 200px;
         margin-right:20px;
         float: left;
         img{
           display: block;
           margin-bottom: 10px;
         }
         b,span{
           display: block;
           text-align: center;
           line-height: 30px;
         }

       }
        p{
          text-indent: 2em;
          padding: 20px;
          line-height: 40px;
          font-size: 18px;
        }
      }
      .c{
        padding: 20px;
      }
    }
  }
</style>
