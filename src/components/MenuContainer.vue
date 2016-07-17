<template>
    <div id="x-menu-container" class="x-menu-container open transition">
        <div class="gray minimize-icon">
            <a id="x-minimize-button" rel="tooltip-right" title data-original-title="隐藏编辑面板">
                <span class="entypo entypo-left-open-big"></span>
            </a>
        </div>

        <div class="menu">
            <div class="logo"></div>
            <div class="main-menu">
                <div class="top-menu" id="x-top-menu">
                    
                </div>
                <div class="middle-menu"></div>
                <div class="bottom-menu"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MenuContainer'
}
</script>

<style lang="less">
.x-menu-container {
    font-family: 'Open Sans','open_sans',sans-serif;
    position: fixed;
    height: 100%;
    width: 220px;
    background: #2f2f2f;
    border-bottom: 1px solid black;
    overflow: hidden;
    z-index: 2000;
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);

    .transition {
        -webkit-transition: -webkit-transform .45s cubic-bezier(.77,0,.175,1);
        transition: -webkit-transform .45s cubic-bezier(.77,0,.175,1);
        transition: transform .45s cubic-bezier(.77,0,.175,1);
        transition: transform .45s cubic-bezier(.77,0,.175,1),-webkit-transform .45s cubic-bezier(.77,0,.175,1);
    }

    .minimize-icon {
        position: absolute;
        top: 11px;
        right: 6px;
        cursor: pointer;
        a {
            font-size: 16px;
            color: #777;
            min-width: 20px;
            display: inline-block;
            text-align: right;
        }
    }

    .menu {
        .top-menu:before, 
        .top-style-menu:before, 
        .top-menu:after, 
        .top-style-menu:after {
            display: table;
            content: "";
            zoom: 1;
        }

        width: 220px;
        height: 100%;
    
        .main-menu {
            position: relative;
            width: 220px;
            height: calc(100% - 35px);
        }
    }
}
</style>