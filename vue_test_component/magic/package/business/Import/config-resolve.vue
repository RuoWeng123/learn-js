<template>
  <config-card title="数据解析">
    <div class="magic-import-resolve">
      <template v-if="splitable">
        <span class="magic-import-resolve-left">
          <el-radio-group
            class="magic-import-resolve-default"
            v-model="config.split">
            <el-radio :label="1">Tab</el-radio>
            <el-radio :label="2">分号</el-radio>
            <el-radio :label="3">逗号</el-radio>
            <el-radio :label="4">空格</el-radio>
          </el-radio-group>
          <span class="magic-import-resolve-else">
            <el-radio
              v-model="config.split"
              :label="5">其他
            </el-radio>
            <el-input
              :disabled="config.split !== 5"
              style="width: 70px;"
              v-model="config.input"
              size="mini"
            />
          </span>
        </span>
        <span class="magic-import-resolve-divider"/>
        <span class="magic-import-resolve-center">
          <el-checkbox v-model="config.isMultiple">
            连续分隔符号视为单个处理
          </el-checkbox>
          <div style="height: 4px;"/>
          <el-checkbox v-model="config.isTrim">
            删除数据两端空格
          </el-checkbox>
        </span>
        <span class="magic-import-resolve-divider"/>
      </template>
      <span class="magic-import-resolve-right">
        <div class="magic-import-resolve-row">
          <label>表头所在行</label>
          <el-input-number
            controls-position="right"
            v-model="config.header"
            size="mini"
            :min="0"
          />
        </div>
        <div class="magic-import-resolve-row">
          <label>数据起始行</label>
          <el-input-number
            controls-position="right"
            v-model="config.body"
            size="mini"
            :min="1"
          />
        </div>
      </span>
    </div>
  </config-card>
</template>

<script>
  import ConfigCard from './config-card.vue'

  export default {
    props: {
      splitable: {
        type: Boolean,
        default: true
      },
      config: {}
    },
    components: {
      ConfigCard
    }
  }
</script>
