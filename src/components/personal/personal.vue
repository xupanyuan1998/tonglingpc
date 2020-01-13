<template>
  <div class="hello">
    <div class="top">
      <head-nav :title="toptitle"></head-nav>
    </div>
    <div class="warp">
      <!-- 左侧 -->
      <div class="left">
        <div  class="headerimg">
          <img :src="msg.headImg.length>1?msg.headImg:'../../../static/images/109.png'" alt />
        </div>
        <div class="fa">
          <p>
            <b>您好！{{msg.userName}}</b>
            <span v-if="msg.roleId!=0">【{{msg.roleName}}】</span>
          </p>
        </div>
        <h3 v-show="msg.roleId<2">{{msg.mobile}}</h3>
        <h3 v-show="msg.roleId>1">
          <span>部门</span>
          <span>{{msg.departmentName}}</span>
        </h3>
        <h5 v-if="msg.roleId==1">{{msg.companyName}}</h5>
        <ul class="myshou" >
          <li v-for="(item,idx) in dingyue" :key="idx" :class="{'r':idx%2==1}" @click="xuanz(item)">
            <i>{{item.name}}</i>
          </li>
        </ul>
        <!-- 左上end -->
        <!-- 左下 -->
        <h4 v-if="msg.roleId==1"><b></b><span>在线服务</span></h4>
        <ul class="myding">
          <li
            v-for="(item,idx) in online"
            :key="idx"
            :class="item.active?'show':''"
            @click="xuanz(item)"
          >
            <em>
              <img v-if="item.active" :src="item.activeSrc" alt />
              <img v-else :src="item.src" alt />
            </em>
            <i>{{item.name}}</i>
          </li>
        </ul>
        <h4 v-show="msg.roleId===3"><b></b><span>数据统计</span></h4>
        <ul class="myding">
          <li
            v-for="(item,idx) in shuju "
            :key="idx"
            :class="item.active?'show':''"
            @click="xuanz(item)"
          >
            <em>
              <img v-if="item.active" :src="item.activeSrc" alt />
              <img v-else :src="item.src" alt />
            </em>
            <i>{{item.name}}</i>
          </li>
        </ul>
        <h4 v-show="msg.roleId==1"><b></b><span>企业微空间</span></h4>
        <ul class="myding">
          <li
            v-for="(item,idx) in server"
            :key="idx"
            :class="item.active?'show':''"
            @click="xuanz(item)"
          >
            <em>
              <img v-if="item.active" :src="item.activeSrc" alt />
              <img v-else :src="item.src" alt />
            </em>
            <i>{{item.name}}</i>
          </li>
        </ul>
        <h4 ><b></b><span>个人信息</span></h4>
        <ul class="myding">
          <li
            v-for="(item,idx) in mymsg"
            :key="idx"
            :class="item.active?'show':''"
            @click="xuanz(item)"
          >
            <em>
              <img v-if="item.active" :src="item.activeSrc" alt />
              <img v-else :src="item.src" alt />
            </em>
            <i>{{item.name}}</i>
          </li>
        </ul>
      </div>
      <!-- 系统消息 -->
      <div class="right">
        <router-view :key="$route.fullPath"/>
      </div>
    </div>
    <div class="footer">
      <footer-nav></footer-nav>
    </div>
  </div>
