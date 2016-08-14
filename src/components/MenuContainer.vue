<template>
    <div id="x-menu-container" class="x-menu-container open transition">
        <!-- <div class="gray minimize-icon">
            <a id="x-minimize-button" rel="tooltip-right" title data-original-title="隐藏编辑面板">
                <span class="entypo entypo-left-open-big"></span>
            </a>
        </div> -->
        <div class="menu">
            <div class="logo"></div>
            <div class="main-menu">
                <div class="top-menu" id="x-top-menu">
                    <button class="s-side-menu-btn" @click="onSave">保存</button>
                    <button class="s-side-menu-btn" @click="onPublish">发布</button>
                </div>
                <div class="middle-menu">
                    <div class="section-and-links">
                        <div class="side-menu-sections">
                            <div class="section-heading">版块</div>
                            <div class="section-wrap">
                                <div class="sections">
                                    <div class="ui-sortable">
                                        <div v-dragable-for="section in menuList" v-bind:options='options' data-sorting-index="{{$index}}">
                                            <div class="sections">
                                                <div class="section">
                                                    <div class="move icon"></div>
                                                    <div class="div" v-show="handleId === $index">
                                                        <div class="settings icon"><span class="fa fa-cog"></span></div>
                                                        <div class="delete icon" rel="tooltip" title data-original-title="删除此版块" @click="remove"></div>
                                                        <div class="menu-btn section-button selected">
                                                            {{section.name}}
                                                        </div>
                                                    </div>
                                                    <div v-show="handleId != $index" class="menu-btn section-button" @click="selectIt($index)">
                                                        {{section.name}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="section">
                                <div class="add icon"></div>
                                <div class="add-button green menu-btn selected add-new-section-button" title="" @click="toggleNewSection">
                                    添加新版块
                                </div>
                            </div>    
                        </div>
                        
                    </div>
                </div>
                <div class="bottom-menu"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {api}            from '../store/Api.js'
import notificationStore    from '../NotificationStore.js';
export default {
    name: 'MenuContainer',

    props: {
        menuList: Array,
        handleId: Number
    },

    computed: {
        options() {
            var self = this
            return {
                group: 'menu',
                animation: 200,
                handle: '.move',
                onEnd : function (evt) {
                    // console.log("evt.newIndex", evt.newIndex)
                    // console.log("evt.oldIndex", evt.oldIndex)
                    self.selectIt(evt.newIndex)
                },
            }
        }
    },

    // events: {
    //     saveComponent () {
    //     }
    // },

    methods: {
        setListOrder () {
            let temp = this.menuList[this.handle]
            let params = {
                id: '',
                listorder: this.handle,
                act:'order'
            }

            if(typeof temp.id !== 'undefined') {
                params.id = temp.id
                api.setActivityListOrder(params, temp.component)
            } else {
                temp.items.forEach((t, i) => {
                    if(typeof t.id !== 'undefined') {
                        params.id = t.id
                        api.setActivityListOrder(params, temp.component)
                    } else {
                        console.error('[setListOrder] => message: 没id号哦')
                    }
                })
            }
        },

        setVisible () {
            let temp = this.menuList[this.handle]
            let params = {
                id: '',
                is_visible: 0,
                act:'show'
            }

            if(typeof temp.id !== 'undefined') {
                params.id = temp.id
                api.setActivityVisible(params, temp.component)
            } else {
                temp.items.forEach((t, i) => {
                    if(typeof t.id !== 'undefined') {
                        params.id = t.id
                        api.setActivityVisible(params, temp.component)
                    } else {
                        console.error('[setListOrder] => message: 没id号哦')
                    }
                })
            }
        },

        remove () {
            var del = confirm("您确定要删除吗？")
            if(del) {
                let temp = this.menuList[this.handleId]

                if(typeof temp.id !== 'undefined') {
                    this.deleteComp(temp)
                } else {
                    if(temp.items.length > 0) {
                        this.showNotification('呦吼，要先把控件的每一项都先删除哦')
                    } else {
                        this.menuList.splice(this.handleId, 1)
                        this.handleId = -1
                    }
                    
                }
            }
        },

        deleteComp(item) {
            api.deleteAction('activity_params', {id:item.id}, (response) => {
                let res = response.json()
                if(res.code === 0) {
                    this.menuList.$remove(item)
                    this.handleId = -1
                }
            })

            console.log('=>Delete id =', item.id)
        },

        selectIt (index) {
            var self = this
            console.log("set handleId = ", index)
            this.handleId = index
            setTimeout(function(){
                self.setListOrder()
                self.$parent.$broadcast('scroll-to', index)
            }, 1000)
        },

        toggleNewSection () {
            this.$dispatch('toggle-section-dialog')
        },

        onSave () {
            console.log("will be preview")
            this.$broadcast('saveComponent')
        },

        onPublish () {
            console.log("will be publish")
            alert('功能还在开发')
        },

        showNotification (msg) {
            msg = msg ? msg : 'null'
            notificationStore.add({
                title: msg
            });
        }
    },

}
</script>

<style lang="less">
@import '../less/_common.less';

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

        .top-menu {
            margin: 0 5px 4px 5px;
            height: 50px;
        }

        width: 220px;
        height: 100%;
    
        .main-menu {
            position: relative;
            width: 220px;
            height: calc(~"100% - 35px");
        }

        .middle-menu {
            overflow: auto;
            margin-top: 10px;
            border-bottom: 1px transparent solid;
        }
    }

    .section-and-links {
        margin: 0 10px 10px;
    }

    .side-menu-sections {
        .section-heading {
            padding: 0;
            font-size: 10px;
            color: #999;
            text-transform: uppercase;
        }

        .section-wrap {
            overflow: hidden;

            .sections {
                margin-top: 3px;
            }
        }

    }
}


