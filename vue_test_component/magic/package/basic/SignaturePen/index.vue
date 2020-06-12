<template>
  <div class="magic-signature-pen">
    <vue-signature-pad
      ref="signaturePad"
    />
    <div class="magic-signature-pen-buttons">
      <el-tooltip
        effect="dark"
        content="撤 销"
        placement="top">
        <el-button
          @click="undo"
          icon="el-icon-refresh-left"
          type="primary"
          size="small"
          circle
          plain
        />
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="清 空"
        placement="top">
        <el-button
          @click="clear"
          icon="el-icon-delete"
          type="danger"
          size="small"
          circle
          plain
        />
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="保 存"
        placement="top">
        <el-button
          @click="save"
          icon="el-icon-edit"
          type="primary"
          size="small"
          circle
        />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  import VueSignaturePad from 'vue-signature-pad'

  export default {
    name: 'MgSignaturePen',
    components: {
      VueSignaturePad
    },
    methods: {
      undo () {
        this.$refs.signaturePad.undoSignature()
      },
      clear () {
        this.$refs.signaturePad.clearSignature()
      },
      save () {
        const { data } = this.$refs.signaturePad.saveSignature()
        this.$emit('saveImage', data)
      }
    }
  }
</script>
