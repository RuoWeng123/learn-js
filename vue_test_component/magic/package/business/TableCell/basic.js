import get from 'lodash/get'

export default {
  props: {
    scope: {},
    source: {},
    props: {},
    events: {}
  },
  computed: {
    currentRawValue () {
      return get(this.scope.row, this.scope.column.property)
    },
    currentValue () {
      const { formatter, precision } = this.props
      let value = formatter ? formatter(this.scope, this.scope.row, this.currentRawValue) : this.currentRawValue
      value = precision ? parseFloat(value).toFixed(precision) : value
      return value
    }
  }
}
