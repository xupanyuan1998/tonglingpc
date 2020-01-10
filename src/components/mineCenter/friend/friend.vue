<template>
 <div class="parent">
<!--  标题 -->
  <div class="fa">
    <h3 class="title">我的朋友圈</h3>
    <div class="line"></div>
    <div class="fas">
      <textarea name="" id="" cols="30" rows="10" placeholder="此刻您想说点什么……" v-model="content"></textarea>
      <div class="imga">
        <div class="item" @click="choseimg">
          <img src="../../../../static/images/121.png" alt="">
          <span>图片</span>
          <b v-if="imglist.length>0">{{imglist.length}}</b>
        </div>
        <div class="item" @click="chosefile" >
          <img src="../../../../static/images/124.png" alt="">
          <span>文件</span>
          <b v-if="chlectFile!=''"></b>
        </div>
        <button @click="saveFrend">发布</button>
      </div>
      <div class="sendimg" id="imgs">
        <h5>本地上传</h5>
        <p>共{{imglist.length}}张还能上传{{9-imglist.length}}张</p>
        <ul>
          <li v-for="(item,idx) in imglist" :key="idx"><img :src="item.attachmentUrl" alt=""><b @click="deltu(idx)"></b></li>
          <li class="addtu" id="addtu">
            <span></span>
            <b></b>
            <input type="file" title="" accept="image/*" @change="addtu($event)">
          </li>

        </ul>
        <em @click="cancle"></em>
        <strong></strong>
      </div>
      <div class="sendimg"  id="files">
        <ol>
          <li v-if="chlectFile!=''"><img src="../../../../static/images/133.png" alt=""><b  @click="delfile"></b></li>
          <li class="addtu" v-if="chlectFile==''">
            <span></span>
            <b></b>
            <input type="file" title="" @change="addFile($event)">
          </li>
        </ol>
        <em @click="cancle"></em>
        <strong></strong>
      </div>
    </div>
  </div>
   <ul class="contnt" >
     <li class="lis" v-for="(item,idx) in contentlist" :key="idx" >
       <div class="msg">
         <img src="../../../../static/images/125.png" alt="">
         <div class="person">
           <p>
             <span>{{item.group.publisherName}}</span>
             <span>{{item.group.roleName}}</span>
           </p>
           <h5 v-if="item.group.companyName !=''">{{item.group.companyName}}</h5>
         </div>
         <div class="weidu" v-if="item.group.state==0" @click="suwei(item.group.groupInfoId)">未读</div>
          <div class="date"><strong>{{item.group.addTime}}</strong></div>
       </div>
       <div class="content">
         <p v-html="item.group.content"></p>
         <template>
           <div class="x">
             <viewer :images="item.group.picturelist">
               <div  v-for="(iem,index) in item.group.picturelist" class="b">
                 <img
                   :src="iem.attachmentUrl"
                   :key="index"
                 >
               </div>
             </viewer>
           </div>
         </template>
         <ol>
           <li v-for="(iem,idc) in item.group.enclosurelist" :key="idc"><img src="../../../../static/images/131.png" alt=""><a :href="iem.attachmentUrl" type="download">{{iem.attachmentName}}</a></li>
         </ol>
       </div>
       <div class="huifu" v-if="item.show">
         <div class="huin" @click.stop="no">
           <input type="text"  @click.stop="no">
         </div>
         <button class="save" @click.stop="sendmsg($event)">发送</button>
       </div>
       <button class="placehui" @click="kuang(item)" v-show="item.group.replylist.length==0">
         回复
       </button>
       <div class="hui" v-if="item.group.replylist.length!=0">
         <div class="ping" v-for="(items, ide) in item.group.replylist" :key="ide" @click.stop="gohui(item,items)">
           <div class="ping_left">
             <span>{{items.respondentName}}</span>
             <em>回复</em>
             <span>{{items.berespondentName}}</span>
             <b>:</b>
           </div>
           <div class="ping_right">
             <div class="hua">
               <p>{{items.content}}</p>
               <a v-for="(ibc,idc) in items.enclosurelist" :key="idc" :href="ibc.attachmentUrl" :download="ibc.attachmentNam">{{ibc.attachmentName}}</a>
             </div>
           </div>
           <div class="time">
            {{items.addTime}}
           </div>
         </div>
       </div>
     </li>
   </ul>
   <div id="backTop" v-if="btnFlag" @click="backTop">
     <img src="../../../../static/images/136.png" alt="">
     <span>回顶部</span>
   </div>
