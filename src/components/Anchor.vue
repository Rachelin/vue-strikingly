<!--
 @theme : 锚点导航
 @author: wuxiaolian
 @date  : 20160705
-->
<template>
    <nav v-bind:class="isStickUp ? 'a': 'b'" class="m-menu m-menu-black" data-scroll-header id="menu-bar">
        <ul class="clearfix">
            <li class="menu-item" 
                v-bind:class="colSet" 
                v-for="t in items" 
                :class="curActive === $index ? 'current' : '' "
                @click="setActive($index)">
                <a data-scroll class="name" href="#{{t.name}}">{{t.title}}</a>
            </li>
        </ul>
    </nav>

    <section v-for="v in items" id="{{v.name}}" style="margin-bottom: 60px">
        <a v-bind:href="v.url">
            <img class="img" :src="v.banner">
        </a>

        <goods-list 
            :items.sync="v.goodsList"
            :type="type"
            :is-child="true">
            <div slot="otherBtn" class="s-repeateable-add-button" @click="showEdit($index)">编辑锚点</div>
        </goods-list>
    </section>

    <div class="s-repeatable-add-button-wrapper">
        <div class="s-repeateable-add-button" @click="showEdit(-1)">
            添加导航
        </div>
    </div>

<modal :is-visible.sync="isModalVisible" modal-class="time-modal">
    <p>添加素材：</p>
    <div>
        <a class="s-btn" @click="showUploader">上传图片</a><br>
        <img v-bind:src="tempData.banner" class="img-place">
    </div>

    <span>导航名称</span> <input type="text" v-model="tempData.title"></input>
    <span>连接地址：</span> <input type="text" v-model="tempData.url"></input>
    <span>商品ID:（ex: id1,id2,id3）</span> <br>
    <!-- <input type="text" v-model="tempData.goods | numberStr"></input> -->
    <!-- <span>输入的结果是：{{tempData.goods}}</span><br> -->
    <a v-if="!tempData.id" class="s-btn" v-on:click="add">添加</a>
    <a v-else class="s-btn" v-on:click="save">保存</a>
    <a v-else class="s-btn" v-on:click="del">删除</a>
</modal>

</template>

<script>
import GoodsList        from './GoodsList.vue'
import smoothScroll     from 'smooth-scroll'
import Modal            from './Modal.vue'
import ComponentEditor  from './ComponentEditor.vue'

import {common}         from '../store/Common.js'
import {api}            from '../store/Api.js'
import notificationStore from '../NotificationStore.js';

export default {
    name: 'Anchor',

    data () {
        return {
            isStickUp: false,
            isModalVisible: false,
            curActive: 0,
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
            default: 10
        },
    },

    components: {
        GoodsList,
        Modal,
        ComponentEditor
    },

    computed: {
        colSet () {
            let navLen = this.items.length
            switch(navLen) {
                case 2: 
                    return 'col-6'
                case 3: 
                    return 'col-4'
                case 4: 
                    return 'col-3'
                case 5: 
                    return 'col-2-1'
                case 6: 
                    return 'col-2'
                default:
                    return 'col-2'
            }
        }
    },

    created () {
        smoothScroll.init({
            offset: 0,
            callback: function (anchor, toggle) {
                console.log("get down, anchor=", anchor, "toggle = ", toggle)
            }
        });
    },

    events: {
        getAtAnchor (imgId, image) {
            this.tempData.banner = image
            this.tempData.image = imgId
            console.log('getAtAnchor : imgId = ', imgId, 'image = ', image)
        }
    },

    methods: {
        setActive (id) {
            this.curActive = id
        },

        // http action
        save () {
            console.log("save====")

            let params = {
                id:             this.tempData.id,
                activity_id:    common.activityId,
                type:           this.type,
                listorder:      this.tempData.listorder,
                is_visible:     this.tempData.is_visible,
                url:            this.tempData.url,
                image:          this.tempData.image,
                title:          this.tempData.title, 
                goods:          this.tempData.goods,
            }
            api.putAction('activity_params', params, (response) => {
                let res = response.json()
                this.showNotification(res.msg)
            })
            this.popupDialog(false)
        },

        add () {
            if(this.tempData.image) {
                this.showNotification('图片还没有上传好，请等待')
            }
            api.postAction('activity_params', this.tempData, (response) => {
                let res = response.json()
                if(res.code === 0) {
                    this.tempData.id = res.data.id.toString()
                    this.items.push(this.tempData)
                    this.pushGoods(this.tempData.goods)
                }
                this.showNotification(res.msg)
            })
            this.popupDialog(false)
        },

        pushGoods (goodsids) {
            if(!goodsids) return
            let goodsAry = goodsids.split(',')

            let params = {
                goodsids : goodsAry,
                type: 10
            }
            api.getAction('activity_goods/', params, (response) => {
                let res = response.json()
                if(res.code === 0) {
                    console.log('get infomation')
                    let len = this.items.length-1
                    res.data.forEach((t, i)=>{
                        this.items[len].goodsList.push(t)
                    })
                } else {
                    console.log("[message]:", res)
                }
                
            })
        },

        del () {
            var self = this
            var del = confirm("您确定要删除吗？")
            if(!del) { return }

            api.deleteAction('activity_params', {id: this.tempData.id}, (response) => {
                let res = response.json()
                if(res.code === 0) {
                    this.items.$remove(this.tempData)
                }
                this.showNotification(res.msg)
            })

            this.popupDialog(false)
        },

        getParams (allGoods) {
            let params = ""
            allGoods.forEach(function(t, i) {
                params += t.id + ','
            })
            params = params.substring(0, params.length-1)
            console.log(params)
            return params
        },

        showEdit (index) {
            if (index < 0) {
                this.clear()
            } else {
                this.tempData = this.items[index]
                this.tempData.goods = this.getParams(this.items[index].goodsList)
            }

            this.popupDialog(true)
        },

        clear () {
            this.tempData = {
                id:             null,
                activity_id:    common.activityId,
                type:           this.type,
                listorder:      '255',
                is_visible:     '1',
                url:            '/index/',
                image:            null,
                title:          '锚点', 
                goods:          '',
                goodsList:      []
            }
        },

        // 弹窗
        popupDialog (flag) {
            this.isModalVisible = flag
        },

        showUploader () {
            this.$dispatch('onUploadShow', 'getAtAnchor')
        },

        showNotification (msg) {
            msg = msg ? msg : 'null'
            notificationStore.add({
                title: msg
            });
        }
    }
}
</script>

<style lang="less">

.a {
    position: fixed;
    top: 41px;
    z-index: 99;
    width: 363px;
}

.b {
    position: relative;
    top: 0
}

img.img-place {
    width: 50%;
    border: 1px solid #eee;
    min-width: 50px;
    min-height: 50px; 
}

</style>