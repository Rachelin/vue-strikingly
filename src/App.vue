<template>
    <menu-container :menu-list.sync="menuList" v-on:toggle-section-dialog="handleIt"></menu-container>
    <new-section-dialog v-if="showDialog" transition="fade" keep-alive></new-section-dialog>
    <content :components-list="menuList"></content>
</template>

<script>
import NewSectionDialog from './components/NewSectionDialog.vue'
import MenuContainer from './components/MenuContainer.vue'
import Content from './components/Content.vue'

export default {
    name: 'App',

    components : {
        MenuContainer,
        NewSectionDialog,
        Content
    },

    data() {
        return {
            menuList: [
                {
                    name: '标题',
                    id: 'title'
                },
                {
                    name: '标题1',
                    id: 'title1'
                },
                {
                    name: '标题2',
                    id: 'title2'
                },
                {
                    name: '标题3',
                    id: 'title3'
                }
            ],

            showDialog: false,
        }
    },

    created() {
    },

    methods: {
        handleIt () {
            this.showDialog = !this.showDialog;
        }
    },

}

</script>

<style lang="less">
@import './less/_reset.less';
</style>