<!--   提示组件-->
   <place
     :placeshow="placeshow"
     :success="success"
     @hide="placeshow = !placeshow"
     :errorshow="errorshow"
   ></place>
 </div>
</template>

<script>
  var that;
export default {
  created() {
      that=this;
      var person=JSON.parse(localStorage.getItem('personal'));
      // this.groupTypeId=person.groupTypeId;
      this.groupTypeId=-1;
      this.userId=person.userId;
      //获取朋友圈内容
      var datas={
          current:this.current,
          size:this.size,
          groupTypeId: this.groupTypeId,
          userId:this.userId
      };;;
     this.getfrindList(datas);
  },
  data() {
    return {
        imglist:[],//已选择图片列表
        chlectFile:'',//已选择的文件
        aurl:'',
        content:'',
        groupTypeId:'',//朋友圈id
        size:10,
        contentlist:[],
        groupInfoId:'',//信息id
      respondentId:'', //回复人id
        btnFlag:false,
        pages:'',//总页数,
        current:1,//当前页
        userId:'',
        testdata:'',
      placeshow:false,
      success:5,
      errorshow:''
    };
  },
  methods: {
    kuang(i){
      this.groupInfoId=i.group.groupInfoId;
      if(i.group.operatorId!=i.group.groupUserId){
        this.$nextTick(function() {
          that.$set(i,"show",true);
        });
      }
    },
      no(){},
      //获取朋友圈列表信息
      getfrindList(datas){
          this.axios.post('/web/friends/group',datas).then(({data})=>{
              console.log(data.data.list);
              this.testdata=data.data.list;
              for(let a=0;a<data.data.list.length;a++){
                  this.contentlist.push(data.data.list[a]) ;
              }
          })
      },
      clearFen(i) {
          return i.substring(0, i.indexOf(" "));
      },
      //选择图片
      choseimg(){
          $('#imgs').hide();
          $('#videos').hide();
          $('#files').hide();
          $('#imgs').show();
      },
      //选择文件
      chosefile(){
          $('#imgs').hide();
          $('#videos').hide();
          $('#files').hide();
          $('#files').show();
      },
      //关闭选择框
      cancle(){
          $('#imgs').hide();
          $('#videos').hide();
          $('#files').hide();
      },
      //添加图片
      addtu(e){//提交文件
          let formData = new FormData();
          let file=e.target.files[ 0 ];
          if(file!=undefined){
              formData.append("img",file);
              let config = {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              };
              this.$http.post('/web/onlinework/file', formData, config).then(function (res) {
                 let obj={};
                 obj.attachmentName=res.data.data.name;
                 obj.attachmentUrl=res.data.data.url;
                 obj.type=1;
                  that.imglist.unshift(obj);
                  $('#addtu').show();
                  if(that.imglist.length>=9){
                      $('#addtu').hide();
                  }else{
                      $('#addtu').show();
                  }
              })
          }
      },
      //上传文件
      addFile(e){
          let formData = new FormData();
          let file=e.target.files[ 0 ];
          if(file!=undefined){
              formData.append("img",file);
              let config = {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              };
              this.$http.post('/web/onlinework/file', formData, config).then(function (res) {
                  let obj={};
                  obj.attachmentName=res.data.data.name;
                  obj.attachmentUrl=res.data.data.url;
                  obj.type=4;
                  that.chlectFile=obj;
              })
          }
      },
      gohui(i,b){
          var that=this;
          this.groupInfoId=b.groupInfoId;
          this.respondentId=b.respondentId;
          if(i.show==false||i.show==undefined){
            if(this.userId==this.respondentId){
              return false
            }else{
              this.$nextTick(function() {
                that.$set(i,"show",true);
              });
            }

          }else{
              this.$nextTick(function() {
                  this.$set(i,"show",false);
              });
          }
      },
      //已选择删除图片
      deltu(i){
        this.imglist.splice(i,1);
      },
      //删除已选择的文件
      delfile(){
          this.chlectFile='';
      },
      //发布朋友圈
      saveFrend(){
          var that=this;
          if(this.content==''&&this.imglist.length==0&&this.chlectFile==''){
                this.placeshow=true;
                this.errorshow='发布内容不能为空！';
              // this.axios.post('/web/friends/add',data).then(({data})=>{
              //     console.log(data);
              // })
          }else{
              var aaa=[];
              if(this.imglist.length!=0){
                  for (let a=0;a<this.imglist.length;a++){
                      aaa.push(this.imglist[a])
                  }
              }
              if(this.chlectFile!=''){
                  aaa.push(this.chlectFile)
              }
              var data={
                  content:this.content,
                  groupTypeId: that.groupTypeId,
                  attachmentlists:JSON.stringify(aaa)
              };
              this.axios.post('/web/friends/add',data).then(({data})=>{
                  if(data.code==10001){
                      that.$parent.changestate();
                      that.$parent.changePase('');
                      setTimeout(function () {
                          that.$parent.changehide();
                          that.content='';
                          that.imglist=[];//已选择图片列表
                           that.chlectFile='';//已选择的文件
                      },2000);
                      var datas={
                          current:1,
                          size:this.size,
                          groupTypeId: this.groupTypeId,
                          userId:this.userId
                      };;;
                      this.getfrindList(datas);
                  }
              })
          }
      },
      sendmsg(event){
          var that=this;
          var li=event.currentTarget;
          var input= $(li).parent().find('input')[0];
       var huifus=$(input).val();
       if(this.respondentId==''){
         this.respondentId=0;
       }
          var datas={
              groupInfoId:this.groupInfoId,
              respondentId:this.respondentId,
              content:huifus,
          };
          if(huifus==''){
            this.placeshow=true;
            this.errorshow='回复内容不能为空！';
          }else{
            //发送回复请求
            this.axios.post('/web/friends/reply',datas).then(({data})=>{
              if(data.code===10001){
                that.content='',
                  that.contentlist=[];
                var datas={
                  current:1,
                  size:that.size,
                  groupTypeId: that.groupTypeId,
                  userId:that.userId
                };;;
                that.getfrindList(datas);
              }
            })
          }

      },
      //返回顶部
      backTop () {
          const that = this;
          let timer = setInterval(() => {
              let ispeed = Math.floor(-that.scrollTop / 5);;;
              document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed;;;
              if (that.scrollTop === 0) {
                  clearInterval(timer)
              }
          }, 16)
      },
      // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
      scrollToTop () {
          const that = this;
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          that.scrollTop = scrollTop;
          if (that.scrollTop > 300) {
              that.btnFlag = true
          } else {
              that.btnFlag = false
          }
      },
      //改变未读状态
      suwei(i){
          var that=this;
          this.axios.post('/web/friends/update',{groupInfoId:i}).then(({data})=>{
              if(data.code==10001){
                  for (var a=0;a<10;a++){
                      that.contentlist.shift()
                  }
                  console.log(that.contentlist);
                  var datas={
                      current:1,
                      size:this.size,
                      groupTypeId: this.groupTypeId,
                      userId:this.userId
                  };;;
                  that.getfrindList(datas);
              }
          })
      }
  },
    mounted () {
        var that =this;
        window.addEventListener('scroll', this.scrollToTop);
        window.onscroll=function () {
            let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 100;
            if(bottomOfWindow){
                if(that.timer !=null){
                    clearTimeout(that.timer);
                }
                that.timer=setTimeout(function () {
                    that.current +=1;
                    var datas={
                        current:that.current,
                        size:that.size,
                        groupTypeId: that.groupTypeId,
                        userId:that.userId
                    };;;
                    if(that.testdata.length>0){
                        that.getfrindList(datas);
                    }
                },500)
            }

        }
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollToTop)
    },
};
</script>

