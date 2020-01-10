<template>
  <div class="hello">
    <div class="tui">
      <p>
        <span>标题</span>
        <i>分类</i>
        <strong>浏览量</strong>
        <b>时间</b>
      </p>
      <ul>
        <li v-for="(item,idx) in recommendedlist" :key="idx">
          <router-link
            tag="a"
            :to="{path:'/recommended',query:{id:item.recommendId}}"
          >{{item.title}}</router-link>
          <i>{{item.typeString}}</i>
          <strong>{{item.viewCnt}}</strong>
          <b>{{(item.publishTime)}}</b>
        </li>
      </ul>
    </div>
    <div class="page">
      <div>
        <button v-if="currents===1" disabled="disabled">上一页</button>
        <button v-if="currents>1" @click="zhbackPage">上一页</button>
        <button>
          第
          <b>{{currents}}</b> 页
        </button>
        <button>
          共
          <b>{{zhpages}}</b> 页
        </button>
        <button v-if="currents<zhpages" @click="zhnextPage">下一页</button>
        <button v-if="currents===zhpages" disabled="disabled">下一页</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currents: 1,
      zhsize: 10,
      zhpages: "",
      recommendedlist: "",
        shoucangtotal:'',
        shoucangpages:''
    };
  },
  methods: {
    //获取推荐页面列表数据封装
    getrecommonded(data) {
      this.axios.post("/web/user/recommend", data).then(({ data }) => {
        console.log(data.data);
        this.zhpages = data.data.pages;
        this.currents = data.data.current;
        this.recommendedlist = data.data.records;
        console.log( this.recommendedlist);
      });
    },
    zhbackPage() {
      this.shoucangcurrent -= 1;
      this.axios
        .post("/web/usercollection/usercollect", {
          type: -1,
          userId: this.userId,
          token: this.token,
          current: this.shoucangcurrent,
          size: this.shoucangsize
        })
        .then(({ data }) => {
          console.log(data.data);
          this.recommendedlist = data.data.records;
          this.shoucangtotal = data.data.total;
          this.shoucangcurrent = data.data.current;
          this.shoucangpages = data.data.pages;
        });
    },
    zhnextPage() {
      this.shoucangcurrent += 1;
      this.axios
        .post("/web/usercollection/usercollect", {
          type: -1,
          userId: this.userId,
          token: this.token,
          current: this.shoucangcurrent,
          size: this.shoucangsize
        })
        .then(({ data }) => {
          console.log(data.data);
          this.recommendedlist = data.data.records;
          this.shoucangtotal = data.data.total;
          this.shoucangcurrent = data.data.current;
          this.shoucangpages = data.data.pages;
        });
    }
  }
};
</script>
<style lang="less" scoped>
  .hello{
    background: #fff;
  }
.tui {
  p {
    width: 791px;
    height: 54px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    margin-left: 51px;
    border-bottom: 1px solid #d6d6d6;
    > * {
      font-size: 16px;
      font-weight: bold;
      color: rgba(69, 69, 69, 1);
      margin-right: 38px;
    }
    i {
      width: 67px;
      text-align: center;
    }
    span {
      width: 220px;
      padding-left: 65px;
    }
    strong {
      width: 121px;
      padding-left: 8px;
    }
    b {
      width: 100px;
    }
  }
  ul {
    li {
      width: 791px;
      height: 50px;
      line-height: 50px;
      margin-left: 51px;
      border-bottom: 1px dashed #d6d6d6;
      > * {
        font-size: 16px;
        color: rgba(69, 69, 69, 1);
        margin-right: 38px;
        font-weight: 400;
        display: block;
        float: left;
        height: 50px;
        line-height: 50px;
      }
      i {
        width: 67px;
        text-align: center;
      }
      a {
        width: 280px;
        padding-left: 20px;
        overflow: hidden;
      }
      strong {
        width: 100px;
        padding-left: 8px;
      }
      b {
        width: 160px;
      }
    }
    li:last-child {
      border-bottom: none;
    }
    li:hover {
      background: #e7f5ff;
    }
  }
}
.page {
  position: absolute;
  bottom: 24px;
  left: 0;
  width: 100%;
  height: 35px;
  div {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    height: 35px;
    button {
      cursor: pointer;
      display: block;
      float: left;
      border: none;
      outline: none;
      height: 35px;
      line-height: 35px;
      font-size: 18px;
      font-weight: 400;
      color: rgba(69, 69, 69, 1);
      background: #fff;
      b {
        color: #e8390a;
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
}
</style>
