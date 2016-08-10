
import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource)

Vue.http.options.root = 'xxx'
Vue.http.headers.common["Content-Type"] = 'application/x-www-form-urlencoded; charset=UTF-8'
Vue.http.headers.common["Access-Token"] = 'xxx'
// Vue.http.headers.common["Access-Control-Request-Headers"] = 'access-token'
Vue.http.options.emulateJSON = true;

export class Api {

    constructor() {
    }

    getAction(url, params, resolve) {
        Vue.http.get(url, {
            params: params
        })
        .then(resolve, (response) => {
                console.error("[http error] ==>",response)
        })
    }

    putAction(url, body, resolve) {
        Vue.http.put(url, body).then(resolve, (response) => {
            console.error("[http error] ==>",response)
        })
    }

    postAction(url, body, resolve) {
        Vue.http.post(url, body)
        .then(resolve, (response) => {
            console.error("[http error] ==>",response)
        })
    }

    deleteAction(url, params, resolve) {
        Vue.http.delete(url, {body: params}).then(resolve, (response) => {
            console.error("[http error] ==>",response)
        })
    }

  /**
   * [saveActivityParams  保存组件数据]
   * 保存活动组件
   * @param  {[object]} params [参数数据]
   * @param  {[string]} compName [组件名]
   * @return
   */
    saveActivityParams (params, compName) {
        this.putAction('activity_params', params, (response) => {
            let res = response.json()
            if(res.code === 0) {
                console.log('[', compName, ']==> saved ok!')
            } else {
                console.log('[', compName, ']==> error ', res)
            }
        })
    }

  /**
   * [saveActivityParams  设置组件排序]
   * 设置组件排序
   * @param  {[object]} params [参数数据]
   * id:2019
   * listorder:1
   * act:order
   * @param  {[string]} compName [组件名]
   * @return
   */
    setActivityListOrder (params, compName) {
        this.putAction('activity_params_set', params, (response) => {
            let res = response.json()
            if(res.code === 0) {
                console.log('[', compName, ']==> set ok!')
            } else {
                console.log('[', compName, ']==> error ', res)
            }
        })
    }

  /**
   * [saveActivityParams  设置组件排序]
   * 设置组件排序
   * @param  {[object]} params [参数数据]
   * id:2022
   * is_visible:0
   * act:show
   * @param  {[string]} compName [组件名]
   * @return
   */
    setActivityVisible (params, compName) {
        this.putAction('activity_params_visiable', params, (response) => {
            let res = response.json()
            if(res.code === 0) {
                console.log('[', compName, ']==> set ok!')
            } else {
                console.log('[', compName, ']==> error ', res)
            }
        })
    }

  /**
   * [deleteActivityParams  删除组件数据]
   * 删除活动组件
   * @param  {[object]} params [参数数据]
   * @param  {[string]} compName [组件名]
   * @return
   */
    // deleteActivityParams (id) {
    //     api.deleteAction('activity_params', {id: id}, (response) => {
    //         let res = response.json()
    //         if(res.code === 0) { }
    //     })
    // }

  /**
   * [getGoodsInfo  获取商品数据]
   * 通过商品id的字符串集获得信息
   * @param  {[object]} params [参数数据]
   * @param  {[string]} compName [组件名]
   * @return
   */
    getGoodsInfo (goodsids, resArr) {
        console.log("getGoodsInfo ==>goodsids ", goodsids)
        let goodsAry = []
        if(typeof goodsids === 'string') {
            goodsAry = goodsids.split(',')
        } else if (typeof goodsids === 'object') {
            goodsAry = goodsids
        } else {
            return
        }
        console.log(goodsAry)


        let params = {
            goodsids : goodsAry,
            type: 2
        }

        console.log(params)
        this.getAction('activity_goods/', params, (response) => {
            let res = response.json()
            if(res.code === 0) {
                console.log('get infomation')
                res.data.forEach((t, i)=>{
                    resArr.push(t)
                })
                console.log(resArr)
            } else {
                console.log("[message]:", res)
            }
            
        })
    }
 
    getActivityData() {
        var self = this
        Vue.http.get('http://api.121dian.net/activity/crossBorder/447', {params: {token:"uZUdcN9gLQkHGZW7HPxh"}})
        .then( (response) => {
            let res = response.json()
            if(res.code === 0) {
                return res.data;
            } else {
                console.log("[login message]:", res.msg)
            }
        }, (response) => {
            console.error("[http error] ==>",response)
        })
    }

    getGoods(limit, offset) {
        // http://admin.121dian.net/api/goodss?limit=10&offset=0
        // request.setRequestHeader('Access-Token', _global.access_token);
        var self = this
        Vue.http.headers.common['Access-Token'] = 'FfkQyJ9H8XY3xaJZtcX3B7uXDjttaGIP'
        Vue.http.get('promotion_goods_search/', {params: {limit:limit, offset: offset}})
        .then( (response) => {
            let res = response.json()
            if(res.code === 0) {
                return res.data;
            } else {
                console.log("[login message]:", res.msg)
            }
        }, (response) => {
            console.error("[http error] ==>",response)
        })
    }

    login(data) {
        var self = this
        Vue.http.post('auth', data).then( (response) => {
            let res = response.json()
            if(res.code === 0) {
                console.log("登录成功")
                console.log(res)
                self.isLoggedIn = true
                self.user = data
                self.loginDeferred.resolve()
            } else {
                console.log("[login message]:", res.msg)
            }
        }, (response) => {
            console.error("[http error] ==>",response)
        })
    }

    logout() {
        Vue.http.get('logout', {params: {m:'admin'}}).then( (response) => {
            let res = response.json()
            if(res.code === 0) {
                console.log("成功")
                console.log(res)
                self.isLoggedIn = false
                self.user = null
            } else {
                console.log("[login message]:", res.msg)
            }
        }, (response) => {
            console.error("[http error] ==>",response)
        })
    }
}
export let api = new Api()