<template>
  <div class="hello">
    <div>
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <!--    轮播图-->
    <div class="Containers">
      <div class="swipers">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in content.swiper" :key="index">
            <img :src="item.bigImg" alt @click="item.isLink==1?link(item.url):''" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <!--        <div class="swiper-button-prev" slot="button-prev"></div>-->
          <!--        <div class="swiper-button-next" slot="button-next"></div>-->
          <!--        <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
        </swiper>
      </div>
<!--      新闻公告-->
      <div class="notice">
        <div class="new">
          <div class="ttl">
            <h4 class="two">铜陵新闻</h4>
            <router-link to="/newslist?id=0" tag="a">更多>></router-link>
          </div>
          <div class="new_top">
            <img :src="newsint.newsImg" alt="">
            <div class="new_right">
              <p>
                {{newsint.pressBrief}}
              </p>
              <span @click="gonewint(newsint.newsId)">[阅读]</span>
            </div>
          </div>
          <ul>
            <li v-for="(item,idx) in content.TongLingNews" :key="idx">
              <router-link :to="{path:'/newslist/newsdetali',query:{id:item.newsId}}">
                <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i><em>{{clearFen(item.publishTime)}}</em>
              </router-link>
            </li>

          </ul>
        </div>
        <div class="notices">
          <div class="ttl">
            <h4>通知公告</h4>
            <router-link to="/policy" tag="a">更多>></router-link>
          </div>
          <ul>
            <li v-for="(item,idx) in content.noticelist " :key="idx">
              <router-link  :to="{path:'/policy/policydetali',query:{id:item.noticeid}}" tag="a">
                <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i><em>{{clearFen(item.publishTime)}}</em>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
<!--      安徽新闻-->
      <div class="contry">
        <div class="new">
          <div class="ttl">
            <h4 v-for="(item,index) in newcate" :key="index2" :class="{'two':index2==newcateindex}" @mouseover="changenewindex(index2)">{{item}}</h4>
            <router-link to="/newslist" tag="a">更多>></router-link>
          </div>
          <div v-if="newcateindex==0">
            <div class="new_top">
              <img :src="anhuinew.newsImg" alt="">
              <div class="new_right">
                <p>
                  {{anhuinew.pressBrief}}
                </p>
                <span @click="gonewint(anhuinew.newsId)">[阅读]</span>
              </div>
            </div>
            <ul>
              <li v-for="(item,idx) in content.AnHuiNews " :key="idx">
                <router-link :to="{path:'/newslist/newsdetali',query:{id:item.newsId}}">
                  <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i><em>{{clearFen(item.publishTime)}}</em>
                </router-link>
              </li>

            </ul>
          </div>
          <div v-if="newcateindex==1">
            <div class="new_top">
              <img :src="guonew.newsImg" alt="">
              <div class="new_right">
                <p>
                  {{guonew.pressBrief}}
                </p>
                <span @click="gonewint(guonew.newsId)">[阅读]</span>
              </div>
            </div>
            <ul>
              <li v-for="(item,idx) in content.NationalNews " :key="idx">
                <router-link :to="{path:'/newslist/newsdetali',query:{id:item.newsId}}">
                  <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i><em>{{clearFen(item.publishTime)}}</em>
                </router-link>
              </li>

            </ul>
          </div>
        </div>
        <div class="car">
          <div class="car_top">
            <h4>服务直通车</h4>
            <router-link to="/Antonym" target="_blank" tag="a">更多服务</router-link>
          </div>
          <p>如果您有需要协调事项或对接意愿请尝试与我们联系！</p>
          <textarea v-model="server" id="con"></textarea>
          <div class="place" id="place">
            <div class="shan" id="shan"></div>
          </div>
          <button @click="getserver">提交</button>
        </div>
      </div>
<!--   政策-->
      <div class="policy">
        <div class="new">
          <div class="ttl">
            <h4 class="two">铜陵政策</h4>
            <router-link  to="/information/informationMore" tag="a">更多>></router-link>
          </div>
          <ul>
            <li v-for="(item,idx) in content.provincepolicylist">
              <router-link :to="{path:'/information/informationMore/informationdetali',query:{id:item.policyId}}">
                <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i><em>{{clearFen(item.publishTime)}}</em>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="new z_cen">
          <div class="ttl">
            <h4 v-for="(item,idx) in zhengcate" :key="idx" :class="{'two':idx==zhengcataindex}" @mouseover="changezheng(idx)">{{item}}</h4>
            <router-link to="/information/informationMore" tag="a">更多>></router-link>
          </div>
          <ul v-if="zhengcataindex==0">
            <li v-for="(item,idx) in content.policycitylist">
              <router-link :to="{path:'/information/informationMore/informationdetali',query:{id:item.policyId}}">
                <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i><em>{{clearFen(item.publishTime)}}</em>
              </router-link>
            </li>
          </ul>
          <ul v-if="zhengcataindex==1">
            <li v-for="(item,idx) in content.centerpolicylist">
              <router-link :to="{path:'/information/informationMore/informationdetali',query:{id:item.policyId}}">
                <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i><em>{{clearFen(item.publishTime)}}</em>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
