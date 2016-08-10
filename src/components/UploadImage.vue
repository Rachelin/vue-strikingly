<template>
<div v-show="broadcastMsg" class="modal-container-wrapper" transition="modal">
    <div class="asset-lib-dialog s-edit-modal">

    <div class="s-tab-wrapper s-tab-inner">
        <div class="close" @click="broadcastMsg=false">x</div>

        <div class="thumbs">
            <span class="thumb" @click="switchTab" v-bind:class="isA ? 'selected' : ''">
                <div class="fa fa-cloud-upload"></div>
                <span>上传新图片</span>
            </span>
            <span class="thumb" @click="switchTab" v-bind:class="isA ? '' : 'selected'">
                <div class="fa fa-folder-open"></div>
                <span>已上传图片</span>
            </span>
        </div>

        <div class="tab tab1" v-bind:class="isA ? 'selected' : ''">
            <div class="image-uploader-zone" v-show="total == 0">
                <div class="dashed-border">
                    <div class="s-image-uploader-wrapper">
                        <div>
                            <div class="upload-drag-title">
                                <span>拖动文件至此</span>
                            </div>
                            <div class="or">或者</div>
                            <a class="upload-button" @click="openFold()">在文件夹中浏览</a>
                        </div>
                    </div>
                    <div style="display:none">
                        <input type="file" name="imagefile" v-el:upbutton @change="upload"  accept=".gif,.jpeg,.jpg,.png,.bmp" size="400" v-el:uploader multiple="false">
                    </div>
                </div>
            </div>

            <div class="upload-progress-wrapper" v-show='total > 0'>
                <progress class="progress progress-success progress-striped " value="{{loaded}}" max="{{total}}">
                    <div class="progress progress-success progress-striped ">
                        <span class="progress-bar" v-bind:style="'width: loaded*100/total %'">{{loaded*100/total}}%</span>
                    </div>
                </progress>
            </div>
        </div>

        <div class="tab tab2" v-bind:class="isA ? '' : 'selected'">
            <div class="s-image-asset-library">
                <div class="asset-content">
                    <div class="content-inner">
                        <ul class="list single">
                            <li class="item" v-for="item in list" @click="onSelected($index)">
                                <div class="cover enlarged-cover">
                                    <div class="panel">
                                        <div class="choose s-btn small green">选择</div>
                                        <div class="info">
                                            size: {{item.filesize}}
                                            类型:
                                            <i v-if="searchImg(item.file_key)">图片</i>
                                            <strong v-else class="warnning">非图片</strong>
                                            <br>
                                            id: {{item.id}} 
                                            <div class="remove">
                                                <div class="fa fa-trash-o"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <img v-if="searchImg(item.file_key)" :src="item.file_url">
                                <div v-else class="placehode"></div>   
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
</div>
</template>

<script>
import {common}             from '../store/Common.js'
import {api}                from '../store/Api.js'
import notificationStore    from '../NotificationStore.js'

export default {
    name: 'UploadImage',

    components: {
    },

    data () {
        return {
            isA: true,
            list: [],
            count: 0,   //展示图片总数量
            offset: 0,  // 分页数据请求偏移量
            limit: 18,  // 一次请求数量
            total: 0,
            loaded: 0,
            broadcastMsg : ''
        }
    },

    created () {
        this.getImgList()
    },

    events : {
        onUploadShow(broadcastMsg) {
            this.broadcastMsg = broadcastMsg
        }
    },

    methods: {
        // 过滤非图片文件
        searchImg (str) {
            let isImage = /^([\w\d\/])+\.(png|jpeg|jpg|gif|bmp)$/i;
            return /^([\w\d\/])+\.(png|jpeg|jpg|gif|bmp)$/i.test(str)
        },

        getImgList () {
            let self = this
            if(this.count > 0 && this.offset === this.count ) {
                return
            }
            let params = {
                limit : self.limit,
                offset: self.offset
            }
            api.getAction('attachments', params, (response) => {
                let res = response.json()
                if(res.code === 0) {
                    self.list = self.list.concat(res.data)
                    self.count = res._count
                    self.offset += self.limit
                }
            })
        },

        // tab转换
        switchTab () {
            this.isA = !this.isA
        },

        // 打开本地文件
        openFold () {
            this.$els.uploader.click()
        },

        // 获取参数,循环上传
        upload(e) {
            var self = this,
                files = e.target.files,
                length = files.length;

            for(var i=0; i < length; i++) {
                (function(e) {
                    var formData = new window.FormData;
                    formData.append('filedata', files[i])
                    formData.append('access_token', common.accessToken);
                    self.uploadFiles(formData);
                })(i);
            }
        },

        // 上传图片方法
        uploadFiles(formData) {
            this.total = 100
            this.loaded = 10
            var onTimeOutHandler = (event) => {
                this.showNotification('上传时间超时啦，再试一次吧：）')
            };

            var onreadstatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    // 上传成功，获取到结果 results
                    var res = JSON.parse(xhr.responseText);
                    if( res.code == 0){
                        let image = res.data.fileUrl
                        let imgId = res.data.id
                        this.showNotification('上传成功 ：）')
                        this.broadcast(imgId, image)
                    }else{
                        this.showNotification('帅的不要不要的上传，还是失败哦T_T')
                    }
                }

                this.total = this.loaded = 0
            };

            var onprogress = function (event) {
                this.total = event.total
                this.loaded = event.loaded
                console.log("上传进度：", this.total, '/',  this.loaded)
            }

            // 发送请求
            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'http://admin.121dian.net/api/attachment/upload');
            xhr.timeout = 30000;
            xhr.ontimeout = onTimeOutHandler;
            xhr.onreadystatechange = onreadstatechange;
            xhr.upload.onprogress = onprogress
            xhr.send(formData);
        },

        onSelected (index) {
            let imgId = this.list[index].id
            let image = this.list[index].file_url
            let key = this.list[index].file_key
            if(this.searchImg(key)) {
                this.broadcast(imgId, image)
            } else {
                this.showNotification('不是图片，不能选择')
            }
        },

        broadcast (imgId, image) {
            this.$parent.$broadcast(this.broadcastMsg, imgId, image)
            this.broadcastMsg = ''
        },

        showNotification (msg) {
            msg = msg ? msg : 'null'
            notificationStore.add({title: msg});
        },
    },
}
</script>

