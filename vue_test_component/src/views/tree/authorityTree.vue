<template>
  <div style="width:600px;height: 100%;border: 1px solid #f5a623">
    <el-tree
            ref="tree"
            class="layer-tree"
            :indent="12"
            :data="treeData"
            node-key="id"
            default-expand-all
            :highlight-current="true"
            :expand-on-click-node="false"
            :render-content="renderContent"
    />
  </div>
</template>

<script type="text/jsx">
  import { treeData } from './constant/authorityTree'
  import { flagTree, treeToArray, updateArrayReadableByDesc, updateArrayReadableByAsc, flagTreeWrite, filterTreeByField } from './utils/authority'

  export default {
    name: 'authorityTree',
    data () {
      return {
        treeData: [],
        tokenInfo:{
          isAdmin: true,
          userId: '11',
          roles:['22']
        },
        renderContent: (h, { data, node }) => {
          if (data.id === 9) {
            console.log('node', node)
            console.log('data', data)
          }
          const parent = node.parent.data
         /* const writable = data.acl && data.permissions.filter(v => v.category === 1).length > 0
                ? isAllowWrite(this.tokenInfo, data.permissions) ? true
                  : isAllowWrite(this.tokenInfo, parent.permissions) : isAllowWrite(this.tokenInfo, parent.permissions)*/
          const readIcon = data.readAble ? <span style="color:green">可读</span> : <span style="color:red">不可读</span>
          const writableIcon = data.writAble ? <span style="color:green">可写</span> : <span style="color:red">不可写</span>
          const folder = data.type === 'layer_category' ? <span style="color:#909399;">分类: </span> : <span style="color:#909399;">图层: </span>
          return (
            <div>
               <span style="float:left">
                  {folder}
                 <span>{data.name}</span>
              </span>

              <span style="float: right">
                {writableIcon}
              </span>
              <span style="float:right;align:right">
                  {readIcon}__
              </span>
            </div>

          )
        }
      }
    },
    methods:{

    },
    mounted () {
      console.log("初始数据",treeData)
      this.treeData = flagTree(treeData)
      let treeArray = treeToArray(this.treeData)
      //循环array ，处理目标readable，
      //console.log(treeArray,"加工到数组")
      let treeArrayReadableData = updateArrayReadableByDesc(treeArray)
      console.log("倒叙更新读权限",treeArrayReadableData)
      let treeArrayReadableDataAsc = updateArrayReadableByAsc(treeArray)
      console.log("正序更新权限", treeArrayReadableDataAsc)
      let overUpdateRead_treeData = this.treeData
      console.log(filterTreeByField(overUpdateRead_treeData),"过滤不可读数据")
      this.treeData = flagTreeWrite(filterTreeByField(overUpdateRead_treeData))
    }
  }
</script>

<style lang="less" scoped>
  .layer-tree {
    flex: 1;
    overflow: auto;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
