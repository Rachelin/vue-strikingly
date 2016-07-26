<!--
 @theme : 商品展示－单列商品
 @author: wuxiaolian
 @date  : 20160705
-->
<template>
    <ul class="clearfix" v-bind:class="listClass">
        <goods
            v-dragable-for="item in goodsList"
            :index="$index"
            :item="item"
            :column="column"
            :options="options"
            >
        </goods>
    </ul>

    <div class="s-repeatable-add-button-wrapper" @click="addGoods">
        <div class="s-repeateable-add-button">
            添加项目
        </div>
    </div>
</template>

<script>
import Goods from './Goods.vue'

export default {
    name: 'GoodsList',

    components: {
        Goods
    },

    props: {
        goodsList: Array,
        type: String
    },

    computed : {
        listClass () {
            if( this.column < 2 ) {
                return 'list-product-one'
            } else {
                return 'list-product-two'
            }
        },

        column () {
            if(this.type === 'goods_one') {
                return 1
            } else if (this.type === 'goods_tow') {
                return 2
            } else if (this.type === 'navigation') {
                return 2
            }
        },

        options() {
            let that = this
            return {
                group: 'goods',
                animation: 200,
                handle: '.s-repeatable-move-button'
            }
        }
    },

    methods: {

        addGoods () {
            var defaultGoods = {
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

            this.goodsList.push(defaultGoods)
        }
    }
}
</script>

<style lang="less">
@import '../less/_common.less';
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