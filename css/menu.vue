<template>
    <div class="menu ml20">
        <ul>
            <li v-for="menu in menuList" v-if="!menu.hidden">

                <div class="inline-block" @click="changeMenu(menu)">
                    <Icon :type="menu.meta.icon" size="20"></Icon>
                    <span>{{menu.meta.title}}</span>
                </div>
                <ul class="sub-ul" v-if="menu.children.length >= 2">
                    <li class="sub-li" v-for="item in menu.children">
                        {{item.meta.title}}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name:'lean-menu',
        props:['menuList'],
        data(){
            return{

            }
        },
        methods:{
            changeMenu: function(menu){
                this.$emit('changeMenu',menu)
            }
        }
    }
</script>
<style lang="less" scoped>
    .menu{
        width:550px;
        ul{
            height:64px;
            color:#666666;
        }
        li{

            width:130px;
            height:63px;
            line-height:63px;
            display:inline-block;
            list-style: none;
            cursor:pointer;
            text-align: center;
            font-size: 16px;
            color: #C2C8E7;
            letter-spacing: 0.76px;
            &:hover{

                color:#FFFFFF;
                border-bottom:3px solid #FFFFFF;
                border-radius: 1px;
            }

            .sub-ul{
                background:#e4e4e4;
                height:auto;

                .sub-li{
                    display: table-caption;
                    list-style: none;
                    height:45px;
                    line-height:45px;
                    border-bottom:1px solid #f7f7f7;
                }
            }

        }
    }

</style>