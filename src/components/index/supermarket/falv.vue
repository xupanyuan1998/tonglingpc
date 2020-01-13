<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="goshe">涉企服务</span><b> ></b><span >安徽宪达律师事务所</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="int">
        <h4>律所简介</h4>
        <div class="yin">
          <div>
            <img src="../../../../static/images/229.jpg" alt="">
            <b>安徽宪达律师事务所</b>
          </div>
          <p>公正即法，权威即治，法治在于公正权威。秉持着这一理念的安徽宪达律师事务所自一九九三年创建以来，励精图治十数载。虽历经铜陵市对外经济律师事务所、铜陵宪达律师事务所数易其名，历经国资所、合伙所体制变更，但对于法治的信念始终未敢动摇。
            十数次的花开花落中，我所先后为数十家政府机关、企事业单位、个人担任过法律顾问，从未间断地办理刑事辩护、民事、行政诉讼代理，以自己的智慧和勇气为民请命，为法治呐喊。与此同时，合同起草、商务谈判、公司组建、律师见证、留学证明等非诉讼法律事务，亦成为我所同仁大量涉足。广连四海、博采众长。多年来，我所与全国众多同行均建立有良好的业务合作关系，我所同仁的足迹更是远至欧洲大陆。
            我所以恢复律师制度以来第一批从事律师工作具有二十多年经验的资深律师为主体，并拥有具有会计师、工程师、经济师等专业技术资格的复合型律师人才。我所的特色是人少精干、专业分工、团队协作，用集体的智慧为客户提供优质的法律服务。现我所由余国富律师任主任，合伙性质，执业律师13人，内勤工作人员2人，执业律师中具有法律专业本科学历6人，其他专业本科学历6人，法律专业专科学历1人，其中有3位硕士学位。
            宪者，法令也；达者，畅通也；法令之畅通，公正之权威，是我所全体同仁秉持的信念，为之奋斗不息所追求的理想。路漫漫其修远兮，吾将上下而求索。我们一直并将继续不断地实践着以个案推动我国伟大而艰巨的法治进程的理念。
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
            <span>0562-2825000</span>
          </li>
          <li>
            <span>地址：</span>
            <span> 安徽省铜陵市义安大道北段财富广场B座2006号</span>
          </li>
          <li>
            <span> 官网：</span>
            <span>http://www.tlxdls.com</span>
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
        name: "yongchang",
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 5,
                placeshow:false,
                tableData: [
                    {
                    name: '张海林',
                    jigou:'安徽宪达律师事务所',
                    card:'13407201611750119',
                    age:'3'
                  },
                    {
                        name: '汪镭',
                        jigou:'安徽宪达律师事务所',
                        card:'13407201311862143',
                        age:'6'
                    },
                    {
                        name: '卢守辉',
                        jigou:'安徽宪达律师事务所',
                        card:'13407201110609359',
                        age:'8'
                    },
                    {
                        name: '王文元',
                        jigou:'安徽宪达律师事务所',
                        card:'13407201210504981',
                        age:'7'
                    },
                    {
                        name: '朱永诚',
                        jigou:'安徽宪达律师事务所',
                        card:'13407201610263828',
                        age:'3'
                    },
                    {
                        name: '杨光康',
                        jigou:'安徽宪达律师事务所',
                        card:'13407201610466322',
                        age:'3'
                    },
                    {
                        name: '朱真珣',
                        jigou:'安徽宪达律师事务所',
                        card:'13407201510901926',
                        age:'4'
                    },
                    {
                        name: '余国富',
                        jigou:'安徽宪达律师事务所',
                        card:'13407198910197417',
                        age:'30'
                    },
                    {
                        name: '余勇',
                        jigou:'安徽宪达律师事务所',
                        card:'13407201610356149',
                        age:'3'
                    },
                    {
                        name: '刘圣刚',
                        jigou:'安徽宪达律师事务所',
                        card:'13407198701524260',
                        age:'32'
                    },
                ],
                value:5
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
