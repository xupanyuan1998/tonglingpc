<template>
  <div class="warp">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="huan">
      <router-view></router-view>
    </div>
    <div class="footer">
      <footer-nav></footer-nav>
    </div>
<!--    提示-->
    <div class="placesa"  @mousewheel.prevent v-if="placeshow">
      <div class="ca" v-if="success==0">
        <h1>提示</h1>
        <p>请完整上传所有的必要资料！</p>
        <button @click="cancleback">确定</button>
      </div>
      <div class="success" v-if="success==1">
        <img src="../../../../static/images/95.png" alt="">
        <h2>提交成功</h2>
        <p>用户您好，我们将会以最快的速度为您办理，请耐心等待！</p>
      </div>
      <div class="logins" v-if="success==2">
        <h2>欢迎登录民营经济智慧云服务平台</h2>
        <ul>
          <li>
            <img src="../../../../static/images/9.png" alt="">
            <input type="text" placeholder="请输入用户名" v-model="username">
          </li>
          <li>
            <img src="../../../../static/images/10.png" alt="">
            <input type="password" placeholder="请输入密码" v-model="pass">
          </li>
        </ul>
        <button @click="gologin">登录</button>
        <div><span @click="results">忘记密码</span> <span @click="res">免费注册</span></div>
        <img src="../../../../static/images/96.png" alt="" class="cloose" @click="cloose">
      </div>
    </div>
  </div>
</template>

<script>
    import headNav from "../../headNav";
    import footerNav from "../../footer";
    import '../../../assets/css/page.less';
  var that;
    export default {
        name: "Antonym",
        data() {
            return {
                clectnav: 2,
                toptitle:'铜陵市民营经济云服务在线办理系统',
                content:'',
                showPageNo:8,
                currentPage:1,
                pageTotal: '',//总的页数
                pageConfig: {
                    pageSize: 10,     //一页的数据条数
                    total: '',         //总的数据条数
                },
                cainame:'',
                url:'',
                addsuShow:true,
                success:2,
                placeshow:false,
                username:'',
                pass:'',
                userId:'',
                title:'',
                orderList:'',
                msg:'',
              token:''
            }
        },
        components: {
            headNav,
            footerNav
        },
        beforeCreate(){
            that=this;
          this.token = localStorage.getItem("token");
          if(this.token==null){
            this.$router.push('/')
          }
        },
        created() {
            var a=JSON.parse(localStorage.getItem('personal'));
            this.msg=a;
            if(this.msg.roleId<2){
              this.$router.push('/Antonym/faren')
            }
            if(this.msg.roleId==2){
              this.$router.push('/Antonym/Operator')
            }
            if (this.msg.roleId==3){
              this.$router.push('/Antonym/Leadership')
            }
        },
    }
</script>

<style scoped lang="less">
  .ddd{
    width: 100%;
    height: 20px;
    background: #f5f5f5;
  }
  .warp{
    background: #fff;
  }
 .huan{
   width: 1200px;
   margin: 0 auto;
   padding: 20px 0;
   min-height: 700px;
 }
</style>
