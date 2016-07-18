<template>
    <div id="s-content" class="transition side-menu-opened">
        <div class="social-thumbnail">
            
        </div>

        <div class="phone-simulater">
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'Content',

    props: {
        componentsList: Array
    },

    components: {

    },


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
        padding: 6% 8%;
    }

    @media only screen and (max-width: 1569px) {
        padding: 5.5% 10.5%;
    }

}

.phone-simulater {
    border: 1px solid #eee;
    width: 365px;
    height: 667px;
    background-color: #efeff4;
    font: 16px/150% "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,sans-serif;
    color: #333;
}
</style>