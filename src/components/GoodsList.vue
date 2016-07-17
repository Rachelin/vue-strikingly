<!--
 @theme : 商品展示－单列商品
 @author: wuxiaolian
 @date  : 20160705
-->
<template>
    <ul class="clearfix" v-bind:class="listClass">
        <goods
            v-for="item in items"
            :item="item"
            :index="$index"
            :column="column"
            track-by="id">
        </goods>
    </ul>
</template>

<script>
import Goods from './Goods.vue'

export default {
    name: 'GoodsList',

    components: {
        Goods
    },

    props: {
        items: Array,
        column: Number
    },

    computed : {
        listClass () {
            if( this.column < 2 ) {
                return 'list-product-one'
            } else {
                return 'list-product-two'
            }
        }
    }
}
</script>

<style lang="less">
    @import '../less/_reset.less';
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