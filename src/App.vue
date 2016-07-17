<template>
     <div id="main">
        <h1>Vue Dragable For</h1>
        <div class="drag">
            <h2>Dragable v-dragable-for</h2>
            <div class="dragArea">
                <div v-dragable-for="element in list">{{element.name}}</div>
             </div>
         </div>
        <div class="normal">
            <h2>Normal v-for</h2>
            <div class="dragArea">
                <div v-for="element in list">{{element.name}}</div>
             </div>
         </div>
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            list: [
                {name: 'xioah1'},
                {name: 'xioah2'},
                {name: 'xioah3'}
            ]
        }
    }
}
</script>