<template>
    <section class="m-nav-img clearfix">
        <div class="item" v-for="item in items">
            <a href="item.url">
                <img v-bind:href="item.image" class="img lazy">
            </a>
        </div>
    </section>
</template>

<script>

export default {
    name: 'PictureNative',

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