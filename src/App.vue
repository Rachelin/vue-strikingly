<template>
    <menu-container :menu-list.sync="menuList" :handle-id.sync="handleId" v-on:toggle-section-dialog="toggleDialog"></menu-container>
    <new-section-dialog v-if="showDialog" transition="fade" keep-alive v-on:add-new-section="addNewSection"></new-section-dialog>
    <content :components-list="menuList" :handle-id.sync="handleId"></content>
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
                    component: 'Test'
                },
                {
                    name: '标题1',
                    component: 'Test'
                },
                {
                    name: '标题2',
                    component: 'Test'
                },
                {
                    name: '标题3',
                    component: 'Test'
                }
            ],

            showDialog: false,

            handleId: 0
        }
    },

    created() {
    },

    methods: {
        toggleDialog () {
            this.showDialog = !this.showDialog;
        },

        addNewSection () {
            console.log("addNewSection")
            this.menuList.push({
                name: '标题新' + this.menuList.length,
                component: 'Test'
            })
        },

        // onScroll (index) {
        //     console.log("2: onScroll index = ", index)
        //     this.$broadcast('to-scroll', index)
        // },

    },

}

</script>

<style lang="less">
@import './less/_reset.less';
</style>