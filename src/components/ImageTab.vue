<template>
    <ul class="m-collection-img clearfix">
        <li v-bind:class="colSet" v-for="item in items">
            <component-editor :delete-self="del" :draggable="(colSet > 1) ? true : false">
                <span slot="title" @click="showEdit($index)">编辑图片</span>
                <span slot="image">
                    <img class="img" :src="item.image">
                </span>
            </component-editor>
            <a href="{{item.url}}" data-title="{{item.title}}">
                <img :src="item.image" class="img">
            </a>
        </li>
    </ul>
</template>

<script>
import ComponentEditor from './ComponentEditor.vue'

export default {
    name: 'ImageTab',

    components: {
        ComponentEditor
    },

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
    },

    methods: {
        del (index) {
            this.items.splice(index, 1)
        },

        showEdit (index) {
            console.log("haha get up", index);
            this.$broadcast('show-edit')
            
        },
    }
}
</script>

<style lang="less">
    @import '../less/_variable.less';
    @import '../less/_mixin.less';
    @import '../less/_menu.less';
    @import '../less/_layout.less';
</style>