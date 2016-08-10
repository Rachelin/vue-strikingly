<template>
    <p>上传代码</p>
    <upload-image></upload-image>
<!--     <menu-container 
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
    </content> -->

    <!-- <div v-loading="$loadingRouteData"></div> -->
</template>

<script>
import { auth } from '../store/Auth.js';
import loading from 'vue-loading'
import NewSectionDialog from '../components/NewSectionDialog.vue'
import MenuContainer from '../components/MenuContainer.vue'
import Content from '../components/Content.vue'
import UploadImage from '../components/UploadImage.vue'

export default {
    name: 'App',

    components : {
        MenuContainer,
        NewSectionDialog,
        Content,
        UploadImage
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
                    case 'imagetab':
                        menuList.push({
                            name: 'imagetab',
                            component: 'ImageTab',
                            data: t.items,
                            type: 'imagetab'
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
                    case 'banner':
                        menuList.push({
                            name: 'banner',
                            component: 'Banner',
                            data: t.items,
                            type: 'banner'
                        })
                        break;
                    case 'goods_one':
                        menuList.push({
                            name: 'goods_one',
                            component: 'GoodsList',
                            data: t.items,
                            type: 'goods_one'
                        })
                        break;
                    // case 'picturenative':
                    //     menuList.push({
                    //         name: 'picturenative',
                    //         component: 'PictureNative',
                    //         data: t.items,
                    //         type: 'picturenative'
                    //     })
                    //     break;
                }
            })

            // console.log(menuList)
            return menuList
        }

    },

    created() {
        // this.$http.get('activity/crossBorder/447?token=01vyORT9mrGXDWxpd1im')
        // .then((response) => {
        //     console.log(response)
        //     let res = response.json()
        //     if( res.ret === 0 ) {
        //         let t = res.data;
        //         this.$set('params', t.params)
        //     } else {
        //         console.error("xiaolian＝＝》TOKEN IS FAILED")
        //     }
        // }, (response) => {
        //     console.log(response)
        // })
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

    // router: {
    //     data(transition) {
    //         window.setTimeout(() => {
    //             transient.next()
    //         }, 3000)
    //     }
    // }
}

</script>

<style lang="less">
@import '../less/_reset.less';
</style>