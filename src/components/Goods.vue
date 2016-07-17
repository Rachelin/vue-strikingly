<template>
    <li class="good-item" v-bind:class="column > 1 ? 'col-6' : ''">
        <a class="item" v-bind:href="item.goods_url">

            <div class="m-remark-img-sm img">
                <ul v-if="item.label_details">
                    <!-- <li v-for="label in item.label_details">
                        <img v-bind:src="{{label.image}}" class="u-remark u-{{label.align}} u-align-{{label.keyNum}}">
                    </li> -->
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
export default {
    name: 'Goods',

    props: {
        item: Object,
        index: Number,
        column: Number
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