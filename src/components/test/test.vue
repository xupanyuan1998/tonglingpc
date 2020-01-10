<!--<template>-->
<!--  <div>-->
<!--    <el-button type="primary" @click="show">提示弹框</el-button>-->
<!--    <el-button type="warning" @click="confirm">警告按钮</el-button>-->
<!--    <el-button type="success" @click="suc">成功按钮</el-button>-->
<!--    -->
<!--    <place :placeshow="placeshow" :success="success" @hide=" placeshow = !placeshow" :succmsg="succmsg"></place>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--    export default {-->
<!--        name: "test",-->
<!--        data() {-->
<!--            return {-->
<!--              placeshow:false,-->
<!--              success:3,-->
<!--              succmsg:'',-->
<!--            }-->
<!--        },-->
<!--      methods:{-->
<!--          show(){-->
<!--            this.placeshow=true;-->
<!--            this.success=3;-->
<!--            this.succmsg='删除成功'-->
<!--          },-->
<!--        confirm(){-->
<!--          this.placeshow=true;-->
<!--          this.success=4;-->
<!--        },-->
<!--        suc(){-->
<!--          this.placeshow=true;-->
<!--          this.success=4;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--</script>-->

<!--<style>-->

<!--</style>-->
<!-- @author zhengjie -->
<template>
  <div class="icon-body">
    <el-input v-model="name" style="position: relative;width:95%" clearable placeholder="请输入图标名称" @clear="filterIcons" @input.native="filterIcons">
      <i slot="suffix" class="el-icon-search el-input__icon"/>
    </el-input>
    <div class="icon-list">
      <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
        <!--<span class="icon iconfont icon-pengyouquan"></span>-->
        <span>{{ item.iconName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'IconSelect',
    created() {
      this.filterIcons();
    },
    data() {
      return {
        name: '',
        iconList: []
      }
    },
    methods: {
      filterIcons() {
        this.axios.post(
          "manage/menu/menuiconlist",
          {iconLog:this.name}
        ).then(
          (res)=>{
            console.log(res);
            if (res.data.code != 10001) return this.$message.error(res.data.msg);
            this.iconList=res.data.data;
            console.log(this.iconList);
          }
        )

      },
      selectedIcon(data) {
        this.$emit('selected', data.iconLog);
        document.body.click()
      },
      reset() {
        this.name = ''
        this.iconList = []
      }
    }
  }
</script>

<style scoped lang="less">
  .icon-body {
    width: 100%;
    /*padding: 10px;*/
    .icon-list {
      height: 200px;
      overflow-y: scroll;
      .icon-r{
        padding-right: 10px;
      }
      div {
        height: 30px;
        line-height: 30px;
        margin-bottom: -5px;
        cursor: pointer;
        width: 33%;
        float: left;
      }
      span {
        display: inline-block;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
  }
</style>
