<template>
  <div class="pd8">
    <div style="height:20px; text-align: left" class="mb10 ml16">
      <i class="el-icon-s-flag mr5" style="color:#e41919"></i><span class="mr16">高高报</span>
      <i class="el-icon-s-flag mr5" style="color:#e4e12d"></i><span class="mr16">高报</span>
      <i class="el-icon-s-flag mr5" style="color:#20e449"></i><span class="mr16">预警</span>
      <i class="el-icon-s-flag mr5" style="color:#3036e4"></i><span class="mr16">失联</span>
      <i class="el-icon-s-flag mr5" style="color:#a3d9e4"></i><span class="mr16">正常</span>
    </div>
    <div style="position:fixed;width:400px;height: 100%;border: 1px solid #f5a623">
      <el-tree
              :data="data"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node,data }">
          <span>{{ node.label }}</span>
          <span v-if="data.type === '电机'">
             <i class="el-icon-s-flag mr5" :style="{'color':renderColor(data.state)}"></i>
          </span>
          <span v-if="data.type === '端盖'">
             <i class="el-icon-s-flag mr5" :style="{'color':renderColor(data.state)}"></i>
          </span>
          <span v-if="data.type === '属性'">
            <span class="mr16">{{data.value}}</span>
             <i class="el-icon-s-flag mr5" :style="{'color':renderColor(data.state)}"></i>
          </span>
        </span>
      </el-tree>
    </div>
  </div>

</template>

<script>
  import {data} from "./constant/index"
  const Color = ["#e41919","#e4e12d","#20e449","#3036e4","#a3d9e4"]
  export default {
    name: 'tree',

    data () {
      return {
        data: JSON.parse(JSON.stringify(data))
      }
    },
    computed:{

    },
    methods: {
      renderColor: function(value){
        console.log(value)
        return Color[value]
      }
    }
  }
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
