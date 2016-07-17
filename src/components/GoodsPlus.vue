<template>
    <div class="m-product-qiang">
        <div v-for="item in items">
            <a href="item.goods_url" class="item">
                <div class="m-sell-product clearfix">
                    <div class="avatar">
                        <img src="item.img" class="img lazy">
                    </div>

                    <div class="info">
                        <ul class="sell-content" v-if="item.sell_content">
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
                            <span class="bar" style="width:{{item.per}}%;"></span>
                        </div>
                        <button class="button button-md">马上抢</button>
                    </div>
                </div>
            </a>
        </div>
        
    </div>
</template>

<script>

export default {
    name: 'GoodPlus',

    props: {
        items: Array
    }
}
</script>

<style lang="less">
    @import '../less/_variable.less';
    @import '../less/_mixin.less';
    @import '../less/_menu.less';
    @import '../less/_layout.less';
</style>