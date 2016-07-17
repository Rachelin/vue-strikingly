<template>
    <nav class="m-menu m-menu-black">
        <ul class="clearfix">
            <li class="menu-item" v-bind:class="colSet" v-for="t in title">
                <a class="name" href="#{{t.name}}">{{t.title}}</a>
            </li>
        </ul>
    </nav>

    <section v-for="v in items" >
        <a href="v.url"><img v-bind:src="v.banner" class="img"/></a>
        <goods-list
            :items="v.goods"
            :column="2">
        </goods-list>
    </section>
</template>

<script>
import GoodsList from './GoodsList.vue'

export default {
    name: 'Anchor',

    props: {
        items: Array,
        title: Array,
    },

    components: {
        GoodsList
    },

    computed: {
        colSet () {
            let navLen = this.title.length
            switch(navLen) {
                case 2: 
                    return 'col-6'
                case 3: 
                    return 'col-4'
                case 4: 
                    return 'col-3'
                case 5: 
                    return 'col-2-1'
                case 6: 
                    return 'col-2'
                default:
                    return 'col-2'
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

// .m-menu-black {

//     li {
//         float: inherit;
//         width: 100%;
//     }
// }
</style>