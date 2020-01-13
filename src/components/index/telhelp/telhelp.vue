<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span >联系帮扶</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="left">
        <h3 v-for="(item,idx) in leftlist" :class="leftShow==idx?'select':''" @click="cleft(idx,item)">{{item}}</h3>
      </div>
      <template v-if="leftShow==0">
        <div class="right">
          <div class="top">
            <div class="choose">
              <span v-for="(item,idx) in cate" :key="idx"><em :class="xuancatas==idx?'cle':''" @click="xuancate(idx)">{{item}}</em><b></b></span>
            </div>
            <div class="bu">
              <span>部门：</span>
              <div class="xia">
                <template>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </div>
            </div>
            <div class="sou">
              <div class="su">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
              <button>搜索</button>
            </div>
          </div>
          <template v-if="xuancatas==0">
            <div class="cocc">
              <p class="tip">
                <span>标题</span>
                <b>帮扶企业</b>
                <em>帮扶领导</em>
                <strong>时间</strong>
              </p>
              <ul>
                <li>
                  <span @click="goinit">我市召开2019年四送一服数字经济进农村</span>
                  <b>铜陵瑞德环境科技咨询有限公司</b>
                  <em>张局长（市民营局）</em>
                  <strong>2019-12-30</strong>
                </li>
                <li>
                  <span @click="goinit">我市召开2019年四送一服数字经济进农村</span>
                  <b>铜陵瑞德环境科技咨询有限公司</b>
                  <em>张局长（市民营局）</em>
                  <strong>2019-12-30</strong>
                </li>
                <li>
                  <span @click="goinit">我市召开2019年四送一服数字经济进农村</span>
                  <b>铜陵瑞德环境科技咨询有限公司</b>
                  <em>张局长（市民营局）</em>
                  <strong>2019-12-30</strong>
                </li>
              </ul>
            </div>
          </template>
          <template v-if="xuancatas==1">
            <div class="contents">
              <p class="head">
                <span>月份</span>
                <span>部门</span>
                <span>次数</span>
              </p>
              <ul>
                <li>
                  <div class="mon">
                    <span>2019年12月</span>
                    <span></span>
                    <span>12</span>
                  </div>
                  <ol>
                    <li>
                      <span></span>
                      <span>市民营局</span>
                      <span>6</span>
                    </li>
                    <li>
                      <span></span>
                      <span>市建设局</span>
                      <span>6</span>
                    </li>
                  </ol>
                </li>
                <li>
                  <div class="mon">
                    <span>2019年12月</span>
                    <span></span>
                    <span>12</span>
                  </div>
                  <ol>
                    <li>
                      <span></span>
                      <span>市民营局</span>
                      <span>6</span>
                    </li>
                    <li>
                      <span></span>
                      <span>市建设局</span>
                      <span>6</span>
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </template>
      <template v-if="leftShow==1">
        <div class="right">
          <div class="top">
            <div class="choose">
              <span v-for="(item,idx) in cate1" :key="idx"><em :class="xuancatas1==idx?'cle':''" @click="xuancate1(idx)">{{item}}</em><b></b></span>
            </div>
            <div class="bu">
              <span>部门：</span>
              <div class="xia">
                <template>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </div>
            </div>
            <div class="sou">
              <div class="su">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
              <button>搜索</button>
            </div>
          </div>
          <template v-if="xuancatas1==0">
            <div class="cocc">
              <p class="tip">
                <span>标题</span>
                <b>帮扶企业</b>
                <em>帮扶领导</em>
                <strong>时间</strong>
              </p>
              <ul>
                <li>
                  <span @click="goinit">我市召开2019年四送一服数字经济进农村</span>
                  <b>铜陵瑞德环境科技咨询有限公司</b>
                  <em>张局长（市民营局）</em>
                  <strong>2019-12-30</strong>
                </li>
                <li >
                  <span @click="goinit">我市召开2019年四送一服数字经济进农村</span>
                  <b>铜陵瑞德环境科技咨询有限公司</b>
                  <em>张局长（市民营局）</em>
                  <strong>2019-12-30</strong>
                </li>
                <li >
                  <span @click="goinit">我市召开2019年四送一服数字经济进农村</span>
                  <b>铜陵瑞德环境科技咨询有限公司</b>
                  <em>张局长（市民营局）</em>
                  <strong>2019-12-30</strong>
                </li>
              </ul>
            </div>
          </template>
          <template v-if="xuancatas1==1">
            <div class="contents">
              <p class="head">
                <span>月份</span>
                <span>部门</span>
                <span>次数</span>
              </p>
              <ul>
                <li>
                  <div class="mon">
                    <span>2019年12月</span>
                    <span></span>
                    <span>12</span>
                  </div>
                  <ol>
                    <li>
                      <span></span>
                      <span>市民营局</span>
                      <span>6</span>
                    </li>
                    <li>
                      <span></span>
                      <span>市建设局</span>
                      <span>6</span>
                    </li>
                  </ol>
                </li>
                <li>
                  <div class="mon">
                    <span>2019年12月</span>
                    <span></span>
                    <span>12</span>
                  </div>
                  <ol>
                    <li>
                      <span></span>
                      <span>市民营局</span>
                      <span>6</span>
                    </li>
                    <li>
                      <span></span>
                      <span>市建设局</span>
                      <span>6</span>
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </template>
    </div>
    <div class="footer">
      <footer-nav></footer-nav>
    </div>
  </div>
