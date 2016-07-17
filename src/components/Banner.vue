<template>
    <div class="owl-carousel">
        <a href="item.url" class="item" v-for="item in items" >
            <img class="img" v-bind:src="item.image" alt="item.title">
        </a>
    </div>
</template>

<script>

export default {
    name: 'Banner',

    props: {
        items: Array
    },

    computed: {
    }
}
</script>

<style lang="less">
    @import '../less/_variable.less';
    @import '../less/_mixin.less';
    @import '../less/_menu.less';
    @import '../less/_layout.less';
</style>