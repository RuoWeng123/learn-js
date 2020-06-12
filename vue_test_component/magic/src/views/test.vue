<template>
  <div>
    <button @click.stop="showContextMenu">打开</button>
  </div>
</template>

<script>
  import { utils } from 'magic'

  export default {
    methods: {
      showContextMenu (event) {
        console.log(event, '!+!++')
        utils.ContextMenu.show({
          event,
          menus: {
            'close-current:关闭:false': () => {
            },
            'close-else:关闭其他:false': () => {
            },
            'close-all:关闭全部:false': () => {
            },
            'divider': true,
            'delete-current:删除:false': () => {
            },
            'modify-current:属性信息:false': () => {
            }
          }
        })
      }
    }
  }
</script>
