<template>
    <div class="bottom">
      <div class="slider"></div>
      <div class="di">
        <div class="left">
          <img src="../../static/images/dilogo.png" alt="">
          <ul>
            <li><span>铜陵市民营经济促进局 版权所有 </span></li>
            <li><span>地址：安徽省铜陵市铜官区北京中路85号  </span></li>
            <li><span>邮箱：service@tlsmyjjy.gov.cn   </span></li>
            <li><span> 网站备案号：徽7453456353号   </span></li>
          </ul>
        </div>
        <div class="center">
          <div class="zhan">
            <ul>
              <li>网站介绍</li>
              <li><router-link to="/tellme">关于我们</router-link></li>
              <li>app下载</li>
            </ul>
            <ul>
              <li>政务公开</li>
              <li><router-link to="/openly">单位介绍</router-link></li>
              <li><router-link to="/openly">人事信息</router-link></li>
            </ul>
            <ul>
              <li>实用工具</li>
              <li><router-link to="/puhui">普惠金融</router-link></li>
              <li>信用查询</li>
            </ul>
          </div>
        </div>
        <div class="right">
          <img src="../../static/images/app.png" alt="">
          <span>微信公众号</span>
        </div>
        <div class="right">
          <img src="../../static/images/app.png" alt="">
          <span>App下载</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "footerNav"
    }
</script>

<style scoped lang="less">
.bottom{
  width: 100%;
  background:#fff;
  .slider{
    width: 100%;
    height:5px;
    background:rgba(212,99,71,1);;
  }
  .di{
    width: 1200px;
    height: 162px;
    margin: 0 auto;
    .left{
      float: left;
      width: 362px;
      height: 100px;
      margin: 30px 60px 0 14px;
      img{
        display: block;
        float: left;
        margin-right: 40px;
      }
      ul{
        width: 280px;
        height: 100px;
        float: left;
        li{
          height: 25px;
          line-height: 25px;
          font-size: 14px;
          color: #525252;
        }
      }
    }
    .center{
      float: left;
      margin-top: 26px;
      height: 107px;
      .zhan{
        overflow: hidden;
        ul{
          float: left;
          width: 100px;
          margin-right: 50px;
          li:first-child{
            font-size: 20px;
            font-weight: bold;
          }
          li{
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            a{
              width: 100%;
              display: block;
              height: 40px;
              line-height: 40px;
              font-size: 16px;
            }
          }
        }
      }
      h4{
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        font-weight: bold;
        color: #525252;
      }
      ul{
        li{
          height: 27px;
          line-height: 27px;
          a{
            display: block;
            height: 27px;
            line-height: 27px;
            float: left;
            margin-right: 60px;
            font-size: 14px;
            color: #888;
          }
        }
      }
    }
    .right{
      width: 77px;
      height: 107px;
      float: right;
      margin-right: 35px;
      margin-top: 32px;
      span{
        width:77px;
        height:30px;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(82,82,82,1);
        line-height:30px;
        text-align: center;
        overflow: hidden;
        display: block;
      }
    }
  }
}
</style>
