<!--
 @theme : 商品展示
 @author: wuxiaolian
 @date  : 20160705
-->
<template>
    <ul class="clearfix" v-bind:class="listClass">
        <goods
            v-dragable-for="item in items"
            :index="$index"
            :item="item"
            :column="column"
            :options="options"
            >
        </goods>
    </ul>

    <div class="s-repeatable-add-button-wrapper">
        <div class="s-repeateable-add-button" @click="isModalVisible = true">
            添加商品
        </div>

        <div v-if="type == 2 || type == 4" class="s-repeateable-add-button" @click="changeUI()">
            改变布局
        </div>

        <slot name="otherBtn"></slot>
    </div>

<modal :is-visible.sync="isModalVisible" modal-class="time-modal">
    <span>添加您需商品ID（ex: id1,id2,id3）</span><br>
    <input type="text" v-model="newGoodsId | numberStr"></input>
    <span>输入的结果是：{{newGoodsId}}</span>
    <br/>
    <a v-if="editIndex > -1" class="s-btn" v-on:click="add">保存</a>
    <a v-else class="s-btn" v-on:click="add">添加</a>
</modal>
</template>

<script>
import Goods                from './Goods.vue'
import Modal                from './Modal.vue'

import {common}             from '../store/Common.js'
import {api}                from '../store/Api.js'
import notificationStore    from '../NotificationStore.js';

export default {
    name: 'GoodsList',

    components: {
        Goods,
        Modal
    },

    data () {
        return {
            isModalVisible: false,
            newGoodsId: '',
            editIndex: -1,
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
            default: 2 // 默认单列列表
        },
        id: {
            type: String,
            default: null
        },
        visible: {
            type: String,
            default: 1
        },
        isChild: {
            type: Boolean,
            default: false
        }
    },

    computed : {
        listClass () {
            return ( this.column < 2 ) ? 'list-product-one' : 'list-product-two'
        },

        column () {
            if (this.type == 2) {
                return 1
            } else if(this.type == 4) {
                return 2
            } else {
                return 2
            }
        },

        options() {
            return {
                group: 'goods',
                animation: 200,
                handle: '.s-repeatable-move-button'
            }
        }
    },

    events: {
        delGoods (index) {
            console.log("index = ", index)
            this.items.$remove(this.items[index])
        },

        editGoods (index) {
            this.newGoodsId = this.items[index].id
            this.editIndex = index
            this.popupDialog(true)
        },

        saveComponent () {
            if(this.isChild) return
            this.putAction()
            console.log('==>[GoodsList] doing saving')
        },

        deleteComponent () {
            console.log('Here is GoodsList')
        },

        // addGoods (goodsIds) {
        //     console.log('addGoods => ', goodsIds)
        //     if(!goodsIds) return
        //     let goodsAry = goodsIds.split(',')
        //     this.getGoods(goodsAry)
        // }
    },

    methods: {

        add () {
            // 允许 [数组，空格，中文逗号，英文逗号]
            if(this.newGoodsId.length > 0) {
                let goodsAry = this.newGoodsId.split(',')
                if( this.editIndex > -1) {
                    // 修改
                    let temp = [] 
                    temp[0] = goodsAry[0]
                    this.getGoods(temp)
                } else {
                    this.getGoods(goodsAry)
                }
            } else {
                this.showNotification('请输入商品ID')
            }
        },

        getGoods (goodsAry) {
            let params = {
                goodsids : goodsAry,
                type: this.type
            }
            api.getAction('activity_goods/', params, (response) => {
                let res = response.json()
                if(res.code === 0 && res.data.length) {
                    if(this.editIndex < 0) {
                        res.data.forEach((t, i)=>{
                            this.items.push(t)
                        })
                    } else {
                        this.items.$set(this.editIndex, res.data[0])
                    }
                } else if(res.data.length < 1) {
                    this.showNotification('没有数据')
                } else {
                    console.log("[message]:", res)
                }
                this.editIndex = -1
                this.popupDialog(false)
            })
        },

        getParams () {
            var params = ""
            this.items.forEach(function(t, i) {
                params += t.id + ','
            })
            return params.substring(0, params.length-1)
        },

        putAction () {
            var params = {
                id:             this.id,
                activity_id:    common.activityId,
                type:           this.type,
                listorder:      255,
                is_visible:     this.visible,
                params:         this.getParams()
            }
            api.saveActivityParams(params, 'GoodsList')
            // api.putAction('activity_params', params, (response) => {
            //     let res = response.json()
            //     if(res.code === 0) {
            //         this.showNotification(res.msg)
            //     } else {
            //         console.log("[message]:", res)
            //     }
            // })
        },

        // 弹窗
        popupDialog (flag) {
            this.goodId = null
            this.isModalVisible = flag
        },

        updateValue (value) {
            this.value = value
            if(this.editId > -1) {
                this.editItem()
            } else {
                this.addItem()
            }

            this.isModalVisible = false
        },

        changeUI () {
            if(this.type == 2) {
                this.$set('type', 4)
            } else {
                this.$set('type', 2)
            }
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
@import '../less/_variable.less';
@import '../less/_mixin.less';

.list-product-one {
    padding: 0 4px;
    li {
        background-color: #fff;
        margin-bottom: 4px;
        border: 1px solid @border-color;
        .border-radius(5px);
        .img {
            .border-radius-custom(5px, 5px, 0, 0);
        }
    }
    h3 {
        line-height: 26px;
        .text-ellipsis;
        height: 30px;
        padding: 2px 5px;
    }
}

.list-product-two {
    margin-top: 4px;
    li {
        margin-bottom: 4px;
        &:nth-child(2n+1) {
            padding-right: 2px;
        }
        &:nth-child(2n) {
            padding-left: 2px;
        }
        .item {
            background-color: #fff;
            display: block;
        }
    }
    h3 {
        line-height: 18px;
        .m-ellipsis(2);
        height: 40px;
        padding: 2px 5px;
    }
    p {
        padding: 2px 5px;
        line-height: 18px;
    }
}

</style>