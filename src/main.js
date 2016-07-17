import Vue from 'vue'
import Resource from 'vue-resource'
import Dragable from 'vuedragablefor'
// import Vux from 'vux'
import App from './App.vue'

// install resource
Vue.use(Resource)
Vue.use(Dragable)

Vue.config.devtools = true
Vue.http.options.root = 'http://api.121dian.net'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