</template>
<script>
    import headNav from "../headNav"
    import footerNav from "../footer"
    //提示组件
    export default {
        name: "personal",
        components: {
            //数据统计
            headNav,
            footerNav,
        },
        data() {
            return {
                clectnav: 0,
                toptitle: "铜陵市民营经济云服务智慧平台",
                soption: 0,
                con: 0,
              size:10,
                current: 0,
                imageUrl: "",
                cur: 0,
                isShow: "true",
                // 企业资质
                leftShow: 0,
                workerderint: "",
                msg: "",
                userId: "",
                dingyue: [
                    // { name: "推荐", active: false },
                    { name: "消息", active: false ,url:'news'},
                    // { name: "订阅", active: false },
                    { name: "收藏", active: false,url:'shoucang' }
                ], //我的订阅
                online: [],
                server: [],
                mymsg: [
                    {
                        src: "../../../static/images/186.png",
                      activeSrc:'../../../static/images/194.png',
                        name: "身份认证",
                        active: false,
                        url:'faren'
                    },
                    {
                        src: "../../../static/images/187.png",
                      activeSrc:'../../../static/images/195.png',
                        name: "修改密码",
                        active: false,
                        url:'setpassword'
                    }
                ],
                workId: "",
              shuju:[],
            };
        },
        created() {
            this.token = localStorage.getItem("token");
            var a = localStorage.getItem("personal");
            this.msg = JSON.parse(a);
            this.userId=this.msg.userId;
            let fa=this.$route.params.data;
              if (this.msg.roleId == 0) {
                this.online=[],
                  this.server = [];
                  if(fa=='faren'){
                  this.mymsg[0].active=true;
                  this.$router.push('/personal/faren')
                  }else{
                    this.mymsg[1].active=true;
                  this.$router.push('/personal/setpassword')
                  }

              } else if (this.msg.roleId == 1) {
                this. online=[
                  {
                    src: "../../../static/images/181.png",
                    activeSrc:'../../../static/images/188.png',
                    name: "重点政策推荐",
                    active: false,
                      url:'importanttuijian'
                  },{
                    src: "../../../static/images/189.png",
                    activeSrc:'../../../static/images/196.png',
                    name: "经验推荐",
                    active: false,
                        url:'jingyang'
                  },
                  {
                    src: "../../../static/images/182.png",
                    activeSrc:'../../../static/images/190.png',
                    name: "信息之窗",
                    active: false,
                      url:'friend'
                  },
                    {
                        src: "../../../static/images/247.png",
                        activeSrc:'../../../static/images/248.png',
                        name: "审批服务",
                        active: false,
                        url:'myshenpi'
                    }
                ],
                  this.server = [
                    //企业服务
                    {
                      src: "../../../static/images/183.png",
                      activeSrc:'../../../static/images/191.png',
                      name: "产品管理",
                      active: false,
                        url:'administration'
                    },
                    {
                      src: "../../../static/images/184.png",
                      activeSrc:'../../../static/images/192.png',
                      name: "供需发布",
                      active: false,
                        url:'supplypublic'
                    },
                    {
                      src: "../../../static/images/185.png",
                      activeSrc:'../../../static/images/197.png',
                      name: "企业资质",
                      active: false,
                        url:'enterprisezizhi'
                    },

                  ];
                  if(fa=='faren'){
                  this.mymsg[0].active=true;
                  this.$router.push('/personal/faren')
                  }else{
                    this.online[0].active=true;
                this.$router.push('/personal/importanttuijian');
                  }
              } else if (this.msg.roleId == 2) {
                (this.online = [
                ]),
                  this.server=[],
                  this.mymsg = [
                    {
                      src: "../../../static/images/187.png",
                      activeSrc:'../../../static/images/195.png',
                      name: "修改密码",
                      active: false,
                        url:'setpassword'
                    }
                  ];
                this.mymsg[0].active=true;
                this.$router.push('/personal/setpassword');
              }else if( this.msg.roleId == 3){
                this.online = [];
                this.shuju=[
                  {
                    src: "../../../static/images/199.png",
                    activeSrc:'../../../static/images/200.png',
                    name: "企业建档统计",
                    active: false,
                      url:'tableJd'
                  },
                  {
                    src: "../../../static/images/201.png",
                    activeSrc:'../../../static/images/202.png',
                    name: "企业活跃统计",
                    active: false,
                      url:'tableQyhy'
                  },
                  {
                    src: "../../../static/images/204.png",
                    activeSrc:'../../../static/images/203.png',
                    name: "网站内容统计",
                    active: false,
                      url:'tableWznr'
                  },
                  {
                    src: "../../../static/images/205.png",
                    activeSrc:'../../../static/images/206.png',
                    name: "政策发布效果统计",
                    active: false,
                      url:''
                  },
                  {
                    src: "../../../static/images/207.png",
                    activeSrc:'../../../static/images/208.png',
                    name: "为企服务评分统计",
                    active: false,
                      url:'tableFa'
                  },
                  {
                    src: "../../../static/images/232.png",
                    activeSrc:'../../../static/images/231.png',
                    name: "注册资金统计",
                    active: false,
                      url:'zijin'
                  }
                ];
                this.server=[];
                this.mymsg = [
                  {
                    src: "../../../static/images/187.png",
                    activeSrc:'../../../static/images/195.png',
                    name: "修改密码",
                    active: false,
                      url:'setpassword'
                  }
                ];
                this.shuju[0].active=true;
                this.$router.push('/personal/tableJd')
              }

        },
        beforeCreate(){
            this.token = localStorage.getItem("token");
            if(this.token==null){
                this.$router.push('/')
            }else{

            }
        },
        methods: {
            xuanz(item) {
                var _this = this;
                document.documentElement.scrollTop = 0;
                //清除左侧列表的选中效果
                this.dingyue.forEach(function (item) {
                    _this.$set(item, "active", false);
                });
                this.online.forEach(function (item) {
                    _this.$set(item, "active", false);
                });
                this.server.forEach(function (item) {
                    _this.$set(item, "active", false);
                });
                this.mymsg.forEach(function (item) {
                    _this.$set(item, "active", false);
                });
                this.shuju.forEach(function (item) {
                    _this.$set(item, "active", false);
                });
                this.$set(item, "active", true);
                this.$router.push(item.url);
            },
            //设置active=false
            actives(arr){
                for (let i = 0; i < arr.length; i++) {
                    arr[i].active = false;
                }
            },
        },
    };
