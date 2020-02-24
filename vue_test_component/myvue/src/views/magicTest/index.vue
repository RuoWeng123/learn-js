<template>
  <div>
    <mg-form
            slot="right"
            :options="options">
      <template v-if="form.id">
        <el-button
                @click="onCreate"
                type="primary"
                slot="btn">
          新 增
        </el-button>
        <el-button
                @click="onDelete"
                style="position: relative; top: 2px;"
                type="danger"
                slot="btn">
          删 除
        </el-button>
      </template>
    </mg-form>
  </div>
</template>

<script>
  import { model } from 'magic'
  export default {
    name: 'index',
    data () {
      return {
        list: [],
        form: { points: [] },
        options: new model.Form({
          config: {
            cols: 8,
            gutter: 10,
            size: 'mini',
            placeholder: ' ',
            cancelText: '关 闭',
            panels: [
              { columns: ['name', 'type', 'remark', 'drop', 'angle', 'inclination'] },
              { columns: ['points'] }
            ]
          },
          columns: [
            { label: '名 称', field: 'name', layout: 'Text', rules: true },
            { label: '性 质', field: 'type', layout: 'Select', source: 'type', rules: true },
            { label: '描 述', field: 'remark', layout: 'Text' },
            { label: '落 差', field: 'drop', layout: 'Number', type: 'number' },
            { label: '倾 角', field: 'angle', layout: 'Number', type: 'number' },
            { label: '倾 向', field: 'inclination', layout: 'Number', type: 'number' }
          ],
          value: [this, 'form'],
          sources: {
            type: [
              { label: '正断层', value: '正断层' },
              { label: '逆断层', value: '逆断层' },
              { label: '平移断层', value: '平移断层' }
            ]
          },
          events: {
            submit: this.onSubmit.bind(this),
            cancel: this.onClose.bind(this)
          }
        })
      }
    },
    methods:{
      onSubmit(){

      },
      onClose(){

      }
    }
  }
</script>

<style scoped>

</style>
