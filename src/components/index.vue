<template>
  <div class="hello">
    <div>
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <!--    轮播图-->
    <div class="Containers">
      <div class="index-notice">
        <div class="noimg">
          <img src="../../static/images/140.png" alt="">
          <span>通知</span>
        </div>
        <div id="scroll_div" class="fl">
          <div id="scroll_begin">
            <router-link v-for="(item,idx) in content.notice " :key="idx"  :to="{path:'/policy/policydetali',query:{id:item.noticeid}}" tag="a">
              <b>●</b> <span>{{item.title}}</span>
            </router-link>
          </div>
          <div id="scroll_end"></div>
        </div>
      </div>
      <div class="swipers">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in content.swiper" :key="index">
            <img :src="item.bigImg" alt @click="item.isLink==1?link(item.url):''" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <!--                  <div class="swiper-button-prev" slot="button-prev"></div>-->
          <!--        <div class="swiper-button-next" slot="button-next"></div>-->
          <!--        <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
        </swiper>
      </div>
      <!--      新闻公告-->
      <div class="notice">
        <div class="new">
          <div class="ttl">
            <h4 >热点新闻</h4>
            <router-link to="/newslist" tag="a">更多>></router-link>
          </div>
          <h3> <span v-for="(item,index) in newcate" :key="index" :class="{'two':index==newcateindex}" @mouseover="changenewindex(index)"><b>{{item}}</b><i>|</i></span></h3>
          <div v-if="newcateindex==0">
            <div class="new_top">
              <img :src="reNew.newsImg" alt="">
              <div class="new_right">
                <p>
                  {{reNew.pressBrief}}
                </p>
                <span @click="gonewint(reNew.newsId)">[阅读]</span>
              </div>
            </div>
            <ul>
              <li v-for="(item,idx) in content.recomendNews" :key="idx">
                <router-link :to="{path:'/newslist/newsdetali',query:{id:item.newsId}}">
                  <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i>
                </router-link>
              </li>

            </ul>
          </div>
          <div v-if="newcateindex==1">
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
                  <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i>
                </router-link>
              </li>

            </ul>
          </div>
          <div v-if="newcateindex==2">
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
                  <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i>
                </router-link>
              </li>
            </ul>
          </div>
          <div v-if="newcateindex==3">
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
                  <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="notices new">
          <div class="ttl">
            <h4 >通知公告</h4>
            <router-link to="/policy" tag="a">更多>></router-link>
          </div>
          <ul>
            <li v-for="(item,idx) in content.noticelist " :key="idx">
              <router-link  :to="{path:'/policy/policydetali',query:{id:item.noticeid}}" tag="a">
                <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!--      政策-->
      <div class="policy">
        <div class="new">
          <div class="ttl">
            <h4 >铜陵政策</h4>
            <router-link  to="/informationMore" tag="a">更多>></router-link>
          </div>
          <ul>
            <li v-for="(item,idx) in content.provincepolicylist">
              <router-link :to="{path:'/information/informationMore/informationdetali',query:{id:item.policyId}}">
                <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="new z_cen">
          <div class="ttl">
            <h4 v-for="(item,idx) in zhengcate" :key="idx" :class="{'two':idx==zhengcataindex}" @mouseover="changezheng(idx)">{{item}}</h4>
            <router-link to="/informationMore" tag="a">更多>></router-link>
          </div>
          <ul v-if="zhengcataindex==0">
            <li v-for="(item,idx) in content.policycitylist">
              <router-link :to="{path:'/information/informationMore/informationdetali',query:{id:item.policyId}}">
                <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i>
              </router-link>
            </li>
          </ul>
          <ul v-if="zhengcataindex==1">
            <li v-for="(item,idx) in content.centerpolicylist">
              <router-link :to="{path:'/information/informationMore/informationdetali',query:{id:item.policyId}}">
                <b></b><span>{{item.title}}</span><i v-if="item.isTop==1">置顶</i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!--      banner-->
      <div class="beitong">
        <img src="../../static/chao/36.png" alt="">
        <img style="float: right" src="../../static/chao/37.png" alt="" @click="goserverFour">
      </div>
      <ul class="tongji">
        <li>
          <span>{{tongji.visitcount}}</span>
          <b>平台累计访问量</b>
        </li>
        <li>
          <span>{{tongji.daycount}}</span>
          <b>今日访问量</b>
        </li>
        <li>
          <span>{{tongji.serviceProducts}}</span>
          <b>提供服务产品</b>
        </li>
        <li>
          <span>{{tongji.serviceOrder}}</span>
          <b>完成服务订单</b>
        </li>
        <li>
          <span>{{tongji.serviceOrderDay}}</span>
          <b>今日服务订单</b>
        </li>
        <li>
          <span>{{tongji.appealHandle}}</span>
          <b>累计处理诉求</b>
        </li>
        <li>
          <span>{{tongji.enterprisePolicy}}</span>
          <b>发布惠企政策</b>
        </li>
      </ul>
      <div class="news ">
        <div class="new_l ">
          <div class="title">
            <span class="sllee">供需速递</span>
            <router-link to="/supplyneedlist" tag="a">更多>></router-link>
          </div>
          <div class="tool su_header">
            <span>供需</span>
            <i>产品</i>
            <strong>数量</strong>
            <b>截止时间</b>
          </div>
          <div class="acacac">
            <ul  id="con1" ref="con1" :class="{anim:animate==true}">
              <li v-for="(item,index)  in content.supplyanddemandlist" :key="index">
                  <b v-if="item.type==1">[供应]</b>
                  <b v-if="item.type==2" class="xu">[需求]</b>
                  <router-link :to="{path:'/supplyneedlist/supplyneeddetail',query:{id:item.supplyanddemandId}}" tag="a">{{item.productname}}</router-link>
                  <i>{{item.number}}</i>
                  <strong>{{clearFen(item.endtime)}}</strong>
              </li>
            </ul>
          </div>
        </div>
