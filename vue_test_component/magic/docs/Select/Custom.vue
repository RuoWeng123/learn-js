<template>
  <mg-select
    style="width: 240px;"
    v-model="select"
    :source="source"
    labelKey="name"
    valueKey="id"
    outputKey="id"
    collapse-tags
    multiple>
    <div
      class="row"
      slot-scope="{row}">
      <label>{{ row.name }}</label>
      <span>{{ row.department }}</span>
    </div>
  </mg-select>
</template>

<script>
  export default {
    data() {
      return {
        select: [],
        source: [
          {
            id: 1,
            name: '张三',
            department: '技术室'
          },
          {
            id: 2,
            name: '李四',
            department: '掘进部'
          },
          {
            id: 3,
            name: '王五',
            department: '调度室'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .row {
    display: flex;
    justify-content: space-between;

    label {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
