<template>
  <div>
    <div class="field mb10">
      <span class="label">
          显示标题
      </span>
      <span class="value">
        <el-switch v-model="title.show"></el-switch>
      </span>
    </div>
    <div class="field mb10">
      <span class="label">
          标题内容
      </span>
      <span class="value">
        <el-switch v-model="title.text"></el-switch>
      </span>
    </div>

  </div>
</template>

<script>
  import data from '../../constant/title'
  import * as R from 'ramda'

  export default {
    name: 'title',
    props: ['inPut'],
    data () {
      return {
        outPut: {}
      }
    },
    methods: {
      changeField () {
        this.$emit('on-change', this.outPut)
      }
    },
    mounted () {
      this.outPut = R.mergeDeepLeft(this.inPut, data)
    }
  }
</script>

<style scoped>

</style>
