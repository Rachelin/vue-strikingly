<template>
    <carousel :indicators="true" :auto.sync="isAuto" :responsive="55">
        <carousel-item v-for="item in items">
            <a data-href="{{item.url}}" class="item">
                <component-editor :delete-self="del">
                    <span slot="title" @click="showEdit($index)">编辑轮播</span>
                    <span slot="image">
                        <img class="img" :src="item.image" alt="{{item.title}}" style="height: 206px;">
                    </span>
                </component-editor>
                <img class="img" :src="item.image" alt="{{item.title}}" style="height: 206px;">
            </a>
        </carousel-item>
    </carousel>

    <div class="s-repeatable-add-button-wrapper" >
        <div class="s-repeateable-add-button">
            <span v-show="isAuto==0" @click="autoCarousel">自动轮播</span>
            <span v-show="isAuto>0" @click="stopCarousel">暂停轮播</span>
        </div>
        <div class="s-repeateable-add-button" @click="showAddPage">
            添加新图
        </div>
    </div>

    <div class="s-add-new-wrapper" v-show="isAddNew">
        
    </div>
</template>

<script>
// import { Carousel, CarouselItem } from 'vue-m-carousel'
import ComponentEditor from './ComponentEditor.vue'
import Carousel from './Carousel.vue'
import CarouselItem from './CarouselItem.vue'
import PopupDialog from './PopupDialog.vue'

export default {

    name: 'Banner',

    components: {
        Carousel,
        CarouselItem,
        ComponentEditor
    },

    data () {
        return {
            isAuto: 0,
            isAddNew: false
        }
    },

    props: {
        items: Array
    },

    computed: {

    },

    methods: {
        showAddPage () {

        },

        add () {

        },

        del (index) {
            this.items.splice(index, 1)
        },

        showEdit (index) {
            console.log("haha get up", index);
            this.$broadcast('show-edit')
        },

        stopCarousel () {
            if(this.isAuto == 0) return
            this.isAuto = 0
        },

        autoCarousel () {
            if(this.isAuto > 0) return
            this.isAuto = 3000
        }
    }
}
</script>

<style lang="less">
    @import '../less/_variable.less';
    @import '../less/_mixin.less';
    @import '../less/_menu.less';
    @import '../less/_layout.less';
    @import '../less/_common.less';
.carousel {
    height: 206px;

    .carousel-dot {
        display: inline-block;
        width: 6px;
        height: 6px;
        margin: 3px;
        border-radius: 50%;
        border: 1px solid #fff; 
        cursor: pointer;
        background: none;
        text-indent: -999em;

        &.active {
            background-color: #fff
        }
    }  

    .carousel-indicators {
        right: 4px;
        width: auto;
        bottom: 22px;
        left: auto;
    } 

    .item {
        position: relative;
        height: 100%;
        width: 362px; 
        display: inline-block;
    }
}

</style>