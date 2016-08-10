<!--
 @theme : 商品展示
 @author: wuxiaolian
 @date  : 20160705
-->
<template>
<div class="m-product-qiang">
    <div class="m-goods-wrap" v-dragable-for="item in items">
        <a v-bind:data-link="item.goods_url" class="item">
            <component-editor
                :delete-self="del"
                :draggable="true"
                :index="$index">
                <span slot="title" @click="edit($index)">管理商品</span>
            </component-editor>

            <div class="m-sell-product clearfix">
                <div class="avatar">
                    <img v-bind:src="item.img" class="img lazy">
                </div>

                <div class="info" style="height: 177px;">
                    <ul class="sell-content" v-show="item.sell_content" style="height: 149px;">
                        <li v-for="v in item.sell_content">
                            <span class="name">{{v.content}}</span>
                        </li>
                    </ul>

                    <div class="m-price-box">
                        <p class="price-info">
                            <span class="new-price s-primary">￥<span class="num s-primary">{{item.price}}</span></span>
                            <span class="rebate-price">
                                <span class="rebate-txt"></span>
                                <span class="num">{{item.fencheng}}</span>
                            </span>
                        </p>
                    </div>

                </div>

            </div>

            <div class="item-name">{{item.name}}</div>
            <div class="padding">
                <div class="m-process-button clearfix">
                    <div class="m-process-bar">
                        <span class="name">已抢购{{item.per}}％</span>
                        <span class="bar" v-bind:style="{width: item.per + '%'}"></span>
                    </div>
                    <button class="button button-md">马上抢</button>
                </div>
            </div>
        </a>
    </div>
</div>

<div class="s-repeatable-add-button-wrapper" @click="isModalVisible = true">
    <div class="s-repeateable-add-button">
        添加项目
    </div>
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
import ComponentEditor from './ComponentEditor.vue'
import Modal from './Modal.vue'

import {common} from '../store/Common.js'
import {api} from '../store/Api.js'
import notificationStore    from '../NotificationStore.js';

export default {
    name: 'GoodsPlus',

    components: {
        ComponentEditor,
        Modal
    },

    computed : {
        options() {
            return {
                group: 'goods',
                animation: 200,
                handle: '.s-repeatable-move-button'
            }
        }
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
        }
    },

    events: {
        saveComponent () {
            this.putAction()
            console.log('==>[GoodsPlus] doing saving')
        },

        deleteComponent () {
            console.log('Here is GoodsPlus')
        }
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

        del (index) {
            console.log("index = ", index)
            this.items.$remove(this.items[index])
        },

        edit (index) {
            this.newGoodsId = this.items[index].id
            this.editIndex = index
            this.popupDialog(true)
        },

        getGoods (goodsAry) {
            let params = {
                goodsids : goodsAry,
                type: this.type
            }
            api.getAction('activity_goods/', params, (response) => {
                let res = response.json()
                if(res.code === 0) {
                    if(this.editIndex < 0) {
                        res.data.forEach((t, i)=>{
                            this.items.push(t)
                        })
                    } else {
                        this.items.$set(this.editIndex, res.data[0])
                    }
                    
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
            params = params.substring(0, params.length-1)
            return params
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
            api.saveActivityParams(params, 'GoodsPlus')
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
@import '../less/_menu.less';
@import '../less/_layout.less';
@import '../less/_sellcontent.less';

.m-product-qiang {
    padding: 10px;
    .item {
        position: relative;
        display: block;
        background-color: #fff;
        margin-bottom: 10px;
        border: 1px solid @border-color;
        .border-radius(5px);
    }
    .img {
        .border-radius-custom(5px, 0, 0, 0);
    }
    .item-name {
        padding: 8px 10px 0;
        line-height: 20px;
    }
    .per {
        margin-left: 20px;
        .font-size;
    }
    .m-process-button {
        border: 1px solid #e02128;
        padding-right: 84px;
        height: 40px;
        position: relative;
        .border-radius(5px);
        .button {
            position: absolute;
            top: 0;
            right: 0;
            width: 84px;
            .text-ellipsis;
            background-color: #e02128;
            .border-radius-custom(0, 4px, 4px, 0);
            color: #fff;
            height: 38px;
            line-height: 32px;
        }
        .m-process-bar {
            width: 100%;
            height: 100%;
            position: relative;
            .bar {
                color: @primary;
                .border-radius-custom(5px, 0, 0, 5px);
                display: block;
                height: 100%;
                background-color: #ffd3d4;
            }
            .name {
                position: absolute;
                top: 0;
                left: 50%;
                line-height: 38px;
                color: @primary;
                margin-left: -30px;
            }
        }
    }
}
</style>