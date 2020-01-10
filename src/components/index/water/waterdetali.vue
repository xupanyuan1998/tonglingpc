<template>
  <div>
    <div class="top">
      <head-nav  :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span>首页</span><b> ></b><span>水</span><b> ></b><span>详情</span>
      </div>
    </div>
    <div class="warp">
      <div class="title">
        <h1>{{content.title}}</h1>
        <div class="msg">
          <div>
            <span>时间：{{content.publishTime}}</span>
            <span>来源： {{content.departmentName}}</span>
            <p>
              <b>字体显示:</b>
              <strong v-for="(item,idx) in size" :key="idx" :class="cSize==idx?'clect':''" @click="changeSize(idx)">{{item}}</strong>
            </p>
          </div>
        </div>
        <div class="content" v-html="content.content"></div>
      </div>
    </div>
    <div class="footer">
      <footer-nav></footer-nav>
    </div>
  </div>
</template>

<script>
    import headNav from "../../headNav";
    import footerNav from '../../footer'
    export default {
        name: "newsdetali",
        components:{headNav,footerNav},
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 1,
                content:'',
                size:['大','中','小'],
                cSize:1,
            }
        },
        methods:{
          changeSize(i){
              this.cSize=i;
              if(i==0){
                  $('.content').children().css('font-size','18px')
              }
              if(i==1){
                  $('.content').children().css('font-size','14px')
              }
              if(i==2){
                  $('.content').children().css('font-size','12px')
              }
          }
        },
        created() {
            var id=this.$route.query.id;
            this.axios.post('/web/newnotice/news',{newsId:id}).then(({data})=>{
                // console.log(data);
                this.content=data.data;
                this.$nextTick(function () {
                    $('.content').children().css('font-size','14px')
                })
            })
        },
    }
</script>

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
    padding-top: 70px;
    width: 1043px;
    margin: 0 auto;
    padding-bottom: 71px;
    h1{
      width: 100%;
      text-align: center;
      overflow: hidden;
      height:25px;
      font-size:22px;
      font-weight:400;
      color:rgba(69,69,69,1);
    }
    .msg{
      width: 100%;
      height: 45px;
      border-bottom: 1px solid #ccc;
      text-align: center;
      div{
        display: inline-block;
        height: 45px;
        overflow: hidden;
        span{
          display: block;
          float: left;
          height: 45px;
          line-height: 45px;
          margin-right: 10px;
          font-size:12px;
          font-weight:400;
          color:rgba(189,189,189,1);
        }
        p{
          float: left;
          height: 45px;
          line-height: 45px;
          cursor: default;
          >*{
            display: block;
            float: left;
            height: 45px;
            line-height: 45px;
          }
          b{
            font-size:12px;
            font-weight:400;
            color: #E8390A;
          }
          strong{
            cursor: pointer;
            margin-left: 10px;
            color:rgba(189,189,189,1);
            font-size: 12px;
          }
          strong.clect{
            color: #E8390A;
          }
        }
      }
    }
    .content{
      padding-top: 30px;
    }
  }
</style>
