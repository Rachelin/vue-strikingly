<template>
    <div class="m-time-down" v-for="item in items">
        <span class="title">距离结束：</span>
        <span class="timer"></span>
    </div>
</template>

<script>

export default {
    name: 'Timer',

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