<!--
<template>
  <div>
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="con"></div>
    <div class="warp" id="warp">
      <button style="display: none" @click="launchFullscreen(element)">全屏</button>
      <div class="left">
        <h1><span>地理位置</span></h1>
        <div class="cont" id="container">
        </div>
        <ul>
          <li v-for="(item,idx) in cateList" :class="idx==cla?'sec':''" @click="select(idx)">{{item}}</li>
        </ul>
      </div>
      <div class="right">
        <div class="top">
          <h2><span>本月指标</span></h2>
          <div class="content">
            <ul>
              <li><span>访客数量:</span><b>561</b></li>
              <li><span>工单数量:</span><b>235</b></li>
              <li><span>办结数量:</span><b>121</b></li>
            </ul>
            <div>
              <strong>留言/反馈:</strong>
              <p>正常情况下，HIF一方面不断产生，另一方面不断降解。是非常浪费资源的，一般情况下现。</p>
            </div>
          </div>
        </div>
        <div class="all">
          <h2><span>总体指标</span></h2>
          <ul>
            <li><span>检测区域：</span><b>枞阳县</b></li>
            <li><span>园区数量：</span><b>5</b></li>
            <li><span>项目总数：</span><b>10</b></li>
            <li><span>服务企业：</span><b>15</b></li>
            <li><span>工单数量：</span><b>20</b></li>
            <li><span>好评数量：</span><b>50</b></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer">
      <footer-nav></footer-nav>
    </div>
  </div>
</template>