<style lang="less">

.modal-container-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 2001;
}

.s-edit-modal {
    z-index: 2100;
    font-family: 'pragmatica',sans-serif;
    position: relative;
    font-weight: 500;
    overflow: hidden;
    margin: 0 auto;
    border-radius: 4px;
    box-shadow: 0 1px 8px rgba(0,0,0,0.7);
    background: #fff;
    opacity: 1;
    -webkit-transition: all .3s;
    transition: all .3s;
    transform: translate3d(0,0,0);
    -webkit-transform: initial;
    
    @media only screen and (min-width: 501px) {
        position: relative;
        border-radius: 4px;
        box-shadow: 0 1px 8px rgba(0, 0, 0, 0.7);
        margin-top: 97px;
        top: 0px;
        width: 990px;
        height: 580px;
    }
}

.s-tab-wrapper.s-tab-inner{
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;

    .close {
        position: absolute;
        right: 16px;
        top: 10px;
        font-size: 30px;
        cursor: pointer;
        color: #777;
    }

    .thumbs {
        position: absolute;
        top: 4px;
        left: 20px;
        line-height: 50px;
        z-index: 1;
        font-size: 16px;
        font-family: 'brandon',sans-serif;
        font-weight: 600;
        color: #777;
        margin-right: 3px;
        z-index: 1;
        .thumb {
            padding: 10px 20px 13px 20px;
            cursor: pointer;
            margin: 0 6px;
            border-radius: 3px;
            border: 1px solid transparent;
            border-bottom-width: 0;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
            text-transform: uppercase;
        }

        .thumb:hover,
        .thumb.selected {
            background: white;
            border: 1px solid #ddd;
            border-bottom-width: 0;
            color: #444;
        }
    }
    

    .tab {
        position: absolute;
        visibility: hidden;
        right: 0;
        bottom: 0;
        left: 0;
        top: 50px;
        border-top: 1px solid #ddd;
        background: #fff;
        width: 100%;
        overflow: auto;
        -webkit-transition: all .3s cubic-bezier(.25,.46,.45,.94);
        transition: all .3s cubic-bezier(.25,.46,.45,.94);

        &.tab1 {
            left: -100%
        }
        &.tab2 {
            left: -100%
        }

        &.selected {
            left: 0;
            visibility: visible;
        }
    }
}

