<template>
    <div>
      我是第二个测试页面
      <button @click="show=!show">点我</button>
      <test :show="show"></test>
    </div>
</template>

<script>
  import test from './test'
    export default {
        name: "test1",
      components:{test},
        data() {
            return {
              show:false
            }
        }
    }
</script>

<style scoped>

</style>
