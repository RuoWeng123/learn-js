<template>
  <div>
    <el-button
      type="primary"
      @click="printAction">打印
    </el-button>
    <br>
    <slot/>
  </div>
</template>

<script>
  import { noLibError } from '../../utils/noLibError.js'
  import { printjs as PrintJS } from '../../global.js'

  export default {
    name: 'MgPrint',
    props: {
      type: {
        type: String,
        default: 'json'
      },
      jsonData: {
        type: Array,
        default: () => []
      },
      jsonHeader: {
        type: Array,
        default: () => []
      },
      printFile: {
        type: String,
        default: ''
      },
      printDom: {
        type: String,
        default: ''
      }
    },
    methods: {
      printAction() {
        if (!PrintJS) return noLibError('print-js', 'printjs', 'printjs')
        if (this.type === 'json') {
          PrintJS({ printable: this.jsonData, type: 'json', properties: this.jsonHeader })
        } else if (this.type === 'html') {
          PrintJS(this.printDom, 'html')
        } else if (this.type === 'image') {
          PrintJS(this.printFile, 'image')
        } else if (this.type === 'pdf') {
          PrintJS(this.printFile)
        }
      }
    }
  }
</script>
