<template>
  <mg-form :options="options"/>
</template>

<script>
  import { model } from '../../package/index.js'

  export default {
    data() {
      return {
        options: new model.Form({
          config: {
            rules: {
              desc: true,
              email: 1,
              id_card: 3,
              name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              start_date: [
                { required: true, message: '请输入开始时间', trigger: 'blur' },
                {
                  trigger: 'blur',
                  required: true,
                  validator: (rule, value, callback) => {
                    this.options.context.validate('end_date')
                    callback()
                  }
                }
              ],
              end_date: [
                { required: true, message: '请输入结束时间', trigger: 'blur' },
                {
                  trigger: 'blur',
                  required: true,
                  validator: (rule, value, callback) => {
                    const form = this.options.getValue()
                    if (form && form.start_date && Date.parse(form.start_date) < Date.parse(form.end_date)) {
                      callback()
                    } else {
                      callback(new Error('结束时间必须大于开始时间'))
                    }
                  }
                }
              ]
            }
          },
          columns: [
            { label: '隐患内容', field: 'desc', layout: 'Text' },
            { label: '邮箱地址', field: 'email', layout: 'Text' },
            { label: '身份证号', field: 'id_card', layout: 'Text' },
            { label: '活动名称', field: 'name', layout: 'Text' },
            { label: '开始日期', field: 'start_date', layout: 'Date' },
            { label: '结束日期', field: 'end_date', layout: 'Date' }
          ],
          events: {
            submit: (form, done) => {
              setTimeout(done, 1000)
            }
          }
        })
      }
    }
  }
</script>
