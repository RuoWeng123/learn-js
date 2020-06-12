<template>
  <div class="magic-search">
    <el-form
      @submit.native.prevent
      class="magic-search-inline"
      :size="currentSize"
      inline>
      <el-form-item
        class="magic-search-column"
        :style="{ minWidth: column.config.width }"
        :class="{'has-label': currentShowLabel }"
        :label="currentShowLabel ? column.config.label : ''"
        v-for="(column, index) in currentMainColumns"
        :key="index">
        <FormColumn
          @keyup.enter.native="onSearch"
          @input="val => setValue(column.config, val)"
          style="width: 100%"
          :layout="column.config.layout"
          :source="getSource(column.config)"
          :value="getValue(column.config)"
          :props="column.props"
          :events="column.events"
        />
      </el-form-item>
    </el-form>
    <el-button
      style="margin-left: 15px;"
      v-if="!currentHideBtn"
      @click="onSearch"
      type="primary"
      size="medium">
      搜 索
    </el-button>
    <template v-if="currentColumns.length > currentMaxCount">
      <el-link
        class="magic-search-link"
        type="primary"
        @click="onToggle">
        {{ show ? '关闭' : currentMoreText }}
        <i class="el-icon-arrow-right"/>
      </el-link>
      <Drawer
        v-bind="currentDrawer"
        v-model="show">
        <el-form
          class="magic-search-form"
          size="medium"
          label-position="top">
          <el-formItem
            class="magic-search-item"
            v-for="(column, index) in currentColumns"
            :label="column.config.label"
            :prop="column.config.field"
            :key="index">
            <FormColumn
              style="width: 100%;"
              @keyup.enter.native="onSearch"
              @input="val => setValue(column.config, val)"
              :source="getSource(column.config)"
              :value="getValue(column.config)"
              :layout="column.config.layout"
              :events="column.events"
              :props="column.props"
            />
          </el-formItem>
          <div
            class="magic-search-btn"
            :class="{ 'is-fixed': currentBtnFixed }">
            <el-button
              size="medium"
              @click="onReset">
              重 置
            </el-button>
            <el-button
              @click="onSearch"
              size="medium"
              type="primary">
              搜 索
            </el-button>
          </div>
        </el-form>
      </Drawer>
    </template>
  </div>
</template>

<script>
  import FormColumn from '../FormColumn/index.vue'
  import Drawer from '../../basic/Drawer/index.vue'
  import Search from '../../model/Search'

  export default {
    name: 'MgSearch',
    components: { Drawer, FormColumn },
    props: {
      options: {}
    },
    data () {
      return {
        show: false
      }
    },
    computed: {
      currentStore () {
        return this.options
      },
      currentConfig () {
        return this.options.config
      },
      currentColumns () {
        return this.options.columns
      },
      currentSize () {
        return this.currentConfig.size
      },
      currentShowLabel () {
        return this.currentConfig.showLabel
      },
      currentHideBtn () {
        return this.currentConfig.hideBtn
      },
      currentMainColumns () {
        return this.currentColumns.slice(0, this.currentMaxCount)
      },
      currentMoreText () {
        return this.currentConfig.moreText
      },
      currentMaxCount () {
        return this.currentConfig.maxCount
      },
      currentDrawer () {
        return this.currentConfig.drawer
      },
      currentBtnFixed () {
        return this.currentConfig.btnFixed
      },
      currentRealTime () {
        return this.currentConfig.realTime
      },
      currentModel () {
        return this.currentStore.getValue()
      }
    },
    methods: {
      getSource ({ source }) {
        const data = source ? this.currentStore.getSource(source) : []
        return data || []
      },
      getValue ({ field }) {
        return this.currentStore.getValue(field)
      },
      setValue ({ field }, val) {
        return this.currentStore.setValue(field, val)
      },
      onSearch () {
        this.currentStore.emitEvent(Search.Events.search, this.currentModel)
      },
      onReset () {
        this.currentStore.setValue({})
        this.currentStore.emitEvent(Search.Events.reset, this.currentModel)
      },
      onToggle () {
        this.show = !this.show
      }
    },
    watch: {
      currentModel () {
        this.currentRealTime && this.onSearch()
      }
    }
  }
</script>
