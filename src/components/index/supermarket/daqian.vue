<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="goshe">涉企服务</span><b> ></b><span >安徽大潜律师事务所</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="int">
        <h4>律所简介</h4>
        <div class="yin">
          <div>
            <img src="../../../../static/images/230.jpg" alt="">
            <b>安徽大潜律师事务所</b>
          </div>
          <p>大潜律师事务是省司法厅认定的律师事务所。目前，大潜已建设成为一家提供包括非诉业务、民商诉讼、刑事诉
            讼等法律服务的综合性律师事务所。我们秉承大道潜行，虚心为学，大道至上，弘德布法的精神，为各行各业提供
            法律服务。安徽大潜律师事务所是经国家司法部审核、安徽省司法厅批准的一家合伙制、综合性律师事务所，可提
            供自主办公场所500余平，地理位置佳、办公环境优越，目前储备一批具有多年执业经验的律师、法学教授、专家学者。大潜律师事务
            所以扎实的法律功底、娴熟的法律技巧、丰富的实践经验、良好的职业道德、较强的社会协调能力为广大客户提供了满意的法律服务。
          </p>
        </div>
      </div>
      <div class="int">
        <h4>法律团队</h4>
        <div style="padding: 20px">
          <template>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="50"
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                prop="jigou"
                label="执业机构"
                align="center">
              </el-table-column>
              <el-table-column
                prop="card"
                label="执业证号"
                align="center">
              </el-table-column>
              <el-table-column
                prop="age"
                label="执业年限"
                width="100"
                align="center"
              >
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
      <div class="int">
        <h4>联系我们</h4>
        <ol>
          <li>
            <span>电话：</span>
            <span>0554-6886168</span>
          </li>
          <li>
            <span>地址：</span>
            <span> 安徽省淮南市田家庵区广场北路景苑A座604室 </span>
          </li>
          <li>
            <span> 官网：</span>
            <span> http://www.ahdqls.com</span>
          </li>
        </ol>
      </div>
      <div class="int">
        <h4>企业服务</h4>
        <button @click="place">我要咨询</button>
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
    <div class="place"  @mousewheel.prevent v-show="placeshow">
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
        name: "daqian",
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 5,
                placeshow:false,
                tableData: [
                    {
                        name: '李磊',
                        jigou:'安徽大潜律师事务所',
                        card:'13404201410477385',
                        age:'5'
                    },
                    {
                        name: '朱国豪',
                        jigou:'安徽大潜律师事务所',
                        card:'13404201010497734',
                        age:'9'
                    },
                    {
                        name: '段元虎',
                        jigou:'安徽大潜律师事务所',
                        card:'13404201010993899',
                        age:'9'
                    },
                    {
                        name: '谢辉',
                        jigou:'安徽大潜律师事务所',
                        card:'13404201110575874',
                        age:'8'
                    },
                    {
                        name: '陈琪',
                        jigou:'安徽大潜律师事务所',
                        card:'13404201611615442',
                        age:'3'
                    },
                    {
                        name: '张永华',
                        jigou:'安徽大潜律师事务所',
                        card:'13404199710104049',
                        age:'22'
                    },
                    {
                        name: '程韦伟',
                        jigou:'安徽大潜律师事务所',
                        card:'13404201111855063',
                        age:'8'
                    },
                    {
                        name: '简政',
                        jigou:'安徽大潜律师事务所',
                        card:'13404201010727104',
                        age:'9'
                    },
                ],
                value:4.5
            }
        },
        components:{
            headNav,
            footerNav
        },
        methods:{
            place(){
                this.placeshow=true;
            },
            cloose(){
                this.placeshow=false;
            },
            //回首页
            goindex(){
                this.$router.push('/')
            },
            //企业设立
            goshe(){
                this.$router.push('/services')
            }
        }
    }
</script>

<style scoped lang="less">
  .warp{
    width: 1200px;
    margin: 20px auto;
    .int{
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
      h4{
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 10px;
        color: #0e0d0d;
        border-bottom: 2px solid #ff4c4c;
        margin-bottom: 20px;
      }
      ol{
        padding: 20px;
        li{
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          span{
            display: inline-block;
          }
          span:first-child{
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
          width: 230px;
          margin-right:20px;
          margin-left: 20px;
          float: left;
          img{
            display: block;
            width: 100%;
            margin-bottom: 10px;
          }
          b{
            display: block;
            text-align: center;
            line-height: 30px;
            font-size: 18px;
          }

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
    .jia{
      padding: 0 20px;
      img{
        display: block;
        width: 800px;
        margin: 0 auto;
      }
    }
  }
  .hello{
    background: #fff;
  }
</style>
<style scoped lang="less">
  .place{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.16);
    position:fixed;
    top: 0;
    left: 0;
    transition: all 0.5s;
    .ti{
      position: absolute;
      width: 300px;
      height: 200px;
      background: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      border-radius: 5px;
      h2{
        height: 30px;
        font-size: 18px;
        color: #fe0000;
        font-weight: 500;
        line-height: 30px;
        padding-left: 20px;
        border-bottom: 1px solid #fe0000;
        margin-top: 10px;
      }
      p{
        padding: 20px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        line-height: 80px;
      }
      img{
        position: absolute;
        top: -15px;
        right: -15px;
        transition: all 0.2s;
      }
      img:hover{
        transform: rotate(360deg);
      }
    }
  }
</style>