<style lang="less" scoped>
.parent{
  background: #f2f2f2;
  .fa{
    background: #fff;
    padding-top: 20px;
    .title{
      position: relative;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #444444;
      margin-left: 30px;
      padding-bottom: 10px;
    }
    .line{
      height: 2px;
      background: #ff4c4c;
      margin-bottom: 10px;
    }
    .fas{
      position: relative;
      textarea{
        display: block;
        resize: none;
        width:817px;
        height:155px;
        border:1px solid rgba(153,153,153,1);
        margin: 20px 30px;
        padding: 10px;
        line-height: 26px;
        font-size: 16px;
      }
      textarea:focus{
       border:none;
          outline:1px solid #ff744f;
        width:819px;
        height:157px;
      }
      .imga{
        width: 837px;
        height: 24px;
        margin: 29px 0 0 30px;
        padding-bottom: 30px;
        cursor: pointer;
        .item{
          display: block;
          float: left;
          margin-right: 30px;
          position: relative;
          img{
            height: 23px;
            display: block;
            float: left;
          }
          span{
            height: 24px;
            float: left;
            margin-left: 10px;
          }
          b{
            width: 15px;
            height: 15px;
            display: block;
            position: absolute;
            right: -14px;
            top: -7px;
            background: #fe0000;
            line-height: 15px;
            text-align: center;
            border-radius: 50%;
            color: #fff;
            font-size: 12px;
          }
        }
        button{
          display: block;
          float: right;
          width:70px;
          height:30px;
          text-align: center;
          line-height: 30px;
          background:rgba(255,120,79,1);
          border-radius:4px;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(255,255,255,1);
          margin-top: -3px;
          border: none;
          outline: none;
          cursor: pointer;
        }
        button:hover{
          background: #fb8e6c;
        }
      }
      .sendimg{
        display: none;
        background: #fff;
        padding: 0 22px 0 22px;
        border: 1px solid #d1d1d1;
        max-width:270px ;
        max-height:300px ;
        position: absolute;
        top: 237px;
        left: 30px;
        box-shadow: #ccc 0px 0px 10px;
        h5{
          height: 28px;
          line-height: 28px;
        }
        p{
          height: 24px;
          line-height: 24px;
        }
        ul{
          padding-top: 14px;
          overflow: hidden;
          li{
            width: 80px;
            height: 80px;
            margin-right: 10px;
            float: left;
            margin-bottom: 10px;
            position: relative;
            img{
              position: absolute;
              top: 50%;
              left: 50%;
              transform:translate(-50%,-50%);
              max-height: 80px;
              max-width: 80px;
            }
            b{
              display: block;
              width: 16px;
              height: 16px;
              background: url("../../../../static/images/135.png");
              position: absolute;
              top: -8px;
              right: -8px;
            }
          }
        }
        .addtu{
          width: 78px;
          height: 78px;
          border: 1px dashed #B2B2B2;
          position: relative;
          cursor: pointer;
          >*{
            display: block;
            cursor: pointer;
          }
          span{
            height: 5px;
            width: 26px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background: #b4b4b4;
          }
          b{
            height: 26px;
            width: 5px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background: #b4b4b4;
          }
          input{
            display: block;
            width: 78px;
            height: 78px;
            opacity: 0;
            z-index: 3;
            position: absolute;
            cursor: pointer;
          }
        }
        em{
          display: block;
          width: 12px;
          height: 12px;
          position:absolute;
          transform:rotate(45deg);
          top: 10px;
          right: 10px;
          cursor: pointer;
        }
        em:before{
          content: '';
          display: block;
          width: 2px;
          height: 12px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          background: #454545;
        }
        em:after{
          background: #454545;
          content: '';
          display: block;
          width: 12px;
          height: 2px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
        strong {
          position: absolute;
          left: 36px;
          top: -13px;
          z-index: 2;
          /*兼容ie8-*/
        }
        strong:before,
        strong:after {
          width: 0;
          height: 0;
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 5;
          /*兼容ie8-*/
          border-top: 6px transparent dashed;
          border-left: 6px transparent dashed;
          border-right: 6px transparent dashed;
          border-bottom: 6px white solid;
          overflow: hidden;
        }
        strong:before {
          border-bottom: 6px #d6d6d6 solid;
        }
        strong:after {
          top: 1px;
          /*重要*/
          border-bottom: 6px white solid;
        }
        ol{
          margin-top: 30px;
          padding-bottom: 20px;
          overflow: hidden;
          li{
            width: 50px;
            height: 50px;
            float: left;
            margin-right: 10px;
            position: relative;
            img{
              position: absolute;
              top: 50%;
              left: 50%;
              transform:translate(-50%,-50%);
              max-height: 50px;
              max-width: 50px;
            }
            b{
              display: block;
              width: 16px;
              height: 16px;
              background: url("../../../../static/images/135.png");
              position: absolute;
              top: -8px;
              right: -8px;
            }
          }
          li.addtu{
            width: 48px;
            height: 48px;
            border: 1px dashed #B2B2B2;
            position: relative;
            cursor: pointer;
            >*{
              display: block;
              cursor: pointer;
            }
            span{
              height: 5px;
              width: 26px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              background: #b4b4b4;
            }
            b{
              height: 26px;
              width: 5px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              background: #b4b4b4;
            }
            input{
              display: block;
              width: 50px;
              height: 50px;
              opacity: 0;
              z-index: 3;
              position: absolute;
              cursor: pointer;
            }
          }
        }
      }
      #files{
        left: 128px;
        top: 240px;
      }
    }
  }
  .contnt{
    .lis{
      padding: 34px 50px 20px 30px;
      background: #fff;
      margin-top: 10px;
      .msg{
        height: 46px;
        img{
          width: 45px;
          height: 45px;
          display: block;
          float: left;
          border-radius: 50%;
        }
        .person{
          height: 45px;
          float: left;
          margin-left: 10px;
          p{
            height: 23px;
            span{
              display: block;
              height: 18px;
              line-height: 18px;
              float: left;
              padding-right: 7px;
              border-right: 2px solid #ccc;
              margin-right: 7px;
              font-size:16px;
              font-weight:400;
              color:rgba(47,90,130,1);
            }
            span:last-child{
              border: none;
            }
          }
          h5{
            height:20px;
            line-height: 20px;
            font-size:16px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(47,90,130,1);
          }
        }
        .weidu{
          float: left;
          width: 50px;
          margin-left: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          background: rgba(204,204,204,0.87);
          color: #fff;
          font-size: 14px;
          border-radius: 10px;
          cursor: pointer;
        }
        .date{
          float: right;
          height: 45px;
          strong{
            height:20px;
            line-height: 20px;
            font-size:16px;
            font-weight:400;
            color:rgba(115,115,115,1);
            margin-top: 25px;
          }
        }
      }
      .content{
        margin-top: 10px;
        margin-left: 56px;
        width: 780px;
        p{
          line-height:26px;
          width: 780px;
        }
        .x{
          margin-top: 10px;
          width: 360px;
          overflow: hidden;
          div.b{
            width: 110px;
            height: 110px;
            float: left;
            overflow: hidden;
            margin-bottom: 10px;
            margin-right: 10px;
            position: relative;
            background: #e6e6e6;
            img{
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              width: auto;
              height: auto;
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
        ol{
          overflow: hidden;
          li{
            float: left;
            height: 20px;
            margin-right: 20px;
            a{
              display:inline-block;
              margin-left: 5px;
              height: 20px;
              line-height: 20px;
              font-size: 14px;
              color:rgba(96,178,255,1);
            }
          }
        }
      }
      .hui{
        margin-top: 16px;
        margin-left: 30px;
        width:765px;
        background:rgba(242,242,242,1);
        border-radius:4px;
        padding:10px 17px;
        overflow: hidden;
        .ping{
          line-height: 28px;
          overflow: hidden;
          .ping_left{
            height: 28px;
            display: block;
            float: left;
            >*{
              display: block;
              float: left;
              height: 28px;
              line-height: 28px;
              font-size:14px;
              font-weight:400;
              margin: 3px;
            }
            span{
              color:rgba(102,181,255,1);
            }
            em{
              color: #373737;
            }
          }
          .ping_right{
            display: block;
            float: left;
            width: 490px;
            margin-left: 5px;
            margin-right: 10px;
            .hua{
              p{
                color: #595959;
                font-size: 14px;
                line-height: 28px;
                display: inline;
                cursor: pointer;
              }
              .kantu{
                display: inline-block;
                span{
                  display: inline-block;
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color:rgba(96,178,255,1);
                  margin-left: 6px;
                }
              }
            }
          }
          .time{
            float: right;
            font-size: 12px;
          }
        }
      }
      .huifu{
        width: 664px;
        height: 30px;
        margin-left: 56px;
        margin-top: 16px;
        .huin{
          height: 30px;
          float: left;
          input{
            display: block;
            width: 550px;
            padding: 0 10px;
            height:28px ;
            line-height: 28px;
            border: #e9e9e9 1px solid;
            outline:none;
            background: #e6e6e6;
          }
          input:focus{
            border:1px solid #ff744f;
          }
        }
        /*.huifile{*/
        /*  margin-left: 20px;*/
        /*  float: left;*/
        /*  height: 30px;*/
        /*  line-height: 30px;*/
        /*  width: 50px;*/
        /*  position: relative;*/
        /*  cursor: pointer;*/
        /*  background:#5e5959;*/
        /*  !*button{*!*/
        /*  !*  border: none;*!*/
        /*  !*  outline: none;*!*/
        /*  !*  height: 30px;*!*/
        /*  !*  width: 50px;*!*/
        /*  !*  position: relative;*!*/
        /*  !*  cursor: pointer;*!*/
        /*  !*}*!*/
        /*  !*button:before{*!*/
        /*  !*  content: '';*!*/
        /*  !*  display: block;*!*/
        /*  !*  width: 3px;*!*/
        /*  !*  height: 20px;*!*/
        /*  !*  background: #ccc;*!*/
        /*  !*  position: absolute;*!*/
        /*  !*  top: 50%;*!*/
        /*  !*  left: 50%;*!*/
        /*  !*  transform: translate(-50%,-50%);*!*/
        /*  !*}*!*/
        /*  !*button:after{*!*/
        /*  !*  content: '';*!*/
        /*  !*  display: block;*!*/
        /*  !*  width: 20px;*!*/
        /*  !*  height: 3px;*!*/
        /*  !*  background: #ccc;*!*/
        /*  !*  position: absolute;*!*/
        /*  !*  top: 50%;*!*/
        /*  !*  left: 50%;*!*/
        /*  !*  transform: translate(-50%,-50%);*!*/
        /*  !*}*!*/
        /*  !*input{*!*/
        /*  !*  display: block;*!*/
        /*  !*  height: 30px;*!*/
        /*  !*  width: 50px;*!*/
        /*  !*  position: absolute;*!*/
        /*  !*  z-index: 2;*!*/
        /*  !*  top: 0;*!*/
        /*  !*  opacity: 0;*!*/
        /*  !*  cursor: pointer;*!*/
        /*  !*}*!*/
        /*}*/
        .save{
          display: block;
          float: right;
          height: 30px;
          width: 70px;
          line-height: 30px;
          text-align: center;
          border: none;
          outline: none;
          background: #2c6af8;
          cursor: pointer;
          border-radius: 5px;
          color: #fff;
        }
        .sve:hover{
          background:#447cfb ;
        }
      }

    }
  }
  .placehui{
    display: block;
    border: none;
    outline: none;
    margin-top: 20px;
    padding: 0 10px 0 40px;
    cursor: pointer;
    height:32px;
    border-radius:8px;
    line-height: 32px;
    margin-left: 56px;
    background:url("../../../../static/images/233.png") no-repeat 10px 6px;
    background-color:rgba(240,240,240,1);
    color: #8a8a8a;
    font-size: 14px;
  }
  #backTop{
    width:48px;
    height: 68px;
    border-radius: 50%;
    position: fixed;
    bottom: 200px;
    right: 200px;
    cursor: pointer;
    span{
      line-height: 20px;
      text-align: center;
      height: 20px;
      font-size: 16px;
      cursor: pointer;
    }

  }
}
</style>
