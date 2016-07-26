<template>
    <div class="s-component-editor-warapper">
        <span v-if="!isEdit">
            <div class="buttons">
                <div v-if="draggable" class="s-repeatable-move-button" title="排序请拖动"></div>
                <div v-if="deleteSelf" class="s-repeatable-delete-button" 
                    title="删除此项" 
                    @mouseover="isComfire=true"
                    @mouseenter="isComfire=true" 
                    @mouseout="isComfire=false"
                    @click="deleteSelf">
                    <div class="delete-button-wrap">
                        <div class="delete-button-confirm">确定？</div>
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
        </span>

        <span v-if="isEdit">
            <div class="s-component-editor">
                <div>
                    <div class="preview-panel">
                        <div class="image-editor-image">
                            <slot name="image"></slot>
                            <div class="icon-panel">
                                <span></span>
                                <a class="icon" @click="showUpload">
                                    <i class="fa fa-refresh"></i>
                                    <br> 替换
                                </a>

                                <a class="icon" @click="deleteSelf">
                                    <i class="fa fa-times"></i>
                                    <br> 移除
                                </a>
                            </div>
                        </div>
                    
                        <div class="button-panel">
                            <input-button :fa-icon="'fa-link'" :param.sync="xiaolian">
                                <span slot="btname">添加链接</span>
                                <label slot="ltlable">链接网址</label>
                            </input-button>

                            <input-button :fa-icon="'fa-comment'" :param.sync="xiaolian2">
                                <span slot="btname">添加描述文字</span>
                                <label slot="ltlable">描述内容</label>
                            </input-button>
                        </div>

                    </div>

                </div>

                <div class="clearfix edit-buttons">
                    <a class="edit-btn green" type="button" @click="">保存</a>
                    <a class="edit-btn gray" type="button" @click="isEdit = false">取消</a>
                </div>
            </div>
        </span>
    </div>
</template>

<script>
import InputButton from './InputButton.vue'
export default {
    data () {
        return {
            isComfire : false,
            isEdit : false,
        }
    },

    components: {
        InputButton
    },

    props: {
        deleteSelf : {
            type: Function
        },
        draggable : {
            type: Boolean,
            default: false
        }
    },

    methods : {
        showUpload () {
            this.isEdit = false
        }
    },

    events: {
        'show-edit': function () {
            console.log(this.isEdit)
            this.isEdit = true
        }
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
    width: 100%;
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


 
.s-component-editor {
    position: relative;
    zoom: 1;
    background: #333 url(//assets.strikingly.com/assets/editor2/light-bg-6aea72930a01037fd4e4181b6edd991b.png);
    border-radius: 3px;
    text-align: left;
    font-family: 'pragmatica',sans-serif;
    border: 1px solid rgba(0,0,0,0.4);
    text-shadow: 0 -1px 0 rgba(0,0,0,0.4);
    padding: 10px;
    margin: 0;
    color: #fff;
    z-index: 92;
    text-transform: none;
    line-height: 14px;
    font-size: 12px;
    max-width: 600px;
    display: inline-block;
    &.before, &.after {
        display: table;
        content: "";
        zoom: 1;
    }

    .image-editor-image {
        padding: 4px;
        float: left;
        background: #222;
        background: rgba(0,0,0,0.3);
        border-radius: 0;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;
        min-width: 40px;
        display: block;
        float: none;
        min-width: 60px;
        min-height: 60px;
        margin: 0;

        & img {
            margin: 0 auto;
            max-width: 100%;
            padding: 0;
            vertical-align: middle;
        }
    }

    .icon-panel {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.6);
        text-align: center;
        -webkit-transition: all .2s cubic-bezier(.7,0,.3,1);
        transition: all .2s cubic-bezier(.7,0,.3,1);
        opacity: 0;
        
        &:hover {
            opacity: 1;
        }
        .icon {
            width: 30%;
            display: inline-block;
            text-decoration: none;
            vertical-align: middle;
            color: #ccc;
            cursor: pointer;
            -webkit-transition: all .2s cubic-bezier(.7,0,.3,1);
            transition: all .2s cubic-bezier(.7,0,.3,1);

            i {
                font-size: 30px;
                position: relative;
                top: -5px;
                font-style: normal;
            }

            &:hover {
                color: #fff;
            }
        }

        span {
            height: 100%;
            display: inline-block;
            vertical-align: middle;
        }
    }

    
    .button-panel {
        padding: 6px 0;
        // a {
        //     color: #ddd!important;
        //     text-decoration: underline;
        //     cursor: pointer;
        //     font-size: 10px;
        //     line-height: 150%;
        // }

        // .link-icon {
        //     margin-right: 6px;
        //     text-decoration: none;
        //     font-size: 12px;
        //     background: #555;
        //     padding: 0 6px;
        //     height: 23px;
        //     line-height: 23px;
        //     display: inline-block;
        //     border-radius: 2px;
        //      i {
        //         font-size: 15px;
        //         color: #ddd;
        //      }
        // }
    }

    .edit-buttons {
        border:none;
        .edit-btn {
            min-width: 50px;
            float: left;
            margin-top: 6px;
            padding: 6px 12px;
            cursor: pointer;
            font-family: 'pragmatica',sans-serif;
            text-transform: uppercase;
            padding: 5px 18px;
            font-size: 11px;
            margin: 0;
            margin-right: 4px;
            outline: none;
            text-align: center;
            font-weight: 500!important;
            font-style: normal;
            letter-spacing: 0;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-touch-callout: none;
            .transform-color(#fe1,#fc2, '#ffee11', '#ffcc22');
            color: #000!important;
            text-shadow: 0 1px 0 rgba(255,255,255,0.35)!important;
            line-height: 100%!important;
            border-radius: 3px;
            border: 1px solid #ccc;
            border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.15) rgba(0,0,0,0.25);
            box-shadow: inset 0 1px rgba(255,255,255,0.5),0 1px 1px rgba(0,0,0,0.15);
            text-decoration: none!important;

            &.green {
                .transform-color(#93b800, #70a800, '#93b800', '#70a800');
                color: #fff!important;
                text-shadow: 0 1px 1px rgba(0,0,0,0.5)!important;
                &:hover {
                    .transform-color(#afdb00,#86c900, '#afdb00', '#86c900');
                }
            }

            &.gray {
                .transform-color(#bbb, #999, '#bbbbbb', '#999999');
                color: #fff!important;
                text-shadow: 0 1px 1px rgba(0,0,0,0.5)!important;
                &:hover {
                    .transform-color(#ccc, #aaa, '#cccccc', '#aaaaaa');
                }
            }
        }
    }
}

.edit-buttons {
    overflow: hidden;
    margin-top: 0;
    
}

 .s-component-editor input[type="text"] {
    background: #111;
    background: rgba(0,0,0,0.45);
    border-radius: 3px;
    margin: 0;
    outline: none;
    float: left;
    border: 1px solid #666;
    border-color: #000 #333 #444;
    border-width: 1px 0;
    padding: 4px 5px;
    color: #eee;
    outline-width: 0;
    margin-bottom: 4px;
 }

</style>