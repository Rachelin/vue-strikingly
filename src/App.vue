<template>
    <menu-container 
        :menu-list.sync="menuList" 
        :handle-id.sync="handleId" 
        v-on:toggle-section-dialog="toggleDialog">
    </menu-container>

    <new-section-dialog 
        v-if="showDialog" 
        transition="fade" 
        keep-alive 
        v-on:add-new-section="insertSection">
    </new-section-dialog>

    <content 
        :components-list="menuList" 
        :handle-id.sync="handleId">
    </content>
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
            menuList: [],

            showDialog: false,

            handleId: 0,

            params: []
        }
    },

    computed: {
        menuList () {
            let menuList = []
            this.params.forEach(function(t, i) {
                switch (t.type) {
                    case 'imagtab':
                        menuList.push({
                            name: 'imagtab',
                            component: 'ImageTab',
                            data: t.items,
                            type: 'imagtab'
                        })
                        break;
                    case 'navigation':
                        menuList.push({
                            name: 'navigation',
                            component: 'GoodsList',
                            data: t.items,
                            type: 'navigation'
                        })
                        break;
                }
            })

            // console.log(menuList)
            return menuList
        }

    },

    created() {
        this.$http.get('activity/crossBorder/345?token=GEOEBJ8n9qpUqgI2gmpL')
        .then((response) => {
            // console.log(response)
            let res = response.json()
            if( res.ret === 0 ) {
                let t = res.data;
                this.$set('params', t.params)
            } else {
                console.log("fail")
            }
        }, (response) => {
            console.log(response)
        })
    },

    methods: {
        toggleDialog () {
            this.showDialog = !this.showDialog;
        },

        insertSection (name, comp) {
            var part = this.menuList.splice(this.handleId, this.menuList.length)
            this.menuList.push({
                name: name,
                component: comp
            })
            this.menuList = this.menuList.concat(part)
        },

    },

}

</script>

<style lang="less">
@import './less/_reset.less';
</style>