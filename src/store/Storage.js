// import deferred from './deferred.js'
export class Storage {

    constructor() {
        var self = this
        // Create a root reference
        self.storageRef = firebase.storage().ref();
        self.uploadRef = self.storageRef.child('upload')
        // Create file metadata including the content type
        self.metadata = {
            contentType: 'image/jpeg'
        }
        self.uploadTask = null
    }

    upload(file) {
        var self = this
        // create new task
        this.uploadTask = this.uploadRef.child(file.name).put(file, this.metadata)

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        this.uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // See below for more detail

            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function(error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    console.log("User doesn't have permission to access the object")
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    console.log("User canceled the upload")
                    break;

                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                    console.log("Unknown error occurred, inspect error.serverResponse")
                  break;
              }
        }, function() {
            // Handle successful uploads on complete
            var downloadURL = self.uploadTask.snapshot.downloadURL;
            console.log("handle successful downloadURL = ", downloadURL)
        });
    }

    pause() {
        this.uploadTask.pause()
    }

    resume() {
        this.uploadTask.resume()
    }

    cancel() {
        this.uploadTask.cancel()
    }


}

export let storage = new Storage()

// Parent allows us to move to the parent of a reference
        // var imagesRef = spaceRef.parent;
        // imagesRef now points to 'images'

        // Root allows us to move all the way back to the top of our bucket
        // var rootRef = spaceRef.root;
        // rootRef now points to the root

        // Create a reference to 'mountains.jpg'
        // var mountainsRef = storageRef.child('mountains.jpg');

        // Create a reference to 'images/mountains.jpg'
        // var mountainImagesRef = storageRef.child('images/mountains.jpg');

        // While the file names are the same, the references point to different files
        // mountainsRef.name === mountainImagesRef.name            // true
        // mountainsRef.fullPath === mountainImagesRef.fullPath    // false


        // Points to the root reference
        // var storageRef = firebase.storage().ref();

        // // Points to 'images'
        // var imagesRef = storageRef.child('images');

        // // Points to 'images/space.jpg'
        // // Note that you can use variables to create child values
        // var fileName = 'space.jpg';
        // var spaceRef = imagesRef.child(fileName);

        // // File path is 'images/space.jpg'
        // var path = spaceRef.fullPath

        // // File name is 'space.jpg'
        // var name = spaceRef.name

        // // Points to 'images'
        // var imagesRef = spaceRef.parent;