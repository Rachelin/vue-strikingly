<template>
    <div class="s-component-editor-warapper">
        <div class="buttons">
            <div v-if="draggable" class="s-repeatable-move-button" title="排序请拖动"></div>
            <div class="s-repeatable-delete-button" 
                title="删除此项" 
                @mouseover="comfireDel"
                @mouseenter="comfireDel" 
                @mouseout="recover"
                @click="deleteSelf">
                <div class="delete-button-wrap">
                    <div class="delete-button-confirm"> 确定？</div>
                </div>
            </div>
        </div>

        <div class="s-component-overlay" :class="{'visibles' : isComfire, 'warning' : isComfire}">
            <div class="overlay">
                <div class="center">
                    <slot name="title"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isComfire : false
            }
        },

        props: {
            deleteSelf : {
                type: Function,
                default: function () {
                    return { msg: 'Error in delMethod'}
                }
            },
            draggable : {
                type: Boolean,
                default: false
            }
        },

        methods : {
            comfireDel () {
                this.isComfire = true
            },

            recover () {
                this.isComfire = false
            },
        }
    }
</script>


<style lang="less">
@import '../less/_common.less';
//--common
.center, 
.center-align {
    text-align: center;
}

.repeatable-button {
    position: absolute;
    top: 4px;
    right: 4px;
    left: auto;
    width: 22px;
    height: 24px;
    padding: 5px;
    cursor: pointer;
    background: #222 url(//assets.strikingly.com/assets/editor2/delete-icon-thin-41efa72a65e5c8938155b03b4da51426.png);
    background-color: rgba(0,0,0,0.9);
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border-radius: 3px;
    color: white;
    z-index: 92;
    font-family: 'pragmatica',sans-serif!important;
    -webkit-transition: all .25s;
    transition: all .25s;
}

.s-repeatable-delete-button {
    .repeatable-button;
    opacity: 0;

    .delete-button-wrap  {
        position: absolute;
        top: 0;
        right: 21px;
        width: 0;
        height: 24px;
        overflow: hidden;
        -webkit-transition: width .25s ease-out;
        transition: width .25s ease-out;

        .delete-button-confirm {
            position: absolute;
            top: 0;
            right: -150px;
            padding: 0 2px 0 5px;
            font-size: 12px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            background: #222;
            background: rgba(0,0,0,0.9);
            -webkit-transition: right .25s ease-out;
            transition: right .25s ease-out;
            border-radius: 3px 0 0 3px;
        }
    }

    &:hover {
        border-radius: 0 3px 3px 0;
        .delete-button-wrap{
            width: 120px;
            right: 22px;
            .delete-button-confirm {
                right: 0;
            }
        }
    }


}

.s-repeatable-move-button{
    .repeatable-button;
    opacity: 0;
}

.s-component-editor-warapper:hover {
    .s-repeatable-move-button, 
    .s-repeatable-delete-button {
        opacity: 1;
    }
}

.s-repeatable-move-button {
    top: 30px;
    cursor: move;
    background-image: url(//assets.strikingly.com/assets/editor2/move-icon-thin-74987f537b793cabc35acce84aadc2c4.png);
}

.s-component-overlay {
    border-radius: 2px;
    position: absolute;
    width: 99%;
    height: 100%;
    z-index: 90;
    cursor: pointer;
    padding: 7px;
    // margin-top: -8px;
    // margin-left: -8px;
    background: url(//assets.strikingly.com/assets/editor2/edit-overlay-a3d3418bac670f839c5a860795d81481.png);
    background: rgba(255,255,255,0.4);
    border: 1px solid #bbb;
    border: 1px solid rgba(0,0,0,0.25);
    opacity: 0;
    -webkit-transition: opacity .05s;
    transition: opacity .05s;
    font-family: 'pragmatica',sans-serif!important;

    &:hover, &.visibles {
        opacity: 1;
    }

    &.warning {
        background: rgba(255,50,50,0.2)
    }

    .center {
        position: absolute;
        top: 50%;
        margin-top: -13px;
        width: 100%;
        left: 0;
        height: 26px;
        line-height: 0;

        span {
            .black-button;
        }
    }
}

</style>