.section {
    position: relative;
    zoom: 1;
    padding: 2px 1px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
    
    &:before,
    &:after {
        display: table;
        content: "";
        zoom: 1;
    }

    &:after {
        clear: both;
    }

    .icon {
        width: 12px;
        float: left;
        height: 20px;
    }

    .icon.move {
        cursor: move;
        width: 20px;
        height: 20px;
        background: url(//assets.strikingly.com/assets/sprites-3925196dc873266229d059b934e76bbe.png) -120px 0 no-repeat;
        margin: 2px 4px 0 -2px;
    }

    .icon.add {
        width: 20px;
        height: 20px;
        background: url(//assets.strikingly.com/assets/sprites-3925196dc873266229d059b934e76bbe.png) 0 0 no-repeat;
        margin: 2px 4px 0 -2px;
    }

    .icon.settings,.icon.delete {
        margin: 2px -1px 0 2px;
        float: right;
        cursor: pointer;
        color: #999;
        text-align: center;
        line-height: 20px;
        text-shadow: none;
    }
    
    .icon.delete {
        width: 10px;
        height: 10px;
        background: url(//assets.strikingly.com/assets/side_menu/editor-delete-icon-bc0403dc60e89600cbb41ebc1ee57655.png) no-repeat;
        margin: 8px 4px 0 0;
        opacity: .6;
    }

    .menu-btn {
        display: block;
        pointer: cursor;
        color: #fff;
        padding: 6px 6px;
        text-decoration: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
    }

    .section-button,
    .add-button {
        .menu-btn;
        border-radius: 3px;
        min-height: 13px;
        font-size: 14px;
        font-weight: 400;
        // width:e("calc(100% - 70px)");
        width : calc(~"100% - 70px");

        float: left;
        background: none;
        cursor: pointer;
    }

    .section-button.selected,
    .section-button:hover.selected{
        .transform-color(#ffeb12,#ffbe21, '#ffeb12', '#ffbe21');
        color: black;
        text-shadow: 0 1px 0 rgba(255,255,255,0.5);
        border-radius: 3px;
        box-shadow: inset 0 1px rgba(255,255,255,0.6),0 1px 2px rgba(0,0,0,0.4);
        font-weight: 600;
        letter-spacing: -0.5px;
        overflow: hidden;
    }

    .section-button:hover {
        background-color: #222;
        background: rgba(0,0,0,0.3);
        color: #fff;
        text-shadow: none;
        cursor: pointer;
        box-shadow: none;
        text-decoration: none;
    }
    

    .add-button:hover.green,
    .add-button:active.green,{
        .green;
    }

    .add-button.selected {
        .dark-green;
        .shadow-text;
    }

}

.s-side-menu-btn {
    float: left;
    margin: 4px 5px;
    padding: 0;
    width: 95px;
    height: 44px;
    background: #555; 
    background: rgba(0,0,0,0.3);
    color: #fff;
    text-shadow: none;
    cursor: pointer;
    box-shadow: none;
    text-decoration: none;
    border-radius: 3px;

    background: #555;
    box-shadow: inset 0 1px rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.2);
}

.s-side-menu-btn.selected,.s-side-menu-btn:hover,.s-side-menu-btn:active {
    background-color: #fb2;
    background-repeat: repeat-x;
    background-image: -webkit-linear-gradient(top,#fe1,#fb2);
    background-image: linear-gradient(to bottom,#fe1,#fb2);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffee11',endColorstr='#ffbb22',GradientType=0);
    color: black;
    text-shadow: 0 1px 0 rgba(255,255,255,0.5);
    border-radius: 3px;
    box-shadow: inset 0 1px rgba(255,255,255,0.4),0 1px 2px rgba(0,0,0,0.4);
    text-decoration: none
}
</style>