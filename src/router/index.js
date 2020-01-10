import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      name: "index",
      component:resolve => require(['@/components/index'], resolve)
    },//首页
    {
      path: "/test",
      name: "test",
      component:resolve => require(['@/components/test/test'], resolve)
    },
    {
      path: "/test1",
      name: "test1",
      component:resolve => require(['@/components/test/test1'], resolve)
    },
    {
      path:'/navigation',
      name:'navigation',
      component:resolve => require(['@/components/index/navigation/navigation'], resolve)
    },//办事导航
    {
      path:'/supermarket',
      name:'supermarket',
      component:resolve => require(['@/components/index/supermarket/supermarket'], resolve)
    },//金融机构
    {
      path:'/shenpi',
      name:'shenpi',
      component:resolve => require(['@/components/index/shenpi/shenpi'], resolve)
    },//在线审批
    {
      path:'/shenpi/shenpidetail',
      name:'shenpidetail',
      component:resolve => require(['@/components/index/shenpi/shenpidetail'], resolve)
    },//在线审批
    {
      path:'/falv',
      name:'falv',
      component:resolve => require(['@/components/index/supermarket/falv'], resolve)
    },
    {
      path:'/puhui',
      name:'puhui',
      component:resolve => require(['@/components/index/supermarket/puhui'], resolve)
    },//普惠金融
    {
      path:'/jinrong',
      name:'jinrong',
      component:resolve => require(['@/components/index/supermarket/jinrong'], resolve)
    },//金融创新产品
    {
      path: "/indexserch",
      name: "indexserch",
      component: () => import('@/components/index/indexserch/indexserch')
    }, //首页搜索页面
    {
      path: "/recommended",
      name: "recommended",
      component: () => import('@/components/index/recommended/recommended')
    }, //重点推荐
    {
      path: "/policy/policydetali",
      name: "noticedatali",
      component: () => import('@/components/index/policy/policydetali')
    }, //公告详情
    {
      path: "/policy",
      name: "policy",
      component: () => import('@/components/index/policy/policy')
    }, //公告
    {
      path: "/information",
      name: "information",
      component: () => import('@/components/index/information/information')
    },//政策信息
    {
      //政策信息列表
      path: "/informationMore",
      name: "informationMore",
      component: () => import('@/components/index/information/informationMore')
    },
    {
      path: "/information/informationMore/informationdetali",
      name: "informationdetali",
      component: () => import('@/components/index/information/informationdetali')
    }, //政策信息详情
    {
      path: "/openly",
      name: "openly",
      component: () => import('@/components/index/openly/openly')
    },//政务公开
    {
      path: "/information/guides",
      name: "guides",
      component: () => import('@/components/index/information/guides')
    },  //办事指南
    {//经办人在线诉求详情
      path: '/Antonym/Operator/list/listdetail',
      name: 'listdetail',
      component: () => import('@/components/index/Antonym/listdetail'),
    },
    {
      path: "/information/guides/guidesDetali",
      name: "guidesDetali",
      component: () => import('@/components/index/information/guidesDetali')
    }, //办事指南详情
    {
      path: "/Antonym",
      name: "Antonym",
      redirect: '/Antonym/faren',
      component:() => import('@/components/index/Antonym/Antonym'),
      children: [
        {
          path: '/Antonym/faren',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'farens',
          component:() => import('@/components/index/Antonym/faren')
        },
        {
          path: '/Antonym/Operator',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'Operator',
          redirect:'/Antonym/Operator/list',
          component:() => import('@/components/index/Antonym/Operator'),
          children:[
            {//经办人在线诉求列表
              path: '/Antonym/Operator/list',
              name: 'list',
              component: () => import('@/components/index/Antonym/list'),
            },
            {//在线诉求统计
              path: '/Antonym/Operator/tableMysuqiu',
              name: 'tableMysuqiu',
              component: () => import('@/components/index/Antonym/tableEc/table-mysuqiu'),
            },
            {//我的办理企业
              path: '/Antonym/Operator/tableMq',
              name: 'tableMq',
              component: () => import('@/components/index/Antonym/tableEc/table-mq'),
            },
          ]
        },
        {//领导人登录页面
          path: '/Antonym/Leadership',
          name: 'Leadership',
          redirect:'/Antonym/Leadership/tableMysuqiu',
          component: () => import('@/components/index/Antonym/Leadership'),
          children:[//统计报表
            {//在线诉求统计
              path: '/Antonym/Leadership/tableMysuqiu',
              name: 'tableMysuqiu',
              component: () => import('@/components/index/Antonym/tableEc/table-mysuqiu'),
            },
            {//诉求办理统计
              path: '/Antonym/Leadership/tableSqbl',
              name: 'tableSqbl',
              component: () => import('@/components/index/Antonym/tableEc/table-sqbl'),
            },
          ]
        }
      ]
    },//在线诉求
    {
      path: "/Corporation",
      name: "Corporation",
      component:() => import('@/components/index/Corporation/Corporation')
    }, //民企风采
    {
      path: "/Corporation/Corporationlist",
      name: "Corporationlist",
      component:() => import('@/components/index/Corporation/Corporationlist')
    }, //企业列表
    {
      path: "/Antonym/Antonymdetali",
      name: "Antonymdetali",
      component:() => import('@/components/index/Antonym/Antonymdetali')
    }, //在线诉求信息详情
    {
      path: "/Corporation/myspace",
      name: "myspace",
      component:() => import('@/components/index/Corporation/myspace')
    },//企业微空间
    {
      path: "/chaoshi",
      name: "chaoshi",
      component:() => import('@/components/index/supermarket/chaoshi')
    },//金融超市
    {
      path: "/bank",
      name: "bank",
      component:() => import('@/components/index/supermarket/bank')
    },//金融超市
    {
      path: "/tellme",
      name: "tellme",
      component:() => import('@/components/index/tellme/tellme')
    },//关于我们
    {
      path: "/personal",
      name: "personal",
      component: resolve => require(['@/components/personal/personal'], resolve),
      children: [
        {
          path: 'faren',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'faren',
          component:() => import('@/components/mineCenter/personr/shenren')
        },//身份认证
        {
          path: 'supplypublic',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'supplypublic',
          component:() => import('@/components/mineCenter/supplypublic/supplypublic'),
        },//供需发布
        {
          path: 'addsupplypublic',
          name: 'addsupplypublic',
          component: () => import('@/components/mineCenter/supplypublic/addsupplypublic'),
        },//供需发布添加
        {
          path: 'administration',
          name: 'administration',
          component: () => import('@/components/mineCenter/administration/administration'),
        },//产品管理
        {
          path: 'addadministration',
          name: 'addadministration',
          component: () => import('@/components/mineCenter/administration/addadministration'),
        },//产品管理添加
        {
          path: 'setpassword',
          name: 'setpassword',
          component: () => import('@/components/mineCenter/setpassword/setpassword'),
        },//修改密码
        {
          path: 'news',
          name: 'news',
          component: () => import('@/components/mineCenter/news/news'),
        },//系统消息
        {
          path: 'shoucang',
          name: 'shoucang',
          component: () => import('@/components/mineCenter/shoucang/shoucang'),
        },//收藏
        {
          path: 'onlinesuqiu',
          name: 'onlinesuqiu',
          component: () => import('@/components/mineCenter/onlinesuqiu/onlinesuqiu'),
        },//在线诉求
        {
          path: 'queryonlinesuqiu',
          name: 'queryonlinesuqiu',
          component: () => import('@/components/mineCenter/onlinesuqiu/queryonlinesuqiu'),
        },//在线诉求查看
        {
          path: 'importanttuijian',
          name: 'importanttuijian',
          component: () => import('@/components/mineCenter/importanttuijian/importanttuijian'),
        },//重点推荐
        // {
        //   path: 'handleenterprise',
        //   name: 'handleenterprise',
        //   component: () => import('@/components/mineCenter/handleenterprise/handleenterprise'),
        // },//办理企业
        {
          path: 'friend',
          name: 'friend',
          component: () => import('@/components/mineCenter/friend/friend'),
        },//朋友圈
        {
          path: 'enterprisezizhi',
          name: 'enterprisezizhi',
          component: () => import('@/components/mineCenter/enterprisezizhi/enterprisezizhi'),
        },//企业资质
        {
          path: 'jingyang',
          name: 'jingyang',
          component: () => import('@/components/mineCenter/jingyan/jingyang'),
        },//经验推荐列表
        {//网站内容
          path: 'tableWznr',
          name: 'tableWznr',
          component: () => import('@/components/index/Antonym/tableEc/table-wznr'),
        },
        {//政策发布效果统计
          path: 'tableFa',
          name: 'tableFa',
          component: () => import('@/components/index/Antonym/tableEc/table-fa'),
        },
        {//企业建档统计
          path: 'tableJd',
          name: 'tableJd',
          component: () => import('@/components/index/Antonym/tableEc/table-jd'),
        },
        {//评分统计
          path: 'stars',
          name: 'stars',
          component: () => import('@/components/index/Antonym/tableEc/stars'),
        },
        {//企业活跃统计
          path: 'tableQyhy',
          name: 'tableQyhy',
          component: () => import('@/components/index/Antonym/tableEc/table-qyhy'),
        },
        {//注册资金统计
          path: 'zijin',
          name: 'zijin',
          component: () => import('@/components/index/Antonym/tableEc/zijin'),
        },
      ]
    },//个人中心
    {
      path: "/registered",
      name: "registered",
      component:() => import('@/components/registered')
    },//注册页面
    {
      path: "/resultPassword",
      name: "resultPassword",
      component:() => import('@/components/resultPassword')
    },//修改密码
    {
      path: "/newslist",
      name: "newslist",
      component:() => import('@/components/index/news/newslist')
    },  //新闻列表
    {
      path: "/newslist/newsdetali",
      name: "newsdetali",
      component:() => import('@/components/index/news/newsdetali')
    }, //新闻详情
    {
      path: "/parkstyle/parkStyle",
      name: "parkStyle",
      component:() => import('@/components/index/parkstyle/parkStyle')
    },//园区风采列表
    {
      path: "/parkstyle/parkDetail",
      name: "parkDetail",
      component:() => import('@/components/index/parkstyle/parkDetail')
    },//园区风采详情
    // {
    //   path: "/fastdeclarelist",
    //   name: "fastdeclarelist",
    //   component:() => import('@/components/index/fastdeclare/fastdeclarelist')
    // },//快速申报列表
    // {
    //   path: "/fastdeclarelist/fastdeclaredetali",
    //   name: "fastdeclaredetali",
    //   component:() => import('@/components/index/fastdeclare/fastdeclaredetali')
    // }, //快速申报详情
    {
      path: "/supplyneedlist",
      name: "supplyneedlist",
      component:() => import('@/components/index/supplyneed/supplyneedlist')
    },//供应速递列表
    {
      path: "/supplyneedlist/supplyneeddetail",
      name: "supplyneeddetail",
      component:() => import('@/components/index/supplyneed/supplyneeddetail')
    }, //供应速递详情
    {
      path: "/industry",
      name: "industry",
      component: () => import('@/components/index/industry/industry')
    }, //产业基金
    {
      path: "/industry/industrydetali",
      name: "industrydetali",
      component:() => import('@/components/index/industry/industrydetali')
    },//产业基金 政策资金详情
    {
      path: "/order",
      name: "order",
      component:() => import('@/components/index/order/order')
    },//工单检测
    {
      path: "/openly/policyrsxi",
      name: "policyrsxi",
      component:() => import('@/components/index/openly/policyrsxi')
    }, //人事消息
    {
      path: "/Corporation/CorporationXycs",
      name: "CorporationXycs",
      component:() => import('@/components/index/Corporation/CorporationXycs.vue')
    } , //信用查询列表
    {
      path: "/gauge",
      name: "gauge",
      component:() => import('@/components/index/gauge/gauge')
    },//寻计问策页面
    {
      path: "/gauge/gaugedeail",
      name: "gauge",
      component:() => import('@/components/index/gauge/gaugedetail')
    },//政策前瞻详情
  ]
  /*待定路由
  *
  *{
      //添加产品管理  添加
      path: "/personal/addproduct",
      name: "addproduct",
      component:() => import('@/components/openly/openly')
    },
    {
      //添加产品管理  查看
      path: "/personal/queryproduct",
      name: "queryproduct",
      component:() => import('@/components/openly/openly')
    },
    {
      //添加企业资质
      path: "/personal/addconpanyzizhi",
      name: "addconpanyzizhi",
      component:() => import('@/components/openly/openly')
    },
    {
      //查看企业资质
      path: "/personal/queryconpanyzizhi",
      name: "queryconpanyzizhi",
      component:() => import('@/components/openly/openly')
    },
    *  {
      path: "/waterlist",
      name: "waterlist",
      component:() => import('@/components/water/waterlist')
    },//水列表
    {
      path: "/waterlist/waterdetali",
      name: "waterdetali",
      component:() => import('@/components/water/waterdetali')
    },//水详情
    {
      path: "/electriclist",
      name: "electriclist",
      component:() => import('@/components/electric/electriclist')
    }, //电列表
    {
      path: "/electriclist/electricdetali",
      name: "waterdetali",
      component:() => import('@/components/water/waterdetali')
    }, //电详情
    {
      path: "/gaslist",
      name: "gaslist",
      component:() => import('@/components/gas/gaslist')
    }, //气列表
    {
      path: "/gaslist/gasdetali",
      name: "gasdetali",
      component:() => import('@/components/gas/gasdetali')
    }, //气详情
    {
      path: "/Antonym/Antonymfrom",
      name: "Antonymfrom",
      component:() => import('@/components/Antonym/Antoymfrom')
    },//审批表单提交
    {
      path: "/Antonym/onlineWork",
      name: "onlineWork",
      component:() => import('@/components/Antonym/onlineWork')
    },//办理须知
    {
      path: "/question",
      name: "question",
      component: () => import('@/components/index')
    },//问题反馈
  *
  * */
});