<!--      banner-->
      <div class="beitong">
        <img src="../../static/images/112.png" alt="">
      </div>
      <div class="news sudi fast">
        <div class="new_l fasts">
          <div class="title">
              <span class="sllee">供需速递</span>
              <router-link to="/supplyneedlist" tag="a">更多>></router-link>
          </div>
          <div class="tool su_header">
            <p>
              <span>供需</span>
              <i>产品</i>
              <strong>数量</strong>
              <b>截止时间</b>
            </p>
          </div>
          <ul>
            <li v-for="(item,index)  in content.supplyanddemandlist" :key="index2">
              <router-link to="/supplyneedlist/supplyneeddetail">
                <b v-if="item.type==1">[供应]</b>
                <b v-if="item.type==2" class="xu">[需求]</b>
                <span>{{item.productname}}</span>
                <i>{{item.number}}</i>
                <strong>{{clearFen(item.endtime)}}</strong>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="auto">
          <p>
            <span>优秀人才</span>
            <router-link to="">更多>></router-link>
          </p>
          <ul>
            <li v-for="(item,idx) in content.abilityarchiveslist" :key="idx" :class="{'cc':idx%3==2}">
              <img :src="item.headImg" alt="">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="news">
        <div class="banner">
          <img src="../../static/images/banner.png" alt />
        </div>
      </div>
      <div class="news feng">
        <div class="fengcai">
          <p>
            <span>民企风采</span>
            <router-link to="/Corporation">更多>></router-link>
          </p>
          <ul>
            <li
              v-for="(item,idx) in content.companylist"
              :class="idx%5 ==4?'clear_r':''"
              @click="fengcai(item.companyId)"
              @mouseover="fengSl(item)"
              :key="idx"
            >
              <div @click="goQi(item.companyId)" :class="{'select':item.active}">
                <img :src="item.companyLogo" alt />
              </div>
              <span>{{item.companyName}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="news frend">
        <h5>友情链接</h5>
        <p>
          <router-link
            :to="item.friendlinkUrl"
            v-for="(item,index)  in content.friendLinklist"
            :key="index"
          >{{item.friendlinkName}}</router-link>
        </p>
      </div>
    </div>
    <div class="footer">
      <footer-nav></footer-nav>
    </div>
    <div class="placesa"  @mousewheel.prevent v-if="placeshow">
      <div class="ca" v-if="success==0">
        <h1>提示</h1>
        <p>请完整上传所有的必要资料！</p>
        <button @click="cancleback">确定</button>
      </div>
      <div class="success" v-if="success==1">
        <img src="../../static/images/95.png" alt="">
        <h2>提交成功</h2>
        <p>用户您好，我们将会以最快的速度为您办理，请耐心等待！</p>
      </div>
      <div class="logins" v-if="success==2">
        <h2>欢迎登录民营经济智慧云服务平台</h2>
        <ul>
          <li>
            <img src="../../static/images/9.png" alt="">
            <input type="text" placeholder="请输入用户名" v-model="username">
          </li>
          <li>
            <img src="../../static/images/10.png" alt="">
            <input type="password" placeholder="请输入密码" v-model="pass">
          </li>
        </ul>
        <button @click="gologin">登录</button>
        <div><span @click="results">忘记密码</span> <span @click="res">免费注册</span></div>
        <img src="../../static/images/96.png" alt="" class="cloose" @click="cloose">
      </div>
    </div>
  </div>
</template>

<script>
// 引入导航栏
import headNav from "./headNav";
import footerNav from "./footer";
import $ from "jquery";
export default {
  name: "index",
  data() {
    return {
      clectnav: 0,
      toptitle: "铜陵市民营经济云服务智慧平台",
      user: "13674920000",
      password: "123456",
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets"
        },
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        loop: false,
        speed: 800,
        effect: "fade" //切换效果 fade, slider ,cube,"coverflow",flip
      },
      content: {
        swiper: [],
        TongLingNews: [],
          AnHuiNews:'',
          NationalNews:'',
          policycitylist:'',
          provincepolicylist:'',
          centerpolicylist:'',
        noticelist: [],
        areaslist: "",
        declarationlist: "",
        supplyanddemandlist: "",
        abilityarchiveslist: "",
        companylist: "",
        friendLinklist: ""
      },
      yuanSleect: 0,
      loginShow: 0, //登录框,
      personal: "",
      token: "",
      recommendVoList: "" ,//重点推荐
        //新闻分类
        newcate:['安徽新闻','全国新闻'],
        newcateindex:0,
        //政策分类
        zhengcate:['省厅政策','中央政策'],
        zhengcataindex:0,
        //铜陵新闻第一条
        newsint:'',
        anhuinew:'',
        guonew:'',
        server:'',//输入框内容
        success:2,
        placeshow:false,
        username:'',
        pass:''
    };
  },
  created() {
    //获取本地储存的登录数据
    let status = localStorage.getItem("token");
    //获取缓存个人信息数据
    let ge = localStorage.getItem("personal");
    this.personal = JSON.parse(ge);
    // console.log(this.personal);
    if (status == null) {
      this.loginShow = 0;
    } else {
      this.token = status;
      this.loginShow = 2;
      if(this.personal.recommendVoList !=null){
            this.recommendVoList = this.sliceAway(this.personal.recommendVoList, 4);
        }

    }
    this.axios.post("/web/index/index").then(({ data }) => {
      // console.log(data.data);
      // console.log( this.content.companylist)
      this.content.swiper = data.data.bannerList; //轮播图
      this.content.TongLingNews =this.sencted(data.data.TongLingNews);//铜陵新闻
      this.content.AnHuiNews =this.sencted (data.data.AnHuiNews);//安徽新闻
      this.content.NationalNews =this.sencted (data.data.NationalNews);//全国新闻
      this.content.provincepolicylist =this.sliceAway( data.data.provincepolicylist,7);//本市政策
      this.content.policycitylist = this.sliceAway(data.data.policycitylist,7);//本省政策
      this.content.centerpolicylist = this.sliceAway(data.data.centerpolicylist,7);//全国政策

      this.content.noticelist = this.sliceAway(data.data.noticelist,7);
      this.content.areaslist = data.data.areaslist;//园区
      this.content.declarationlist = data.data.declarationlist;
      this.content.supplyanddemandlist = data.data.supplyanddemandlist; //供需
      this.content.abilityarchiveslist = this.sliceAway( data.data.abilityarchiveslist,6); //人才
      this.content.companylist = data.data.companylist; //民企
      this.content.friendLinklist = data.data.friendLinklist; //友联
      this.content.departmentlist = data.data.departmentlist; //在线办理

        //铜陵新闻第一条
        this.newsint=data.data.TongLingNews[0];
        //安徽新闻第一条
        this.anhuinew=data.data.AnHuiNews[0];
        //全国新闻第一条
        this.guonew=data.data.NationalNews[0];
    });
  },
  methods: {
      //新闻详情
      gonewint(i){
          this.$router.push({
              path:'/newslist/newsdetali',
              query:{
                  id:i
              }
          })
      },
      //切割数组
      sliceAway(arr,i){
          //arr=数组  i切割结束的下标
          return arr.slice(0,i);
      },
      //截取数组第二位到最后
      sencted(arr){
          //arr=数组  i切割结束的下标
          return arr.slice(1,5);
      },
    //新闻分类选择
      changenewindex(i){
          this.newcateindex=i;
      },
      //政策分类选择
      changezheng(i){
          this.zhengcataindex=i
      },
    normal() {
      this.loginShow = 0;
    },
    //企业详情
    goQi(i) {
      this.$router.push({
        path: "/Corporation/myspace",
        query: {
          id: i
        }
      });
    },
    //登录
    login() {
      this.axios
        .post("/web/login/login", {
          mobile: this.user,
          password: this.password
        })
        .then(({ data }) => {
          if (data.code === 10001) {
            this.loginShow = 2;
            this.personal = data.data;
            this.token = data.data.tokenSign;
            this.recommendVoList = this.sliceAway(data.data.recommendVoList, 4);
            localStorage.setItem("token", data.data.tokenSign);
            localStorage.setItem("personal", JSON.stringify(data.data));
          }
          if (data.code === 500) {
            $("#erro").fadeIn(200);
            setTimeout(function() {
              $("#erro").fadeOut(200);
            }, 2000);
          }
          // console.log(data)
        });
    },
    //退出
    logout() {
      // this.loginShow=0;
      // localStorage.removeItem('token');
      // localStorage.removeItem('personal');
      // window.location.reload();
      this.axios
        .post("/web/user/logout", { token: this.token })
        .then(({ data }) => {
          if (data.code == 10001) {
            this.loginShow = 0;
            localStorage.removeItem("token");
            localStorage.removeItem("personal");
            window.location.reload();
          }
        });
    },
    fengSl(index) {
      var _this = this;
      this.$nextTick(function() {
        this.content.companylist.forEach(function(index) {
          _this.$set(index2, "active", false);
        });
        this.$set(index2, "active", true);
      });
    },
    clearFen(i) {
      return i.substring(0, i.indexOf(" "));
    },
    link(i) {
      window.open(i, "_blank");
    },
    changeColor(index) {
      if (index2 == 1) {
        return "color_p";
      }
      if (index2 == 2) {
        return "color_a";
      }
      if (index2 == 3) {
        return "color_b";
      }
      if (index2 == 4) {
        return "color_c";
      }
      if (index2 == 5) {
        return "color_d";
      }
      if (index2 == 6) {
        return "color_e";
      }
      if (index2 == 7) {
        return "color_f";
      }
      if (index2 == 8) {
        return "color_g";
      }
      if (index2 == 9) {
        return "color_h";
      }
      if (index2 == 10) {
        return "color_j";
      }
      if (index2 == 11) {
        return "color_k";
      }
      if (index2 == 12) {
        return "color_l";
      }
    },
    //个人中心
    goPersonal() {
      this.$router.push("personal");
    },
    //注册页面
    goRegistered() {
      this.$router.push("/registered");
    },
    //找回密码页面
    resultPassword() {
      alert(1);
      this.$router.push("/resultPassword");
    },
    //重点推荐页面
    linkzhong() {
      this.$router.push("/personal");
      localStorage.setItem("zhong", "推荐");
    },
      //提交数据
      getserver(){
          var status=localStorage.getItem('token');
         if (status==null){
             this.placeshow=true;
         }else{
             if(this.server==''){
                $('#con').css({display:'none'});
                $('#place').css({display:'block'});
                $('#shan').fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300);
                setTimeout(function () {
                    $('#con').css({display:'block'});
                    $('#place').css({display:'none'});
                },2000)
             }else{
                 var data={
                    content:this.server,
                     userId:this.personal.userId,
                 };
                 this.axios.post('/web/order/add',data).then((res)=>{
                     // console.log(res.data.code);
                     if(res.data.code==10001){
                         this.$message({
                             message: '提交成功,请在个人中心查看进度',
                             type: 'success'
                         });
                     }
                 })
             }
         }

      },
      //关闭
      cloose(){
          this.placeshow=false;
      },
      //注册页面
      res(){
          this.$router.push('/registered')
      },
      //找回密码页面
      results(){
          this.$router.push('/resultPassword')
      },
      cancleback(){
          this.placeshow=false;
      },
      //弹框登录
      gologin(){
          this.axios
              .post("/web/login/login", {
                  mobile: this.username,
                  password: this.pass
              })
              .then(({ data }) => {
                  if (data.code === 10001) {
                      this.loginShow = 2;
                      this.personal = data.data;
                      this.token = data.data.tokenSign;
                      if(data.data.recommendVoList !=null){
                          this.recommendVoList = this.sliceAway(data.data.recommendVoList, 4);
                      }
                      localStorage.setItem("token", data.data.tokenSign);
                      localStorage.setItem("personal", JSON.stringify(data.data));
                      this.placeshow=false;
                      window.location.reload();
                  }
                  if (data.code === 500) {
                      $("#erro").fadeIn(200);
                      setTimeout(function() {
                          $("#erro").fadeOut(200);
                      }, 2000);
                  }
                  // console.log(data)
              });
      },
  },
  components: {
    headNav,
    footerNav
  }
};
</script>
<style lang="less">
.swipers {
  .swiper-pagination {
    .swiper-pagination-bullet {
      background: red;
    }
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .beitong{
   img{
     display: block;
     padding: 0;
     margin: 0;
   }
  }
  input:focus{
    border:1px solid #ff744f;
    outline:none;
  }
  textarea:focus{
    outline:1px solid #ff744f;
  }
  .hello{
    background: #f3f3f3;
  }
.Containers {
  width: 1200px;
  height: auto;
  margin: 0 auto;
}
.swipers {
  width: 1200px;
  height: 400px;
  overflow: hidden;
  margin-top: 15px;
}
.news {
  margin-top: 20px;
  overflow: hidden;
  .new_l {
    width: 818px;
    float: left;
    border:1px solid rgba(217,217,217,1);
    background: #fff;
    .title {

      width: 798px;
      height: 40px;
      cursor: default;
      margin: 10px 10px 0 10px;
      border-bottom:#E53509 2px solid ;
      span{
        display: block;
        margin-left: 20px;
        height: 36px;
        line-height: 36px;
        font-size:16px;
        font-weight:bold;
        color:rgba(224,71,18,1);
        float: left;
      }
      a{
        display: block;
        float: right;
        margin-right: 20px;
        width:42px;
        font-size:12px;
        margin-top: 10px;
        font-weight:400;
        color:rgba(123,123,123,1);
      }
      a:hover{
        color: #E94921;
        border-bottom: 1px solid #E94921;
      }
    }
    .adlist {
      width: 818px;
      height: 256px;
      overflow: hidden;
      margin-top: 10px;
    }
    .addlist {
      width: 796px;
      padding: 0 12px;
      li {
        height: 35px;
        line-height: 35px;
        border-bottom: 1px dashed #c5c5c5;
        font-size: 14px;
        b {
          display: block;
          float: left;
          margin: 13px 10px 13px 6px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 4px 0 4px 4px;
          border-color: transparent transparent transparent #e53509;
        }
        a {
          display: block;
          float: left;
          height: 35px;
          line-height: 35px;
          width: 600px;
          overflow: hidden;
          margin-right: 7px;
          font-size: 14px;
          p {
            float: left;
          }
          i {
            display: block;
            float: left;
            width: 32px;
            height: 16px;
            line-height: 16px;
            background: rgba(229, 53, 9, 1);
            border-radius: 2px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            margin-top: 7px;
            margin-left: 5px;
          }
        }
        span {
          display: block;
          float: right;
          height: 36px;
          line-height: 36px;
          color: #bdbdbd;
        }
      }
      li:hover {
        a {
          color: #e7390a;
        }
      }
    }
  }
  .new_r {
    float: left;
    margin-left: 14px;
    width: 363px;
    border: 1px solid rgba(227, 227, 227, 1);
    .login {
      width: 363px;
      height: 300px;
      background: url("../../static/images/8.png") no-repeat;
      position: relative;
      .erweima {
        width: 35px;
        height: 35px;
        display: block;
        background: url("../../static/images/login.png") no-repeat;
        position: absolute;
        top: 0;
        right: 0;
      }
      h2 {
        padding-top: 27px;
        width: 363px;
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        color: rgba(229, 53, 9, 1);
        margin-bottom: 3px;
      }
      h4 {
        width: 284px;
        height: 36px;
        margin: 0 auto 7px;
        h3 {
          width: 284px;
          height: 36px;
          background: rgba(255, 234, 234, 1);
          border: 1px solid rgba(204, 204, 204, 1);
          border-radius: 2px;
          display: flex;
          align-items: center;
          img {
            margin-left: 15px;
          }
          span {
            margin-left: 13px;
            font-size: 14px;
            font-weight: bold;
            color: rgba(69, 69, 69, 1);
          }
        }
      }

      div {
        width: 284px;
        height: 36px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(227, 227, 227, 1);
        border-radius: 2px;
        margin: 0 auto 16px;
        img {
          display: block;
          float: left;
          margin: 6px;
        }
        input {
          float: left;
          border: none;
          outline: none;
          width: 240px;
          height: 36px;
          line-height: 36px;
          padding: 0 3px;
          font-size: 14px;
          font-weight: 400;
        }
      }
      button {
        display: block;
        width: 284px;
        height: 36px;
        background: rgba(229, 53, 9, 1);
        border-radius: 2px;
        text-align: center;
        border: none;
        outline: none;
        line-height: 36px;
        margin: 0 auto;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      p {
        width: 284px;
        margin: 0 auto;
        height: 30px;
        b.gores {
          cursor: default;
          height: 30px;
          line-height: 30px;
          display: block;
          float: left;
        }
        b:last-child {
          float: right;
        }
      }
      .gores {
        display: block;
        font-size: 14px;
        font-weight: 400;
        color: rgba(41, 93, 211, 1);
        height: 20px;
        line-height: 20px;
        text-align: center;
      }
    }
    .erma {
      h2 {
        height: 72px;
        line-height: 72px;
        text-align: center;
      }
      img {
        display: block;
        width: 131px;
        height: 127px;
        margin: 7px auto;
      }
      .gores {
        height: 69px;
        line-height: 69px;
        font-size: 18px;
        color: #e53509;
      }
    }
    .go {
      width: 363px;
      height: 300px;
      background: url("../../static/images/8.png") no-repeat;
      .heimg {
        user-select: none;
        cursor: pointer;
        padding: 30px 33px 0 20px;
        height: 93px;
        border-bottom: 1px dashed #e3e3e3;
        .yilogo {
          width: 310px;
          height: 48px;
          img {
            display: block;
            float: left;
            width: 48px;
            height: 48px;
          }
          .gemsg {
            float: left;
            margin-left: 12px;
            width: 250px;
            p {
              height: 24px;
              width: 250px;
              overflow: hidden;
              display: flex;
              align-items: center;
              b {
                font-size: 16px;
                font-weight: 400;
                color: rgba(69, 69, 69, 1);
              }
              span {
                margin-left: 11px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(69, 69, 69, 1);
              }
            }
            div {
              height: 24px;
              width: 250px;
              span {
                width: 91px;
                display: block;
                height: 24px;
                line-height: 24px;
                float: left;
                font-size: 14px;
                font-weight: 400;
                color: rgba(69, 69, 69, 1);
                margin-right: 7px;
              }
              button {
                display: block;
                float: left;
                margin-left: 16px;
                outline: none;
                border: none;
                width: 60px;
                height: 24px;
                background: rgba(229, 53, 9, 1);
                border-radius: 2px;
                text-align: center;
                font-size: 12px;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
              }
              button:hover {
                cursor: pointer;
              }
              button.outs {
                background: #cfcfcf;
              }
              button.outs:hover {
                cursor: pointer;
              }
            }
          }
        }
        h5 {
          user-select: none;
          cursor: default;
          padding-top: 11px;
          width: 310px;
          height: 34px;
          line-height: 34px;
          display: flex;
          align-items: center;
          span {
            font-size: 14px;
            font-weight: 400;
            color: rgba(68, 68, 68, 1);
          }
          a {
            margin-left: 10px;
            color: #0060fe;
            font-size: 14px;
            font-weight: 400;
          }
        }
      }
      h4 {
        margin-top: 9px;
        height: 39px;
        margin-left: 20px;
        width: 320px;
        span {
          float: left;
          display: block;
          line-height: 39px;
          height: 39px;
          font-size: 16px;
          font-weight: 400;
          color: rgba(230, 62, 22, 1);
        }
        b {
          cursor: pointer;
          display: block;
          float: right;
          font-size: 12px;
          font-weight: 400;
          color: rgba(137, 137, 137, 1);
          height: 39px;
          line-height: 39px;
        }
      }
      ul {
        margin-left: 20px;
        width: 320px;
        cursor: pointer;
        li {
          height: 30px;
          line-height: 30px;
          cursor: pointer;
          a {
            float: left;
            display: block;
            height: 24px;
            line-height: 24px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 400;
            color: rgba(70, 70, 70, 1);
            width: 235px;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
          }
          span {
            display: block;
            height: 24px;
            line-height: 24px;
            cursor: default;
            font-size: 12px;
            font-weight: 400;
            color: rgba(70, 70, 70, 1);
            float: right;
          }
        }
      }
    }
  }
}
.auto {
  width: 358px;
  height: 448px;
  background: #fff;
  border: 1px solid rgba(227, 227, 227, 1);
  float: left;
  margin-left: 20px;
  p {
    width:338px;
    height: 40px;
    border-bottom: 2px solid #E53509;
    margin: 10px  10px 0 10px;
    span {
      display: block;
      height: 40px;
      line-height: 40px;
      float: left;
      font-size: 16px;
      font-weight: bold;
      color: rgba(233, 73, 33, 1);
      margin-left: 6px;
    }
    a {
      display: block;
      float: right;
      font-size: 12px;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
      margin-top: 12px;
    }
    a:hover{
      color: #E94921;
      border-bottom: 1px solid #E94921;
    }
  }
  ul{
    padding-top: 10px;
    margin: 0 20px;
    width: 325px;
    overflow: hidden;
    li{
      width: 96px;
      margin-top: 23px;
      margin-right: 18px;
      float: left;
      cursor: pointer;
      img{
        width: 96px;
        height: 128px;

      }
      span{
        display: block;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
    li.cc{
      margin-right: 0;
    }
  }
}
.fast {
  height: 318px;
  .tool {
    margin-top: 1px;
    width: 820px;
    height: 31px;
    background: rgba(248, 248, 248, 1);
    p {
      overflow: hidden;
      span {
        display: block;
        float: left;
        height: 31px;
        line-height: 31px;
        margin-left: 17px;
      }
      b {
        display: block;
        float: right;
        margin-right: 78px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(112, 112, 112, 1);
        line-height: 31px;
      }
    }
  }
  .new_l {
    .superstore {
      li {
        height: 35px;
        line-height: 35px;
        > * {
          display: block;
          height: 35px;
          line-height: 35px;
        }
        b {
        }
        a {
          float: left;
          width: 635px;
          overflow: hidden;
        }
        span {
          float: left;
          height: 35px;
          line-height: 35px;
          width: 79px;
          margin-right: 8px;
          margin-top: 0;
        }
        strong.end {
          color: #333;
        }
        strong {
          margin-top: 0;
          height: 35px;
          line-height: 35px;
          float: right;
          font-size: 12px;
          font-weight: 400;
          color: rgba(229, 53, 9, 1);
          margin-right: 14px;
        }
      }
    }
  }
  .Problem {
    height: 316px;
    background: rgba(255, 249, 240, 1);
    h1 {
      margin-top: 7px;
      margin-left: 17px;
      height: 33px;
      line-height: 33px;
      font-size: 16px;
      font-weight: bold;
      color: rgba(233, 73, 33, 1);
    }
    div {
      width: 350px;
      height: 62px;
      margin: 0 9px;
      padding: 15px 0;
      border-bottom: 1px dashed #a1a1a1;
      h4 {
        float: left;
        width: 56px;
        margin-left: 10px;
        height: 62px;
        cursor: pointer;
        img {
          display: block;
          margin: 0 auto;
        }
        span {
          display: block;
          width: 56px;
          line-height: 24px;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          color: rgba(213, 161, 84, 1);
        }
      }

      p {
        float: left;
        height: 62px;
        width: 264px;
        margin-left: 13px;
        line-height: 22px;
        overflow: hidden;
        font-size: 14px;
      }
    }
    div:last-child {
      border-bottom: none;
    }
  }
}
.sudi {
  height: 450px;
  overflow: hidden;
  .su_header {
    span {
      margin-left: 20px;
      color: rgba(112, 112, 112, 1);
    }
    i {
      display: block;
      float: left;
      height: 31px;
      line-height: 31px;
      margin-left: 30px;
      color: rgba(112, 112, 112, 1);
    }
    strong {
      float: left;
      margin-left: 337px;
      height: 31px;
      line-height: 31px;
      color: rgba(112, 112, 112, 1);
    }
    b {
      float: right;
      margin-right: 52px;
      color: rgba(112, 112, 112, 1);
    }
  }
  .new_l {
    ul {
      margin-top: 6px;
      width: 796px;
      height: 321px;
      overflow: hidden;
      padding: 0 13px;
      cursor: default;
      li:hover i {
        color: #e7390a;
        cursor: pointer;
      }
      li {
        height: 36px;
        line-height: 36px;
        border-bottom: 1px dashed #c5c5c5;
        font-size: 14px;
        a {
          display: inline-block;
          width: 100%;
          > * {
            display: block;
            height: 36px;
            float: left;
          }

          b {
            margin-left:3px;
            color: #df4c39;
          }
          b.xu {
            color: #32a49c;
          }
          span:hover {
            color: #e7390a;
            cursor: pointer;
          }
          span {
            margin-left: 12px;
            color: #444444;
            width: 370px;
            overflow: hidden;
          }
          i {
            margin-left: 10px;
            color: #444444;
          }

          strong {
            float: right;
            margin-right: 45px;
            color: #333333;
          }
        }
      }
    }
  }
  .new_r {
    height: 448px;
    .talent {
      height: 448px;
      p {
        height: 45px;
        line-height: 45px;
        span {
          height: 45px;
          line-height: 45px;
        }
        a {
          margin-top: 0;
        }
      }
      ul {
        li {
          width: 96px;
          height: 160px;
          float: left;
          margin-right: 12px;
          margin-bottom: 15px;
          img {
            display: block;
          }
          span {
            display: block;
            height: 32px;
            line-height: 32px;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
        }
        li.cleras {
          margin-right: 0;
        }
      }
    }
  }
}
.fasts{
  height: 448px;
  overflow: hidden;
}
.feng {
  margin-top: 20px;
  .fengcai {
    width:1198px;
    height:513px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(217,217,217,1);
    border-radius:4px;
    p {
      margin:0 13px;
      height: 36px;
      background: #fff;
      border-bottom:  2px solid #E94921;
      > * {
        display: block;
        float: left;
      }
      span {
        font-size: 16px;
        text-align: center;
        font-weight:bold;
        color:rgba(233,73,33,1);
        height: 36px;
        line-height: 36px;
      }
      a {
        float: right;
        font-size: 12px;
        font-weight: 400;
        color: rgba(123, 123, 123, 1);
        margin-top: 10px;
      }
      a:hover{
        color: #E94921;
        border-bottom: 1px solid #E94921;
      }
    }
    ul {
      margin-top: 23px;
      height: 418px;
      padding: 0 15px;
      width: 1168px;
      li {
        margin-top: 5px;
        height: 203px;
        margin-right: 29px;
        width: 210px;
        float: left;
        cursor: pointer;
        div {
          width: 210px;
          height: 160px;
          display: flex;
          align-items: center; /*定义body的元素垂直居中*/
          justify-content: center; /*定义body的里的元素水平居中*/
          img {
            width: 200px;
            height: 150px;
          }
        }
        div.select {
          width: 206px;
          height: 156px;
          border: 2px solid #ff8e1d;
        }

        span {
          display: block;
          height: 43px;
          line-height: 43px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(26, 26, 26, 1);
          text-align: center;
          width: 200px;
          overflow: hidden;
        }
      }
      li.clear_r {
        margin-right: 0;
      }
    }
  }
}
.frend {
  margin-top: 20px;
  width: 1176px;
  padding: 0 12px;
  height: 94px;
  background: #fff;
  border: 1px solid rgba(227, 227, 227, 1);
  overflow: hidden;
  h5 {
    height: 40px;
    border-bottom: 1px dashed #d0cdc8;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
    color: rgba(233, 73, 33, 1);
  }
  p {
    height: 52px;
    line-height: 52px;
    overflow: hidden;
    a {
      display: block;
      float: left;
      margin-right: 30px;
      height: 52px;
      line-height: 52px;
    }
    a:hover {
      color: #e7390a;
    }
  }
}
.footer {
  margin-top: 17px;
}
  .notice,.policy{
    margin-top:30px;
    overflow: hidden;
    margin-bottom: 20px;
  }
.ttl{
  margin-top: 13px;
  width: 100%;
  height:32px ;
  border-bottom: 2px solid rgba(233,73,33,1);
  h4{
    float: left;
    height:32px ;
    line-height: 32px;
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color: #454545;
    padding-left: 20px;
    cursor: pointer;
  }
  h4:last-child{
    margin-left: 30px;
  }
  h4.two{
    color: #E94921;
  }
  a{
    display: block;
    float: right;
    font-size:12px;
    color:rgba(123,123,123,1);
    margin-right: 12px;
    margin-top: 8px;
  }
  a:hover{
    color: #E94921;
   border-bottom: 1px solid #E94921;
  }
}
.new {
  width: 568px;
  padding: 0 10px;
  height: 326px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(217, 217, 217, 1);
  border-radius: 4px;
  float: left;
  .new_top{
    margin: 12px 12px 10px 10px;
    width: 545px;
    height: 100px;
    img{
      display: block;
      width:160px;
      height:100px;
      border-radius:4px;
      float: left;
    }
    .new_right{
      margin-left: 30px;
      width: 345px;
      height: 100px;
      overflow: hidden;
      float: left;
      p{
        cursor: default;
        max-height: 80px;
        line-height: 20px;
        overflow: hidden;
        width: 100%;
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(115,112,108,1);
      }
      span{
        display: block;
        color: #E53509;
        height: 25px;
        line-height: 25px;
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        cursor: pointer;
      }
    }
  }
  ul{
    width: 555px;
    li{
      height: 35px;
      border-bottom: #e3e3e3 1px solid;
      a{
        width: 100%;
        height: 35px;
        b{
          border-top:4px solid transparent;
          border-bottom:4px solid transparent;
          border-left:4px solid #e53509;
          margin: 13px 0 13px 10px;
          float: left;
        }
        span{
          display: block;
          float: left;
          max-width: 390px;
          margin-left: 10px;
          font-size:14px;
          font-weight:400;
          color:rgba(68,68,68,1);
          line-height:36px;
          overflow: hidden;
          white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis;
        }
        i {
          display: block;
          float: left;
          width: 32px;
          height: 16px;
          line-height: 16px;
          background: rgba(229, 53, 9, 1);
          border-radius: 2px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          margin-top: 7px;
          margin-left: 5px;
        }
        em{
          display: block;
          float: right;
          height: 35px;
          line-height: 35px;
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(189,189,189,1);
        }
      }
    }
    li:last-child{
      border-bottom: none;
    }
    li:hover{
      a{
        span{
          color: #e7390a ;
        }
      }
    }
  }
}
.z_cen{
  margin-left: 20px;
}
.notices{
  margin-left: 19px;
  float: left;
  width: 568px;
  padding: 0 10px;
  height: 326px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(217, 217, 217, 1);
  border-radius: 4px;
  .ttl{
    margin-top: 13px;
    width: 100%;
    height:32px ;
    border-bottom: 2px solid rgba(233,73,33,1);
    h4{
      float: left;
      height:32px ;
      line-height: 32px;
      font-size:16px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color:#E94921;
      padding-left: 20px;
    }
    a{
      display: block;
      float: right;
      font-size:12px;
      color:rgba(123,123,123,1);
      margin-right: 12px;
      margin-top: 8px;
    }
    a:hover{
      color: #E94921;
      border-bottom: 1px solid #E94921;
    }
  }
  ul{
    width: 555px;
    li{
      height: 35px;
      border-bottom: #e3e3e3 1px solid;
      a{
        width: 100%;
        height: 35px;
        b{
          border-top:4px solid transparent;
          border-bottom:4px solid transparent;
          border-left:4px solid #e53509;
          margin: 13px 0 13px 10px;
          float: left;
        }
        span{
          display: block;
          float: left;
          max-width: 390px;
          margin-left: 10px;
          font-size:14px;
          font-weight:400;
          color:rgba(68,68,68,1);
          line-height:36px;
          overflow: hidden;
          white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis;
        }
        i {
          display: block;
          float: left;
          width: 32px;
          height: 16px;
          line-height: 16px;
          background: rgba(229, 53, 9, 1);
          border-radius: 2px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          margin-top: 7px;
          margin-left: 5px;
        }
        em{
          display: block;
          float: right;
          height: 35px;
          line-height: 35px;
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(189,189,189,1);
        }
      }
    }
    li:last-child{
      border-bottom: none;
    }
    li:hover{
      a{
        span{
          color: #e7390a ;
        }
      }
    }
  }
}
  .contry{
    overflow: hidden;
    .car{
      width: 588px;
      height: 326px;
      border: 1px solid rgba(217, 217, 217, 1);
      border-radius: 4px;
      float: left;
      margin-left: 20px;
     background: url("../../static/images/111.png") no-repeat #ebf4ff;
      background-position:bottom 0px left 0px;
      .car_top{
        height:47px;
        background:rgba(69,135,255,1);
        border-radius:4px 4px 0px 0px;
        padding: 0 10px;
        h4{
          height:47px;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(255,255,255,1);
          line-height:47px;
          float: left;
        }
        a{
          display: block;
          float: right;
          margin-right: 10px;
         margin-top: 15px;
          width:48px;
          font-size:12px;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
        a:hover{
          color: #E94921;
          border-bottom: 1px solid #E94921;
        }
      }
      p{
        height: 43px;
        line-height: 43px;
        margin-left: 18px;
        font-size:14px;
        font-weight:400;
        color:rgba(255,76,77,1);
      }
      textarea{
        display: block;
        width:460px;
        height:140px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(230,230,230,1);
        margin: 0 auto;
        resize: none;
        outline: none;
        padding: 10px;
        line-height: 28px;
        font-size: 14px;
      }
      textarea:focus{
        outline:1px solid #ff744f;
      }
      .place{
        display: none;
        width:480px;
        height:160px;
        border:2px solid rgba(230,230,230,1);
        margin: 0 auto;
        background: #fff;
        .shan{
          width: 460px;
          height: 140px;
          margin: 10px;
          background: #ffa2a2;
        }
      }
      button{
        margin: 26px auto 0 auto;
        text-align: center;
        width:140px;
        height:36px;
        background:rgba(233,73,33,1);
        box-shadow:0px 4px 7px 0px rgba(255,0,0,0.3);
        border-radius:4px;
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(254,254,254,1);
        line-height:36px;
        outline: none;
        border: none;
        display: block;
        cursor: pointer;
      }
      button:hover{
        background:#e87154 ;
      }

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