<script>
    import headNav from "../header";
    import footerNav from "../footer"
    //在页面中引入高德地图
    export default {
        name: 'order',
        components: {
            headNav,
            footerNav
        },
        data() {
            return {
                toptitle: '铜陵市民营经济云服务在线检测系统',
                clectnav: 5,
                map: '',
                infoWindow: '',
                marker: '',
                markes: [],
                n: '',
                element: '',
                cateList: ['待办工单', '园区分布', '企业分布', '工单办理', '用水服务', '用气服务', '用电服务', '民星企业'],
                cla: 0
            }
        },
        created() {
            this.$nextTick(function () {
                this.element = document.getElementById('warp');
            })
        },
        mounted() {
            var that = this;
            this.map = new AMap.Map('container', {
                zoom: 9
            });
            this.infoWindow = new AMap.InfoWindow({
                isCustom: true,
                offset: new AMap.Pixel(103, 100),
                content: ""
            });
            // let   arr=[{j:113.65912903759764,w:34.74606634973564},{j:113.60273827526854,w:34.79126106664183},{j:113.60488404248045,w:113.60488404248045}];
            //    for(var i=0; i<arr.length;i++){
            //        let arr1=[arr[i].j,arr[i].w];
            //
            //        that.marker = new AMap.Marker({
            //            iconStyle: '//webapi.amap.com/theme/v1.3/markers/b/mark_r.png',
            //            position:  arr1,
            //            zIndex: 101,
            //            map:that.map
            //        });
            //        that.marker.on('click', function(e){
            //            console.log(that.infoWindow);
            //            that.infoWindow.setContent("<ul><li>sadgfsg</li></ul>");
            //            that.infoWindow.open(that.map, e.lnglat);
            //        });
            //        that.marker.setMap(that.map);
            //    }
        },
        methods: {
            //進入全屏
            launchFullscreen(element) {
                //此方法不可以在異步任務中執行，否則火狐無法全屏
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                } else if (element.oRequestFullscreen) {
                    element.oRequestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullScreen();
                } else {
                    document.IsFullScreen = true;
                }
            },
            select(i) {
                this.map.remove(this.markes);
                this.cla = i;
                let arr = [[113.65912903759764, 34.74606634973564],
                    [113.60273827526854, 34.79126106664183]
                    , [113.611194, 34.801869]];
                if (i == 0) {
                    this.addCoordinates(arr)
                }
                if (i == 1) {
                    var positions = [[116.405467, 39.907761], [116.415467, 39.907761], [116.415467, 39.917761], [116.425467, 39.907761],
                        [116.385467, 39.907761]];
                    this.addCoordinates(positions)
                }
            },
            //添加坐标点
            addCoordinates(arr) {
                var that = this;
                var content = document.createElement("div");
                content.className = 'map_place';
                // for (var i = 0; i < arr.length; i++) {
                //     let arr1 = [arr[i].j, arr[i].w];
                //     console.log(arr1);
                //     that.marker = new AMap.Marker({
                //         iconStyle: '//webapi.amap.com/theme/v1.3/markers/b/mark_r.png',
                //         position: arr1,
                //         zIndex: 101,
                //         map: that.map
                //     });
                //     content.innerHTML='<b></b></b><ul><li><span>企业名称：</span><i>铜陵市新能源有限责任公司</i></li>' +
                //         '<li><span>法人：</span><i>陈成锋</i></li>' +
                //         '<li><span>地址：</span><i>铜陵市铜官区南洋路29号</i></li>' +
                //         '<li><span>电话：</span><i>13536259874</i></li></ul>';
                //     that.marker.on('click', function (e) {
                //         console.log(that.infoWindow);
                //         that.infoWindow.setContent(content);
                //         that.infoWindow.open(that.map, e.lnglat);
                //     });
                //     that.marker.setMap(that.map);
                // }

                for (var i = 0; i < arr.length; i++) {
                    that.marker = new AMap.Marker({
                        map: that.map,
                        position: arr[i],
                        iconStyle: '//webapi.amap.com/theme/v1.3/markers/b/mark_r.png',
                        offset: new AMap.Pixel(-13, -30)
                    });
                    content.innerHTML = '<b></b></b><ul><li><span>企业名称：</span><i>铜陵市新能源有限责任公司</i></li>' +
                        '<li><span>法人：</span><i>陈成锋</i></li>' +
                        '<li><span>地址：</span><i>铜陵市铜官区南洋路29号</i></li>' +
                        '<li><span>电话：</span><i>13536259874</i></li></ul>';
                    that.marker.on('click', function (e) {
                        console.log(that.infoWindow);
                        that.infoWindow.setContent(content);
                        that.infoWindow.open(that.map, e.lnglat);
                    });
                    console.log(that.marker);
                    that.markes.push(that.marker);
                }
                // for (var i = 0, marker; i < positions.length; i++) {
                //    that. marker = new AMap.Marker({
                //         map:that.map,
                //         position: positions[i],
                //         icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
                //         offset: new AMap.Pixel(-13, -30)
                //     });
                //     content.innerHTML='<b></b></b><ul><li><span>企业名称：</span><i>铜陵市新能源有限责任公司</i></li>' +
                //         '<li><span>法人：</span><i>陈成锋</i></li>' +
                //         '<li><span>地址：</span><i>铜陵市铜官区南洋路29号</i></li>' +
                //         '<li><span>电话：</span><i>13536259874</i></li></ul>';
                //     that.marker.on('click', function (e) {
                //         console.log(that.infoWindow);
                //         that.infoWindow.setContent(content);
                //         that.infoWindow.open(that.map, e.lnglat);
                //     });
                //     arr.push(that.marker);
                // };
                this.markers = arr;
            },
            //退出全屏
            exitFullscreen() {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.oRequestFullscreen) {
                    document.oCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else {
                    document.IsFullScreen = false;
                }
            },
        }
    }
