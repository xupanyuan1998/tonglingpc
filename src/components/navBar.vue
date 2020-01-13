<template>
    <div>
      <div class="nav">
        <ul class="naBar">
          <li class="mo" v-for="(item,idx) in nav" @click="goIndex(idx)" :key="idx" :class="cNav==idx?'navClect':''" @mouseenter="twomenu"  @mouseleave="hidemenu">
            <span >{{item.name}}</span>
            <ul style="display:none" v-if="item.list.length>0" @click.stop="cancle">
              <li class="sanjiao"></li>
              <li @click="tiao(items)" v-for="(items,idxs) in item.list" :key="idxs">{{items.name}}</li>
            </ul>
          </li>
        </ul>
      </div>
        <place  :placeshow="placeshow"  @hide="placeshow = false"></place>
    </div>
</template>

<script>
  import place from '../place/place'
    export default {
        name: "navBar",
      components:{
          place
      },
      props:{
        cNav:{
          type:Number,
          default:0
        },
      },
        data(){
            return {
              nav:[
                {name:'首页',list:[]},
                {name:'政策信息',list:[
                    {name:'本市政策',url:'/informationMore',id:0},
                    {name:'省厅政策',url:'/informationMore',id:1},
                    {name:'中央政策',url:'/informationMore',id:2},
                  ]},
                {name:'在线诉求',list:[]},
                {name:'办事导航',list:[]},
                {name:'金融超市',list:[]},
                {name:'涉企服务',list:[]},
                {name:'民企风采',list:[]},
                {name:'求计问策',list:[]},
                  {name:'联系帮扶',list:[]},
              ],
                navClect:"",
              status:'',
              success:2,
              placeshow:false,
            }
        },
        props:['cNav'],
      created() {
        this. status = localStorage.getItem("token");
      },
      methods:{
        placeshows(val){
          this.placeshow=val;
        },
        tiao(i){
          var url=i.url;
          var id=i.id;
          if(url.substr(0, 4) == "http"){
           window.open(url,'_blank')
          }else{
            this.$router.push({
              path:url,
              query:{
                id
              }
            })
          }

        },
        cancle(){},
        twomenu(event){
          var that=this;
          var li=event.currentTarget;
          $(li).parent().find('ul').css({display:'none'});
          $(li).find('ul').slideDown(200);
        },
        hidemenu(event){
          var li=event.currentTarget;
          $(li).parent().find('ul').css({display:'none'});
        },
        goIndex(id){
            //跳转到相应的路由
            if (id==0){
                this.$router.push('/')
            }
            if(id==1){
              this.$router.push({path:'/informationMore'})
            }
            if(id==2){
              if(this.status==null){
                this.placeshow=true;
              }else{
                const {href} = this.$router.resolve({
                  path: '/Antonym',
                });
                window.open(href,'_blank');
              }
            }
          if(id==3){
              this.$router.push('/navigation')
          }
            if(id==4){
              this.$router.push('/chaoshi')
            }
            if(id==5){
              this.$router.push('/services')
            }
          if(id==6){
            this.$router.push('/Corporation')
          }
          if(id==7){
              if(this.status==null){
                this.placeshow=true;
              }else{
                this.$router.push({
                  path: '/gauge',
                });
              }
            }
          if(id==8){
              this.$router.push('/telhelp')
          }
        },
        enter(){
            $('#navList').css({display:'block'});
        },
        leave(){
            $('#navList').css({display:'none'});
        }
        },
    }
</script>

<style scoped lang="less">

  .nav ul li.navClect{
    background:rgba(255,255,255,1);
  }
  .nav ul li.navClect span{
    color: #e7390a;
  }
  .nav ul li:hover{
    background:#fff;
    cursor: pointer;
    span{
      color: #e7390a;
    }
  }
.nav{
  width: 1200px;
  height:42px;
  margin: 0 auto;
  background:rgba(231,57,10,1);
  .online{
    width:152px;
    height:42px;
    background:rgba(255,141,30,1);
    float: left;
    margin-right: 20px;
    position: relative;
    cursor: default;
    padding: 0 10px;
    img{
      display: block;
      float: left;
      width: 24px;
      height: 24px;
      margin:9px 10px 9px 0;
    }
    span{
      display: block;
      float: left;
      height: 42px;
      line-height: 42px;
      width:118px;
      font-size:20px;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    #navList{
      position: absolute;
      top: 42px;
      left: 0;
      background: #fff;
      z-index: 999;
      ul{
        width:170px;
        border: 1px solid #e6e6e6;
        li{
          height:40px;
          line-height: 40px;
          padding-left: 45px;
          background: #fff;
          a{
            font-size: 18px;
          }
        }
        li:hover{
          background: #ffb8a5;
          color:rgba(231,57,10,1) ;
        }
      }
    }
  }
  }
  .naBar{
    overflow: hidden;
    li.mo{
      float: left;
      width:132px;
      line-height: 42px;
      cursor: pointer;
      transition: all 0.5s;
      span{
        display: block;
        width:100%;
        height:42px;
        text-align: center;
        line-height: 42px;
        font-size:20px;
        font-weight:400;
        color:#ffffff;
      }
      ul{
        width:100%;
        position: relative;
        z-index: 999;
        background: #fff;
        border: 1px solid #efefef;
        li.sanjiao{
            width:0;
            height:0;
            border-bottom:5px solid #fff;
            border-left:5px solid transparent;
            border-right:5px solid transparent;
          position: absolute;
          top: -5px;
          left: 5px;
        }
        li{
          width:100%;
          text-align: center;
          font-size: 18px;
          transition: all 0.3s;
        }
        li:hover{
          background:  #e7390a;
          color: #fff;
        }
      }
    }
  }

</style>
