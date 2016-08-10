<!--
 @theme : 图片集合
 @author: wuxiaolian
 @date  : 20160715
-->
<template>
    <ul class="m-collection-img clearfix">
        <li class="m-image-wrap" v-bind:class="colSet" v-dragable-for="item in items">
            <component-editor 
                :delete-self="del" 
                :index="$index"
                :draggable="(colSet != 'col-12') ? true : false"
                :link.sync="tempData.url"
                :comment.sync="tempData.title"
                :broadcast-msg="'getAtImagetab'"
                :options="options"
                >

                <span slot="title" @click="showEdit($index)">编辑图片</span>
                <span slot="image">
                    <img class="img" :src="item.image">
                </span>
            </component-editor>
        </li>
    </ul>

<div class="s-repeatable-add-button-wrapper" @click="showEdit(-1)">
    <div class="s-repeateable-add-button">
        添加图片
    </div>
</div>


<modal :is-visible.sync="isModalVisible" modal-class="time-modal">
    <p>添加素材：</p>
    <div>
        <a class="s-btn" @click="showUploader">上传图片</a>
        <img :src="tempData.image">
    </div>
    <span>图片标题：</span> <input type="text" v-model="tempData.title"></input>
    <span>连接地址：</span> <input type="text" v-model="tempData.url"></input>
    <span>图片宽度：</span> <input type="text" v-model="tempData.width"></input>
    <span>图片高度：</span> <input type="text" v-model="tempData.height"></input>
    <a class="s-btn" v-on:click="add">添加</a>
</modal>

</template>

<script>
import ComponentEditor  from './ComponentEditor.vue'
import Modal            from './Modal.vue'

import {common}         from '../store/Common.js'
import {api}            from '../store/Api.js'
import notificationStore from '../NotificationStore.js';

export default {
    name: 'ImageTab',

    components: {
        ComponentEditor,
        Modal
    },

    data () {
        return {
            isModalVisible: false,
            tempData: {}
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
        type: {
            type: Number,
            default: 6
        },
        id: {
            type: String,
            default: null
        },
        visible: {
            type: String,
            default: 1
        }
    },

    computed: {
        colSet () {
            let navLen = this.items.length
            switch(navLen) {
                case 1: 
                    return 'col-12'
                case 2: 
                    return 'col-6'
                case 3: 
                    return 'col-4'
                case 4: 
                    return 'col-3'
                default:
                    return 'col-3'
            }
        },

        options() {
            return {
                group: 'tabs',
                animation: 200,
                handle: '.s-repeatable-move-button'
            }
        }
    },

    events: {
        onSaveInfo () {
            this.clear()
        },

        saveComponent () {
            console.log('==>[ImageTab] doing saving')
            this.putAction()
        },

        deleteComponent () {
            console.log('Here is ImageTab')
        },

        getAtImagetab (imgId, image) {
            this.tempData.img = imgId
            this.tempData.image = image
        },
    },

    methods: {
        add () {
            this.items.push(this.tempData)
            this.clear()
            this.popupDialog(false)
        },

        del (index) {
            this.items.$remove(this.items[index])
        },

        getParams () {
            let params = {
                id: this.id,
                activity_id: common.activityId,
                type: this.type,
                is_visible: this.visible,
                titles: '',
                imgs: '',
                urls: '',
                width: '',
                height: ''
            }

            params.img = this.items.length
            this.items.forEach(function(t, i) {
                params.titles += t.title
                params.imgs += t.img
                params.urls += t.url
                params.width += t.width
                params.height += t.height
            })

            return params
        },

        putAction () {
            let params = this.getParams()
            console.log('params = ', params)
            api.saveActivityParams(params, 'ImageTab')
        },

        // 弹窗
        popupDialog (flag) {
            this.isModalVisible = flag
        },

        showEdit (index) {
            if (index < 0) {
                this.clear()
                this.popupDialog(true)
            } else {
                this.tempData = this.items[index]
                this.$children[index].isEdit = true
            }
        },

        showUploader () {
            this.$dispatch('onUploadShow', 'getAtImagetab')
        },

        clear () {
            this.tempData = {
                width: '50',
                height: '50',
                img: '',
                image: '',
                title: '标题－1',
                url: '/index/'
            }
        }
    }
}
</script>

<style lang="less">
@import '../less/_variable.less';
@import '../less/_mixin.less';
li.m-image-wrap {
    position: relative;
}

.time-modal {
    width: 500px;
}
</style>