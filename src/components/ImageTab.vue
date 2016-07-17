<template>
    <ul class="m-collection-img clearfix">
        <li v-bind:class="colSet" v-for="item in items">
            <a href="item.url}" data-record="item.coordinate" data-title="item.title">
                <img :href="item.image" class="img lazy">
            </a>
        </li>
    </ul>
</template>

<script>

export default {
    name: 'ImageTab',

    props: {
        items: Array
    },

    computed: {
        colSet () {
            let navLen = this.items.length
            switch(navLen) {
                case 1: 
                    return 'col-12'
                case 2: 
                    return 'col-6'
                case 3: 
                    return 'col-4'
                case 4: 
                    return 'col-3'
            }
        }
    }
}
</script>

<style lang="less">
    @import '../less/_variable.less';
    @import '../less/_mixin.less';
    @import '../less/_menu.less';
    @import '../less/_layout.less';
</style>