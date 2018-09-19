<!--
    video基础组件（支持基本的视频流创建及播放）
    video props:
    videoData 单个视频的数据， 包含： url: 视频地址, name: 视频名称, height：视频高度, width：视频宽度
    heigth 可设置视频容器container的高度， 默认高度为100%
    ratio 设置视频的长宽比
-->

<template>
    <div ref="videoContainer" class="video-container" :style="{height: height + 'px'}">
        <video v-if="playing" ref="videoEl" class="lean-video" autoplay>
            您的浏览器不支持 video 标签。
        </video>
        <div v-if="!playing" class="video-not-connect">
            <Icon type="ionic" class="mr10" :size="24" style="vertical-align: middle;"></Icon>{{$t('components.leanVideo.descNotConnect')}}
        </div>
    </div>
</template>
<script>
    import * as api from '@/api/cameras'
    //引入 wfs.min.js

    export default {
        name: 'video-player',
        props: {
            // 单个视频数据（必带）
            // 包含： url: 视频地址, name: 视频名称, height：视频高度, width：视频宽度
            'videoData': {
                type: Object
            },
            // 'videoList': {
            //     type: Array
            // },
            // 视频长宽比 (选填)
            'ratio': {
                type: Number,
            },
            // 视频container高度
            'height': {
                type: Number
            }
        },
        data() {
            return {
                playing: false, // 当为false时显示poster
                connected: false, // 如果链接为false会重新建立连接
                wfs: null,
                uri: '',
                count: 0, // 定时5分钟断开websocket连接，重新连接
                reconnectTimes: 0,
                containerRatio: 16 / 9
            }
        },
        computed: {
            address() {
                return this.videoData ? this.videoData.url : ''
            },
            videoRatio() {
                let tempRatio = 1280 / 720
                if (this.ratio) {
                    tempRatio = this.ratio
                }
                return tempRatio
            }
        },
        methods: {
            play() {
                if (Wfs.isSupported() && !this.connected) {
                    if (this.wfs) {
                        this.wfs.destroy()
                        this.wfs = null
                    }
                    this.wfs = new Wfs();
                    this.wfs.uri = this.uri;
                    this.wfs.onDisconnect = (d) => {
                        // 如果重试5次还是连接不上，提示请检查摄像头信号
                        // this.reconnectTimes++
                        //     if (this.reconnectTimes > 5) {
                        //         this.stop()
                        //         return
                        //     }
                        // auto-retry
                        let timer = setTimeout(() => {
                            if (this.playing) {
                                console.log('upstream is not ready, retrying...')
                                this.stop()
                                this.start()
                            }
                            clearTimeout(timer);
                        }, 2000)
                    }
                    this.wfs.attachMedia(this.$refs.videoEl);
                    // this.wfs = wfs
                    this.connected = true
                    // this.videoWidth = this.$refs.videoEl.style.height
                    // this.videoHeight = this.$refs.videoEl.style.height
                }
            },
            start() {
                if (!this.playing) {
                    this.playing = true
                    this.$nextTick(() => {
                        this.clearTimer()
                        this.transcode()

                        this.timer = setInterval(() => {
                            this.transcode()
                        }, 20000) // 20 seconds
                    })
                }
            },
            stop() {
                if (this.playing) {
                    this.clearTimer()
                    console.log('dispose video: ' + this.uri)
                    if (this.wfs) {
                        this.wfs.destroy()
                        this.wfs = null
                    }
                    this.playing = false
                    this.connected = false
                }
            },
            transcode() {
                if (!this.address) {
                    return
                }
                this.count++
                    console.log(this.count)
                if (this.count > 10) {
                    this.count = 0
                    this.stop()
                    this.start()
                }
                api.transcode({
                    url: this.address
                }).then(res => {
                    // const uri = res.data.url
                    const uri = process.env.NODE_ENV === 'development' ?
                        `ws://192.168.1.44/video/${res.data.port}` :
                        `ws://${document.domain}/video/${res.data.port}`
                    // const uri = `ws://192.168.1.44/video/${res.data.port}`
                    // const uri = `ws://${document.domain}:${res.data.port}/`
                    this.uri = uri
                    console.log('retain video: ' + uri)
                    this.play()
                }).catch(err => {
                    console.log(err)
                })
            },
            clearTimer() {
                if (this.timer != null) {
                    clearInterval(this.timer)
                }
            }
        },
        watch: {
            videoData(cur, old) {
                this.stop()
                console.log(cur)
                this.start()
            },
            // ratio(cur, old) {
            //     let winW = window.innerWidth
            //     let winH = window.innerHeight - 52
            //     if (cur > winW / winH) {
            //         this.$refs.videoEl.style.height = 'auto'
            //         this.$refs.videoEl.style.width = '100%'
            //     } else {
            //         this.$refs.videoEl.style.height = '100%'
            //         this.$refs.videoEl.style.width = 'auto'
            //     }
            // },
            containerRatio() {
                if (this.containerRatio > this.videoRatio) {
                    this.$nextTick(function () {
                        this.$refs.videoEl.style.height = '100%'
                        this.$refs.videoEl.style.width = 'auto'
                    })
                } else {
                    this.$nextTick(function () {
                        this.$refs.videoEl.style.height = 'auto'
                        this.$refs.videoEl.style.width = '100%'
                    })
                }
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.containerRatio = this.$refs.videoContainer.offsetWidth / this.$refs.videoContainer.offsetHeight
            })

            this.start()
        },
        beforeDestroy() {
            this.stop()
        }
    }
</script>
<style lang="less" scoped>
    .video-container {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000000;
        height: 100%;
        width: 100%;
        min-width: 320px;
        overflow: hidden;
        font-size: 0;

        audio,
        video {
            height: auto;
            width: 100%;
            background-image: url('~@/assets/img/loading-white.gif');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 50px;
        }

        .video-not-connect {
            width: 100%;
            height: 400px;
            line-height: 400px;
            text-align: center;
            font-size: 16px;
            border-bottom: solid 1px #EFEFF3;
            background-color: #ECEFF5;
        }
    }
</style>