<!--        <div class="new-r">-->
<!--          <div class="war" @click="goyijian">-->
<!--            <div class="che">-->
<!--              <div class="as">-->
<!--                <img src="../../static/images/154.png" alt="">-->
<!--                <img src="../../static/images/153.png" alt="">-->
<!--              </div>-->
<!--            </div>-->
<!--            <b>诉求直通车</b>-->
<!--          </div>-->
<!--          <div class="war">-->
<!--            <div class="che">-->
<!--              <div class="as">-->
<!--                <img src="../../static/images/158.png" alt="">-->
<!--                <img src="../../static/images/157.png" alt="">-->
<!--              </div>-->
<!--            </div>-->
<!--            <b>在线审批</b>-->
<!--          </div>-->
<!--          <div class="war" @click="gofaren">-->
<!--            <div class="che">-->
<!--              <div class="as">-->
<!--                <img src="../../static/images/156.png" alt="">-->
<!--                <img src="../../static/images/155.png" alt="">-->
<!--              </div>-->
<!--            </div>-->
<!--            <b>法人服务</b>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div class="news">
        <div class="banner">
          <img src="../../static/images/banner.png" alt />
        </div>
      </div>
      <div class="news chanpin">
        <div class="fengtitle">
          <b>产品列表</b>
        </div>
        <div class="minqi chan">
          <swiper :options="swiperOptions" v-if=" content.companyproductatlaslist.length>1">
            　 <swiper-slide v-for="(item,index) in content.companyproductatlaslist" :key="index">
                 <ul>
                  <li class="ccc" >
                  <div class="tu">
                    <img :src="item.smallImg" alt="">
                  </div>
                  <span>{{item.name}}</span>
                </li>
                 </ul>
                </swiper-slide>
            <!--        <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
          </swiper>
        </div>
      </div>
      <div class="news feng">
        <div class="fengcai">
          <div class="fengtitle">
            <b>民企风采</b>
            <router-link to="/Corporation">更多>></router-link>
          </div>
          <div class="minqi">
            <swiper :options="swiperOptions" v-if="content.companylist.length>1">
              　 <swiper-slide v-for="(item,index) in content.companylist" :key="index">
                <div class="ccc">
                  <div @click="goQi(item.companyId)" >
                    <img :src="item.companyLogo" alt />
                  </div>
                  <span>{{item.companyName}}</span>
                </div>
            </swiper-slide>
              <!--        <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
            </swiper>
          </div>
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
    <div>
      <place  :placeshow="placeshow" :success="success"  @hide="placeshow = false"></place>
    </div>
  </div>
</template>

