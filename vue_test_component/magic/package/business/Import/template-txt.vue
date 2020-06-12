<script>
  import basic from './basic'

  export default {
    extends: basic,
    data () {
      return {
        rawText: '',
        splitable: true,
        config: {
          resolve: {
            split: 3,
            isMultiple: true,
            isTrim: false,
            header: 0,
            body: 1
          },
          relation: []
        }
      }
    },
    created () {
      this.config.relation = this.currentColumns.map((v, index) => ({ source: index, target: v.field }))
    },
    methods: {
      onRefresh () {
        if (!this.rawText) return
        const { header, body } = this.getResolveData(this.rawText, this.config.resolve)
        const { source, columns } = this.getRelationData({ header, body }, this.config.relation)
        this.source = source
        this.sourceColumns = columns
      },
      getResolveData (rawText, resolve) {
        const { isTrim, header, body } = resolve
        const reg = this.getResolveReg(resolve)
        /* eslint-disable */
        const rawData = rawText.split(new RegExp('\n+')) || []
        const data = rawData.reduce((results, item) => {
          if (item && item.trim()) {
            const ret = item.split(reg).map(v => isTrim ? v.trim() : v)
            results.push(ret)
          }
          return results
        }, [])
        const headerRows = header === 0 ? [] : data.slice(header - 1, 1)
        const bodyRows = data.slice(body - 1)
        return {
          header: headerRows[0],
          body: bodyRows
        }
      },
      getRelationData ({ header, body }, relations) {
        const config = relations.reduce((result, item) => {
          result[item.target] = item.source
          return result
        }, {})
        if (!header) {
          const max = body.reduce((max, item) => Math.max(max, item.length), 0)
          header = new Array(max).fill(null).map((v, index) => '列' + (index + 1))
        }
        const columns = header.map((v, index) => ({ label: v, value: index }))
        const source = body.map(item => {
          return this.currentColumns.reduce((result, { field }) => {
            result[field] = item[config[field]]
            return result
          }, {})
        })
        return { columns, source }
      },
      getResolveReg (resolve) {
        /* eslint-disable */
        const { split, input, isMultiple } = resolve
        const custom = input || ' '
        switch (split) {
          case 1:
            return isMultiple ? new RegExp('\t+') : new RegExp('\t')
          case 2:
            return isMultiple ? new RegExp(';+|；+') : new RegExp(';|；')
          case 3:
            return isMultiple ? new RegExp(',+|，+') : new RegExp(',|，')
          case 4:
            return isMultiple ? new RegExp(' +') : new RegExp(' ')
          case 5:
            return this.isMultiple ? new RegExp(custom + '+') : new RegExp(custom)
        }
      }
    },
    watch: {
      file: {
        immediate: true,
        handler (file) {
          if (!file) return
          const reader = new FileReader()
          reader.readAsText(file, 'gbk')
          reader.onload = e => {
            this.rawText = e.target.result
            this.onRefresh()
          }
        }
      }
    }
  }
</script>
