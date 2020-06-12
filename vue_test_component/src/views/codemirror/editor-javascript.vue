<template>
  <div
    class="editor-javascript"
    :style="currentStyle"
  >
    <textarea ref="editor" />
    </div>
</template>

<script>
// 核心包
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
// 代码折叠
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
// 括号匹配
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
// 自动补全
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/anyword-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'
// 行注释
import 'codemirror/addon/comment/comment.js'
// 代码检查错误
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint.js'
import 'codemirror/addon/lint/javascript-lint.js'
// 全屏模式
import 'codemirror/addon/display/fullscreen.css'
import 'codemirror/addon/display/fullscreen.js'
// 高亮
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/selection/selection-pointer'

export default {
  props: {
    height: {},
    value: {}
  },
  computed: {
    currentStyle () {
      return { height: this.height }
    },
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    emitValue () {
      this.currentValue = this.editor.getValue()
    },
    saveValue () {
      if (!this.editor || this.value === this.editor.getValue()) return
      this.editor.setValue(this.value || '')
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: 'saveValue'
    }
  },
  mounted () {
    this.editor = CodeMirror.fromTextArea(this.$refs.editor, {
      mode: 'javascript',
      tabSize: 2,
      indentUnit: 2,
      indentWidthTabs: true,
      smartIndent: true,
      matchBrackets: true,
      styleActiveLine: true,
      lineNumbers: true,
      lineWrapping: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      lint: true,
      extraKeys: {
        'Ctrl-S': this.emitValue.bind(this),
        'Cmd-S': this.emitValue.bind(this),
        'F11': cm => cm.setOption('fullScreen', !cm.getOption('fullScreen'))
      }
    })
    this.editor.setSize('100%', '100%')
    this.editor.on('change', this.emitValue.bind(this))
    this.editor.on('blur', this.emitValue.bind(this))
    setTimeout(this.saveValue.bind(this), 30)
  },
  destroyed () {
    this.editor = null
  }
}
</script>

<style scoped>
.editor-javascript {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
</style>
