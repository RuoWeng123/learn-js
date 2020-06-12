<template>
  <div
    style="display: inline-block"
    @click="onDownload"
  />
</template>

<script>
  import { qrcodejs2 as QRCode } from '../../global.js'
  import { noLibError } from '../../utils/noLibError.js'

  export default {
    name: 'MgQRCode',
    props: {
      value: {
        type: String
      },
      size: {
        type: [Number, String],
        default: 128
      },
      colorDark: {
        type: String,
        default: '#000000'
      },
      colorLight: {
        type: String,
        default: '#FFFFFF'
      },
      fileName: {
        type: String,
        default: '二维码'
      },
      download: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      currentSize() {
        return parseInt(this.size)
      }
    },
    methods: {
      onRefresh() {
        if (!this.value) return
        this.qrcode.clear()
        this.qrcode.makeCode(this.value)
      },
      onDownload() {
        if (!this.download) return
        const src = this.qrcode._oDrawing._elImage.src
        const a = document.createElement('a')
        a.setAttribute('href', src)
        a.setAttribute('download', this.fileName)
        a.click()
      }
    },
    mounted() {
      if (!QRCode) return noLibError('qrcodejs2', 'QRCode', 'qrcodejs2')
      this.qrcode = new QRCode(this.$el, {
        width: this.currentSize,
        height: this.currentSize,
        colorDark: this.colorDark,
        colorLight: this.colorLight,
        correctLevel: QRCode.CorrectLevel.H
      })
      this.onRefresh()
    },
    watch: {
      value() {
        this.onRefresh()
      }
    }
  }
</script>
