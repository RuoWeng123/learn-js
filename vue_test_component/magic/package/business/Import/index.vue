<template>
  <div class="magic-import">
    <import-upload
      v-if="!currentLayout"
      @reader="onReader"
    />
    <component
      v-else
      :is="currentLayout"
      :file="currentFile"
      :options="options"
      @reload="onReload"
    />
  </div>
</template>

<script>
  import ImportUpload from './upload.vue'
  import ImportExcel from './template-excel.vue'
  import ImportTxt from './template-txt.vue'

  const Render = [
    {
      reg: /\.txt$/,
      target: ImportTxt
    },
    {
      reg: /\.(xlsx|xls)$/,
      target: ImportExcel
    }
  ]
  export default {
    name: 'MgImport',
    components: { ImportUpload },
    props: {
      options: {}
    },
    data () {
      return {
        currentFile: null,
        currentLayout: null
      }
    },
    methods: {
      onReader (file) {
        const cur = Render.find(v => v.reg.test(file.name))
        this.currentLayout = cur.target
        this.currentFile = file
      },
      onReload () {
        this.currentLayout = null
      }
    }
  }
</script>
