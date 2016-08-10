<!--
 @theme : 商品
 @author: wuxiaolian
 @date  : 20160715
-->
<template>
    <li class="good-item" v-bind:class="column > 1 ? 'col-6' : ''">
        <component-editor
            :delete-self="delGoods"
            :draggable="true"
            :index="index">
            <span slot="title" @click="changeGoods">管理商品</span>
        </component-editor>

        <a class="item" v-bind:href="item.goods_url">
            <div class="m-remark-img-sm img">
                <ul v-if="item.label_details">
                    <li v-for="label in item.label_details">
                        <img v-bind:src="label.image" class="u-remark u-{{label.align}} u-align-{{label.keyNum}}">
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
        },
        column: {
            type: Number,
            default: 1
        },
        index: Number
    },

    methods: {
        changeGoods () {
            console.log("index = ", this.index )
            this.$dispatch('editGoods', this.index)
        },

        delGoods () {
            // this.$parent.goodsList.splice(this.index, 1)
            this.$dispatch('delGoods', this.index)
        }
    }

}
</script>

<style lang="less">

</style>