</template>
<script>
    import headNav from "../../headNav";
    import footerNav from "../../footer"
    import '../../../assets/css/page.less'
    import  '../../../assets/css/list.less'
    import  '../../../assets/css/mianbao.less'
    export default {
        name: "informationMore",
        data() {
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 8,
                leftlist:['工作动态','问题搜集'],
            leftShow:0,
                options: [{
                    value: '选项1',
                    label: '税务局'
                }, {
                    value: '选项2',
                    label: '能源局'
                }, {
                    value: '选项3',
                    label: '建设局'
                }],
                value: '',
                value1: '',
                cate:['工作动态','工作统计'],
                cate1:['问题搜集','问题搜集统计'],
                xuancatas:0,
                xuancatas1:0,
            }
        },
        components: {
            headNav,
            footerNav
        },
        methods:{
            goindex(){
                this.$router.push('/')
            },
            serchsa(){
                this.getnewList(20,1,this. categoryid,this.serchs);
            },
            cleft(i,b){
                this. leftShow=i;
            },
            //工作列表
            xuancate(i){
                this.xuancatas=i;
            },
            xuancate1(i){
                this.xuancatas1=i;
            },
            goinit(){
                this.$router.push('/telhelpdetail')
            }
        },
        watch: {
            '$route' (to, from) {
                this.$router.go(0);
            }
        },
    }
