const data = [{
  id: 1,
  label: '测试电机',
  type:"电机",
  state:0,
  children: [{
    id: 11,
    label: '前盖',
    state:0,
    type:"端盖",
    children: [{
      id: 111,
      label: '温度',
      type:"属性",
      state:0,
      value:35
    }, {
      id: 112,
      label: '振幅-垂直',
      type:"属性",
      state:0,
      value:25
    }, {
      id: 113,
      label: '振幅-水平',
      type:"属性",
      state:0,
      value:15
    }]
  },{
    id: 12,
    label: '后盖',
    state:0,
    type:"端盖",
    children: [{
      id: 121,
      label: '温度',
      type:"属性",
      state:1,
      value:35
    }, {
      id: 122,
      label: '振幅-垂直',
      type:"属性",
      state:2,
      value:35
    }, {
      id: 123,
      label: '振幅-水平',
      type:"属性",
      state:3,
      value:35
    }]
  }]
}, {
  id: 2,
  label: '测试电机',
  state:0,
  type:"电机",
  children: [{
    id: 21,
    label: '前盖',
    state:0,
    type:"端盖",
    children:[
      {
        id: 211,
        label: '温度',
        type:"属性",
        state:4,
        value:12
      } ,{
        id: 212,
        label: '振幅-水平',
        type:"属性",
        state:3,
        value:13
      }, {
        id: 213,
        label: '振幅-水平',
        type:"属性",
        state:2,
        value:14
      }
    ]
  }, {
    id: 22,
    label: '后盖',
    state:0,
    type:"端盖"
  }]
}]

export {data}
