<!--
 @theme : 编辑展示区
 @author: wuxiaolian
 @date  : 201607018
-->

<template>
    <div id="s-content" class="transition side-menu-opened">
        <!-- <div class="social-thumbnail"> </div> -->
        
        <ul id="phone-simulater" v-el:simulater class="simulater slides">

            <li class="slide" v-for="comp in menuList" data-index="{{$index}}" id="section-{{$index}}" track-by="$index">

                <div v-if="comp.component =='ImageTab'" class="s-section s-imagetab-section">
                    <image-tab 
                        :items.sync="comp.items" 
                        :type="comp.type"
                        :id="comp.id"
                        :visible="comp.is_visible"
                    ></image-tab>
                </div>

                <div v-if="comp.component =='Banner'" class="s-section s-banner-section">
                    <banner 
                        :items.sync="comp.items"
                        :type="comp.type"
                    ></banner>
                </div>

                <div v-if="comp.component=='GoodsList'" class="s-section s-store-section">
                    <goods-list 
                        :items.sync="comp.items" 
                        :type="comp.type"
                        :id="comp.id"
                        :visible="comp.is_visible"
                    ></goods-list>
                </div>

                <div v-if="comp.component =='GoodsPlus'" class="s-section s-goods-section">
                    <goods-plus 
                        :items.sync="comp.items"
                        :type="comp.type"
                        :id="comp.id"
                        :visible="comp.is_visible"
                    ></goods-plus>
                </div>

                <div v-if="comp.component =='Timer'" class="s-section s-timer-section">
                    <!-- <timer :items.sync="comp.items"></timer> -->
                    <test> <span slot="order">{{comp.name}}</span> </test>  
                </div>

                <div v-if="comp.component =='Anchor'" class="s-section s-anchor-section">
                    <anchor 
                        :items.sync="comp.items" 
                        :type="comp.type"
                    ></anchor>
                </div>

                <div v-if="comp.component =='TextTab'" class="s-section s-text-section">
                    <!-- <text-tab :items.sync="comp.items"></text-tab> -->
                    <test> <span slot="order">{{comp.name}}</span> </test>
                </div>

                <div v-if="comp.component =='PictureNative'" class="s-section s-nav-section">
                    <!-- <picture-native :items.sync="comp.items"></picture-native> -->
                    <test> <span slot="order">{{comp.name}}</span> </test>
                </div>

                <div v-if="comp.component =='FlashPrice'" class="s-section s-nav-section">
                    <!-- <flash-price :items.sync="comp.items"></flash-price> -->
                    <test> <span slot="order">{{comp.name}}</span> </test>
                </div>

                <div v-if="comp.component =='Test'" class="s-section s-nav-section">
                    <test> <span slot="order">{{comp.name}}</span> </test>
                </div>
            </li>
            
        </ul>
    </div>
</template>

<script>
import Test             from './Test.vue'
import GoodsList        from './GoodsList.vue'
import Banner           from './Banner.vue'
import GoodsPlus        from './GoodsPlus.vue'
import Anchor           from './Anchor.vue'
import ImageTab         from './ImageTab.vue'
import PictureNative    from './PictureNative.vue'
import TextTab          from './TextTab.vue'
import Timer            from './Timer.vue'
import FlashPrice       from './FlashPrice.vue'


