<template>
  <div class="top">
    <head-nav :clect="clectnav" :title="toptitle"></head-nav>
  </div>
<div class="warp">
  <h4>sgsdgsgsrygeyh</h4>
</div>
  <div class="footer">
    <footer-nav></footer-nav>
  </div>
</template>

<script>
    import headNav from "../../../headNav";
    import footerNav from "../../../footer";
    export default {
        name: "indexserchdetail",
        components:{
            headNav,
            footerNav
        },
        data(){
            return{
                clectnav: 0,
                toptitle:'铜陵市民营经济云服务智慧平台',
            }
        }
    }
</script>

<style scoped>

</style>
