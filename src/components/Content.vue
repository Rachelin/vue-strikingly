<!--
 @theme : 编辑展示区
 @author: wuxiaolian
 @date  : 201607018
-->

<template>
    <div id="s-content" class="transition side-menu-opened">
        <!-- <div class="social-thumbnail"> </div> -->
        <ul id="phone-simulater" v-el:simulater class="simulater slides">

            <li class="slide" v-for="comp in componentsList" data-index="{{$index}}" id="section-{{$index}}">

                <div v-if="comp.component=='GoodsList'" class="s-section s-store-section">
                    <goods-list 
                        :goods-list.sync="comp.data"
                        :type="comp.type">
                    </goods-list>
                </div>

                <div v-if="comp.component =='Banner'" class="s-section s-banner-section">
                    <banner :items.sync="comp.data"></banner>
                </div>

                <div v-if="comp.component =='GoodsPlus'" class="s-section s-goods-section">
                    <goods-plus :items.sync="comp.data"></goods-plus>
                </div>

                <div v-if="comp.component =='Anchor'" class="s-section s-anchor-section">
                    <anchor :items.sync="comp.data"></anchor>
                </div>

                <div v-if="comp.component =='ImageTab'" class="s-section s-imagetab-section">
                    <image-tab :items.sync="comp.data"></image-tab>
                </div>

                <div v-if="comp.component =='PictureNative'" class="s-section s-nav-section">
                    <picture-native :items.sync="comp.data"></picture-native>
                </div>

                <div v-if="comp.component =='TextTab'" class="s-section s-text-section">
                    <text-tab :items.sync="comp.data"></text-tab>
                </div>

                <div v-if="comp.component =='Timer'" class="s-section s-timer-section">
                    <timer :items.sync="comp.data"></timer>
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
        componentsList: Array,
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
        Timer
    },

    methods: {
        setElesOffsetTop () {
            let traget = this.$els.simulater
            this.componentsList.forEach(function(ele, i){
                let current = traget.querySelector('li[id=section-'+i+']')
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
            let minIndex = 0
            let minDis = 1024
            this.componentsList.forEach((ele, i) => {
                let curDis = ele.offsetTop + ele.sectionHeight - st
                if(curDis > 0 && curDis < minDis) {
                    minDis = curDis
                    minIndex = i
                }
            })

            if(this.handleId != minIndex){
                this.handleId = minIndex
            } 
        },

        scrollTo (index) {
            this.offsetTop = this.componentsList[index].offsetTop - this.$els.simulater.scrollTop 
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
        this.$watch( 'componentsList', this.setElesOffsetTop )
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
        padding: 7.5% 8.5%;
    }

    @media only screen and (max-width: 1023px) {
        padding: 7% 7.5%;
    }

    @media only screen and (max-width: 1269px) {
        padding: 6% 9%;
    }

    @media only screen and (max-width: 1569px) {
        padding: 5.5% 10%;
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
    position: relative;
    outline: none;
    
}

.s-section {
    padding: 80px 0;
    line-height: 1.45;
    color: #555;
}

.s-section-editor-wrapper {
    position: absolute;
    top: 10px;
    right: 0;
    z-index: 200;
    pointer-events: none;
}

</style>