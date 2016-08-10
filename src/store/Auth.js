import deferred from './deferred.js'
// import api from './Api.js'

export class Auth {

    constructor() {
        var self = this
        this.isLoggedIn = false
        this.user = null
        this.loginDeferred = deferred()
        this.userDataDeferred = deferred()

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyD020Tkxq6PiFJfbgJjOQL8jSiZVesnPBw",
            authDomain: "dian-d4098.firebaseapp.com",
            databaseURL: "https://dian-d4098.firebaseio.com",
            storageBucket: "dian-d4098.appspot.com",
        }
        firebase.initializeApp(config)

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.user = firebase.auth().currentUser
                self.isLoggedIn = true
                self.loginDeferred.resolve()

                // Listen for future changes on user obj
                firebase.database().ref('user/' + self.user.uid).on('value', self.onAuthStateChanged.bind(self))
            } else {
                self.user = null
                self.isLoggedIn = false
            }

            console.log("hello user ")
        })
    }

    onUserDataChange(snapshot) {
        Object.assign(this.user, snapshot.val())
        this.userDataDeferred.resolve(this.user)
    }

    onLogin() {
        return this.loginDeferred.promise
    }

    getUserData() {
        return this.userDataDeferred.promise
    }

    login(result) {
        firebase.database().ref('user/' + result.username).update({
            username: result.username,
            password: result.password,
            signedUpOn: Date.now()
        })
    }

    loginByTwitter() {
        var self = this
        var provider = new firebase.auth.TwitterAuthProvider()

        return firebase.auth().signInWithPopup(provider).then(function(result) {
            // Save this user in the store
            console.log()
            firebase.database().ref('user/' + result.user.uid).update({
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.providerData[0].photoURL,
                signedUpOn: Date.now()
            })
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        })
    }

    logoutByTwitter() {
        firebase.auth().signOut().then(function () {
            location.reload()
        })
    }
}

export let auth = new Auth()