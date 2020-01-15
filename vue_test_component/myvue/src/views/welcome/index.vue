<template>
    <div>
        弱翁,测试项目欢迎你！
        <hr>
        当前时间 <span>{{now}}</span>
    </div>
</template>
<script>
import dayjs from 'dayjs'

export default {
    name:"welcome",
    data(){
        return{
            now: dayjs().format("YYYY-MM-DD HH:mm")
        }
    },
    mounted() {
        console.log(this.$router)
    }
}
</script>