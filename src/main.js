import Vue from 'vue'
import Dragable from 'vuedragablefor'
import Resource from 'vue-resource'
import App from './App.vue'

Vue.use(Dragable)

Vue.config.devtools = true
Vue.config.debug = true;

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

// 123,456,798
Vue.filter('numberStr', {
    read (val) {
        return val
    },
    // view -> model
    // 在写回数据之前格式化值
    write (val, oldVal) {

        val = val.replace(/[^0-9, \, ,\s, \，]/g, "");
        val = val.replace(/\，/g, ","); // 换中文逗号
        val = val.replace(/\s/g, "");  // 去空格
        val = val.replace(/\,+/g, ",");
        return val.replace(/(\,+$)/g, ""); // 去最后一个空格
    }
})
