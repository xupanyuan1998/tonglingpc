<template>
  <div>
    <div class="content">
      <ul>
        <li v-for="(item,idx) in orderList" :key="idx">
          <div class="l_title">
            <h3>{{item.title}}</h3>
            <el-tag v-if="item.state<2"  size="small" type="info" effect="dark">待回复</el-tag>
            <el-tag v-if="item.state>=4||item.state==2" size="small" type="success" effect="dark">已完成</el-tag>
            <el-tag v-if="item.state==3" size="small" type="warning" effect="dark">办理中</el-tag>
          </div>
          <div class="int">
            <span>{{item.operatorName}}</span><span>{{item.addTime}}</span>
          </div>
          <div class="msg">
            <p>{{item.content.length>100?item.content.slice(0,100)+'...':item.content}}&nbsp;&nbsp;
              <router-link :to="{path:'/Antonym/Operator/list/listdetail',query:{id:item.orderId}}" tag="a">[查看全文]</router-link>
            </p>
          </div>
        </li>
      </ul>
      <div class="page">
        <!--        分页组件-->
        <div>
          <!--          <page-component :page-config="pageConfigPageTotal"></page-component>-->
          <div class="pageComponent" v-if="pageConfig.total">
            <!--上一页-->
            <button @click="prePage" :disabled="currentPage === 1"  class="pagess">上一页</button>
            <!--总页数小于8的-->
            <template v-if="pageTotal <= showPageNo">
              <button v-for="i in pageTotal" @click="changeCurrentPage(i)" :class="{active:i === currentPage}" :key="i">{{i}}</button>
            </template>
            <template v-else-if="currentPage < 4">
              <button v-for="i in 6" @click="changeCurrentPage(i)" :class="{active:i === currentPage}" :key="i">{{i}}</button>
              <button :disabled="true">···</button>
              <button @click="changeCurrentPage(pageTotal)">{{pageTotal}}</button>
            </template>
            <template v-else-if="currentPage > pageTotal - 4">
              <button @click="changeCurrentPage(1)">1</button>
              <button :disabled="true">···</button>
              <button v-for="i in 6" @click="changeCurrentPage(i + (pageTotal - 6))" :class="{active:(i + (pageTotal - 6)) === currentPage}" :key="i">{{i + (pageTotal - 6)}}</button>
            </template>
            <template v-else>
              <button @click="changeCurrentPage(1)">1</button>
              <button :disabled="true">···</button>
              <button @click="changeCurrentPage(currentPage - 2)">{{currentPage - 2}}</button>
              <button @click="changeCurrentPage(currentPage - 1)">{{currentPage - 1}}</button>
              <button class="active">{{currentPage}}</button>
              <button @click="changeCurrentPage(currentPage + 1)">{{currentPage + 1}}</button>
              <button @click="changeCurrentPage(currentPage + 2)">{{currentPage + 2}}</button>
              <button :disabled="true">···</button>
              <button @click="changeCurrentPage(pageTotal)">{{pageTotal}}</button>
            </template>
            <!--下一页-->
            <button @click="nextPage" :disabled="currentPage === pageTotal"  class="pagess">下一页</button>
          </div>
        </div>
      </div>
      <div class="jiao"  v-show="jiaos">
        <div class="cc">
          <h2>派发工单</h2>
          <ul class="selec">
            <li class="bu"><b>分管部门:</b>
              <em @click="chooseTree">{{bumen.deptName}}</em>
              <div class="tree" v-show="treeShow">
                <el-tree :data="datas" node-key="deptId"  default-expand-all @node-click="handleNodeClick"  :props="defaultProps">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span>
                          <i :class="data.icon"></i>{{ node.label }}
                      </span>
                  </span>
                </el-tree>
              </div>
            </li>
            <li class="bu">
              <b>分管部门:</b>
              <em  @click="choosebu">{{jingban.username}}</em>
              <ul class="ren" v-show="renShow">
                <li v-for="(item,idx) in jingbanlist" :key="idx" @click="chooseren(item)">{{item.username}}</li>
              </ul>
            </li>
          </ul>
          <button class="save" @click="savepai">提交</button>
          <strong class="el-icon-close" @click="cloose"></strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let that;
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import '../../../assets/css/page.less';
  export default {
    name: "faren",
    components: { Treeselect },
    data() {
      return {
        jingbanlist:'',
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
        userId:'',
        title:'',
        orderList:'',
        msg:'',
        treeShow:false,
        renShow:false,
        jiaos:false,
        datas:[],
        bumen:'',
        defaultProps: {
          children: 'childlist',
          label: 'deptName'
        },
        jingban:'',
        orderId:''
      }
    },
    beforeCreate(){
      that=this;
    },
    created() {
      var a=JSON.parse(localStorage.getItem('personal'));
      this.msg=a;
      this.userId=a.userId;
      var data={
        userId: this.userId,
        state: -1,
        title: this.title,
        current: this.currentPage,
        size: this.pageConfig.pageSize
      };;;
      this.getOrderList(data);
    },
    methods:{
      handleNodeClick(data) {
        this.treeShow=false;
        this.bumen=data;
        this.axios.post(`/web/department/distribution`,{deptId:data.deptId}).then(({data})=>{
          console.log(data);;;
          this.jingbanlist=data.data;
        })
      },
      append(data) {
        console.log("当前data为：",data);
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      //选择分管部门
      chooseTree(){
        if( this.treeShow==false){
          this.treeShow=true;
        }else{
          this.treeShow=false;
        }
      },
      //选择经办人
     choosebu(){
       if( this.renShow==false){
         this.renShow=true;
       }else{
         this.renShow=false;
       }
     },
      //工单派发
      savepai(){
        if(this.bumen!=''&&this.jingban!=''){
          this.axios.post('/web/order/distribution',{operatorId:this.jingban.departmentId,orderId:this.orderId,userId:this.userId}).then(({data})=>{
            console.log(data.code);
            if(data.code==10001){
              var data={
                userId: this.userId,
                state: -1,
                title: this.title,
                current: this.currentPage,
                size: this.pageConfig.pageSize
              };;;
              this.getOrderList(data);
              this.jiaos=false;
            }
          })
        }

      },
      chooseren(i){
        this.renShow=false;
        this.jingban=i;
      },
      cloose(){
        this.jiaos=false;
      },
      jiaoban(i){
        this.jiaos=true;
        this.orderId=i;
        //获取分管部门列表
        this.axios.post('/web/department/department',).then(({data})=>{
          console.log(data.data);
          this.datas=data.data;
        })

      },
      prePage(){
        this.currentPage -= 1;
        var data={
          userId: this.userId,
          state: -1,
          title: this.title,
          current: this.currentPage,
          size: this.pageConfig.pageSize
        };;;
        this.getOrderList(data);
      },
      nextPage(){
        this.currentPage += 1;
        var data={
          userId: this.userId,
          state: -1,
          title: this.title,
          current: this.currentPage,
          size: this.pageConfig.pageSize
        };;;
        this.getOrderList(data);
      },
      changeCurrentPage(i){
        this.currentPage = i;
        var data={
          userId: this.userId,
          state: -1,
          title: this.title,
          current: this.currentPage,
          size: this.pageConfig.pageSize
        };;;
        this.getOrderList(data);
      },
      clearFen(i) {
        return i.substring(0, i.indexOf(" "));
      },
      //获取自己的在线诉求
      getOrderList(datas) {
        this.axios
          .post("/web/order/list", datas)
          .then(({ data }) => {
            if (data.code == 10001) {
              this.orderList = data.data.records;
              this.pageTotal=data.data.pages;
              this.currentPage=data.data.current;
              this. pageConfig.pageSize=data.data.size;
              this. pageConfig.total=data.data.total;
            }
            if(data.code == 401){
              localStorage.clear();
              that.$router.push('/')
            }
          });
      },
    }
  }
</script>

<style scoped lang="less">
  .ddd{
    width: 100%;
    height: 20px;
    background: #f5f5f5;
  }
  .warp{
    background: #f3f3f3;
  }
  .content{
    margin: 0 30px;
    background: #fff;
    ul{
      width: 100%;
      background: #fff;
      padding-bottom: 20px;
      li{
        padding: 20px 0;
        height: auto;
        border-bottom: 1px solid #b7b7b7;
        .l_title{
          margin-top: 20px;
          h3{
            display: inline-block;
            height: 24px;
            line-height:18px;
            color: #333;
            font-size: 18px;
            font-weight:600;
            max-width: 900px;
            margin-right: 20px;
          }
          span{
            display:inline-block;
            font-size: 14px;
            line-height: 24px;
            padding: 0 15px;
          }
          span.dai{
            color: #999;
          }
          span.ban{
            color: #ff9000;
          }
          span.ok{
            color: #d73140;
          }
          span.ping{
            color: #1b8cff;
            cursor: pointer;
          }
          span.ping:hover{
            color: #2c6af8;
          }
        }
        .int{
          margin-top: 10px;
          height: 42px;
          span{
            display: block;
            height: 42px;
            line-height: 42px;
            font-size: 12px;
            color: #666;
            float: left;
            margin-right: 20px;
          }
        }
        .msg{
          margin-top: 10px;
          line-height: 40px;
          p{
            display: block;
            font-size: 16px;
            a{
              color: #d73240;
            }
          }
        }
      }
      li:last-child{
        border-bottom: none;
      }
    }
  }
  .page{
    margin: 30px 0;
    padding-bottom: 40px;
    text-align: center;
    div{
      display: inline-block;
    }
  }
</style>
<style scoped lang="less">
  .jiao{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.16);
    position: fixed;
    top: 0;
    left: 0;
    .cc::-webkit-scrollbar {display:none}
    .cc{
      width: 1200px;
      height: 800px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      overflow-y:auto ;
      overflow-x:hidden ;
      h2{
        height: 40px;
        line-height: 40px;
        font-weight: 400;
        font-size: 18px;
        background: #f2f2f2;
        padding:0 40px;
      }
      .selec{
        width: 800px;
        margin: 30px auto;
        .bu{
          position: relative;
          width: 100%;
          padding: 0;
          margin-bottom: 20px;
          border: none;
          overflow: hidden;
          b{
            display:block;
            height: 30px;
            line-height: 30px;
            float: left;
            width: 80px;
            font-weight: 400;
          }
          em{
            float: left;
            display: block;
            margin-left: 18px;
            height: 30px;
            line-height: 30px;
            width: 680px;
            border: 1px solid #e6e6e6;
            padding-left: 20px;
          }
          .tree{
            width: 700px;
            background: #fff;
            display: block;
           float: right;
            border: 1px solid #e6e6e6;
          }
          .ren{
            width: 700px;
            background: #fff;
            display: block;
           float: right;
            border: 1px solid #e6e6e6;
            padding-bottom: 0;
            li{
              height: 30px;
              line-height: 30px;
              padding:0 20px;
              font-size: 16px;
              border-bottom: 1px solid #e6e6e6;
              cursor: pointer;
            }
            li:last-child{
              border: none;
            }
            li:hover{
              background: #e6e6e6;
            }
          }
        }
      }
      .save{
        width: 130px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        display: block;
        margin:0 auto;
        border: none;
        outline: none;
        background: #ff4c4c;
        color: #fff;
        cursor: pointer;
        border-radius: 4px;
      }
      .save:hover{
        background: #f56c6c;
      }
      strong{
        display: block;
       font-size: 30px;
        position: absolute;
        right: 0px;
        top: 0;
        color: #4d4d4d;
      }
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    i{
      width: 19px;
    }
  }
</style>
