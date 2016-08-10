<template>
    <div v-show="isInput" class="link-input">
        <div class="label-wrap">
            <i class="fa {{faIcon}}"></i>
            <slot name="ltlable"></slot>
        </div>
        <input type="text" v-model="param"></input>
    </div>

    <a v-show="!isInput" class="float link-icon" @click="toInput">
        <i class="fa {{faIcon}}"></i>
        <slot name="btname"></slot>
    </a>

</template>

<script>
    export default {
        name: 'InputButton',

        props: {
            faIcon: String,
            param: String
        },

        data () {
            return {
                isInput: false,
                value: ''
            }
        },

        methods: {
            toInput () {
                this.isInput = true
            }
        },
    }
</script>

<style lang="less">

a.link-icon {
    color: #ddd;
    text-decoration: underline;
    cursor: pointer;
    font-size: 10px;
    line-height: 150%;
}

.link-icon {
    margin-right: 6px;
    text-decoration: none;
    font-size: 12px;
    background: #555;
    padding: 0 6px;
    height: 23px;
    line-height: 23px;
    display: inline-block;
    border-radius: 2px;
     i {
        font-size: 15px;
        color: #ddd;
     }
}

div.link-input {
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 6px;
    margin-top: 2px;
    position: relative;

    .label-wrap{
        background: #505050;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 6px;
        height: 26px;
        color: #ddd;
        border-radius: 2px 0 0 2px;
        white-space: nowrap;
        -webkit-box-flex: 0;
        -webkit-flex: none;
        -ms-flex: none;
        flex: none;

        label {
            margin-left: 3px;
        }
    }

    input[type="text"] {
        -webkit-box-flex: 1;
        -webkit-flex: auto;
        -ms-flex: auto;
        flex: auto;
        height: 26px;
        margin: 0;
        border: none;
        padding: 0 5px;
        border-radius: 0 2px 2px 0;
        border: 1px solid #505050;
    }
}
</style>