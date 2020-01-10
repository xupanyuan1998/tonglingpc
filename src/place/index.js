import places from './place.vue'
// 这里是重点
const place = {
  install: function(Vue){
    Vue.component('place',places)
  }
}

// 导出组件
export default place
