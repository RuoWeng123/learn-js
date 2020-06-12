<template>
  <div class="header mb10">
            <span class="label mr10">图表颜色</span>
            <el-select
              class="project-color"
              v-model="color"
              style="width:300px"
              @change="changeSelect"
              placeholder="请选择">
              <el-option
                class="project-color-item"
                v-for="item in colors"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span
                  class="project-color-inner"
                  :style="`background-color: ${ item.color }`"
                />
                <span>{{ item.label }}</span>
              </el-option>
            </el-select>
            <sketch-pick :value="RGB" @input="updateRGB" v-if="color === 8"></sketch-pick>
          </div>
    
</template>

<script>
    import {Sketch } from 'vue-color'

  const Colors = [
    {
      label: 'ByLayer',
      value: 256,
      color: '#FFFFFF'
    },
    {
      label: 'ByBlock',
      value: 0,
      color: '#FFFFFF'
    },
    {
      label: '红',
      value: 1,
      color: '#FF0000'
    },
    {
      label: '黄',
      value: 2,
      color: '#FFFF00'
    },
    {
      label: '绿',
      value: 3,
      color: '#00FF00'
    },
    {
      label: '青',
      value: 4,
      color: '#00FFFF'
    },
    {
      label: '蓝',
      value: 5,
      color: '#0000FF'
    },
    {
      label: '洋红',
      value: 6,
      color: '#FF00FF'
    },
    {
      label: '白',
      value: 7,
      color: '#FFFFFF'
    },
    {
      label: '更多...',
      value: 8,
      color: '#'
    }
  ]
  export default {
    name: 'ProjectColor',
    components:{
        'sketch-pick': Sketch
    },
    data () {
      return {
        colors: Colors,
        color: 0,
        RGB:{r: 255, g:255, b:255, a:0.99}
      }
    },
    methods:{
        changeSelect(val){
            if(val === 8){
            }
        },
        updateRGB(val){
            console.log('update',val)
            if(val.hex === '#FFFFFF') return
            let a = val.rgba.a*100
            let r = this.addZeroToFirst(val.rgba.r)
            let g = this.addZeroToFirst(val.rgba.g)
            let b = this.addZeroToFirst(val.rgba.g)
            const rgba = '8.'+r+g+b+a
            this.color = Number(rgba)
            let color = {
                label:`r:${val.rgba.r},g:${val.rgba.g},b:${val.rgba.b}`,
                value: this.color,
                color: val.hex
            }
            const length = this.colors.length
            if(this.colors[length - 1].value === 8){
                this.colors.push(color)
            }else{
                this.colors[length - 1] = color
            }
        },
        addZeroToFirst(r){
            if( r === 0){
                return '000'
            }else if( r<10){
                return '00'+r
            }else if( r<100){
                return '0'+r
            }else{
                return r
            }
        }
    }
  }
</script>

<style lang="scss">
  .project-color {
    &-item {
      padding: 0 10px;
      font-size: 12px;
    }

    &-inner {
      display: inline-block;
      vertical-align: middle;
      width: 16px;
      height: 16px;
      border: 1px solid rgba(0, 0, 0, 0.8);
      margin-right: 5px;
    }
  }
</style>
