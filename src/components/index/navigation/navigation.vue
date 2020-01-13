<template>
    <div class="hello">
      <div class="top">
        <head-nav :clect="clectnav" :title="toptitle"></head-nav>
      </div>
      <div class="warp">
        <div class="online">
          <h4>在线资源</h4>
          <ul>
            <li @click="she">
              <b class="she"></b>
              <span>企业设立</span>
            </li>
            <li @click="shang">
              <b class="shang"></b>
              <span >商标注册</span>
            </li>
            <li @click="zhi">
              <b class="zhi"></b>
              <span >职工社保</span>
            </li>
            <li @click="shui" class="clear_r">
              <b class="shui"></b>
              <span >税务登记</span>
            </li>
            <li @click="bian">
              <b class="bian"></b>
              <span >变更登记</span>
            </li>
            <li @click="ji" class="clear_r">
              <b class="bei"></b>
              <span>机构备案</span>
            </li>
          </ul>
        </div>
        <div class="online">
          <h4>资质审批</h4>
          <ul>
            <li @click="jiu">
              <b class="jiu"></b>
              <span>资质评定</span>
            </li>
            <li @click="zi">
              <b class="zi"></b>
              <span>荣誉称号</span>
            </li>
          </ul>
        </div>
        <div class="online">
          <h4>奖补申请</h4>
          <ol>
            <li @click="gozhinan">各部门政策</li>
            <li @click="shen">企业申报</li>
          </ol>
        </div>
      </div>
      <div class="footer">
        <footer-nav></footer-nav>
      </div>
      <place  :placeshow="placeshow"  @hide="placeshow = false" :success="success" :errorshow="plas"></place>
    </div>
</template>

<script>
  import headNav from "../../headNav";
  import footerNav from "../../footer"
    export default {
        name: "navigation",
      components:{
        headNav,
        footerNav
      },
      data(){
          return {
            toptitle:'铜陵市民营经济云服务智慧平台',
            clectnav: 3,
            placeshow:false,
              success:2,
              plas:'',
              token:'',
              personal:'',
          }
      },
        created(){
            var a=localStorage.getItem('token');
            this.token=a;
            this.personal=JSON.parse(localStorage.getItem('personal'));
        },
      methods:{
          //各部门政策
          gozhinan(){
            this.$router.push('/information/guides')
          },
        she(){
            window.open(' http://tl.ahzwfw.gov.cn/bog-bsdt/static/workProcess/components/servicesList.html?subjecttype=C&parentItemtypeName=%u4F01%u4E1A%u5F00%u529E&itemtypeName=%u8BBE%u7ACB%u767B%u8BB0&itemtypeType=GBDFFRQYKB&itemtypeCode=10','_blank');
        },
        shang(){
          window.open('http://tl.ahzwfw.gov.cn/bog-bsdt/static/workProcess/components/servicesList.html?subjecttype=C&parentItemtypeName=%u5546%u6807%u6CE8%u518C&itemtypeName=%u5546%u6807%u6CE8%u518C&itemtypeType=GBDFFRSBZC&itemtypeCode=100','_blank');
        },
        zhi(){
          window.open('http://tl.ahzwfw.gov.cn/bog-bsdt/static/workProcess/components/servicesList.html?subjecttype=C&parentItemtypeName=%u798F%u5229%u8865%u8D34&itemtypeName=%u804C%u5DE5%u793E%u4FDD&itemtypeType=GBDFFRFLBT&itemtypeCode=40','_blank');
        },
        shui(){
          window.open('http://tl.ahzwfw.gov.cn/bog-bsdt/static/workProcess/components/servicesList.html?subjecttype=C&parentItemtypeName=%u4F01%u4E1A%u5F00%u529E&itemtypeName=%u7A0E%u52A1%u767B%u8BB0&itemtypeType=GBDFFRQYKB&itemtypeCode=12','_blank');
        },
        bian(){
          window.open('http://tl.ahzwfw.gov.cn/bog-bsdt/static/workProcess/components/servicesList.html?subjecttype=C&parentItemtypeName=%u80A1%u6743%u51FA%u8D44&itemtypeName=%u53D8%u66F4%u767B%u8BB0&itemtypeType=GBDFFRGQCZ&itemtypeCode=71','_blank');
        },
        ji(){
          window.open('http://tl.ahzwfw.gov.cn/bog-bsdt/static/workProcess/components/servicesList.html?subjecttype=C&parentItemtypeName=%u516C%u53F8%u5907%u6848&itemtypeName=%u673A%u6784%u5907%u6848&itemtypeType=GBDFFRGSBA&itemtypeCode=60','_blank');
        },
        jiu(){
          if(this.token==null){
            this.placeshow=true;
            this.success=2;
          }else{
              if(this.personal.roleId>1){
                  this.placeshow=true;
                  this.success=5;
                  this.plas='此页面只提供给企业！！！'
              }else{
                  this.$router.push({
                      path:'/shenpi',
                      query:{
                          id:0
                      }
                  })
              }

          }
        },
        zi(){
          if(this.token==null){
              this.placeshow=true;
              this.success=2;
          }else{
              if(this.personal.roleId>1){
                  this.placeshow=true;
                  this.success=5;
                  this.plas='此页面只提供给企业！！！'
              }else{
                  if(this.personal.roleId>1){
                      this.placeshow=true;
                      this.success=5;
                      this.plas='此页面只提供给企业！！！'
                  }else{
                      this.$router.push({
                          path:'/shenpi',
                          query:{
                              id:1
                          }
                      })
                  }

              }

          }
        },
        shen(){
            if(this.token==null){
              this.placeshow=true;
                this.success=2;
            }else{
                if(this.personal.roleId>1){
                    this.placeshow=true;
                    this.success=5;
                    this.plas='此页面只提供给企业！！！'
                }else{
                    this.$router.push({
                        path:'/shenpi',
                        query:{
                            id:2
                        }
                    })
                }

            }

        }
      }
    }
