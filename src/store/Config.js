export class Config {

    constructor () {
        this.http = {
            root : 'http://api.121dian.net',
            token: ''
        }
    }

    setHttpRoot (iproot) {
        if(iproot) {
            this.http.root = iproot
        }
    }

    setAccessToken (token) {
        if(token) {
            this.http.token = token
        }
    }
}