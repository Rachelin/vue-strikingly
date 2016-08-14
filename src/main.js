import Vue from 'vue'
import VueRouter from 'vue-router'
import Dragable from 'vuedragablefor'
import Resource from 'vue-resource'

import App from './App.vue'
import Home from './home/Home.vue'
import Activity from './activity/Activity.vue'

import VueMdl from 'vue-mdl'
Vue.use(VueMdl)
Vue.use(Dragable)
Vue.use(VueRouter)

Vue.config.devtools = true
Vue.config.debug = true;

// /* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })


var router = new VueRouter()

router.beforeEach(function () {
  scrollToTop();
});

router.afterEach(function (transition) {
  console.log('ture page to ', transition.to.path)
});


// Scrolls to the top with an easing
function scrollToTop() {
  if (document.body.scrollTop === 0) return;
  document.body.scrollTop = document.body.scrollTop + (-document.body.scrollTop) * 0.14;
  requestAnimationFrame(scrollToTop);
}

router.map({
  '/': {
    component: Home
  },

  '/activity/list': {
    name: 'list',
    component: Activity,
  },

  // '/user/:userId': {
  //   name: 'user',
  //   component: User
  // }
});

router.start(App, 'app');


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