</script>

<style scoped lang="less">
.hello{
  background: #f5f5f5;
}
  .warp{
    width: 1200px;
    margin: 50px auto;
    background: #fff;
    padding-top: 10px;
    padding-bottom: 100px;
    .online{
      padding: 0 30px;
      margin-bottom: 20px;
      h4{
        font-size: 20px;
        height: 60px;
        line-height: 60px;
        color: #0e0d0d;
        font-weight: 400;
      }
      ul{
        overflow: hidden;
        padding: 20px;
        li{
          display: block;
          float: left;
          width: 260px;
          height: 106px;
          margin-bottom: 20px;
          margin-right: 20px;
          box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          b{
            display: block;
            float: left;
            width: 66px;
            height: 66px;
            margin: 20px 40px;
            transition: all 0.5s;
          }
          b.jiu{
            background: url("../../../../static/images/168.png") no-repeat;
            background-position: -51px -51px;
          }
          b.zi{
            background: url("../../../../static/images/161.png") no-repeat;
            background-position: -51px -51px;
          }
          b.she{
            background: url("../../../../static/images/159.png") no-repeat;
            background-position: -51px -51px;
          }
          b.shang{
            background: url("../../../../static/images/160.png") no-repeat;
            background-position: -51px -51px;
          }
          b.zhi{
            background: url("../../../../static/images/167.png") no-repeat;
            background-position: -51px -51px;
          }
          b.shui{
            background: url("../../../../static/images/162.png") no-repeat;
            background-position: -51px -51px;
          }
          b.jiao{
            background: url("../../../../static/images/163.png") no-repeat;
            background-position: -51px -51px;
          }
          b.tou{
            background: url("../../../../static/images/164.png") no-repeat;
            background-position: -51px -51px;
          }
          b.bian{
            background: url("../../../../static/images/165.png") no-repeat;
            background-position: -51px -51px;
          }
          b.bei{
            background: url("../../../../static/images/166.png") no-repeat;
            background-position: -51px -51px;
          }
          span{
            display: block;
            float: left;
            height: 106px;
            font-size: 18px;
            line-height: 106px;
          }
        }
        li:hover{
          background: #e7390a;
          b{
            background-position: -51px -203px;
          }
          span{
            color: #fff;
          }
        }
        li.clear_r{
          margin-right: 0;
        }
      }
      ol{
        overflow: hidden;
        padding:20px;
        li{
          display: block;
          float: left;
          width:150px;
          height: 60px;
          margin-bottom: 20px;
          margin-right: 20px;
          box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          text-align: center;
          line-height:60px;
          font-size: 20px;
          cursor: pointer;
        }
        li:hover{
          background: #cd0600;
          color: #fff;
        }
      }
    }
  }
</style>
