<template>
  <div class="layout-container">
    <div class="content-container">
      <router-view></router-view>
    </div>
    <div class="aside">
      <ul>
        <li v-for="item in routers" :key="item.path" :class="{'is-active':activePath === item.path}"
            @click="jumpTo(item.path)">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import router from '@/router/index'
  export default {
    name: 'layout',
    data () {
      return {
        activePath:"/"
      }
    },
    computed:{
      routers: function(){
        return router.options.routes[0].children
      }
    },
    methods:{
      jumpTo(path){
        this.$router.push({path:path})
        this.activePath = path
      }
    },
    mounted () {
      console.log(this.$route)
      this.activePath = this.$route.path
    }
  }
</script>
<style lang="less"
       scoped>
  .layout-container {
    display: flex;
    height: 100%;


    .aside {
      width: 200px;
      right: 0px;
      float: right;
      align-content: end;
      border-left: 1px solid #0ab877;
      background: #3bc692;
      color:#f2f2f2;
      li{
        list-style: none;
        height:54px;
        line-height: 54px;
        padding: 4px 14px;
        border-bottom:1px solid #e4e4e4;
        text-align: left;
        font-size:18px;

        &:hover{
          background:#0c8032;
        }
      }

      .is-active{
        background:#0c8032;
      }
    }

    .content-container {
      display:inline-flex;
      flex-direction: row;
      left:0px;
      flex:1;
    }
  }
</style>