</script>
<style scoped lang="less">
  .hello{
    background: #fff;
  }
  .warp{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 21px ;
    position: relative;
    padding-bottom: 30px;
    .left{
      float: left;
      margin-right: 20px;
      width:186px;
      border:1px solid rgba(230,230,230,1);
      border-top: none;
      background: #fff;
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
      width:949px;
      min-height: 400px;
      background: #fff;
      border:1px solid rgba(217,217,217,1);
      padding:17px 20px ;
      position: relative;
      .top{
        margin: 0 20px;
        padding-bottom: 20px;
        border-bottom: 4px solid #ccc;
        overflow: hidden;
        .choose{
          float: left;
          height: 40px;
          display: flex;
          flex-direction: row;
          align-items: center;
          span{
            display: flex;
            flex-direction: row;
            align-items: center;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
            margin-right: 10px;
            em{
              font-weight: normal;
              font-size: 18px;
            }
            em.cle{
              color: #fe0000;
            }
            b{
              margin-left: 10px;
              width: 4px;
              height: 20px;
              background: #333;
            }
          }
          span:last-child{
            b{
              display: none;
            }
          }
        }
        .bu{
          float: left;
          margin-left: 30px;
          height: 40px;
          span{
            display: inline-block;
            float: left;
            height:40px;
            line-height: 40px;
          }
          .xia{
            display: inline-block;
            width: 100px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
        }
        .sou{
          float: right;
          .su{
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          button{
            border-radius: 5px;
            display: inline-block;
            border: none;
            outline: none;
            background:#fe0000 ;
            width: 90px;
            height: 40px;
            margin-left: 20px;
            color: #fff;
            text-align: center;
          }
          button:hover{
            background: #c00;
          }
        }
      }
      .contents{
        padding:  0 20px;
        .head{
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 50px;
          span{
            padding: 0 20px;
            width: 30%;
            font-size: 16px;
            font-weight: bold;

          }
        }
        ul{
          li{
            .mon{
              background: #cfcfcf;
              display: flex;
              flex-direction: row;
              align-items: center;
              height: 50px;
              border-bottom: 1px solid #c6c6c6;
              span{
                font-size: 16px;
                padding: 0 20px;
                width: 30%;
              }
            }
            ol{
              li{
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 50px;
                border-bottom: 1px solid #c6c6c6;
                transition: all 0.5s;
                span{
                  font-size: 16px;
                  padding: 0 20px;
                  width: 30%;
                }
              }
              li:hover{
                background: #e3e3e3;
              }
              li:last-child{
                border-bottom: none;
              }
            }
          }
        }
      }
      .cocc{
        padding: 0 20px;
        p{
          width: 100%;
          height: 50px;
          border-bottom: 1px solid #ccc;
          >*{
            display: block;
            height: 40px;
            line-height: 40px;
            float: left;
            margin-left: 20px;
            font-weight: bold;
            font-size: 16px;
          }
          span{
            width: 308px;
          }
          b{
            width: 250px;
          }
          em{
            width: 170px;
          }
          strong{
            width: 100px;
          }
        }
        ul{
          li{
            width: 100%;
            height: 50px;
            border-bottom: 1px solid #ccc;
            >*{
              display: block;
              height: 50px;
              line-height: 50px;
              float: left;
              margin-left: 20px;
              font-weight: normal;
              font-size: 16px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              cursor:default;
            }
            span{
              width: 308px;
              cursor: pointer;
            }
            b{
              width: 250px;
            }
            em{
              width: 170px;
            }
            strong{
              width: 100px;
            }
          }
          li:hover{
            span{
              color: #fe0000;
            }
          }
          li:last-child{
            border-bottom:none;
          }
        }
      }
    }
  }
  .page{
    margin: 30px 0;
    text-align: center;
    div{
      display: inline-block;
    }
  }
</style>
<style scoped lang="less">
  .placesa{
    width: 100vw;
    height: 100vh;
    background:rgba(0,0,0,.2);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .ca{
      width:350px;
      height:200px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 999;
      transform: translate(-50%,-50%);
      h1{
        width:337px;
        height:30px;
        line-height: 30px;
        background:rgba(227,65,21,1);
        border-radius:4px 4px 0px 0px;
        padding-left: 13px;
        font-size:16px;
        font-weight:400;
        color:rgba(254,254,255,1);
      }
      p{
        margin-top: 4px;
        height: 93px;
        line-height: 93px;
        background: #fff;
        text-align: center;
        font-size:16px;
        font-weight:400;
        color:rgba(69,69,69,1);
        border-bottom: 1px dashed #e3e3e3;
      }
      button{
        margin: 18px auto 0;
        width:70px;
        height:30px;
        background:rgba(227,65,21,1);
        border-radius:4px;
        display: block;
        outline: none;
        border: none;
        font-size:16px;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
    .success{
      width:241px;
      height:263px;
      padding: 0 48px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 999;
      transform: translate(-50%,-50%);
      img{
        width: 44px;
        height: 44px;
        display: block;
        margin: 24px auto 0;
      }
      h2{
        text-align: center;
        height:22px;
        font-size:24px;
        font-weight:400;
        color:rgba(77,77,77,1);
        margin-top: 11px;
      }
      p{
        margin-top: 29px;
        height:79px;
        font-size:20px;
        font-weight:400;
        color:rgba(89,89,89,1);
        line-height:30px;
      }
    }
    .logins{
      width:422px;
      height:518px;
      background:rgba(255,255,255,1);
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 999;
      transform: translate(-50%,-50%);
      h2{
        margin-top: 32px;
        font-size:20px;
        font-weight:400;
        color:rgba(229,53,9,1);
        text-align: center;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #E53509;
      }
      ul{
        margin: 40px auto 0;
        width:284px;
        background:rgba(255,255,255,1);

        li{
          height:38px;
          width:282px;
          border:1px solid rgba(227,227,227,1);
          border-radius:2px;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          img{
            margin-left: 7px;
          }
          input{
            width: 234px;
            padding: 0 10px;
            border: none;
            outline: none;
          }
        }
      }
      button{
        width:284px;
        height:36px;
        background:rgba(229,53,9,1);
        border-radius:2px;
        outline: none;
        border: none;
        font-size:16px;
        text-align: center;
        line-height: 36px;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin: 0 auto;
        display: block;
      }
      div{
        height: 48px;
        width:284px;
        margin: 0 auto;
        span{
          display: block;
          float: left;
          cursor:pointer;
          height: 45px;
          line-height: 45px;
          font-size:14px;
          font-weight:400;
          color:rgba(41,93,211,1);
        }
        span:last-child{
          float: right;
        }
      }
      .cloose{
        width: 30px;
        height: 30px;
        position: absolute;
        top: -20px;
        right: -15px;
      }
    }
  }
</style>
<style>
  .el-input__inner{
    border: none;
  }
</style>
