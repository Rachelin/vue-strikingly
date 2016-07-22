<!--
 @theme : 商品
 @author: wuxiaolian
 @date  : 20160715
-->
<template>
    <li class="good-item" v-bind:class="column > 1 ? 'col-6' : ''">
        <component-editor
            :delete-self="delGoods"
            :draggable="true">
            <span slot="title" @click="changeGoods">管理商品</span>
        </component-editor>

        <a class="item" v-bind:href="item.goods_url">
            <div class="m-remark-img-sm img">
                <ul v-if="item.label_details">
                    <li v-for="label in item.label_details">
                        <img v-bind:src="{{label.image}}" class="u-remark u-{{label.align}} u-align-{{label.keyNum}}">
                    </li>
                </ul>
                <img v-bind:src="item.img" class="img lazy">
            </div>
            <div class="info">
                <h3>{{item.name}}</h3>
                <p class="price-info">
                    <span class="new-price">￥<span class="num">{{item.price}}</span></span>
                    <span class="old-price">￥<span class="num">{{item.market_price}}</span></span>
                </p>
                <p class="rebate-price">
                    <span class="rebate-txt"></span>
                    <span class="num">{{item.fencheng}}</span>
                </p>
            </div>
        </a>
        <div class="goods-cart"></div>
    </li>
</template>

<script>
import ComponentEditor from './ComponentEditor.vue'

export default {
    name: 'Goods',

    components: {
        ComponentEditor
    },

    props: {
        item: {
            type: Object,
            default: {
                "id":8312,
                "site_id":10666,
                "price":"268.00",
                "market_price":"351.00",
                "rebate":"0.2000",
                "rebate1":"0.5000",
                "image":162262,
                "name":"祛斑美肌蜂胶颗粒延缓衰老抑菌调节内分泌",
                "fencheng":"26.80",
                "img":"http://image.121dian.com/site/10666/ce30c145438ca781fc34fdb4f0d58db3.jpg",
                "goods_url":"http://m.121dian.net/goods/8312/h_5534mm?trace_data=%7B%22activity_id%22%3A%22345%22%7D",
                "is_jd":0,
                "trace":{
                    "data_str":"{activity_id:345}"
                }
            }
        },
        column: {
            type: Number,
            default: 1
        },
        index: Number
    },

    data () {
        var that = this
        return {
            delGoods: function () {
                that.$parent.goodsList.splice(this.index, 1)
            }
        }
    },

    methods: {
        changeGoods () {
            console.log("this.item.id = ", this.item.id )
        }
    }

}
</script>

<style lang="less">
    @import '../less/_variable.less';
    @import '../less/_mixin.less';
    @import '../less/_price.less';
    @import '../less/_remark.less';
    @import '../less/_layout.less';
</style>