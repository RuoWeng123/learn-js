<script>
  import basic from './basic.js'
  import moment from 'moment'

  export default {
    mixins: [basic],
    computed: {
      currentFormat() {
        return this.props.format || 'YYYY.MM'
      }
    },
    render(h) {
      return h('span', moment(this.currentValue).format(this.currentFormat))
    }
  }
</script>
