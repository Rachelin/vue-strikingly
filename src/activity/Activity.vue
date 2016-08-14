<template>
<mdl-tabs :selected.sync="selected">
  <mdl-tab :tab="{ title: '官方专辑'}">
    <table class="mdl-data-table mdl-js-data-table">
      <thead>
        <tr>
          <th v-for="th in headers" class="mdl-data-table__cell--non-numeric">
            {{th}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td class="mdl-data-table__cell--non-numeric">{{item.id}}</td>
          <td class="mdl-data-table__cell--non-numeric">{{item.name}}</td>
          <td class="mdl-data-table__cell--non-numeric">
            <img v-bind:src="item.image_url" alt="{{item.image}}" style="width:100%">
          </td>
          <td class="mdl-data-table__cell--non-numeric">{{item.activity_url}}</td>
          <td class="mdl-data-table__cell--non-numeric">{{item.share_title}}</td>
          <td class="mdl-data-table__cell--non-numeric">{{item.share_desc}}</td>
          <td class="mdl-data-table__cell--non-numeric"></td>
        </tr>
      </tbody>
    </table>
  </mdl-tab>
  <mdl-tab :tab="{ title: '自制专辑'}">
    <table class="mdl-data-table mdl-js-data-table">
      <thead>
        <tr>
          <th v-for="th in headers" class="mdl-data-table__cell--non-numeric">
            {{th}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in selfs">
          <td class="mdl-data-table__cell--non-numeric">{{item.id}}</td>
          <td class="mdl-data-table__cell--non-numeric">{{item.name}}</td>
          <td class="mdl-data-table__cell--non-numeric">
            <img v-bind:src="item.image_url" alt="{{item.image}}">
          </td>
          <td class="mdl-data-table__cell--non-numeric">{{item.activity_url}}</td>
          <td class="mdl-data-table__cell--non-numeric">{{item.share_title}}</td>
          <td class="mdl-data-table__cell--non-numeric">{{item.share_desc}}</td>
          <td class="mdl-data-table__cell--non-numeric"></td>
        </tr>
      </tbody>
    </table>
  </mdl-tab>
</mdl-tabs>

</template>

<script>
import { api } from '../store/Funs.js';
// import { BaseButton, MenuBar, MenuItem } from 'material-vue'

export default {
  // components: { BaseButton, MenuBar, MenuItem },

  data () {
    return {
      name: 'Home',
      selected: 0,
      headers: ['ID', '专辑名称', '图片', '推广链接', '分享标题', '分享内容', '操作'],
      items: [],
      selfs: []
    }
  },

  created() {
    this.getData('')
    this.getData('self')
  },

  methods: {
    getData (type) {
        var params = {
          type: type,
          limit: 10,
          offset : 0,
          token: api.token
        }
        api.getAction('self_media/activity', params, (response) => {
            let res = response.json()
            if( res.ret == 0 ) {
                if(type == 'self') {
                  this.selfs = res.data
                } else {
                  this.items = res.data

                }
            } else {
                this.$parent.showMessage(res.data.msg)
            }
            console.log(response)
        })
    },
    onCreateClick() {

    }
  }
}
</script>

<style lang="less">
.demo-card-welcome.mdl-card {
  width: 512px;
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
