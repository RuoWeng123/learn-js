<template>
  <div>
    <div style="height:30px; text-align: left" class="mb10 ml16">
      <i class="el-icon-s-flag mr5" style="color:#e41919"></i><span class="mr16">高高报</span>
      <i class="el-icon-s-flag mr5" style="color:#e4e12d"></i><span class="mr16">高报</span>
      <i class="el-icon-s-flag mr5" style="color:#20e449"></i><span class="mr16">预警</span>
      <i class="el-icon-s-flag mr5" style="color:#3036e4"></i><span class="mr16">失联</span>
      <i class="el-icon-s-flag mr5" style="color:#a3d9e4"></i><span class="mr16">正常</span>
    </div>
    <div style="position:fixed;width:400px;height: 100%;border: 1px solid #f5a623">
      <Tree :data="data5"
            :render="renderContent"></Tree>
    </div>
  </div>

</template>

<script>
  import {Icon} from 'element-ui'
  export default {
    name: 'tree',
    components:{
      Icon
    },
    data () {
      return {
        data5: [
          {
            title: 'parent 1',
            expand: true,
            render: (h, { root, node, data }) => {
              return h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%'
                }
              }, [
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      marginRight: '8px'
                    }
                  }),
                  h('span', data.title)
                ]),
                h('span', {
                  style: {
                    display: 'inline-block',
                    float: 'right',
                    marginRight: '32px'
                  }
                }, [
                  h('Button', {
                    props: Object.assign({}, this.buttonProps, {
                      icon: 'ios-plus-empty',
                      type: 'primary'
                    }),
                    style: {
                      width: '52px'
                    },
                    on: {
                      click: () => { this.append(data) }
                    }
                  })
                ])
              ])
            },
            children: [
              {
                title: 'child 1-1',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-1-1',
                    expand: true
                  },
                  {
                    title: 'leaf 1-1-2',
                    expand: true
                  }
                ]
              },
              {
                title: 'child 1-2',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-2-1',
                    expand: true
                  },
                  {
                    title: 'leaf 1-2-1',
                    expand: true
                  }
                ]
              }
            ]
          }
        ],
        buttonProps: {
          type: 'ghost',
          size: 'small'
        }
      }
    },
    methods: {
      renderContent (h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-paper-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-plus-empty'
              }),
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => { this.append(data) }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-minus-empty'
              }),
              on: {
                click: () => { this.remove(root, node, data) }
              }
            })
          ])
        ])
      },
      append (data) {
        const children = data.children || []
        children.push({
          title: 'appended node',
          expand: true
        })
        this.$set(data, 'children', children)
      },
      remove (root, node, data) {
        const parentKey = root.find(el => el === node).parent
        const parent = root.find(el => el.nodeKey === parentKey).node
        const index = parent.children.indexOf(data)
        parent.children.splice(index, 1)
      }
    }
  }
</script>

<style scoped>

</style>
