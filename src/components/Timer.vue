<template>
    
    <div class="m-time-down" v-for="item in items">
        <component-editor>
            <span slot="title" @click="editorTime">编辑时间</span>
        </component-editor>
        <div class="m-timer">
            <span class="title">距离结束：</span>
            <span class="timer"></span>
        </div>
        <modal :is-visible.sync="isModalVisible" modal-class="time-modal">
            <span>结束时间：</span>
            <time-picker :microtime.sync="timer"></time-picker>
            <a class="s-btn" v-on:click="choseTime()">确定</a>
        </modal>
    </div>

    

</template>

<script>
import ComponentEditor from './ComponentEditor.vue'
import TimePicker from './TimePicker.vue'
import Modal from './Modal.vue'

export default {
    name: 'Timer',

    components: {
        ComponentEditor,
        TimePicker,
        Modal
    },

    data () {
        return {
            isModalVisible: false,
            timer: 0
        }
    },

    props: {
        items: Array
    },

    computed: {
    },

    methods: {
        editorTime () {
            this.timer = this.items[0].end_time
            console.log("选择前的时间：", this.timer)
            this.isModalVisible = true

        },
        choseTime () {
            console.log("选择后的时间：", this.timer)
            this.isModalVisible = false
        }
    }
}
</script>

<style lang="less">
    @import '../less/_variable.less';
    @import '../less/_mixin.less';
    @import '../less/_menu.less';
    @import '../less/_layout.less';

    
.m-time-down {
    position: relative;
    // padding: 10px 0;
    background-color: #fff;
    line-height: 24px;
    text-align: center;
    margin-bottom: 10px;

    .m-timer {
        padding: 10px 0;
    }
    &.timer {
        width: 24px;
        height: 24px;
        display: inline-block;
        background-color: #333;
        margin: 0 3px;
        text-align: center;
        line-height: 24px;
        color: #fff;
    }
}

.time-modal {
    min-width: 300px!important;
}

a.s-btn {
    background: #93b719;
    border: 1px solid #93b719;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    padding: 4px 15px;
    position: relative;
    font-family: 'brandon',sans-serif;
    font-weight: bold;
    -webkit-appearance: none;
    -webkit-border-radius: 0;
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 14px;
    margin: 4px;
    -webkit-transition: all .15s;
    transition: all .15s;
    margin-top: 8px;
    margin: 8px auto; 
    &:before {
        content: " ";
        width: auto;
        height: 10px;
        left: 0;
        right: 0;
        border-top: 1px solid white;
        opacity: .4;
        position: absolute;
        top: 0;
        border-radius: 5px;
    }

    &:hover {
        background: #a5cd1c;
        border-color: #a5cd1c
    }

    &:active {
        background: #84a517;
        border-color: #84a517
    }

    &:hover {
        color: #fff
    }
}

</style>