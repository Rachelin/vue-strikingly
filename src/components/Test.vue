<template>
    <div class="test">
        <slot name="order"></slot>
    </div>
</template>

<script>
    export default {
        name: 'Test',
    }
</script>

<style>
    .test{
        width: 80%;
        height: 300px;
        background-color: #fb2;
        margin:50px auto;
    }
</style>