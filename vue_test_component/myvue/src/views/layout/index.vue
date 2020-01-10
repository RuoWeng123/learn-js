<template>
    <div>
        <el-container>
            <el-header>Header
               
            </el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import router from '@/router'
export default {
    name:"layout",
    data(){
        return{
            route : router
        }
    },
    mounted(){
        //console.log("==")
    }
}
</script>