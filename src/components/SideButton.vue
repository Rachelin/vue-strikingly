<template>
    <div class="green s-side-menu-btn solid-gray" rel="tooltip-right" title data-griginal-title="查看最后效果">
        <a class="preview">
            <div class="si si-preview-icon"></div>
            <div class="si-hover si-preview-icon-hover"></div>
            <span class="button-label">
                <div class="button-label-content">预览</div>
            </span>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'SideButton',
        methods: {
            
        }
    }
</script>

<style lang="less">

.s-side-menu-btn {
    float: left;
    margin: 4px 5px;
    padding: 0;
    width: 95px;
    height: 44px;
    background-color: #222;
    background: rgba(0,0,0,0.3);
    color: #fff;
    text-shadow: none;
    cursor: pointer;
    box-shadow: none;
    text-decoration: none;
    border-radius: 3px;

    a {
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
        text-align: center;
        color: #ccc;
        padding-top: 5px;
        font-size: 13px;
        text-transform: uppercase;
        text-shadow: 0 1px 1px rgba(0,0,0,0.5);
        .button-label {
            height: 33px;
            max-width: 65px;
            display: inline-block;
            zoom: 1;
            text-overflow: ellipsis;
        }
    }

    .button-label-content {
        position: relative;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .solid-gray {
        background: #555;
        box-shadow: inset 0 1px rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.2);
        a {
            text-shadow: none;
            font-size: 12px;
            font-weight: 600;
            color: #ddd;

        }
    }

    .si, 
    a .si-hover {
        margin: 6px 4px 5px 0;
        vertical-align: top;
    }

    .si {
        display: inline-block;
    }

    .si-preview-icon {
        width: 16px;
        height: 13px;
        background: url(//assets.strikingly.com/assets/side_menu/editor-screens-icon-a3fc8dd4851113bb4ea566efe27488c2.png) no-repeat;
        margin: 10px 6px 0 0!important;
        opacity: .6;
    }
    .si-preview-icon-hover {
        width: 16px;
        height: 13px;
        background: url(//assets.strikingly.com/assets/side_menu/editor-screens-icon-a3fc8dd4851113bb4ea566efe27488c2.png) no-repeat;
        margin: 10px 6px 0 0!important;
        opacity: 1;
    }
}
</style>