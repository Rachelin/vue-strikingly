<template>
    <carousel :indicators="true" :auto.sync="isAuto" :responsive="55">
        <carousel-item v-for="item in items">
            <a data-href="{{item.url}}" class="item">
                <component-editor :delete-self="del" :index="$index">
                    <span slot="title" @click="showEdit($index)">编辑轮播</span>
                    <span slot="image">
                        <img class="img" :src="item.image" alt="{{item.title}}" style="height: 206px;">
                    </span>
                </component-editor>
            </a>
        </carousel-item>
    </carousel>

    <div class="s-repeatable-add-button-wrapper" >
        <div class="s-repeateable-add-button">
            <span v-show="isAuto==0" @click="autoCarousel">开启轮播</span>
            <span v-show="isAuto>0" @click="stopCarousel">暂停轮播</span>
        </div>
        <div class="s-repeateable-add-button" @click="showEdit(-1)">
            添加新图
        </div>
    </div>

<modal :is-visible.sync="isModalVisible" modal-class="time-modal">
    <p>添加素材：</p>
    <div>
        <upload-image :id.sync="tempData.img" :file-url.sync="tempData.image"></upload-image><br>
    </div>
    <span>图片宽度：</span> <input type="text" v-model="tempData.width"></input>
    <span>图片高度：</span> <input type="text" v-model="tempData.height"></input>
    <span>连接地址：</span> <input type="text" v-model="tempData.url"></input>
    <a v-if="!tempData.id" class="s-btn" v-on:click="add">添加</a>
    <a v-else class="s-btn" v-on:click="save">保存</a>
</modal>

</template>

<script>
import ComponentEditor  from './ComponentEditor.vue'
import Carousel         from './Carousel.vue'
import CarouselItem     from './CarouselItem.vue'
import popupDialog      from './popupDialog.vue'
import Modal            from './Modal.vue'
import UploadImage      from './UploadImage.vue'

import {common}         from '../store/Common.js'
import {api}            from '../store/Api.js'
import notificationStore from '../NotificationStore.js';

export default {
    name: 'Banner',
    components: {
        Carousel,
        CarouselItem,
        ComponentEditor,
        Modal,
        UploadImage
    },

    data () {
        return {
            isAuto: 0,
            isModalVisible: false,
            tempData: {}
        }
    },

    created () {
        if( this.items.length < 0) {
            this.isModalVisible = true
        }
    },

    props: {
        items: {
            type: Array,
            require: true,
            twoWay: true,
            default: function () {
                return []
            }
        },
        type : {
            type: Number,
            default: 1
        }

    },

    methods: {
        getItem (data) {
            return {
                paramId:    this.paramId,
                url:        this.url,
                image:      this.image,
                imageId:    this.imageId,
                title:      this.title,
                width:      this.width,
                height:     this.height,
            }
        },

        // http action
        save () {
            api.putAction('activity_params', this.tempData, (response) => {
                let res = response.json()
                if(res.code === 0) { }
                this.showNotification(res.msg)
            })
            this.popupDialog(false)
        },

        add () {
            api.postAction('activity_params', this.tempData, (response) => {
                let res = response.json()
                if(res.code === 0) {
                    this.tempData.id = res.data.id.toString()
                    this.items.push(this.tempData)
                }
                this.showNotification(res.msg)
            })
            this.popupDialog(false)
        },

        del (index) {
            var del = confirm("您确定要删除吗？")
            if(!del) { return }
            let id = this.items[index].id
            api.deleteAction('activity_params', {id: id}, (response) => {
                let res = response.json()
                if(res.code === 0) {
                    this.items.$remove(this.items[index])
                }
                this.showNotification(res.msg)
            })

        },

        clear () {
            this.tempData = {
                id:             null,
                activity_id:    common.activityId.toString(),
                type:           this.type.toString(),
                listorder:      '255',
                is_visible:     '1',
                url:            '/index/',
                img:            null,
                width:          '100',
                height:         '100',
            }
        },

        showEdit (index) {
            if (index > -1) {
                this.tempData = this.items[index]
            } else {
                this.clear()
            }
            
            this.popupDialog(true)
        },

        // 控制轮播
        stopCarousel () {
            if(this.isAuto == 0) return
            this.isAuto = 0
        },

        autoCarousel () {
            if(this.isAuto > 0) return
            this.isAuto = 3000
        },
        // 弹窗
        popupDialog (flag) {
            this.isModalVisible = flag
        },

        showNotification (msg) {
            msg = msg ? msg : 'null'
            notificationStore.add({
                title: msg
            });
        }
    },

}
</script>

<style lang="less">
@import '../less/_variable.less';
@import '../less/_mixin.less';
.carousel {
    height: 206px;

    .carousel-dot {
        display: inline-block;
        width: 6px;
        height: 6px;
        margin: 3px;
        border-radius: 50%;
        border: 1px solid #fff; 
        cursor: pointer;
        background: none;
        text-indent: -999em;

        &.active {
            background-color: #fff
        }
    }  

    .carousel-indicators {
        right: 4px;
        width: auto;
        bottom: 22px;
        left: auto;
    } 

    .item {
        position: relative;
        height: 100%;
        width: 362px; 
        display: inline-block;
    }
}
</style>