</script>
<style lang="less">
  .map_place {
    width: 180px;
    height: 135px;
    background: rgba(230, 230, 230, 1);
    border-radius: 4px;
    position: relative;
    padding-bottom: 20px;

    b {
      position: absolute;
      top: 69px;
      left: -14px;
      width: 0;
      height: 0;
      border-right: 14px solid #e6e6e6;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    }

    ul {
      padding-top: 17px;
      width: 158px;
      margin: 0 auto;

      li {
        margin-bottom: 7px;
        overflow: hidden;

        span {
          display: block;
          float: left;
          width: 60px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(69, 69, 69, 1);
          text-align: right;
        }

        i {
          display: block;
          float: left;
          width: 98px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(69, 69, 69, 1);
        }
      }
    }
  }
</style>
<style scoped lang="less">
  .con {
    width: 100%;
    height: 8px;
    background: #f0f0f0;
  }

  .warp {
    width: 1200px;
    margin: 31px auto 20px;
    height: 731px;
    overflow: hidden;
    background: #fff;

    .left {
      float: left;
      width: 964px;
      height: 731px;
      position: relative;

      h1 {
        width: 952px;
        height: 32px;
        background: rgba(66, 106, 251, 1);
        border-radius: 4px 4px 0px 0px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        padding-left: 12px;
        display: flex;
        align-items: center;
      }

      .cont {
        width: 963px;
        height: 699px;
        background: #ccc;
      }

      ul {
        position: absolute;
        bottom:0;
        left: 0;
        z-index: 999;
          border-bottom: 40px solid red;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          width: 924px;
      }
    }

    .right {
      float: right;
      width: 20.8%;
      height: 100%;

      .top {
        width: 99.2%;
        height: 33.2%;
        border: 1px solid rgba(217, 217, 217, 1);

        h2 {
          width: 100%;
          height: 13.2%;
          background: rgba(51, 119, 255, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 400;
          color: rgba(254, 254, 254, 1);
        }

        .content {
          height: 86%;

          ul {
            height: 54%;

            li {
              width: 86%;
              padding: 0 6% 0 8%;
              height: 30%;
              display: flex;
              align-items: center;
              overflow: hidden;
              border-bottom: 1px dashed #e6e6e6;

              > * {
                float: left;
              }

              span {
                width: 30%;
                font-size: 14px;
                font-weight: 400;
                color: rgba(69, 69, 69, 1);
              }

              b {
                margin-left: 5%;
                width: 10.6%;
                font-size: 14px;
                font-weight: 400;
                color: rgba(232, 57, 10, 1);
              }
            }
          }

          div {
            width: 86%;
            padding: 0 6% 0 8%;
            height: 46%; //96
            overflow: hidden;

            strong {
              width: 100%;
              height: 31.2%;
              display: flex;
              align-items: center;
              font-size: 14px;
              font-weight: 400;
              color: rgba(69, 69, 69, 1);
            }

            p {
              margin-left: 4%;
              height: 68.7%;
              font-size: 12px;
              font-weight: 400;
              color: rgba(69, 69, 69, 1);
            }
          }
        }
      }

      .all {
        margin-top: 12.1%;
        width: 99.2%;
        height: 47.8%;
        border: 1px solid rgba(217, 217, 217, 1);

        h2 {
          width: 100%;
          height: 8.9%;
          background: rgba(51, 119, 255, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 400;
          color: rgba(254, 254, 254, 1);
        }

        ul {
          height: 91.1%;

          li:last-child {
            border-bottom: 0;
          }

          li {
            width: 86%;
            padding: 0 6% 0 8%;
            height: 10.3%;
            overflow: hidden;
            border-bottom: 1px dashed #e6e6e6;
            display: flex;
            align-items: center;

            > * {
              display: block;
              float: left;
              height: 34px;
              line-height: 34px;
            }

            span {
              font-size: 14px;
              font-weight: 400;
              color: rgba(69, 69, 69, 1);
            }

            b {
              margin-left: 12px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(232, 57, 10, 1);
            }
          }
        }
      }
    }
  }

</style>
-->
<template>
  <div>
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span>首页</span><b> ></b><span>工单检测</span>
      </div>
    </div>
    <div class="warp" id="warp">
      <h1>铜陵市民营企业服务监测平台 <button style="display: block" @click="launchFullscreen(element)" >全屏</button></h1>
      <div class="left" >
        <div class="cont" id="container" >
        </div>
        <ul >
          <li v-for="(item,idx) in cateList" :class="idx==cla?'sec':''" @click="select(idx)">{{item}}</li>
        </ul>
      </div>
      <div class="right">
        <div class="top">
          <h2><span>本月指标</span></h2>
          <div class="content">
            <ul>
              <li><span>访客数量:</span><b>561</b></li>
              <li><span>工单数量:</span><b>235</b></li>
              <li><span>办结数量:</span><b>121</b></li>
            </ul>
            <div>
              <strong>留言/反馈:</strong>
              <p>正常情况下，HIF一方面不断产生，另一方面不断降解。是非常浪费资源的，一般情况下现。</p>
            </div>
          </div>
        </div>
        <div class="all">
          <h2><span>总体指标</span></h2>
          <ul>
            <li><span>检测区域：</span><b>枞阳县</b></li>
            <li><span>园区数量：</span><b>5</b></li>
            <li><span>项目总数：</span><b>10</b></li>
            <li><span>服务企业：</span><b>15</b></li>
            <li><span>工单数量：</span><b>20</b></li>
            <li><span>好评数量：</span><b>50</b></li>
          </ul>
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
    //在页面中引入高德地图
    export default {
        name:'order',
        components:{
            headNav,
            footerNav
        },
        data(){
            return {
                toptitle:'铜陵市民营经济云服务在线检测系统',
                clectnav: 5,
                map:'',
                infoWindow:'',
                marker:'',
                markes:[],
                n:'',
                element:'',
                cateList:['待办工单','园区分布','企业分布','工单办理','用水服务','用气服务','用电服务','民星企业'],
                cla:0
            }
        },
        created(){
            this.$nextTick(function () {
                this.element=document.getElementById('warp');
            })
        },
        mounted() {
            var that=this;
            this.map = new AMap.Map('container', {
                zoom: 9
            });
            this.infoWindow=new AMap.InfoWindow({
                isCustom:	true,
                offset: new AMap.Pixel(103,100),
                content:""
            });
            // let   arr=[{j:113.65912903759764,w:34.74606634973564},{j:113.60273827526854,w:34.79126106664183},{j:113.60488404248045,w:113.60488404248045}];
            //    for(var i=0; i<arr.length;i++){
            //        let arr1=[arr[i].j,arr[i].w];
            //
            //        that.marker = new AMap.Marker({
            //            iconStyle: '//webapi.amap.com/theme/v1.3/markers/b/mark_r.png',
            //            position:  arr1,
            //            zIndex: 101,
            //            map:that.map
            //        });
            //        that.marker.on('click', function(e){
            //            console.log(that.infoWindow);
            //            that.infoWindow.setContent("<ul><li>sadgfsg</li></ul>");
            //            that.infoWindow.open(that.map, e.lnglat);
            //        });
            //        that.marker.setMap(that.map);
            //    }
        },
        methods: {
            //進入全屏
            launchFullscreen(element) {
                //此方法不可以在異步任務中執行，否則火狐無法全屏
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                } else if (element.oRequestFullscreen) {
                    element.oRequestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullScreen();
                } else {
                    document.IsFullScreen = true;
                }
            },
            select(i) {
                this.map.remove(this.markes);
                this.cla = i;
                let arr = [[113.65912903759764,34.74606634973564],
                    [113.60273827526854, 34.79126106664183]
                    , [113.611194,34.801869]];
                if(i==0){
                    this.addCoordinates(arr)
                }
                if(i==1){
                    var positions = [[116.405467, 39.907761], [116.415467, 39.907761], [116.415467, 39.917761], [116.425467, 39.907761],
                        [116.385467, 39.907761]];
                    this.addCoordinates(positions)
                }
            },
            //添加坐标点
            addCoordinates(arr) {
                var that = this;
                var content=document.createElement("div");
                content.className='map_place';
                // for (var i = 0; i < arr.length; i++) {
                //     let arr1 = [arr[i].j, arr[i].w];
                //     console.log(arr1);
                //     that.marker = new AMap.Marker({
                //         iconStyle: '//webapi.amap.com/theme/v1.3/markers/b/mark_r.png',
                //         position: arr1,
                //         zIndex: 101,
                //         map: that.map
                //     });
                //     content.innerHTML='<b></b></b><ul><li><span>企业名称：</span><i>铜陵市新能源有限责任公司</i></li>' +
                //         '<li><span>法人：</span><i>陈成锋</i></li>' +
                //         '<li><span>地址：</span><i>铜陵市铜官区南洋路29号</i></li>' +
                //         '<li><span>电话：</span><i>13536259874</i></li></ul>';
                //     that.marker.on('click', function (e) {
                //         console.log(that.infoWindow);
                //         that.infoWindow.setContent(content);
                //         that.infoWindow.open(that.map, e.lnglat);
                //     });
                //     that.marker.setMap(that.map);
                // }

                for (var i = 0; i < arr.length; i++) {
                    that. marker = new AMap.Marker({
                        map:that. map,
                        position: arr[i],
                        iconStyle: '//webapi.amap.com/theme/v1.3/markers/b/mark_r.png',
                        offset: new AMap.Pixel(-13, -30)
                    });
                    content.innerHTML='<b></b></b><ul><li><span>企业名称：</span><i>铜陵市新能源有限责任公司</i></li>' +
                        '<li><span>法人：</span><i>陈成锋</i></li>' +
                        '<li><span>地址：</span><i>铜陵市铜官区南洋路29号</i></li>' +
                        '<li><span>电话：</span><i>13536259874</i></li></ul>';
                    that.marker.on('click', function (e) {
                        console.log(that.infoWindow);
                        that.infoWindow.setContent(content);
                        that.infoWindow.open(that.map, e.lnglat);
                    });
                    console.log(that.marker);
                    that.markes.push(that.marker);
                }
                // for (var i = 0, marker; i < positions.length; i++) {
                //    that. marker = new AMap.Marker({
                //         map:that.map,
                //         position: positions[i],
                //         icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
                //         offset: new AMap.Pixel(-13, -30)
                //     });
                //     content.innerHTML='<b></b></b><ul><li><span>企业名称：</span><i>铜陵市新能源有限责任公司</i></li>' +
                //         '<li><span>法人：</span><i>陈成锋</i></li>' +
                //         '<li><span>地址：</span><i>铜陵市铜官区南洋路29号</i></li>' +
                //         '<li><span>电话：</span><i>13536259874</i></li></ul>';
                //     that.marker.on('click', function (e) {
                //         console.log(that.infoWindow);
                //         that.infoWindow.setContent(content);
                //         that.infoWindow.open(that.map, e.lnglat);
                //     });
                //     arr.push(that.marker);
                // };
                this.markers=arr;
            },
            //退出全屏
            exitFullscreen() {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.oRequestFullscreen) {
                    document.oCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else {
                    document.IsFullScreen = false;
                }
            },
        }
    }
</script>
<style lang="less">
  .map_place{
    width:180px;
    height:135px;
    background:rgba(230,230,230,1);
    border-radius:4px;
    position: relative;
    padding-bottom: 20px;
    b{
      position: absolute;
      top: 69px;
      left: -14px;
      width: 0;
      height: 0;
      border-right: 14px solid #e6e6e6;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    }
    ul{
      padding-top: 17px;
      width: 158px;
      margin:0 auto;
      li{
        margin-bottom: 7px;
        overflow: hidden;
        span{
          display: block;
          float: left;
          width: 60px;
          font-size:12px;
          font-weight:400;
          color:rgba(69,69,69,1);
          text-align: right;
        }
        i{
          display: block;
          float: left;
          width:98px;
          font-size:12px;
          font-weight:400;
          color:rgba(69,69,69,1);
        }
      }
    }
  }
</style>
<style scoped lang="less">
  .container {
    width: 100%;
    height: 32px;
    background: rgba(245, 245, 245, 1);
    .nav {
      width: 1200px;
      height: 32px;
      margin: 0 auto;
      span {
        display: block;
        float: left;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-right: 10px;
      }
      b {
        display: block;
        float: left;
        height: 32px;
        line-height: 32px;
        margin-right: 10px;
      }
    }
  }
  .warp{
    width: 1200px;
    margin: 0 auto 20px;
    height: 725px;
    overflow: hidden;
    background: #fff;
    h1{
      height: 100px;
      display:flex;
      align-items:center;
      justify-content:center;
      text-align: center;
      font-size:30px;
      font-weight:400;
      color:rgba(69,69,69,1);
    }
    .left{
      float: left;
      width: 77.5%;
      height:100%;
      .cont{
        width:100%;
        height:67.86%;
        box-shadow:0 5px 5px 0 rgba(0, 0, 0, 0.21);
        background: #333;
      }
      ul{
        margin-top: 2.2%;
        width:99.89%;
        height: 15.44%;
        overflow: hidden;
        border:1px dashed rgba(217,217,217,1);
        border-top: none;
        border-left: none;
        li{
          float: left;
          width:24.8%;
          height:49.5%;
          display:flex;
          align-items:center;
          justify-content:center;
          text-align: center;
          border-top:1px dashed rgba(217,217,217,1);
          border-left:1px dashed rgba(217,217,217,1);
          font-size:20px;
          font-weight:400;
          color:rgba(69,69,69,1);
        }
        li.sec{
          background: #3377FF;
          color: #FFFFFF;
        }
      }
    }
    .right{
      float: right;
      width: 20.8%;
      height: 100%;
      .top{
        width:99.2%;
        height:33.2%;
        border:1px solid rgba(217,217,217,1);
        h2{
          width:100%;
          height:13.2%;
          background:rgba(51,119,255,1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size:16px;
          font-weight:400;
          color:rgba(254,254,254,1);
        }
        .content{
          height: 86%;
          ul{
            height: 54%;
            li{
              width: 86%;
              padding: 0 6% 0 8%;
              height: 30%;
              display: flex;
              align-items: center;
              overflow: hidden;
              border-bottom: 1px dashed #e6e6e6;
              >*{
                float: left;
              }
              span{
                width:30%;
                font-size:14px;
                font-weight:400;
                color:rgba(69,69,69,1);
              }
              b{
                margin-left: 5%;
                width:10.6%;
                font-size:14px;
                font-weight:400;
                color:rgba(232,57,10,1);
              }
            }
          }
          div{
            width: 86%;
            padding: 0 6% 0 8%;
            height: 46%;//96
            overflow: hidden;
            strong{
              width: 100%;
              height: 31.2%;
              display: flex;
              align-items: center;
              font-size:14px;
              font-weight:400;
              color:rgba(69,69,69,1);
            }
            p{
              margin-left: 4%;
              height: 68.7%;
              font-size:12px;
              font-weight:400;
              color:rgba(69,69,69,1);
            }
          }
        }
      }
      .all{
        margin-top: 12.1%;
        width:99.2%;
        height:47.8%;
        border:1px solid rgba(217,217,217,1);
        h2{
          width:100%;
          height:8.9%;
          background:rgba(51,119,255,1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size:16px;
          font-weight:400;
          color:rgba(254,254,254,1);
        }
        ul{
          height: 91.1%;
          li:last-child{
            border-bottom: 0;
          }
          li{
            width: 86%;
            padding: 0 6% 0 8%;
            height: 10.3%;
            overflow: hidden;
            border-bottom: 1px dashed #e6e6e6;
            display: flex;
            align-items: center;
            >*{
              display: block;
              float: left;
              height: 34px;
              line-height: 34px;
            }
            span{
              font-size:14px;
              font-weight:400;
              color:rgba(69,69,69,1);
            }
            b{
              margin-left: 12px;
              font-size:14px;
              font-weight:400;
              color:rgba(232,57,10,1);
            }
          }
        }
      }
    }
  }

</style>
