<template>
  <div>
    <el-form
      class="title"
      :inline="true">
      <el-form-item>
        重新渲染：<el-switch v-model="always"/>
      </el-form-item>
      <el-form-item>
        所在位置：
        <el-radio-group
          size="small"
          v-model="position">
          <el-radio-button label="top"/>
          <el-radio-button label="center"/>
          <el-radio-button label="bottom"/>
        </el-radio-group>
      </el-form-item>
      <el-button
        type="text"
        @click="onReload">
        重新加载
      </el-button>
    </el-form>
    <mg-auto-loading
      class="wrap"
      @load="init"
      :position="position"
      :always="always"
      ref="loading">
      <div
        class="item"
        v-for="i in count"
        :key="i">
        这里是第 {{ i }} 条
      </div>
    </mg-auto-loading>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 0,
        always: true,
        position: 'top'
      }
    },
    methods: {
      init(done) {
        setTimeout(() => {
          this.count = Math.ceil(Math.random() * 20)
          done()
        }, 1000)
      },
      onReload() {
        this.$refs.loading.onLoading()
      }
    }
  }
</script>

<style scoped>
  .title {
    border-bottom: 1px solid #F1F1F1;
  }

  .wrap {
    height: 260px;
  }

  .item {
    line-height: 45px;
  }
</style>
