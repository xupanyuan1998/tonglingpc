<template>
  <div class="hello">
    <div>
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="warp">
      <div class="news yuan">
        <div class="new_l">
          <div class="title">
            <h5>铜陵民企之星</h5>
            <p>
              <router-link tag="a" to="/Corporation/Corporationlist">更多>></router-link>
            </p>
          </div>
          <div class="tu">
            <swiper :options="swiperOptionsa" v-if="content.companylist.length>1">
              　 <swiper-slide v-for="(item,index) in content.companylist" :key="index">
              <ul>
                <li  v-for="(items,idx) in item " :key="idx" @click="goQi(items.companyId)"    @mouseover="fengSl(item)"><div><img :src="items.companyLogo" alt=""> <span>{{items.companyName}}</span></div></li>
              </ul>
            </swiper-slide>
              <!--        <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
            </swiper>
          </div>
        </div>
        <div class="new_r">
          <div class="auto">
            <p>
              <span>企业名录检索</span>
            </p>
            <div class="bu">
              <div class="bu_l">
                <span>按产业:</span>
              </div>
              <ul class="bu_r">
                <li v-for="(item,idx) in content.industrylist" @click="chanS1(item)" :class="item.active?'selec':''">{{item.name}}</li>
              </ul>
            </div>
            <div class="bu">
              <div class="bu_l">
                <span>按规模:</span>
              </div>
              <ul class="bu_r">
                <li v-for="(item,idx) in content.scalelist" @click="chanS2(item)" :class="item.active?'selec':''">{{item.name}}</li>
              </ul>
            </div>
            <div class="bu">
              <div class="bu_l">
                <span>按地区:</span>
              </div>
              <ul class="bu_r">
                <li v-for="(item,idx) in content.regionlist" @click="chanS3(item)" :class="item.active?'selec':''">{{item.name}}</li>
              </ul>
            </div>
            <div class="search"><span>企业名称:</span><input type="text" v-model="sousuo" /></div>
            <button @click="gomyspace">检索</button>
          </div>
        </div>
      </div>
      <div class="comp">
        <div class="gong">
          <span>供需广场</span>
          <p><b v-for="(item,idx) in gongXu" :key="idx" :class="idx==gong?'slerr':''" @mouseover="gongyi(idx)">{{item}}</b></p></div>
        <p class="tit">
          <b>供应</b><span>产品</span><i>数量</i><strong>截止时间</strong>
        </p>
        <div class="acacac">
          <ul  id="con1" ref="con1" :class="{anim:animate==true}">
            <li v-for="(item,index)  in content.supplyanddemandlist" :key="index">
                <b v-if="item.type==1">[供应]</b>
                <b v-if="item.type==2" class="xu">[需求]</b>
                <router-link :to="{path:'/supplyneedlist/supplyneeddetail',query:{id:item.supplyanddemandId}}">{{item.productname}}</router-link>
                <i>{{item.number}}</i>
                <strong>{{clearFen(item.endtime)}}</strong>
            </li>
          </ul>
        </div>
      </div>
      <div class="qixin">
        <div class="xin">
          <div class="xiny"><span>信用查询</span><p><b v-for="(item,idx) in xinyongS" :key="idx" :class="idx==xinSle?'slerr':''" @mouseover="xinyi(idx)">{{item}}</b></p></div>
          <div class="cacaca">
           <b>行政相对人名称</b><span>行政相对人代码</span><i>许可机关</i><strong>许可决定日期</strong>
          </div>
          <ul>
            <li v-for="(item,idx) in content.companycreditlist"><b>{{item.administrativeName}}</b><span>{{item.licensing}}</span><i>{{item.mechanism}}</i><strong>{{clearFen(item.punishTime)}}</strong></li>
          </ul>
        </div>
        <div class="cha">
          <h4><span>查询企业</span></h4>
          <h2>企业全称:</h2>
          <input type="text">
          <button>查询</button>
          <p>企业信用数据来自****，如发现数据不准确，请联系我们纠正。</p>
        </div>
      </div>
      <div class="rencai">
        <div class="you"><span>产品列表</span></div>
        <div class=" minqi">
          <swiper :options="swiperOptions" v-if="content.companyproductatlaslist.length>1">
            　 <swiper-slide v-for="(item,index) in content.companyproductatlaslist" :key="index">
              <div class="ccc"  >
                <div class="tu">
                  <img :src="item.smallImg" alt="">
                </div>
                <span>{{item.name}}</span>
              </div>
          </swiper-slide>
            <!--        <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
          </swiper>
        </div>
      </div>
      <div class="rencai">
        <div class="you"><span>优秀人才</span></div>
        <div class="lvshi">
          <swiper :options="swiperOption" v-if="arrlist.length>1">
            　 <swiper-slide v-for="(item,index) in arrlist" :key="index">
                <div class="ren">
                  <div><img :src="item.headImg" alt=""></div>
                  <span>{{item.name}}</span>
                </div>



              </swiper-slide>
            <!--        <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
          </swiper>
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
    import $ from 'jquery'
    export default {
        name: "Corporation",
        data () {
            return {
              arrlist:[],
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 6,
                content:{
                    companylist:'',
                    supplyanddemandlist:'',
                    companycreditlist:'',
                    abilityarchiveslist:'',
                    industrylist:'',
                    scalelist:'',
                    regionlist:'',
                  chanpinList:'',
                   companyproductatlaslist:''
                },
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
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                notNextTick: true,
                setWrapperSize: true,
                slidesPerView: 7,
                spaceBetween: 30,
                centeredSlides: true,
                freeMode:true,//true则是自由模式，不会自动贴合滑动位置
                loop: true,
                speed: 800,
                effect: "slider" //切换效果 fade, slider ,cube,"coverflow",flip
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
              swiperOptionsa: {
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
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: true,
                freeMode:true,//true则是自由模式，不会自动贴合滑动位置
                loop: true,
                speed: 800,
                effect: "slider" //切换效果 fade, slider ,cube,"coverflow",flip
              },
                xinyongS:['行政许可','行政处罚','红榜名单','黑榜名单'],
                gongXu:['供应','需求'],
                xinSle:0,
                renSle:0,
                gong:0,
                chan1:0,
                chan2:0,
                chan3:0,
                serachs:{
                    chan:'',
                    gui:'',
                    di:'',
                },
              sousuo:'',
              animate:false,
              timer:null
            }
        },
        created(){
          var that=this;
            this.axios.post('/web/company/index').then(({data})=>{
                var qilist=data.data.companylist;//民企之星
                this.content.supplyanddemandlist=data.data.supplyanddemandlist;//供需广场
                this.content.companycreditlist=this.sliceArr(data.data.companycreditlist,6);//企业信用
                this.content.regionlist=this.addactive(data.data.regionlist);//地区
                this.content.scalelist=this.addactive(data.data.scalelist);//规模
                this.content. industrylist=this.addactive(data.data.industrylist);//产业
                var arr=data.data.abilityarchiveslist;
                //、
              this.content.companylist=this.group(qilist,2);
                var arr1=[];
                arr.map(function (value,index,arr) {
                    arr1=arr1.concat(value);
                });
              this.arrlist=arr1;
              this.content.companyproductatlaslist = data.data.productAtlaslist;//产品
              this.$nextTick(function () {
               that.timer=setInterval(this.scroll,3000);
              });
                // this. serachs.chan=data. industrylist[0].categoryId;//产业默认id
                // this. serachs.gui=data. scalelist[0].categoryId;//规模默认id
                // this. serachs.di=data. regionlist[0].categoryId;//产业默认id
            })
        },
      destroyed () {
        clearInterval(this.timer);
      },
        methods: {
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
            gomyspace() {
                // this.$router.push('/Corporation/Corporationlist');
                var data=this.serachs;
                var str='';
                for (var i in data){
                  if(data[i]!=''){
                    str+=data[i]+',';
                    console.log(data[i])
                  }
                }
                this.$router.push({
                    path:'/Corporation/Corporationlist',
                    query: {
                      id:str,
                      sousuo:this.sousuo
                    }
                })
            },
            //截取数组
            sliceArr(arr, i) {
                return arr.slice(0, i)
            },
            fengSl(index) {
                var _this = this;
                this.$nextTick(function () {
                    this.content.companylist.forEach(function (index) {
                        _this.$set(index, 'active', false);
                    });
                    this.$set(index, 'active', true);
                });
            },
            //企业详情
            goQi(i){
                this.$router.push({path:'/Corporation/myspace',query:{
                        id:i
                    }})
            },
            clearFen(i){
                return i.substring(0,i.indexOf(' '))
            },
            gongyi(i){
                let type='';
                this.gong=i;
                if(i==0){
                    type=1;
                }else if(i==1){
                    type=2;
                }else if(i==2){
                    type='';
                }
                this.axios.post('/web/company/list',{type:type}).then(({data})=>{
                    console.log(data.data);
                    this.content.supplyanddemandlist=this.sliceArr(data.data,5);//供需广场
                })
            },
            xinyi(i){
                this.xinSle=i;
            },
            renyi(i){
                this.renSle=i;
                let type='';
                if(i==4){
                    type='';
                }else{
                    type=i+1;
                }
                this.axios.post('/web/company/abilityarchiveslist',{type:type}).then(({data})=>{
                    this.content.abilityarchivesList=this.sliceArr(data.data,8);//人才
                })
            },
            //产业选中
            chanS1(index){
                this.$nextTick(function () {
                    var arr=this.content. industrylist;
                    this.addactive(arr);
                    this.$set(index,'active',true);
                    this.serachs.chan=index.categoryId;
                });
            },
            //规模选中
            chanS2(index){
                this.$nextTick(function () {
                    var arr= this.content.scalelist;
                    this.addactive(arr);
                    this.$set(index,'active',true);
                    this.serachs.gui=index.categoryId;
                });
            },
            //地区选中
            chanS3(index){
                this.$nextTick(function () {
                    var arr=this.content.regionlist;
                    this.addactive(arr);
                    this.$set(index,'active',true);
                    this.serachs.di=index.categoryId;
                });
            },
            //添加选中
            addactive(arr){
               for (let i=0;i<arr.length;i++){
                   arr[i].active=false;
               }
               return arr
            },
          //将数组分为2个一组
          group(array, subGroupLength) {
            let index = 0;
            let newArray = [];
            while(index < array.length) {
              newArray.push(array.slice(index, index += subGroupLength));
            }
            return newArray;
          }
        },
      components:{
            headNav,
            footerNav
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  .lvshi{
    padding: 30px 20px;
      .ren {
        width: 120px;
        div{
          width: 120px;
          height: 150px;
          overflow: hidden;
          img{
            display: block;
            width: 100%;
            height: 100%;
            transition: all 0.5s;
          }
        }

        span{
          text-align: center;
          display: block;
          height: 28px;
          font-size: 18px;
          margin-top: 10px;
          line-height: 28px;
        }
      }
      .ren:hover{
        img{
          transform: scale(1.2);
        }
      }
  }
  .cacaca{
    width: 100%;
    height: 35px;
    line-height: 35px;
    border-bottom: 1px dashed #e6e6e6;
    background: #f5f5f5;
    margin-top: 10px;
    >*{
      display: block;
      float: left;
      height: 35px;
      line-height: 35px;
      overflow: hidden;
      font-weight:bold;
    }
    b{
      width: 211px;
      font-size:14px;
      font-weight:400;
      color:rgba(69,69,69,1);
      margin-left: 20px;
    }
    span{
      margin-left: 20px;
      width:200px;
      font-size:14px;
      font-weight:400;
      color:rgba(69,69,69,1);
    }
    i{
      margin-left: 20px;
      width:200px;
      font-size:14px;
      font-weight:400;
      color:rgba(69,69,69,1);
    }
    strong{
      float: right;
      font-size:14px;
      font-weight:400;
      color:rgba(69,69,69,1);
      margin-right: 39px;
    }
  }
  .anim{
    transition: all 0.5s;
  }
  .hello{
    background: #fff;
  }
  .warp{
    width: 1200px;
    margin: auto;
    .news{
      margin-top: 15px;
      overflow: hidden;
      .new_l{
        width: 808px;
        float: left;
        background: #fff;
        .title{
          margin-top: 10px;
          height: 36px;
          background: #fff;
          border-bottom: 2px solid #ccc;
          h5{
            width:126px;
            height:36px;
            float: left;
            font-size:16px;
            font-weight:bold;
            color:#0e0d0d;
            margin-left: 10px;
            line-height: 36px;
          }
          p{
            float: right;
            height: 36px;
            margin-right: 10px;
            span{
              display: block;
              float: left;
              height: 36px;
              line-height: 36px;
              margin-left: 29px;
              font-size:16px;
              font-weight:400;
              color:rgba(76,76,76,1);
            }
            a{
              display: block;
              float: right;
              margin-right: 5px;
              margin-top: 10px;
              font-size:12px;
              font-weight:400;
              color:rgba(123,123,123,1);
            }
            a:hover{
              border-bottom: 1px solid rgba(123,123,123,1);
            }

          }
        }
        .adlist{
          width: 820px;
          height:268px;
          overflow: hidden;
          margin-top: 10px;
          background: #fff;
        }
        .addlist{
          width: 796px;
          background: #fff;
          padding:  0 12px;
          li{
            height: 35px;
            line-height: 35px;
            border-bottom: 1px dashed #c5c5c5;
            font-size: 14px;
            b{
              display: block;
              float: left;
              margin: 13px 10px 13px 6px;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 4px 0 4px 4px;
              border-color: transparent transparent transparent #e53509;
            }
            a{
              display: block;
              float: left;
              height: 35px;
              line-height: 35px;
              width: 600px;
              overflow: hidden;
              margin-right: 7px;
              p{
                float: left;
              }
              i{
                display: block;
                float: left;
                width:32px;
                height:16px;
                line-height: 16px;
                background:rgba(229,53,9,1);
                border-radius:2px;
                font-size:12px;
                font-weight:400;
                color:rgba(255,255,255,1);
                text-align: center;
                margin-top: 7px;
                margin-left: 5px;
              }
            }

            span{
              display: block;
              float: right;
              height: 36px;
              line-height: 36px;
              font-size: 12px;
              color: #bdbdbd;
            }
          }
          li:last-child{
            border-bottom: none;
          }
        }
      }
      .new_r{
        float: left;
        background: #fff;
        margin-left: 23px;
        width:363px;
        .auto{
          height: 382px;
          background: #fff;
          p{
            padding-top: 10px;
            width:361px;
            height:36px;
            border-bottom: 2px solid #ccc;
            span{
              display: block;
              float: left;
              width:120px;
              height:36px;
              text-align: center;
              line-height: 36px;
              font-size:16px;
              font-weight:bold;
              color:#0e0d0d;
            }
            a{
              display: block;
              float: right;
              margin-right: 18px;
              margin-top: 10px;
              font-size:12px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(123,123,123,1);
            }
            a:hover{
              border-bottom: 1px solid rgba(123,123,123,1);
            }
          }
          .bu{
            cursor: default;
            width: 300px;
            margin-left: 20px;
            margin-top: 17px;
            border-bottom: 1px dashed #E6E6E6;
            overflow: hidden;
            .bu_l{
              float: left;
              margin-right: 18px;
              width: 50px;
              span{
                display: block;
                height:42px;
                line-height: 42px;
                width:53px;
                font-size:16px;
                font-weight:400;
                color:rgba(69,69,69,1);
              }
            }
            .bu_r{
              width:230px;
              float: left;
              li{
                cursor: pointer;
                float: left;
                height:26px;
                line-height: 26px;
                text-align: center;
                margin-right: 9px;
                font-size:14px;
                font-weight:400;
                color:rgba(69,69,69,1);
                margin-bottom: 7px;
                margin-top: 7px;
                padding: 0 5px;
              }
              li.selec{
                background:rgba(232,73,33,1);
                color: #fff;
              }
              li:hover{
                background:rgba(232,73,33,1);
                color: #fff;
              }
            }
          }
          .search{
            margin: 35px 0 17px 20px;
            width: 300px;
            height: 35px;
            span{
              display: block;
              float: left;
              height: 35px;
              line-height: 35px;
              font-size:16px;
              font-weight:400;
              color:rgba(115,115,115,1);
            }
            input{
              display: block;
              outline: none;
              height: 33px;
              float: left;
              line-height: 33px;
              width:195px;
              margin-left: 10px;
              border:1px solid rgba(128,128,128,1);
             padding: 0 10px;
            }
            input:focus{
              border:1px solid #ff744f;
              outline:none;
            }
          }
          button{
            display: block;
            outline: none;
            border: none;
            margin-left: 158px;
            width:94px;
            height:26px;
            background:rgba(232,57,10,1);
            border-radius:4px;
            font-size:16px;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
          button:hover{
            background: #f36038;
          }
        }
      }
    }
    .yuan{
      .new_l{
        height: 382px;
      }
      .tu{
        margin-top: 13px;
        width:100%;
        overflow: hidden;
        ul{
          width: 183px;
          padding: 0 10px;
          overflow: hidden;
        }
        li{
          cursor: pointer;
          width:183px;
          height:130px;
          border:1px solid rgba(227,227,227,1);
          float: left;
          margin-right: 16px;
          margin-bottom: 26px;
          div{
            width: 175px;
            height: 122px;
            margin: 3px;
            position: relative;
            overflow: hidden;
            img {
              width: 175px;
              height: 122px;
              transition: 1s;
              position: absolute;
              top: 0;
              left: 0;
            }
            span{
              display: block;
              width:165px;
              height:30px;
              padding: 0 5px;
              background:rgba(0,0,0,1);
              opacity:0.65;
              position: absolute;
              z-index: 2;
              bottom: 0;
              font-size:12px;
              line-height: 30px;
              font-weight:400;
              color:rgba(255,255,255,1);
              text-align: center;
              overflow: hidden;
            }
          }
        }
        li.clear_r{
          margin-right: 0;
        }
        li.clect{
          width:181px;
          height:128px;
          border: 2px solid #ff8e1d;
        }
        li:hover{
          img{
            transform: scale(1.3);
          }
        }
      }
    }
    .comp{
      height:300px;
      background:#fff;
      margin-top: 20px;
      overflow: hidden;
      .gong{
        height:36px;
        border-bottom: 2px solid #ccc;
        span{
          display: block;
          float: left;
          width:120px;
          height:36px;
          line-height: 36px;
          font-size:16px;
          font-weight:bold;
          margin-left: 10px;
          color:#0e0d0d;
        }
        p{
          cursor: default;
          float: right;
          margin-right: 21px;
          b{
            cursor: pointer;
            display: block;
            float: left;
            border-right:2px solid #0e0d0d ;
            padding-right: 10px;
            margin-left: 10px;
            margin-top: 8px;
            font-size: 16px;
            font-weight: 400;
            color: #454545;
          }
          b:last-child{
            border: none;
            padding-right: 0;
          }
          b.slerr{
            color: #E8390A;
          }
        }
      }
      .acacac{
        width: 100%;
        height: 200px;
      }
      .tit{
        background:rgba(245,245,245,1);
        padding-left: 20px;
        margin-top: 10px;
        overflow: hidden;
        position: relative;
        z-index: 999;
        >*{
          display: block;
          float: left;
          height: 40px;
          line-height: 40px;
          color:#707070;
          font-size:14px;
          font-weight:400;
          overflow: hidden;
        }
        b{
          width: 100px;
        }
        span{
          margin-left: 24px;
          width: 420px;
        }
        i{
          width: 300px;
          margin-left: 20px;
        }
        strong{
          float: right;
          overflow: hidden;
          margin-right: 93px;
        }
      }
      ul{
        margin-left: 20px;
        width: 1095px;
        li{
          height: 40px;

          >*{
            display: block;
            float: left;
            height: 35px;
            line-height: 35px;
        }
          b{
            width: 100px;
            overflow: hidden;
            font-size:14px;
            font-weight:400;
            color:rgba(223,76,57,1);
            line-height:36px;
          }
          b.xu{
            color: #32A49C;
          }
          a{
            margin-left: 24px;
            width: 420px;
            overflow: hidden;
            font-size:14px;
            font-weight:400;
            color:rgba(68,68,68,1);
            line-height:36px;
            cursor: pointer;
          }
          i{
            width: 300px;
            margin-left: 20px;
            overflow: hidden;
            font-size:14px;
            font-weight:400;
            color:rgba(69,69,69,1);
          }
          strong{
            float: right;
            font-size:12px;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:36px;
          }
        }
        li:hover{
          a,span,i{
            color: #e7390a;
          }
        }
        li:last-child{
          border-bottom: none;
        }
      }
    }
    .qixin{
      margin-top: 20px;
      overflow: hidden;
      .xin{
        float: left;
        width:811px;
        height:289px;
        background:rgba(255,255,255,1);
        cursor: default;
        .xiny{
          height:36px;
          border-bottom: 2px solid #ccc;
          span{
            margin-left: 10px;
            display: block;
            float: left;
            width:120px;
            height:36px;
            line-height: 36px;
            font-size:16px;
            font-weight:bold;
            color:#0e0d0d;
          }
          p{
            float: right;
            margin-right: 21px;
            font-size: 16px;
            b{
              cursor: pointer;
              display: block;
              float: left;
              border-right:2px solid #E8390A ;
              padding-right: 10px;
              margin-left: 10px;
              margin-top: 8px;
              font-weight: 400;
              color: #454545;
            }
            b:last-child{
              border: none;
              padding-right: 0;
            }
            b.slerr{
              color: #E8390A;
            }
          }
        }
        ul{
          width: 738px;
          margin-left: 20px;
          overflow: hidden;
          li{
            height: 40px;
            line-height: 40px;
            >*{
              display: block;
              float: left;
              height: 40px;
              line-height: 40px;
              overflow: hidden;
            }
            b{
              width: 211px;
              font-size:14px;
              font-weight:400;
              color:rgba(69,69,69,1);
            }
            span{
              margin-left: 20px;
              width:200px;
              font-size:14px;
              font-weight:400;
              color:rgba(69,69,69,1);
            }
            i{
              margin-left: 20px;
              width:200px;
              font-size:14px;
              font-weight:400;
              color:rgba(69,69,69,1);
            }
            strong{
              float: right;
              font-size:12px;
              font-weight:400;
              color:rgba(69,69,69,1);
            }
          }
          li:last-child{
            border: none;
          }
        }
      }
      .cha{
        width:363px;
        height:289px;
        float: left;
        margin-left: 20px;
        background: #fff;
        h4{
          width:362px;
          height:36px;
          border-bottom: 2px solid #ccc;
          span{
            display: block;
            width:120px;
            height:36px;
            font-size:16px;
            font-weight:bold;
            color:#0e0d0d;
            margin-left: 10px;
            line-height: 36px;
          }
        }
        h2{
          margin-left: 30px;
          width: 100px;
          height: 48px;
          line-height: 48px;
          font-size:16px;
          font-weight:400;
          color:rgba(69,69,69,1);
        }
        input:focus{
          border:1px solid #ff744f;
          outline:none;
        }
        input{
          display: block;
          width:280px;
          height:34px;
          border:1px solid rgba(128,128,128,1);
          margin-left: 30px;
          line-height: 34px;
          padding:  0 10px;
          margin-bottom: 10px;
          outline: none;
        }
        button{
          cursor: pointer;
          margin:  0 auto;
          display: block;
         outline: none;
          border: none;
          width:94px;
          height:26px;
          background:rgba(232,57,10,1);
          border-radius:4px;
          font-size:16px;
          font-weight:400;
          color:rgba(255,254,254,1);
        }
        button:hover{
          background: #f36038;
        }
        p{
          cursor: default;
          margin-left: 50px;
          width: 262px;
          height:33px;
          font-size:16px;
          font-weight:400;
          color:rgba(189,189,189,1);
          margin-top: 20px;
        }
      }
    }
    .rencai{
      margin-top: 20px;
      background: #fff;
      padding-bottom: 20px;
      .you{
        height:36px;
        border-bottom: 2px solid #ccc;
        span{
          display: block;
          float: left;
          width:120px;
          height:36px;
          line-height: 36px;
          margin-left: 10px;
          font-size:16px;
          font-weight:bold;
          color:#0e0d0d;
        }
        p{
          cursor: default;
          float: right;
          margin-right: 21px;
          font-size: 16px;
          b{
            cursor: pointer;
            display: block;
            float: left;
            border-right:2px solid #E8390A ;
            padding-right: 10px;
            margin-left: 10px;
            margin-top: 8px;
            font-weight: 400;
            color: #454545;
          }
          b:last-child{
            border: none;
            padding-right: 0;
          }
          b.slerr{
            color: #E8390A;
          }
        }
      }
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
      .minqi{
        margin-top: 30px;
      }
    }
  }
  .footer{
    margin-top: 17px;
  }
</style>
