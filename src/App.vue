
<template>
<div class="main-wrap" v-if="isLoggedIn">
    <nav-bar style="z-index: 100">
      <icon-button icon-class="fa fa-bars fa-2x fa-hover anti-color" slot="leftNav" @click="handleClick"></icon-button>
      <span slot="title" class="">粉丝商城</span>
      <icon-button icon-class="fa fa-github fa-2x anti-color" slot="rightNav" link=""></icon-button>
    </nav-bar>
    <!-- <ul class="side-nav fixed" style="transform: translateX(0%);">
      <li class="bold">首页</li>
      <li class="bold">专辑</li>
    </ul> -->
    <menu-bar :open="open" v-ref:sidebar :docked="!small"  style="z-index: 100">
      <menu-item class="header item"
                 slot="menuList"
                 label="HOME"
                 :icon-on-click="hideMenu"
                 :label-on-click="linkTo"
                 icon-class="fa fa-caret-left fa-2x"
                 :ripple="false">
      </menu-item>
      <menu-item slot="menuList" label="首页" @click="linkTo()"></menu-item>
      <menu-item slot="menuList" label="专辑" @click="linkTo('/activity/list')"></menu-item>
    </menu-bar>

    <div id="container" class="router" :class="open&&!small ? 'view' : 'resView'">
      <router-view v-ref:mainview keep-alive></router-view>
    </div>
    
</div>

<template v-if="isLoginModalVisible">
  <div class="login-wrap">
    <div class="login-form">
      <mdl-textfield floating-label="Account" :value.sync="user.mobile" type="tel"></mdl-textfield>
      <mdl-textfield floating-label="Password" :value.sync="user.password" type="password"></mdl-textfield>
      <br><br>
      <mdl-button colored raised @click="login">登录商城</mdl-button>
    </div>
  </div>
</template>

<mdl-snackbar display-on="appMessage"></mdl-snackbar>
</template>

<script>

import Modal from './components/Modal.vue';
import Notifications from './Notifications.vue';
import { BaseButton, MenuBar, MenuItem, NavBar, IconButton } from 'material-vue'

import { api } from './store/Funs.js';


export default {
    components: { 
      Modal, 
      Notifications,
      MenuBar,
      MenuItem,
      NavBar, 
      IconButton
    },

    data () {
        return {
            isLoggedIn: false,
            user: {
                mobile : '18457197344',
                password : 'wxl123'
            },
            isLoginModalVisible: false,
            isEmbedded: window.inIframe,
            open: true,
            // window.innerWidth < 750  ? false : true,
            small: window.innerWidth < 750 ? true : false,
            test:'asdfasdf'
        }
    },
    ready: function() {
        var throttle = function (type, name, obj) {
          obj = obj || window
          var running = false
          var func = function() {
            if (running) { return }
            running = true
            requestAnimationFrame(function() {
              let event
              if (-1 != navigator.userAgent.indexOf("MSIE")) {
                event = document.createEvent('CustomEvent')
                event.initCustomEvent(name, true, true, {})
              } else {
                event = new CustomEvent(name)
              }
              obj.dispatchEvent(event)
              running = false
            })
          }
          obj.addEventListener(type, func)
        }
        throttle("resize", "optimizedResize")
        window.addEventListener("optimizedResize", () => {
          const width = window.innerWidth
          const size = 750
          if(width < size) {
            this.open = false
            this.small = true
          } else {
            this.open = true
            this.small = false
          }
        })
      },

    created () {
        if(!api.isLoggedIn) {
            this.isLoginModalVisible = true
        }
    },

    methods: {
        onLogin () {
            var self = this
            this.$watch(api.isLoggedIn, () => {
                self.isLoggedIn = auth.isLoggedIn;
                self.isLoginModalVisible = false
            })
        },

        login () {
              var params = {
                mobile: this.user.mobile,
                password: md5(this.user.password)
              }
              api.postAction('self_media/user/login', params, (response) => {
              let res = response.json()
              if( res.ret == 0 ) {
                  this.isLoggedIn = true
                  this.isLoginModalVisible = false
                  api.setAccessToken(res.data.token)
              } else {
                  this.showMessage(res.data.msg)
              }
              console.log(response)
          })
        },

        logout() {
            api.logout();
        },
        handleClick () {
            this.open = true
        },
        hideMenu () {
            this.open = false
        },
        linkTo (path) {
            if (!path) {
              this.$route.router.go('/')
            } else {
              this.$route.router.go(path)
            }
        },
        showMessage (msg) {
          msg = msg || 'null'
          this.$broadcast('appMessage', { message: msg })
        }
    },

    events: {
        'openLoginDialogEvent': function () {
            this.isLoginModalVisible = true;
        },

        showMessage () {

        }
    }
}
</script>


<style lang="less">
.login-wrap {
  box-shadow: rgba(0, 0, 0, 0.136863) 0px 3px 10px, rgba(0, 0, 0, 0.11451) 0px 3px 10px;
  border: 1px solid rgba(141, 143, 141, 0.3);
  border-radius: 4px;
  position: relative;
  width: 500px;
  top: 25%;
  left: 25%;
  background-color: white; 
  &::before{
    font-family: Roboto, sans-serif;
    content: 'LOGIN-IN';
    text-transform: uppercase;
    color: #959595;
    display: block;
    font-weight: 700;
    margin-left: 16px;
    margin-top: 16px;
  }

  .login-form {
    width: 80%;
    margin: 20px auto;
  }
}



.table {
  width: 800px;
}
.fa-2x {
  font-size: 1.5em;
}
.main-wrap {
  // top: 100px;
  // left: 100px;
  // position: absolute;
}
.header {
  background-color: rgb(41, 43, 38);
  color: white;
}
.router {
  padding: 72px 36px 48px;
}
.view {
  margin-left: 150px;
}
.item {
  line-height: 48px;
  height: 48px;
}
.anti-color {
  color: white;
}
.fade-in-transition {
    transition: 0.3s ease;
}
.fade-in-enter, .fade-in-leave {
    opacity: 0;
}
</style>