<script>
  // 引入导航栏
  import headNav from "./headNav";
  import footerNav from "./footer";
  //引入place提示组件
  export default {
    name: "index",
    data() {
      return {
        animate:false,
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
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
          },
          loop: false,
          speed: 800,
          effect: "fade" //切换效果 fade, slider ,cube,"coverflow",flip
        },
        swiperOptions: {
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets"
          },
          autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: true
          },
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          notNextTick: true,
          setWrapperSize: true,
          slidesPerView: 5,
          spaceBetween: 30,
          centeredSlides: true,
          freeMode:true,//true则是自由模式，不会自动贴合滑动位置
          loop: true,
          speed: 800,
          effect: "slider" //切换效果 fade, slider ,cube,"coverflow",flip
        },
        content: {
          notice:'',
          swiper: [],
          TongLingNews: [],
          AnHuiNews:'',
          NationalNews:'',
          policycitylist:'',
          recomendNews:'',
          provincepolicylist:'',
          centerpolicylist:'',
          companyproductatlaslist:'',
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
        newcate:['重点推荐','铜陵新闻','安徽新闻','全国新闻'],
        newcateindex:0,
        //政策分类
        zhengcate:['省厅政策','中央政策'],
        zhengcataindex:0,
        //铜陵新闻第一条
        newsint:'',
        anhuinew:'',
        guonew:'',
        reNew:'',
        server:'',//输入框内容
        success:2,
        placeshow:false,
        timer:'',
        //tongji
        tongji:'',
      };
    },
    created() {
      var that=this;
      //获取本地储存的登录数据
      let status = localStorage.getItem("token");
      //获取缓存个人信息数据
      let ge = localStorage.getItem("personal");
      this.personal = JSON.parse(ge);
      console.log(this.personal);
      if (status == null) {
        this.loginShow = 0;
      } else {
        this.token = status;
        this.loginShow = 2;
        this.axios
          .post("/web/user/recommend", {
            userId :  this.personal.userId,
            token: this.personal.token,
            current: 1,
            size: 4
          })
          .then(({ data }) => {
            if(data.code==10001){
              this.recommendVoList = data.data.records;
            }
          });
      }
      this.axios.post("/web/index/index").then(({ data }) => {
        // console.log( this.content.companylist)
        console.log(data.data);
        this.content.swiper = data.data.bannerList; //轮播图
        this.content.TongLingNews =this.sencted(data.data.TongLingNews);//铜陵新闻
        this.content.AnHuiNews =this.sencted (data.data.AnHuiNews);//安徽新闻
        this.content.NationalNews =this.sencted (data.data.NationalNews);//全国新闻
        this.content.recomendNews=this.sencted(data.data.RecommendNews);//重点推荐新闻
        this.content.provincepolicylist =this.sliceAway( data.data.provincepolicylist,8);//本市政策
        this.content.policycitylist = this.sliceAway(data.data.policycitylist,8);//本省政策
        this.content.centerpolicylist = this.sliceAway(data.data.centerpolicylist,8);//全国政策
        this.content.noticelist = this.sliceAway(data.data.noticelist,8);
        this.content.notice = this.sliceAway(data.data.noticelist,3);
        this.content.areaslist = data.data.areaslist;//园区
        this.content.declarationlist = data.data.declarationlist;
        this.content.supplyanddemandlist = data.data.supplyanddemandlist; //供需
        this.content.abilityarchiveslist = this.sliceAway( data.data.abilityarchiveslist,6); //人才
        this.content.companyproductatlaslist = data.data.companyproductatlaslist;

        this.content.friendLinklist = data.data.friendLinklist; //友联
        this.content.departmentlist = data.data.departmentlist; //在线办理

        //铜陵新闻第一条
        this.newsint=data.data.TongLingNews[0];
        //安徽新闻第一条
        this.anhuinew=data.data.AnHuiNews[0];
        //全国新闻第一条
        this.guonew=data.data.NationalNews[0];
        //重点推荐新闻第一条
        this.reNew=data.data.RecommendNews[0];
        /*
        * 首页统计信息*/
        this.tongji=data.data.statistics;
        this.content.companylist =data.data.companylist; //民企
        this.$nextTick(function () {
          that.timer= setInterval(this.scroll,3000);
          that.ScrollImgLeft();
        })
      });
      //获取重点推荐列表

    },
    destroyed () {
      clearInterval(this.timer);
    },
    methods: {
        //四送一服页面
        goserverFour(){
           this.$router.push('/sisone')
        },
      scroll(){
        let con1 = this.$refs.con1;
        con1.style.marginTop='-40px';
        this.animate=!this.animate;
        var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
        setTimeout(function(){
          that.content.supplyanddemandlist.push(that.content.supplyanddemandlist[0]);
          that.content.supplyanddemandlist.shift();
          con1.style.marginTop='0';
          that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
        },500)
      },
      gofaren(){
        window.open(' http://tl.ahzwfw.gov.cn/bog-bsdt/static/workProcess/components/servicesList.html?subjecttype=C&parentItemtypeName=%u4F01%u4E1A%u5F00%u529E&itemtypeName=%u8BBE%u7ACB%u767B%u8BB0&itemtypeType=GBDFFRQYKB&itemtypeCode=10','_blank')
      },
      //文字横向滚动
      chanpin(i){
        console.log(i)
      },
      ScrollImgLeft(){
        var speed=50;//初始化速度 也就是字体的整体滚动速度
        var MyMar = null;//初始化一个变量为空 用来存放获取到的文本内容
        var scroll_begin = document.getElementById("scroll_begin");//获取滚动的开头id
        var scroll_end = document.getElementById("scroll_end");//获取滚动的结束id
        var scroll_div = document.getElementById("scroll_div");//获取整体的开头id
        scroll_end.innerHTML=scroll_begin.innerHTML;//滚动的是html内部的内容,原生知识!
//定义一个方法
        function Marquee(){
          if(scroll_end.offsetWidth-scroll_div.scrollLeft<=0){
            scroll_div.scrollLeft-=scroll_begin.offsetWidth;
          }
          else{
            scroll_div.scrollLeft++;
          }

        }
        MyMar=setInterval(Marquee,speed);//给上面的方法设置时间  setInterval
//鼠标点击这条公告栏的时候,清除上面的方法,让公告栏暂停
        scroll_div.onmouseover = function(){
          clearInterval(MyMar);
        }
//鼠标点击其他地方的时候,公告栏继续运动
        scroll_div.onmouseout = function(){
          MyMar = setInterval(Marquee,speed);
        }
      },
      goyijian(){
        var status=localStorage.getItem('token');
        if (status==null){
          this.placeshow=true;
        }else {
          // this.$router.push({
          //   path:'/policy',
          //   query:{
          //     cate:3
          //   }
          // })
          const {href} = this.$router.resolve({
            path: '/Antonym',
          });
          window.open(href,'_blank');
        }
      },
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
        return arr.slice(1,6);
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
          for (var i=0;i<this.content.companylist.length;i++){
            this.content.companylist[i].forEach(function(index) {
              _this.$set(index, "active", false);
            });
          }

          this.$set(index, "active", true);
        });
      },
      clearFen(i) {
        return i.substring(0, i.indexOf(" "));
      },
      link(i) {
        window.open(i, "_blank");
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
      footerNav,
    },
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
  .hello{
    background: #fff;
  }
  .new-r{
    width: 360px;
    height: 360px;
    float: right;
    div.war{
      width: 100%;
      height: 100px;
      margin-bottom: 30px;
      background: #f6e199;
      border-radius: 5px;
      transition: all 0.5s;
      .che{
        width: 60px;
        height: 60px;
        margin: 20px 20px 20px 80px;
        float: left;
        overflow: hidden;
        div.as{
          transition: all 1s;
          width: 60px;
          height: 120px;
          img{
            width: 60px;
            height: 60px;
            display: block;
          }
        }
      }
      b{
        display: block;
        float: right;
        width: 150px;
        margin-right: 50px;
        height: 100px;
        font-size: 20px;
        line-height: 100px;
        text-align: center;
        color: #333;
        font-weight: 400;
        transition: all 1s;
        cursor: pointer;
      }
    }
    div.war:last-child{
      margin-bottom: 0;
    }
    div.war:hover{
      background:#e22626 ;
      .as{
        margin-top: -60px;
      }
      b{
        color: #fff;
      }
    }
  }
  .tongji{
    background: linear-gradient(#fff1c4, #fff);
    height: 80px;
    border-top: 2px solid #e22626;
    margin-top: 20px;
    li{
      width: 170px;
      height: 80px;
      float: left;
      span{
        font-weight: bold;
        color: #e22626;
      }
      span,b{
        height: 40px;
        display: block;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
      }
      b{
        font-weight: 400;
      }
    }
  }
  .acacac{
    height: 260px;
    width: 100%;
  }
  .anim{
    transition: all 0.5s;
  }
  #scroll_div {
    height:36px;
    overflow: hidden;
    white-space: nowrap;
    width:1000px;
    line-height: 36px;
    background-color: #fff;
    color: #999999;
    text-align: center;
    float: left;
    margin-left: 30px;
  }
  #scroll_begin,#scroll_end {
    display: inline;
    a{
      line-height: 36px;
      margin-right: 50px;
      font-size: 14px;
      b{
        font-weight: 400;
        color: #333;
        font-size: 14px;
      }
      span{
        color: #666;
      }

    }
    a:hover{
      span{
        border-bottom: 1px solid #e7390a;
      }
    }
    a:last-child{
      margin-right: 1000px;
    }
  }
  .index-notice{
    height: 36px;
    background: #fff;
    line-height: 36px;
    padding: 0 20px;
    border-radius: 5px;
    .noimg{
      float: left;
      overflow: hidden;
      img{
        width: 28px;
        height: 28px;
        display: block;
        float: left;
        margin: 4px 0 4px 5px;
      }
      span{
        display: block;
        height: 30px;
        float: left;
        font-size: 14px;
        cursor: pointer;
        color: #3a8ee6;
        margin-left: 20px;
      }
    }
    .nor{
      float: left;
      height: 30px;
      margin-left: 20px;
      marquee{
        display: inline-block;
        width:1038px;
        height: 30px;
      }

    }
  }
  .beitong{
    overflow: hidden;
    margin-top: 10px;
    img{
      display: block;
      float: left;
      width: 580px;
      height: 64px;
      cursor: pointer;
    }
  }
  input:focus{
    border:1px solid #ff744f;
    outline:none;
  }
  textarea:focus{
    outline:1px solid #ff744f;
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
  }
  .news {
    margin-top: 20px;
    overflow: hidden;
    .new_l {
      width: 100%;
      float: left;
      background: #fff;
      height: 360px;
      overflow: hidden;
      transition: all 0.5s;
      ul {
        margin-top: 6px;
        width:1180px;
        overflow: hidden;
        padding: 0 10px;
        cursor: default;
        li:hover i {
          color: #e7390a;
          cursor: pointer;
        }
        li {
          margin-top: 5px;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          > * {
            display: block;
            height: 40px;
            float: left;
            line-height: 40px;
          }
          b {
            margin-left:3px;
            color: #df4c39;
          }
          b.xu {
            color: #32a49c;
          }
          a:hover {
            color: #e7390a;
            cursor: pointer;
          }
          a {
            margin-left: 20px;
            color: #444444;
            width: 580px;
            margin-right: 20px;
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow: hidden;
          }
          i {
            color: #444444;
            width:200px;
            margin-right: 10px;
          }
          strong {
            float: right;
            margin-right:70px;
            color: #333333;
          }
        }
      }
      .title {
        width: 1180px;
        height: 40px;
        cursor: default;
        margin: 10px 10px 0 10px;
        border-bottom:#ccc 2px solid ;
        span{
          display: block;
          margin-left: 20px;
          height: 36px;
          line-height: 36px;
          font-size:20px;
          font-weight:bold;
          color:#0e0d0d;
          float: left;
        }
        a{
          display: block;
          float: right;
          margin-right: 20px;
          font-size:14px;
          margin-top: 10px;
          font-weight:400;
          color:rgba(123,123,123,1);
        }
        a:hover{
          color: #E94921;
          border-bottom: 1px solid #E94921;
        }
      }
      .su_header {
        background: rgba(248, 248, 248, 1);
        overflow: hidden;
        margin:0 10px;
        position: relative;
        z-index: 999;
        >*{
          height: 36px;
          line-height: 36px;
          font-size: 18px;
          display: block;
          float: left;
        }
        span {
          margin-left: 5px;
        }
        b {
          float: right;
          margin-right: 88px;
          font-weight: 400;
          color: rgba(112, 112, 112, 1);
        }
        i {
          margin-left: 30px;
          color: rgba(112, 112, 112, 1);
        }
        strong {
          margin-left:562px;
          color: rgba(112, 112, 112, 1);
        }
      }
    }
    .new_r {

    }
  }
  .fengtitle {
    height: 42px;
    background: #fff;
    border-bottom:  2px solid #ccc;
    b {
      margin-left: 10px;
      font-size: 18px;
      text-align: center;
      font-weight:bold;
      color:#0e0d0d;
      height: 44px;
      line-height: 44px;
      display: block;
      float: left;
    }
    a {
      float: right;
      font-size: 14px;
      font-weight: 400;
      color: rgba(123, 123, 123, 1);
      margin-top: 10px;
      display: block;
    }
    a:hover{
      color: #E94921;
      border-bottom: 1px solid #E94921;
    }
  }
  .minqi{
    margin-top: 30px;
    padding: 0 30px;
    height: 240px;
    .ccc{
      margin-top: 5px;
      height: 203px;
      margin-right: 19px;
      width: 180px;
      display: inline-block;
      cursor: pointer;
      div {
        width: 180px;
        height: 150px;
        display: flex;
        overflow: hidden;
        align-items: center; /*定义body的元素垂直居中*/
        justify-content: center; /*定义body的里的元素水平居中*/
        img {
          width: 180px;
          height: 150px;
          transition: 1s;
        }
      }
      div:hover{
        img{
          transform: scale(1.2);
        }
      }
      span {
        display: block;
        height: 43px;
        line-height: 43px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(26, 26, 26, 1);
        text-align: center;
        overflow: hidden;
      }
    }
  }
  .feng {
    margin-top: 20px;
    .fengcai {
      width:1198px;
      background:rgba(255,255,255,1);
      border-radius:4px;

    }
  }
  .chanpin{
    height: 310px;
    .chan li {
      margin-right: 15px;
      span{
        height: 30px;
        line-height: 30px;
        text-align: left;
        background: #f2f2f2;
        margin-top: 3px;
        padding:0 10px;
      }
    }
  }
  .lvshi{
    ul{
      padding: 0;
      li {
        width: 120px;
        img{
          width: 120px;
          height: 150px;
        }
      }
      li:hover{
        img{
          transform: none;
        }
      }
    }
  }
  .frend {
    margin-top: 20px;
    width: 1200px;
    height: 94px;
    background: #fff;
    overflow: hidden;
    h5 {
      height: 40px;
      border-bottom: 2px solid #ccc;
      line-height: 40px;
      font-size: 18px;
      font-weight: bold;
      padding-left: 10px;
      color: #0e0d0d;
    }
    p {
      height: 52px;
      line-height: 52px;
      overflow: hidden;
      padding-left: 20px;
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
    margin:20px 0;
    overflow: hidden;
  }
  .ttl{
    margin-top: 13px;
    width: 100%;
    height:42px ;
    border-bottom: 2px solid #ccc;
    h4{
      float: left;
      height:42px ;
      line-height: 42px;
      font-size:20px;
      font-weight:bold;
      color: #0e0d0d;
      padding-left: 10px;
      cursor: pointer;
    }
    h4.two{
      color: #E94921;
    }
    h4:last-child{
      margin-left: 30px;
    }
    a{
      display: block;
      float: right;
      font-size:14px;
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
    padding: 0 10px;
    width: 568px;
    height: 450px;
    float: left;
    background: #fff;
    h3{
      width: 100%;
      height: 30px;
      background: #f2f2f2;
      margin-top: 10px;
      span{
        display: block;
        float: left;
        font-size: 16px;
        overflow: hidden;
        margin-left: 10px;
        line-height: 30px;
        b{
          display: block;
          float: left;
          font-size: 16px;
          line-height: 30px;
          font-weight: 400;
          color: #4e4e4e;
          cursor: pointer;
        }
        i{
          display: block;
          float: left;
          font-size: 16px;
          margin-left: 10px;
          line-height: 30px;
          color: #4e4e4e;
        }
      }
      span.two{
        b{
          color: #E94921;
        }
      }
      span:last-child{
        border-right: none;
        i{
          display: none;
        }
      }
    }
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
          line-height: 28px;
          overflow: hidden;
          width: 100%;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(115,112,108,1);
        }
        span{
          display: block;
          color: #E53509;
          height: 25px;
          line-height: 25px;
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          cursor: pointer;
        }
      }
    }
    ul{
      width: 555px;
      li{
        margin-top: 5px;
        height: 40px;
        a{
          width: 100%;
          height: 40px;
          overflow: hidden;
          b{
            border-top:4px solid transparent;
            border-bottom:4px solid transparent;
            border-left:4px solid #e53509;
            margin: 16px 0 16px 10px;
            float: left;
          }
          span{
            display: block;
            float: left;
            max-width: 480px;
            margin-left: 10px;
            font-size:16px;
            font-weight:400;
            height: 40px;
            color:rgba(68,68,68,1);
            line-height:40px;
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
        }
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
  .notice .notices{
    margin-left: 19px;
    float: left;
    width: 573px;
    li{
      margin-top: 8px;
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
