<template>
    <div class="topology-contianer">
        <div id="edit-topology"></div>
        <!--设备管理-->
        <Modal
                v-model="switch_edit"
                @on-cancel="dialogEditCancel"
                @on-visible-change="VisibleEditChange"
                width="700"
        >
            <div class="set-instance">
                <div class="title-area">
                    <span>设备名称:</span>
                    <Select v-model="edit_modal.device_id" filterable style="width:150px;"
                            @on-change="changeModalDevice">
                        <Option v-for="item in modal_device_list" :value="item.id" :key="item.id">{{ item.name }}
                        </Option>
                    </Select>
                </div>
                <div class="content-area">
                    <div class="left-area">
                        <div class="row-container">
                            <span class="title">别名:</span>
                            <span v-if="!left_allow_input">({{edit_modal.left_name}})</span>
                            <span @keyup.enter="left_allow_input = false" v-if="left_allow_input">
                                <Input v-model="edit_modal.left_name" style="width: 150px"></Input>
                            </span>
                            <span @click="left_allow_input = true" v-if="!left_allow_input"><Icon
                                    type="android-create"></Icon></span>
                        </div>
                        <div class="row-container">
                            <span class="title">外接设备:</span>
                            <Select v-model="edit_modal.left_device" filterable style="width:150px;">
                                <Option v-for="item in modal_selected_device_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </div>
                        <div class="row-container">
                            <span class="title">设备节点:</span>
                            <Select v-model="edit_modal.left_node" filterable style="width:150px;">
                                <Option v-for="item in node_left_list" :value="item.id" :key="item.id">{{ item.label}}</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="image-area">
                        <img src="../../assets/img/switch.png">
                    </div>
                    <div class="right-area">
                        <div class="row-container">
                            <span class="title">别名:</span>
                            <span v-if="!right_allow_input">({{edit_modal.right_name}})</span>
                            <span @keyup.enter="right_allow_input = false" v-if="right_allow_input">
                                <Input v-model="edit_modal.right_name" style="width: 150px"></Input>
                            </span>
                            <span @click="right_allow_input = true" v-if="!right_allow_input"><Icon
                                    type="android-create"></Icon></span>
                        </div>
                        <div class="row-container">
                            <span class="title">外接设备:</span>
                            <Select v-model="edit_modal.right_device" filterable style="width:150px;">
                                <Option v-for="item in modal_selected_device_list" :value="item.id" :key="item.id">{{ item.name }} </Option>
                            </Select>
                        </div>
                        <div class="row-container">
                            <span class="title">设备节点:</span>
                            <Select v-model="edit_modal.right_node" filterable style="width:150px;">
                                <Option v-for="item in node_right_list" :value="item.id" :key="item.id">{{ item.label}}</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="bottom-area">
                        <div class="row-container">
                            <span class="title">别名:</span>
                            <span v-if="!bottom_allow_input"
                                  style="display: inline-block;width:130px;">({{edit_modal.bottom_name}})</span>
                            <span @keyup.enter="bottom_allow_input = false" v-if="bottom_allow_input">
                                <Input v-model="edit_modal.bottom_name" style="width: 150px"></Input>
                            </span>
                            <span @click="bottom_allow_input = true" v-if="!bottom_allow_input">
                                <Icon type="android-create"></Icon>
                            </span>
                        </div>
                        <div class="row-container">
                            <span class="title">外接设备:</span>
                            <Select v-model="edit_modal.bottom_device" filterable style="width:150px;">
                                <Option v-for="item in modal_selected_device_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </div>
                        <div class="row-container">
                            <span class="title">设备节点:</span>
                            <Select v-model="edit_modal.bottom_node" filterable style="width:150px;">
                                <Option v-for="item in node_bottom_list" :value="item.id" :key="item.id">{{ item.label}}</Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" style="height:35px;">
                <Button type="primary" @click="dialogNodeEditOk">保存</Button>
            </div>
        </Modal>
        <Modal
                v-model="delete_dialog"
                title="删除设备"
                @on-cancel="dialogDeleteCancel"
                @on-visible-change="VisibleDeleteChange"
                width="700"
        >
            <div class="set-instance">
                <p>
                    您将要删除：<span style="color:red;">{{node_selected.name}}</span> ，以及该设备维护的相关的连接。
                </p>
            </div>
            <div slot="footer" style="height:35px;">
                <Button type="primary" @click="dialogNodeDeleteOk">
                    确定
                </Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import * as d3 from 'd3'
    import {apiGetDeviceList} from '@/api/power.js'
    export default {
        name: 'edit-topology',
        props: ["nodeList",'substation'],
        data() {
            return {
                msg: '',
                switch_edit: false,            //闸modal控制
                delete_dialog: false,         //删除modal控制
                left_allow_input: false,
                right_allow_input: false,
                bottom_allow_input: false,
                node_list: {
                    nodes: [],
                    links: []
                },
                node_selected: {
                    name: '',
                    x: '',
                    y: '',
                    brake_info: {},
                    node_info: {}
                },
                modal_brake: {                 //闸modal变量申明
                    name: '',
                    pass_word: '',
                    password_second: '',
                    docker: '',
                    is_brake: false
                },
                modal_device_list: [
                    {
                        id: -1,
                        type: '0',
                        name: '请选择'
                    }
                ],
                node_3_list: [
                    {
                        id: 'l',
                        label: '左节点'
                    }, {
                        id: 'm',
                        label: '下节点'
                    }, {
                        id: 'r',
                        label: '右节点'
                    }
                ],
                node_2_list: [
                    {
                        id: 'l',
                        label: '左节点'
                    }, {
                        id: 'r',
                        label: '右节点'
                    }
                ],
                node_1_list: [
                    {
                        id: 'm',
                        label: '下节点'
                    }
                ],
                edit_modal: {
                    device_id: null,
                    left_device: null,
                    right_device: null,
                    bottom_device: null,
                    left_node: "",
                    right_node: "",
                    bottom_node: "",
                    left_name: '',
                    right_name: '右侧节点',
                    bottom_name: '底部节点'
                },
            }
        },
        computed: {
            //根据设备类型，动态计算对应的节点列表
            node_left_list() {
                let temp = {};
                this.modal_selected_device_list.forEach(item => {
                    if (item.id == this.edit_modal.left_device) {
                        temp = item
                    }
                });
                if (temp.type === 1) return this.node_3_list;
                if (temp.type === 2) return this.node_2_list;
                if (temp.type === 3) return this.node_1_list;
            },
            node_right_list() {
                let temp = {};
                this.modal_selected_device_list.forEach(item => {
                    if (item.id == this.edit_modal.right_device) {
                        temp = item
                    }
                });
                if (temp.type === 1) return this.node_3_list;
                if (temp.type === 2) return this.node_2_list;
                if (temp.type === 3) return this.node_1_list;
            },
            node_bottom_list() {
                let temp = {};
                this.modal_selected_device_list.forEach(item => {
                    if (item.id == this.edit_modal.bottom_device) {
                        temp = item
                    }
                });
                if (temp.type === 1) return this.node_3_list;
                if (temp.type === 2) return this.node_2_list;
                if (temp.type === 3) return this.node_1_list;
            },
            modal_selected_device_list() {
                let temp_array = []
                this.node_list.nodes.forEach(item => {
                    let temp_obj = {
                        id: item.id,
                        type: item.type,
                        name: item.name
                    }
                    temp_array.push(temp_obj)
                });
                return temp_array;
            }
        },
        methods: {
            //闸状态modal控制  变量控制
            changeModalDevice: function () {
                let allow_submit = true
                this.node_list.nodes.forEach(item => {
                    if (this.node_selected.id !== this.edit_modal.device_id && this.edit_modal.device_id == item.id) {
                        allow_submit = false
                    }
                })
                if (!allow_submit) {
                    this.edit_modal.device_id = this.node_selected.id
                    this.$Notice.error({
                        title: '设备已存在，请重新选择'
                    })
                    return
                }
            },
            //工具方法
            setSourceIndex: function (id) {
                if (id === null) {
                    return null
                }
                let temp_index = 0
                this.node_list.nodes.forEach((item, index) => {
                    if (item.id == id) {
                        temp_index = index
                    }
                })
                return temp_index
            },
            getNodeIndex: function (id) {
                let temp_index = null
                this.nodeList.nodes.forEach((item, index) => {
                    if (id === item.id) {
                        temp_index = index
                    }
                })
                return temp_index
            },
            getNodeIndexByID: function (id) {
                let temp_index = null
                this.nodeList.nodes.forEach((item, index) => {
                    if (item.id === id) {
                        temp_index = index
                    }
                })
                return temp_index
            },

            //工具方法结束

            //生成连线集，每次节点改变都需要调用该方法，每个节点只需要维护自己生产的节点集
            computedLinks: function (nodes) {
                let links = []
                nodes.forEach((item, index) => {
                    if (item.node_info.left_device !== null && item.node_info.left_device !== -1) {
                        let temp_link = {
                            'source': this.getNodeIndexByID(item.node_info.left_device),
                            'target': this.getNodeIndexByID(item.id),
                            'relation': item.node_info.left_name,
                            'start': item.node_info.left_node,
                            'end': 'l'
                        }
                        links.push(temp_link)
                    }

                    if (item.node_info.right_device !== null && item.node_info.right_device !== -1) {
                        let temp_link = {
                            'source': this.getNodeIndexByID(item.node_info.right_device),
                            'target': this.getNodeIndexByID(item.id),
                            'relation': item.node_info.right_name,
                            'start': item.node_info.right_node,
                            'end': 'r'
                        }
                        links.push(temp_link)

                    }
                    if (item.node_info.bottom_device !== null && item.node_info.bottom_device !== -1) {
                        let temp_link = {
                            'source': this.getNodeIndexByID(item.node_info.bottom_device),
                            'target': this.getNodeIndexByID(item.id),
                            'relation': item.node_info.bottom_name,
                            'start': item.node_info.bottom_node,
                            'end': 'm'
                        }
                        links.push(temp_link)
                    }
                })
                return links
            },

            //编辑相关方法  模态框，入口初始化方法，确定方法，取消方法
            dialogNodeEditOk () {
                const selected_id = this.node_selected.id
                const node_index = this.getNodeIndex(selected_id)
                this.node_selected.id = this.edit_modal.device_id
                this.node_selected.node_info = {
                    left_device: this.edit_modal.left_device,
                    right_device: this.edit_modal.right_device,
                    bottom_device: this.edit_modal.bottom_device,
                    left_node: this.edit_modal.left_node,
                    right_node: this.edit_modal.right_node,
                    bottom_node: this.edit_modal.bottom_node,
                    left_name: this.edit_modal.left_name,
                    right_name: this.edit_modal.right_name,
                    bottom_name: this.edit_modal.bottom_name
                }

                //节点状态更新以及连线集更新
                this.nodeList.nodes.splice(node_index, 1, this.node_selected)
                this.nodeList.links = this.computedLinks(this.nodeList.nodes)
                this.switch_edit = false
            },
            dialogEditCancel () {
                this.switch_edit = false
            },
            VisibleEditChange () {
                this.edit_modal = {
                    device_id: this.node_selected.id,
                    left_device: this.node_selected.node_info.left_device,
                    right_device: this.node_selected.node_info.right_device,
                    bottom_device: this.node_selected.node_info.bottom_device,
                    left_node: this.node_selected.node_info.left_node,
                    right_node: this.node_selected.node_info.right_node,
                    bottom_node: this.node_selected.node_info.bottom_node,
                    left_name: this.node_selected.node_info.left_name,
                    right_name: this.node_selected.node_info.right_name,
                    bottom_name: this.node_selected.node_info.bottom_name
                }
                this.getDeviceByNoActive()
            },
            //编辑相关方法结束

            //删除相关方法
            dialogNodeDeleteOk () {
                const node_index = this.getNodeIndex(this.node_selected.id)
                this.nodeList.nodes.forEach(item => {
                    if (item.node_info.left_device == node_index) {
                        item.node_info.left_device = null
                        item.node_info.left_node = ''
                        item.node_info.left_name = ''
                    }
                    if (item.node_info.right_device == node_index) {
                        item.node_info.right_device = null
                        item.node_info.right_node = ''
                        item.node_info.right_name = ''
                    }
                    if (item.node_info.bottom_device == node_index) {
                        item.node_info.bottom_device = null
                        item.node_info.bottom_node = ''
                        item.node_info.bottom_name = ''
                    }
                })
                this.nodeList.nodes.splice(node_index, 1)
                this.nodeList.links = this.computedLinks(this.nodeList.nodes)
                this.delete_dialog = false
            },
            dialogDeleteCancel () {
                this.delete_dialog = false
            },
            VisibleDeleteChange () {},
            //删除方法结束
            //绘制拓扑图
            drawTopology: function () {
                let width = $("#edit-topology").width();
                let height = 600;
                let links_data = this.node_list.links;

                let force = d3.forceSimulation()
                    .force("charge", d3.forceManyBody())
                    .force("center", d3.forceCenter(width / 2, height / 2))
                    .on("tick", tick);

                let svg = d3.select("#edit-topology").append("svg")
                    .attr("width", 10000)
                    .attr("height", 10080);

                //svg = svg.brush().extent([0,0],[10000,10000]);

                //需要注意添加顺序，注意元素层级覆盖
                let link = svg.selectAll(".link");
                let node_container = svg.selectAll(".node-container");
                let node_delete_icon  = svg.selectAll(".delete-icon");
                let node = svg.selectAll(".node");
                let edges_text = svg.selectAll(".linetext");


                let text_dx = -20;
                let text_dy = 10;

                let nodes_text = svg.selectAll(".nodetext")
                    .data(this.node_list.nodes)
                    .enter()
                    .append("text")
                    .attr("class", "nodetext")
                    .attr("dx", text_dx)
                    .attr("dy", text_dy)
                    .text(function (d) {
                        return d.name;
                    });

                force
                    .nodes(this.node_list.nodes)
                    .force("link", d3.forceLink(links_data));


                link = link.data(links_data)
                    .enter().append("line")
                    .attr("class", "link");


                edges_text = edges_text.data(this.node_list.links)
                    .enter()
                    .append("text")
                    .attr("class", "linetext")
                    .text(function (d) {
                        return d.relation;
                    });



                node_container = node_container.data(this.node_list.nodes)
                    .enter().append("rect")
                    .attr("class","node-container")
                    .attr("width",50)
                    .attr("height",70)
                    .style("z-index",1)

                node_delete_icon = node_delete_icon.data(this.node_list.nodes)
                    .enter()
                    .append("rect")
                    .attr("class", "delete-icon")
                    .attr("width",6)
                    .attr("height",3)
                    .on("click", function(d,i){
                        self.node_selected = d;
                        self.delete_dialog = true;
                    })

                let self = this;
                node = node.data(this.node_list.nodes)
                    .enter().append("image")
                    .attr("class", function(d){ return (d.type==='1'&& d.is_brake ==="合闸") ? "switch-node-open" : "switch-node-close"})
                    .attr("width", 45)
                    .attr("height", 66)
                    .attr("xlink:href",function(d){
                        let src = '';
                        if(d.type ===1 && d.is_brake === '合闸'){
                            src = require('../../assets/img/switch_open.png')
                        }else if(d.type ===1 && d.is_brake === '分闸'){
                            src = require('../../assets/img/switch_close.png')
                        }
                        return src;
                    })
                    .on("mouseover", function (d, i) {
                        //显示连接线上的文字
                        edges_text.style("fill-opacity", function (edge) {
                            if (edge.source === d || edge.target === d) {
                                return 1.0;
                            }
                        });
                    })
                    .on("mouseout", function (d, i) {
                        //隐去连接线上的文字
                        edges_text.style("fill-opacity", function (edge) {
                            if (edge.source === d || edge.target === d) {
                                return 0.0;
                            }
                        });
                    })
                    .on("contextmenu", function (d, i) {

                        if (d.type && d.type == '1') {
                            self.node_selected = d;
                            self.switch_edit = true;
                        }
                        //return false;
                    })
                    .call(d3.drag()
                        .on("start", dragstart)
                        .on("end", dragend)
                        .on("drag", dragged));

                //.on("end",this.dragended));

                function tick() {
                    //设置线
                    link.attr("x1", function (d) {
                        if (d.start === "l") {
                            return d.source.x;
                        } else if (d.start === "m") {
                            return d.source.x + 22;
                        } else if (d.start === "r") {
                            return d.source.x + 44;
                        } else {
                            return d.source.x;
                        }
                    })
                        .attr("y1", function (d) {
                            if (d.start === "l") {
                                return d.source.y + 17;
                            } else if (d.start === "m") {
                                return d.source.y +59;
                            } else if (d.start === "r") {
                                return d.source.y + 17;
                            } else {
                                return d.source.x;
                            }
                        })
                        .attr("x2", function (d) {
                            if (d.end === "l") {
                                return d.target.x ;
                            } else if (d.end === "m") {
                                return d.target.x + 22;
                            } else if (d.end === "r") {
                                return d.target.x + 44;
                            } else {
                                return d.target.x;
                            }
                        })
                        .attr("y2", function (d) {
                            if (d.end === "l") {
                                return d.target.y + 17;
                            } else if (d.end === "m") {
                                return d.target.y + 59;
                            } else if (d.end === "r") {
                                return d.target.y + 17;
                            } else {
                                return d.target.y;
                            }
                        });

                    //设置节点
                    node.attr("x", function (d) {
                        d.fx = d.x;
                        return d.x;
                    })
                        .attr("y", function (d) {
                            d.fy = d.y;
                            return d.y;
                        });

                    node_container.attr("x",function(d){
                        return d.x - 5;
                    })
                        .attr("y", function(d){
                            return d.y - 5;
                        })


                    node_delete_icon.attr("x", function (d) {
                        return d.x + 40 ;
                    })
                        .attr("y", function (d) {
                           return d.y - 8 ;
                        });


                    //更新连接线上文字的位置
                    edges_text.attr("x", function (d) {
                        return (d.source.x + d.target.x) / 2;
                    });
                    edges_text.attr("y", function (d) {
                        return (d.source.y + d.target.y) / 2;
                    });

                    nodes_text.attr("x", function (d) {
                        return d.x + 15;
                    });
                    nodes_text.attr("y", function (d) {
                        return d.y - 30;
                    });
                }

                function dragstart(d, i) {
                    if (!d3.event.active) {
                        force.alphaTarget(.1).restart();
                    }
                    d.fx = d.x;
                    d.fy = d.y;
                }

                function dragend(d, i) {
                    let temp_node = self.nodeList.nodes[i];
                    temp_node.fx = d.fx;
                    temp_node.fy = d.fy;
                    self.nodeList.nodes.splice(i, 1, temp_node);
                }

                function dragged(d, i) {
                    d.fx = d3.event.x;
                    d.fy = d3.event.y;

                }

            },
            //接口请求方法
            getDeviceByNoActive: function () {
                let params = {
                    substation: this.substation,
                    is_active: true
                }
                apiGetDeviceList(params).then(res => {
                    this.modal_device_list = res.data
                    this.modal_device_list.unshift({id: -1, type: '0', name: '请选择'})
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        mounted() {
            document.getElementById('edit-topology').oncontextmenu = function (e) {
                return false
            }
            setTimeout(() => {
                this.node_list.nodes = _.cloneDeep(this.nodeList.nodes)
                this.node_list.links = _.cloneDeep(this.nodeList.links)
                this.drawTopology()
            }, 500)
        },
        watch: {
            nodeList: {
                handler: function (val, oldVal) {
                    this.node_list.nodes = _.cloneDeep(this.nodeList.nodes)
                    this.node_list.links = _.cloneDeep(this.nodeList.links)
                    $("#edit-topology svg:first").remove();
                    this.drawTopology()
                },
                deep: true
            }
        },
        components: {}
    }
</script>
<style lang="scss" >
    .topology-container {
        width: 100%;
        height: 600px;

        #edit-topology {
            width: 100%;
            height: 600px;
        }

    }

    .link {
        stroke: #d9d9d9;
        stroke-width: 1.5px;
    }

    .switch-node-open {
        cursor: move;
        z-index: 10;
    }

    .switch-node-close {
        cursor: move;
        z-index: 10;
    }

    .delete-icon {
       // fill: ;
        cursor:pointer;
        stroke: #5e5e5e;
        stroke-width: 1px;
    }

    .node-container{
        fill: #F1F1F1;
        fill-opacity:0.5;
    }

    .node-circle {
        fill: #D9D9D9;
        stroke: #D9D9D9;
        stroke-width: 1px;
    }

    .linetext {
        font-size: 10px;
        font-family: SimSun;
        fill: #0000FF;
        fill-opacity: 0.0;
    }

    .nodetext {
        font-size: 10px;
        font-family: SimSun;
        fill: #000000;
    }


    /*右键css代码*/
    .right-menu {
        position: absolute;
        z-index: 99999;
        overflow: hidden;
        width: 150px;
        background-color: #FFFFFF;
        font-size: 14px;
        list-style-type: none;
        display: none;

        ul {
            border: 1px solid #EFEFEF;
            border-radius: 0 0 4px 4px;
        }
        li {
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 15px;

            span {
                display: block;
                cursor: pointer;
                width: 100%;
                height: 40px;
                padding-left: 25px;
                line-height: 40px;
                color: #000;
            }
            :hover {
                width: 100%;
                background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%);
                color: #ffffff;
            }
        }
    }

    /*modal-css代码*/

    .set-instance {
        padding-left: 15px;
        .title-area {
            width: 250px;
            margin: auto;
        }
        .content-area {
            height: 245px;
            margin-top: 10px;
            span {
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #666666;
                letter-spacing: 0.53px;
            }
            i {
                cursor: pointer;
            }
            .title {
                display: inline-block;
                width: 60px;
            }
            .row-container {
                height: 40px;
            }
            .left-area {
                display: inline-block;
                width: 230px;
                height: 125px;
                float: left;
            }
            .image-area {
                display: inline-block;
                width: 100px;
                height: 125px;
                margin: 5px;
            }
            .right-area {
                display: inline-block;
                width: 230px;
                height: 125px;
                float: right;
            }
            .bottom-area {
                display: inline-block;
                width: 250px;
                height: 125px;
                margin-left: 200px;
            }
        }
    }
</style>