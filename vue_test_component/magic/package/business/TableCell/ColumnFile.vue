<template>
  <div
    class="magic-tableCell-file"
    v-if="fileList && fileList.length">
    <img
      class="magic-tableCell-file-img"
      :src="getUrl(currentFile)"
    />
    <span class="magic-tableCell-file-name">
      {{ currentFile.name }}
    </span>
    <el-popover
      v-if="hideList.length"
      placement="bottom-end"
      width="220">
      <div
        class="magic-tableCell-file is-row"
        v-for="(file, index) in hideList"
        :key="index">
        <img
          class="magic-tableCell-file-img"
          :src="getUrl(file)"
        />
        <span class="magic-tableCell-file-name">
          {{ file.name }}
        </span>
      </div>
      <i
        slot="reference"
        class="el-icon-more"
        @click="onToggle"
      />
    </el-popover>
  </div>
</template>

<script>
  import basic from './basic.js'
  import { getPictureByUrl } from '../../utils/getPictureByUrl'

  export default {
    mixins: [basic],
    computed: {
      fileList() {
        return this.currentValue || []
      },
      currentFile() {
        return this.fileList[0] || {}
      },
      hideList() {
        return [].concat(this.fileList).splice(1, this.fileList.length)
      }
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      getUrl(file) {
        return getPictureByUrl(file.url)
      },
      onToggle() {
        this.show = !this.show
      }
    }
  }
</script>
