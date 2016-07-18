<template>
  <section id="new-section-dialog" class="s-mac-no-text-shadow">
    <div class="new-section-header">
      <h3 class="caps center">
        添加新版块
      </h3>
      <div class="close-button" @click="hidden">
        <h4>
          <a>x</a>
        </h4>
      </div>
    </div>

    <div class="new-section-content">
      <div class="inner-wrapper">
          <div class="inner">
              <div class="section-gallery">
                  <div class="clearfix">
                      <section-selector-item v-for="n in 10"></section-selector-item>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script>
import SectionSelectorItem from './SectionSelectorItem.vue'

export default {
    name: 'NewSectionDialog',

    components: {
        SectionSelectorItem
    },

    data() {
      return {
        show: false
      }
    },

    methods: {
      hidden () {
        this.$parent.showDialog = false
      }
    },
}
</script>


<style lang="less">

// common
.s-mac-no-text-shadow * {
  text-shadow: none! important;
}

.center, .center-align {
  text-align: center;
}

.caps {
  text-transform: uppercase;
}

// ----------
#new-section-dialog h1, 
#new-section-dialog h2, 
#new-section-dialog h3, 
#new-section-dialog h4, 
#new-section-dialog h5, 
#new-section-dialog h6 {
    font-family: 'pragmatica',sans-serif;
    font-weight: 200;
    color: #444;
}

#new-section-dialog::-webkit-scrollbar{
    -webkit-appearance: none;
    height: 7px;
    width: 7px
}

#new-section-dialog {
    z-index: 2100;
    font-family: 'pragmatica',sans-serif;
    width: 300px;
    height: 100%;
    top: 0;
    box-shadow: 0 1px 8px rgba(0,0,0,0.7);
    background: #fff;
    position: fixed;
    overflow: hidden;
    background: #eee;
    z-index: 1999;
    h3 {
        line-height: 30px;
        width: 100%;
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 23px;
        text-align: left;
    }

    h4 {
      font-size: 20px;
    }

    a {
        cursor: pointer;
        color: #2aabd9;
        font-size: 12px;
    }

    a:hover {
        color: #4ccdfb;
    }

    .close-button {
      position: absolute;
      top: 15px;
      right: 15px;
      z-index: 2101;
      a {
        color: #888;
        font-size: 32px;
        font-weight: 300;
      }
      a:hover {
        color: #888;
      }
    }

    .new-section-header {
      position: relative;
      padding: 0 20px;
      padding-bottom: 5px; 
    }

    .new-section-content {
      position: relative;
      height: 100%;
      padding-bottom: 90px;
      box-sizing: border-box;
      .inner-wrapper {
        padding: 5px 18px 0 20px;
        height: 100%;
        overflow: auto;
        margin-right: 2px;
      }

      .inner {
        position: relative;
        padding: 0 0 16px 0;

      }
    }

    .section-gallery {
    }
}


.fade-transition {
    left: 220px;
    transition: all .3s ease;
    opacity: 1;
}
 
.fade-leave,
.fade-enter {
    opacity: 0;
    left: -100px;
}
</style>