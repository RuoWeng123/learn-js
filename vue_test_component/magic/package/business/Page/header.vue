<script type="text/jsx">
  import MgButtons from '../../basic/Buttons/index.vue'
  import MgTitle from '../../basic/Title/index.vue'
  import MgSearch from '../Search/index.vue'

  export default {
    components: {
      MgTitle,
      MgButtons,
      MgSearch
    },
    props: {
      currentTitle: {},
      currentSearch: {},
      currentActions: {},
      currentDisabled: {},
      currentDescribe: {},
      currentPosition: {}
    },
    render () {
      return (
        <div>
          { this.renderTop() }
          { this.renderBottom() }
        </div>
      )
    },
    methods: {
      renderTitle () {
        if (!this.currentTitle) return null
        return (
          <MgTitle
            title={ this.currentTitle }
            describe={ this.currentDescribe }
          />
        )
      },
      renderButtons () {
        if (this.currentActions) {
          return (
            <MgButtons
              buttons={ this.currentActions }
              disabled={ this.currentDisabled }>
              { this.$slots.actions }
            </MgButtons>
          )
        } else if (this.$slots.actions) {
          return this.$slots.actions
        } else {
          return null
        }
      },
      renderSearch () {
        if (!this.currentSearch) return null
        return (
          <MgSearch
            options={ this.currentSearch }
          />
        )
      },
      renderTop () {
        const node = this.renderNode([0, 1]).filter(v => v)
        if (node.length === 0) return null
        return (
          <div class="magic-page-title">
            { node }
          </div>
        )
      },
      renderBottom () {
        const node = this.renderNode([2, 3]).filter(v => v)
        if (node.length === 0) return null
        return (
          <div class="magic-page-top">
            { node }
          </div>
        )
      },
      renderNode (indexs) {
        const pos = this.currentPosition.split(',')
        return indexs.map(i => {
          switch (pos[i]) {
            case 'title':
              return this.renderTitle()
            case 'button':
              return this.renderButtons()
            case 'search':
              return this.renderSearch()
            default:
              return null
          }
        })
      }
    }
  }
</script>
