<template>
  <div class="suqiu" v-loading="loading">
    <ul>
      <li><b>申请时间：</b><span>{{content.addTime}}</span></li>
      <li><b>申请人：</b><span>{{content.operatorName}}</span></li>
      <li><b>联系电话：</b><span>{{content.telephone}}</span></li>
      <li><b>单位：</b><span>{{content.telephone}}</span></li>
      <li><b>备注：</b><span>{{content.content}}</span></li>
      <li><b>附件：</b><span><a :href="content.attachment" :download="content.attachmentName">{{content.attachmentName}}</a></span></li>
      <li><b>申请编号：</b><span>{{content.orderNo}}</span></li>
      <li><b>类别：</b><span>{{content.categoryName}}</span></li>
      <li><b>状态：</b><span>{{content.state==1?'待审核':content.state==2?'退回':'已处理'}}</span></li>
    </ul>
  </div>
</template>

<script>
    export default {
        name:'myshenpiint',
        data() {
            return {
               content:'',
                loading:false,
                id:''
            };
        },
        created(){
            this.id=this.$route.query.id;
            this.token = localStorage.getItem("token");
            var localStorageStr = JSON.parse(localStorage.getItem("personal"));
            this.userId=localStorageStr.userId;
            this.getrecommondList();
        },
        methods: {
            getrecommondList(){
                this.loading=true;
                this.axios
                    .post("/web/approvalorder/details", {
                        approvalOrderId:this.id
                    })
                    .then(({ data }) => {
                        if(data.code==10001){
                            this.loading=false;
                            console.log(data.data);
                            this.content=data.data;
                        }

                    });
            }
        }
    };
</script>
<style lang="less" scoped>
  .suqiu {
    padding: 30px;
    background: #fff;
    h3 {
      color: #555;
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(68, 68, 68, 1);
    }
    ul{
      li{
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
        line-height: 40px;

        b{
          width: 100px;
          font-size: 18px;
          text-align: right;
          color: #666;
        }
        span,a{
          font-size: 18px;
          width: 700px;
          color: #666;
        }
        a{
          color: #1b8cff;
        }
        a:hover{
          text-decoration: underline;
        }
      }
    }
  }
</style>