.image-uploader-zone {
    text-align: center;
    .dashed-border {
        width: auto;
        height: auto;
        border: 4px dashed #ddd;
        position: absolute;
        top: 30px;
        left: 30px;
        right: 30px;
        bottom: 30px;
    }

    .upload-button {
        display: inline-block;
        zoom: 1;
        font-size: 18px;
        color: #444;
        background-color: #ddd;
        background-repeat: repeat-x;
        background-image: -webkit-linear-gradient(top,#f4f4f4,#ddd);
        background-image: linear-gradient(to bottom,#f4f4f4,#ddd);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f4f4f4',endColorstr='#dddddd',GradientType=0);
        text-shadow: 0 1px #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px 20px;
    }
    .upload-drag-title {
        padding-top: 120px;
        font-size: 28px;
        color: #878787;
    }

    .or {
        font-size: 12px;
        color: #bababa;
        padding: 15px 0;
    }
}

.s-image-asset-library {
    .asset-content {
        position: absolute;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        padding: 10px 20px 0 20px;
        overflow: auto;

        .content-inner {
            position: relative;
        }

        ul.list {
            margin: 0;
            padding:0;
            // overflow:hidden;
            list-style: disc inside;

            li {
                list-style: none;
                display: inline-block;
                margin: 0;
                width: 150px;
                height: 150px;
                overflow: visible;
                text-align: center;
                position: relative;
                border: 2px solid transparent;
                z-index: 1;
                line-height: 140%;

                &:before {
                    content: '';
                    display: inline-block;
                    height: 100%;
                    vertical-align: middle;
                    margin-right: -0.25em;
                }

                &:hover,
                li.selected {
                    z-index: 5;
                    background: transparent;

                    img {
                        position: relative;
                        cursor: pointer;
                    }

                    .cover {
                        background-image: url(//assets.strikingly.com/assets/icons/checker-bg-80d12f5b8ab59e311a32b7cb2dc8831b.png);
                        background-repeat: repeat;
                    }

                    .enlarged-cover {
                        border-color: #95db14;
                    }
                }

                img,
                .placehode {
                    display: inline-block;
                    vertical-align: middle;
                    max-width: 130px;
                    max-height: 150px;
                    border: 1px solid #eee;
                }

                .placehode {
                    width: 130px;
                    height: 130px;
                }

                .cover.enlarged-cover {
                    height: 170px;
                }

                .cover {
                    display: block;
                    opacity: 0;
                    border: 2px solid transparent;
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;

                    &:hover {
                        display: block;
                        opacity: 1;
                    }

                    .panel {
                        position: absolute;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        background: transparent;
                        z-index: 2;
                        text-align: center;
                        cursor: pointer;
                        &:before {
                            content: '';
                            display: inline-block;
                            height: 100%;
                            vertical-align: middle;
                            margin-right: -0.25em;
                        }
                        .choose {
                            display: none;
                            vertical-align: middle;
                            width: auto
                        }

                        .info {
                            cursor: text;
                            background: white;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            color: #999;
                            font-size: 10px;
                            font-family: arial,helvetica,sans-serif;
                            line-height: 1;
                            text-align: left;
                            padding: 6px 10px;
                            -webkit-transition: all .3s;
                            transition: all .3s;
                        }
                        .remove {
                            position: absolute;
                            cursor: pointer;
                            bottom: 6px;
                            right: 10px;
                            font-size: 18px;
                            color: #999;
                            font-weight: bold;

                        }
                        .warnning {
                            color: red;
                        }
                    }
                }
            }
        }
    }
}

.progress {
    display: inline-block;
    height: 2rem;
    margin-top: 3rem;
    width: 84%;
    margin-left: 8%;


    &[value] {
        color: #aa74F3;
        border: 0;
        appearance: none;
    }

    &[value]::-webkit-progress-bar {
        background-color: #eee;
        border-radius: .25rem
    }

    &[value]::-webkit-progress-value::before {
        content: attr(value)
    }

    &[value]::-webkit-progress-value {
        background-color: #0074d9;
        border-top-left-radius: .25rem;
        border-bottom-left-radius: .25rem
    }

    &[value="100"]::-webkit-progress-value {
        border-top-right-radius: .25rem;
        border-bottom-right-radius: .25rem
    }

    @media screen and (min-width: 0px ) {
        background-color:#eee;
        border-radius: .25rem;
    }
    
    @media screen and (min-width: 0px ) {
        &[width^="0"] {
            min-width: 2rem;
            color: #818a91;
            background-color: transparent;
            background-image: none
        }
    }

    @media screen and (min-width: 0px ) {
        &[width^="100%"] {
            border-top-right-radius: .25rem;
            border-bottom-right-radius: .25rem
        }
    }
}

.progress-bar {
    @media screen and (min-width: 0px ) {
        background-color:#eee;
        border-radius: .25rem
    }
}

.progress-striped[value]::-webkit-progress-value {
    background-image: -webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
    background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
    -webkit-background-size: 1rem 1rem;
    background-size: 1rem 1rem
}

.progress-striped[value]::-moz-progress-bar {
    background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
    background-size: 1rem 1rem
}

.progress-animated[value]::-webkit-progress-value {
    -webkit-animation: progress-bar-stripes 2s linear infinite;
    animation: progress-bar-stripes 2s linear infinite
}

.progress-animated[value]::-moz-progress-bar {
    animation: progress-bar-stripes 2s linear infinite
}

.progress-success[value]::-webkit-progress-value {
    background-color: #5cb85c
}

.progress-success[value]::-moz-progress-bar {
    background-color: #5cb85c
}

@media screen and (max-width: 700px) {
  .modal-container-wrapper {
    width: 95vw;
  }
}
@media screen and (max-width: 400px) {
  .modal-container-wrapper {
    width: 98vw;
    padding: 1em;
  }
}

.modal-transition {
  will-change: transform, opacity;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease;
}

.modal-enter, .modal-leave {
  transform: scale(0.7);
  opacity: 0;
}

</style>