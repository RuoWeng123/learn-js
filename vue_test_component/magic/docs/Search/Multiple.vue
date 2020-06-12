<template>
  <mg-search
    :options="options"
  />
</template>

<script>
  import { model } from '../../package/index.js'

  export default {
    data() {
      return {
        options: new model.Search({
          config: {
            maxCount: 3,
            showLabel: true
          },
          columns: [
            { label: '关键字', field: 'name', layout: 'Text' },
            { label: '月份', field: 'month', layout: 'DateMonthRange' },
            { label: '类别', field: 'category', layout: 'Select', source: 'category' },
            { label: '形式', field: 'mode', layout: 'Select', source: 'mode', type: 'button' },
            { label: '时间', field: 'time', layout: 'DateRange' },
            { label: '检查部门', field: 'department', layout: 'TreeSelect', source: 'department' },
            { label: '整改部门', field: 'department', layout: 'Cascader', source: 'department' },
            { label: '区间', field: 'level', layout: 'Slider' }
          ],
          sources: {
            active: [
              {
                label: '是',
                value: true
              },
              {
                label: '否',
                value: false
              }
            ],
            category: [
              {
                label: '火灾',
                value: 1
              },
              {
                label: '爆炸',
                value: 2
              },
              {
                label: '水灾',
                value: 3
              }
            ],
            mode: [
              {
                label: '看台账',
                value: 1
              },
              {
                label: '听汇报',
                value: 2
              }
            ],
            department: [
              {
                label: '华夏天信',
                value: '1-1',
                children: [
                  {
                    label: '软件研发',
                    value: '2-1',
                    children: [
                      {
                        label: '前端组',
                        value: '2-1-1'
                      },
                      {
                        label: '后端组',
                        value: '2-1-2'
                      },
                      {
                        label: '数据接入组',
                        value: '2-1-3'
                      }
                    ]
                  },
                  {
                    label: '硬件设备',
                    value: '2-2',
                    children: [
                      {
                        label: '摄像头',
                        value: '2-2-1'
                      },
                      {
                        label: '机器人',
                        value: '2-2-2'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          events: {
            search: (params) => {
              console.log(params)
            }
          }
        })
      }
    }
  }
</script>
