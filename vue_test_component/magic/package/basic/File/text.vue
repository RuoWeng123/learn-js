<template>
  <div>
    <el-button
      @click="onOpen"
      style="margin-top: 6px;"
      icon="el-icon-upload"
      v-if="!disabled"
      type="primary">
      选择文件
    </el-button>
    <ul
      v-if="currentList.length || loadingList.length"
      class="el-upload-list el-upload-list--text"
      style="margin-top: 8px;">
      <li
        class="el-upload-list__item"
        v-for="(item, index) in currentList"
        :key="index">
        <a
          class="el-upload-list__item-name"
          style="cursor: pointer;"
          @click="onPreview(item, index)">
          <img
            class="el-upload-list__item-img"
            :src="getSrc(item.name)"
          />
          <span
            v-text="item.name"
          />
        </a>
        <i
          v-if="!disabled"
          class="el-icon-close"
          @click="onRemove(item, index)"
        />
      </li>
      <li
        class="el-upload-list__item"
        v-for="item in loadingList"
        :key="item.id">
        <a class="el-upload-list__item-name">
          <i class="el-icon-loading"/>
          {{item.name}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getPictureByUrl } from '../../utils/getPictureByUrl'

  export default {
    props: {
      currentList: {},
      loadingList: {},
      disabled: {}
    },
    methods: {
      getSrc (url) {
        return getPictureByUrl(url)
      },
      onOpen () {
        this.$emit('open')
      },
      onPreview (file, index) {
        this.$emit('preview', file, index)
      },
      onRemove (file, index) {
        this.$emit('remove', file, index)
      }
    }
  }
</script>
