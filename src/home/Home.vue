<template>
    <div class="items-list" v-for="item in items">
      <mdl-card class="demo-card-welcome" :title="item.name" :supporting-text="item.value.toString()">
      </mdl-card>
    </div>
</template>

<script>
import { api } from '../store/Funs.js';
// import { BaseButton, MenuBar, MenuItem } from 'material-vue'

export default {
  // components: { BaseButton, MenuBar, MenuItem },

  data () {
    return {
      name: 'Home',
      items: []
    }
  },

  created() {
    this.getData()
  },

  methods: {
    getData () {
        api.getAction('self_media/statistics/index', {token: api.token}, (response) => {
            let res = response.json()
            if( res.ret == 0 ) {
                this.items = res.data
            } else {
                this.$parent.showMessage(res.data.msg)
            }
            console.log(response)
        })
    },
    onCreateClick() {
      if (api.isLoggedIn) {
        this.$route.router.go({ name: 'new' });
      } else {
        this.$dispatch('openLoginDialogEvent')
      }
    }
  }
}
</script>

<style lang="less">
.items-list .demo-card-welcome.mdl-card {
    width: 200px;
    float: left;
    margin: 20px;
}
.demo-card-welcome .mdl-card__title,
.demo-card-welcome .mdl-card__menu {
  color: white;
}
.demo-card-welcome .mdl-card__title {
  height: 176px;
  background: url('http://www.getmdl.io/assets/demos/welcome_card.jpg') center / cover;
}
</style>
