<template>
  <div>
    <el-input
      style="width: 240px; margin-right: 20px;"
      v-model="input"
    />
    <el-button
      @click="onSubmit"
      :loading="loading"
      type="primary">提 交
    </el-button>
  </div>
</template>

<script>
  import { decorator } from 'magic'

  const { confirm, notify, lock, validate, pipe } = decorator

  export default {
    data () {
      return {
        input: '',
        loading: false
      }
    },
    methods: {
      @pipe([
        lock('loading'),
        validate({ handle: 'validate' }),
        confirm({ title: '提示', message: '您确定要提交吗？' }),
        notify({ success: '提交失败', error: true })
      ])
      onSubmit () {
        return new Promise((resolve, reject) => {
          setTimeout(() => Math.random() > 0.5 ? resolve() : reject(new Error('提交失败')), 1000)
        })
      },
      validate () {
        if (this.input) {
          return true
        } else {
          throw new Error('请输入关键字')
        }
      }
    }
  }
</script>
