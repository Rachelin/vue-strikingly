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
        :menu-list="menuList" 
        :handle-id.sync="handleId">
    </content>

    <upload-image></upload-image>
    <notifications></notifications>
</template>

<script>
import NewSectionDialog     from './components/NewSectionDialog.vue'
import MenuContainer        from './components/MenuContainer.vue'
import Content              from './components/Content.vue'
import UploadImage          from './components/UploadImage.vue'
import Notifications        from './Notifications.vue';
import {common}             from './store/Common.js'
import {api}                from './store/Api.js'

export default {
    name: 'App',

    components : {
        MenuContainer,
        NewSectionDialog,
        Content,
        UploadImage,
        Notifications
    },

    data() {
        return {
            menuList: [],
            showDialog: false,
            handleId: 0,
            activityId : common.activityId,
        }
    },

    created() {
        this.reqShowData()
    },

    events : {
        onUploadShow(broadcastMsg) {
            this.$broadcast('onUploadShow', broadcastMsg)
        }
    },

    ready () {
        var startTime = new Date().getTime(); 
        var interval = setInterval(() => { 
            if( new Date().getTime() - startTime > 60*60*1000){ 
                clearInterval(interval); 
                alert('超时处理，请刷新页面')
                return; 
            } else {
                this.$broadcast('saveComponent')
            }
        }, 10*60*1000)
    },

    methods: {
        reqShowData () {
            var self = this
            api.getAction('activity_all_params/'+ self.activityId, {}, (response)=> {
                console.log(response)
                let res = response.json()
                if(res.code !== 0 ) return
                self.composeList(res.data)
            })
        },

        composeList (params) {
            let self = this
            params.forEach(function(t, i) {
                switch (t.compName) {
                    case 'imagetab':
                        t.name = "横铺图片"
                        t.component = 'ImageTab'
                        break;
                    case 'banner':
                        t.name = '图片轮播';
                        t.component = 'Banner';
                        break;
                    case 'goods_one':
                        t.name = '单列商品';
                        t.component = 'GoodsList';
                        break;
                    case 'goods_tow':
                        t.name = '双列商品';
                        t.component = 'GoodsList';
                        break;
                    case 'navigation':
                        t.name = 'navigation';
                        t.component = 'Test';
                        break;
                    case 'goods_one_power':
                        t.name = '加强单列';
                        t.component = 'GoodsPlus';
                        break;
                    case 'timer':
                        t.name = '定时器';
                        t.component = 'Timer';
                        break;
                    case 'Anchor':
                        t.name = '锚点导航';
                        t.component = 'Anchor';
                        break;
                    case 'texttab':
                        t.name = '文字合集';
                        t.component = 'TextTab';
                        break;
                    case 'picturenative':
                        t.name = '图片导航';
                        t.component = 'PictureNative';
                        break;
                    case 'flashPrice':
                        t.name = '限时特价';
                        t.component = 'FlashPrice';
                        break;
                    case 'classify':
                        t.name = 'classify';
                        t.component = 'Test';
                        break;
                }
            })

            this.$set('menuList', params)
        },

        toggleDialog () {
            this.showDialog = !this.showDialog;
        },

        insertSection (name, comp) {
            let fromIndex = this.handleId+1
            let endIndex = this.menuList.length

            if( fromIndex === endIndex ) {
                this.menuList.push({
                    name: name,
                    component: comp
                })
            } else {
                let part = this.menuList.splice(fromIndex, endIndex)
                this.menuList.push({
                    name: name,
                    component: comp
                })
                this.menuList = this.menuList.concat(part)
            }

            this.handleId += 1
        },
    },
}

</script>

<style lang="less">
@import './less/_reset.less';
</style>
