<template>
  <div>
    <ul class="el-upload-list el-upload-list--picture-card">
      <li
        class="el-upload-list__item"
        style="overflow: visible;"
        v-for="(item, index) in currentList"
        :key="index">
        <img
          class="el-upload-list__item-thumbnail"
          :src="item.url"
        />
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-check"/>
        </label>
        <i class="el-icon-close"/>
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="onPreview(item, index)">
            <i class="el-icon-zoom-in"/>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="onRemove(item, index)">
            <i class="el-icon-delete"/>
          </span>
        </span>
      </li>
    </ul>
    <div
      v-if="!disabled"
      class="el-upload el-upload--picture-card"
      @click="onOpen">
      <i class="el-icon-plus"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      currentList: {},
      loadingList: {},
      disabled: {}
    },
    methods: {
      onOpen() {
        this.$emit('open')
      },
      onPreview(file, index) {
        this.$emit('preview', file, index)
      },
      onRemove(file, index) {
        this.$emit('remove', file, index)
      }
    }
  }
</script>
