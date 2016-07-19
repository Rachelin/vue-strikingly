<template>
    <div id="s-content" class="transition side-menu-opened">
        <!-- <div class="social-thumbnail"> </div> -->
        <div id="phone-simulater" v-el:simulater>
            <div class="ul-component" v-for="item in componentsList">
                <test :is="item.component" data-index="{{$index}}">
                    <p slot="order">{{item.name}}</p>
                </test>
            </div>
            
        </div>
    </div>
</template>

<script>
import Test from './Test.vue'

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
        Test
    },

    methods: {
        setElesOffsetTop () {
            let traget = this.$els.simulater
            this.componentsList.forEach(function(ele, i){
                let current = traget.querySelector('div[data-index="'+i+'"]')
                let curDis = current.offsetTop;
                ele.offsetTop = curDis
                ele.sectionHeight = current.scrollHeight
                console.log(curDis)
            })
            console.log("update the componentsList data")
        },

        onScroll () {
            // on Listener the upper sections
            console.log("scrolling-========= handleId", this.handleId)
            
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
            console.log("this.handleId", index)
            this.offsetTop = this.componentsList[index].offsetTop -  this.$els.simulater.scrollTop 
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
        padding: 7.5% 20%;
    }

    @media only screen and (max-width: 1023px) {
        padding: 7% 20%;
    }

    @media only screen and (max-width: 1269px) {
        padding: 6% 20%;
    }

    @media only screen and (max-width: 1569px) {
        padding: 5.5% 20%;
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
    background-color: #efeff4;
    font: 16px/150% "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,sans-serif;
    color: #333;
}

</style>