export default {
  props: {
    value: {},
    props: {},
    events: {},
    source: {},
    editable: {}
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    currentLabel() {
      return this.props && this.props._label
    },
    currentEvents() {
      return this.events
    },
    currentProps() {
      return this.props
    }
  }
}
