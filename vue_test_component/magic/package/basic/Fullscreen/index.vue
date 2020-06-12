<script>
  const PREFIX = ['', 'moz', 'webkit', 'ms']
  export default {
    name: 'MgFullscreen',
    props: {
      value: {
        type: Boolean,
        default: () => !!(
          document.fullScreen ||
          document.fullscreenElement ||
          document.mozFullScreen ||
          document.mozFullScreenElement ||
          document.webkitIsFullScreen ||
          document.webkitFullscreenElement
        )
      },
      target: {
        type: [String, HTMLElement],
        default: () => document.documentElement
      }
    },
    methods: {
      onToggle () {
        if (this.value) {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          }
        } else {
          const dom = typeof this.target === 'string' ? document.querySelector(this.target) : this.target
          if (dom.requestFullscreen) {
            dom.requestFullscreen()
          } else if (dom.msRequestFullscreen) {
            dom.msRequestFullscreen()
          } else if (dom.mozRequestFullScreen) {
            dom.mozRequestFullScreen()
          } else if (dom.webkitRequestFullScreen) {
            dom.webkitRequestFullScreen()
          }
        }
      },
      onChange () {
        this.$emit('input', !this.value)
      }
    },
    render () {
      return this.$slots.default
    },
    mounted () {
      this.$el.addEventListener('click', this.onToggle)
      PREFIX.forEach(v => document.addEventListener(v + 'fullscreenchange', this.onChange))
    },
    destroyed () {
      this.$el.removeEventListener('click', this.onToggle)
      PREFIX.forEach(v => document.removeEventListener(v + 'fullscreenchange', this.onChange))
    }
  }
</script>