export default {
    name: 'Content',

    data () {
        return {
            offsetTop: 0,
            reqId: null,
            doAutoScroll: false,
            lastScrollPo : 0
        }
    },

    props: {
        menuList: Array,
        handleId: Number
    },

    components: {
        Test,
        GoodsList,
        GoodsPlus,
        Anchor,
        Banner,
        ImageTab,
        PictureNative,
        TextTab,
        Timer,
        FlashPrice
    },

    methods: {
        setElesOffsetTop () {
            console.log("changed the component")
            let traget = this.$els.simulater
            this.menuList.forEach(function(ele, i){
                let current = document.getElementById('section-'+i)
                let curDis = current.offsetTop;
                ele.offsetTop = curDis
                ele.sectionHeight = current.scrollHeight
            })
        },

        onScroll () {
            if(!this.doAutoScroll) {
                setTimeout(this.calcScrollAt(), 1000)
            }
        },
        calcScrollAt () {
            if(this.doAutoScroll) return

            let st = this.$els.simulater.scrollTop
            let minIndex = this.handleId
            this.menuList.forEach((ele, i) => {
                if(st > ele.offsetTop && st < (ele.offsetTop + ele.sectionHeight)){
                    minIndex = i
                }
            })

            if(this.handleId != minIndex){
                this.handleId = minIndex
                console.log("change scroll at", this.handleId)
                if(this.handleId == 2) {
                    console.log("hahaha")
                    this.$children[2].isStickUp = true
                } else {
                    this.$children[2].isStickUp = false
                }
            } 
        },

        scrollTo (index) {
            console.log("scrollTo ", index)
            this.offsetTop = this.menuList[index].offsetTop - this.$els.simulater.scrollTop 
            this.reqId = requestAnimationFrame(this.autoScroll);
        },

        autoScroll () {
            var traget = this.$els.simulater
            if(this.offsetTop > 0) {
                if(this.offsetTop < 30 ) {
                    this.offsetTop -= 1
                    traget.scrollTop = traget.scrollTop + 1
                } else {
                    this.offsetTop -= 30
                    traget.scrollTop = traget.scrollTop + 30
                }
            } else {
                if(this.offsetTop > -30) {
                    this.offsetTop += 1
                    traget.scrollTop = traget.scrollTop - 1
                } else {
                    this.offsetTop += 30
                    traget.scrollTop = traget.scrollTop - 30
                }
            }
            if(this.offsetTop != 0) {
                this.doAutoScroll = true
                requestAnimationFrame(this.autoScroll);
            } else {
                this.doAutoScroll = false
            }
        },
    },

    ready () {
        let traget = this.$els.simulater
        traget.addEventListener('scroll', this.onScroll)
        traget.dispatchEvent(new Event('scroll'))

        this.setElesOffsetTop()
        this.$watch('menuList', this.setElesOffsetTop )
    },

    detached () {
        this.$els.simulater.removeEventListener('scroll', this.onScroll)
        window.cancelAnimationFrame(this.reqId)
    },

    computed : {
        
    },

    events : {
        'scroll-to' : function(index) {
            this.scrollTo(index)
        }
    }
}
</script>

<style lang="less">
@import '../less/_variable.less';
@import '../less/_mixin.less';
@import '../less/_price.less';
@import '../less/_remark.less';
@import '../less/_layout.less';
#s-content {
    position: relative;
    overflow: hidden;
    margin-left: 0;
    font-size: 16px;

    &.transition {
        -webkit-transition: margin-left .45s cubic-bezier(.77,0,.175,1);
        transition: margin-left .45s cubic-bezier(.77,0,.175,1);
    }

    &.side-menu-opened {
        margin-left: 220px;
    }

    @media only screen and (max-width: 769px) {
        padding: 5.5% 8.5%;
    }

    @media only screen and (max-width: 1023px) {
        padding: 5% 7.5%;
    }

    @media only screen and (max-width: 1269px) {
        padding: 5% 9%;
    }

    @media only screen and (max-width: 1569px) {
        padding: 5% 10%;
    }

}

#phone-simulater {
    position: relative;
    overflow: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #eee;
    width: 365px;
    min-height: 667px;
    height: 667px;

    float: none;

    &:before,
    &:after {
        display: table;
        content: '';
        zoom: 1;
    }
}

ul.slides, 
li.slide {
    // position: relative;
    outline: none;
    
}

.s-section {
    padding-bottom: 80px;
    line-height: 1.45;
    color: #555;
    // margin-bottom: 80px;
    border: 1px solid;
}

.s-section-editor-wrapper {
    position: absolute;
    top: 10px;
    right: 0;
    z-index: 200;
    pointer-events: none;
}

</style>