</script>
<style >
  .el-form-item.is-required:not(.is-no-asterisk)
  .el-form-item__label-wrap
  > .el-form-item__label:before,
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: "";
  }
</style>
<style scoped lang="less">
  .hello{
    background: #f2f2f2;
  }
  .warp {
    width: 1200px;
    margin: 15px auto;
    overflow: hidden;
    .left {
      background: #fff;
      padding-bottom: 30px;
      float: left;
      margin: 5px 17px 5px 3px;
      width: 261px;
      border: 1px solid #d7d7d7;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
      .headerimg {
        margin-top: 15px;
        img {
          cursor: pointer;
          width: 72px;
          height: 66px;
          display: block;
          margin: 0 auto;
          border-radius: 50%;
        }
      }
      .fa {
        margin-top: 8px;
        height: 30px;
        position: relative;
        p {
          height: 30px;
          /*width: 160px;*/
          /*margin: 0 auto;*/
          text-align: center;
          > * {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            font-weight: 400;
          }
          b {
            color: rgba(69, 69, 69, 1);
          }
          span {
            color: #e8390a;
          }
        }
      }
      h3,
      h5 {
        height: 29px;
        text-align: center;
        line-height: 29px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(69, 69, 69, 1);
      }
      h5 {
        margin-bottom: 10px;
      }
      .myding {
        li {
          height:41px;
          border-radius:6px;
          display: flex;
          align-items: center;
          cursor: pointer;
          margin: 0 10px;
          padding-left: 20px;
          em {
            width: 29px;
            img {
              display: block;
            }
          }
          i {
            font-size: 16px;
            color: #454545;
          }
        }
        li.show {
          background:rgba(223,49,28,1);
          i{
            color: #fff;
          }
        }
      }
      h4 {
        display: flex;
        padding: 15px;
        flex-direction: row;
        b{
          width: 4px;
          height: 20px;
          background: #df311c;
          margin-top: 2px;
          margin-right: 10px;
        }
        span{
          font-size:18px;
          font-weight:bold;
          color:#333;
        }

      }
      .myshou {
        overflow: hidden;
        width: 160px;
        padding: 0 50px 24px 50px;
        border-bottom: 2px solid #f0f0f0;
        margin-bottom: 20px;
        li {
          width:60px;
          height:30px;
          background:rgba(240,240,240,1);
          border-radius:4px;
          float: left;
          margin-right: 30px;
          text-align: center;
          line-height: 30px;
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(51,51,51,1);
          cursor: pointer;
        }
        li:last-child{
          margin-right: 0;
        }
      }
    }
    .center {
      display: none;
    }
    .right{
      position: relative;
      float: left;
      background: #fff;
      width: 912px!important;
      margin: 6px 3px 5px 0;
      min-height: 856px;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
      border: 1px solid rgba(217, 217, 217, 1);
    }
  }
</style>
