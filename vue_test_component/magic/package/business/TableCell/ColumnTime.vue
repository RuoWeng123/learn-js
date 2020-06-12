<script>
  import basic from './basic.js'
  import moment from 'moment'

  export default {
    mixins: [basic],
    computed: {
      currentFormat() {
        return this.props.format || 'HH:mm:ss'
      }
    },
    render(h) {
      return h('span', moment(this.currentValue).format(this.currentFormat))
    }
  }
</script>
