import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource)

Vue.http.options.root = 'http://api.121dian.net'
Vue.http.headers.common["Content-Type"] = 'application/x-www-form-urlencoded; charset=UTF-8'
// Vue.http.headers.common["Access-Token"] = config.http.token
// Vue.http.headers.common["Access-Control-Request-Headers"] = 'access-token'
Vue.http.options.emulateJSON = true;

export class Api {

    constructor() {
        this.description = "For 121 big funs store."
        this.isLoggedIn = false
        this.token = ""
    }

    setAccessToken (token) {
        if(token) {
            this.isLoggedIn = true
            this.token = token
            // Vue.http.headers.common["Access-Token"] = token
        }
    }

    getAction(url, params, resolve) {
        Vue.http.get(url, {
            params: params,
            // headers: {'Access-Token' : this.token}
        }).then(resolve, (response) => {
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