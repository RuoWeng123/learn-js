<script>
  import basic from './basic'
  import { noLibError } from '../../utils/noLibError'
  import { xlsx as XLSX } from '../../global.js'

  export default {
    extends: basic,
    data () {
      return {
        rawData: null,
        splitable: false,
        config: {
          resolve: {
            header: 1,
            body: 2
          },
          relation: []
        }
      }
    },
    created () {
      this.config.relation = this.currentColumns.map((v) => ({ source: '', target: v.field }))
    },
    methods: {
      onRefresh () {
        if (!this.rawData) return
        if (!XLSX) return noLibError('xlsx', 'xlsx', 'xlsx')
        const fixedData = this.getFixData(this.rawData)
        const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const excelData = this.getSheetData(worksheet)
        const { header, body } = this.getResolveData(excelData, this.config.resolve)
        const { source, columns } = this.getRelationData({ header, body }, this.config.relation)
        this.sourceColumns = columns
        this.source = source
      },
      getFixData (data) {
        let o = ''
        let l = 0
        const w = 10240
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
      },
      getSheetData (worksheet) {
        const results = {}
        for (const key in worksheet) {
          let field = (key.match(/[a-zA-Z]/g) || []).join('')
          let index = (key.match(/([0-9])/g) || []).join('')
          if (field && index) {
            if (!results[index]) {
              results[index] = {}
            }
            results[index][field] = worksheet[key].w
          }
        }
        return Object.values(results)
      },
      getResolveData (data, resolve) {
        const { header, body } = resolve
        const headerRows = header === 0 ? [] : data.slice(header - 1, header)
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
          const AllFields = body.reduce((results, obj) => [].concat(results, Object.keys(obj)), [])
          const fields = Array.from(new Set(AllFields)).sort()
          header = fields.reduce((results, item, index) => {
            results[item] = '列' + (index + 1)
            return results
          }, {})
        }
        const columns = Object.keys(header).map(field => ({ label: header[field], value: field }))
        const source = body.map(item => {
          return this.currentColumns.reduce((result, { field }) => {
            result[field] = item[config[field]]
            return result
          }, {})
        })
        return { columns, source }
      }
    },
    watch: {
      file: {
        immediate: true,
        handler (file) {
          if (!file) return
          const reader = new FileReader()
          reader.readAsArrayBuffer(file)
          reader.onload = e => {
            this.rawData = e.target.result
            this.onRefresh()
          }
        }
      }
    }
  }
</script>
