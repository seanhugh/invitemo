// Firebase Import

 import * as firebase from 'firebase';
//import firebase, { auth, provider } from 'firebase';

// Initialize Firebase

  var config = {
    apiKey: "AIzaSyCr4GTWWYd2zZinT7prFYUI25x7kNeESkA",
    authDomain: "projectx-e57cb.firebaseapp.com",
    databaseURL: "https://projectx-e57cb.firebaseio.com",
    projectId: "projectx-e57cb",
    storageBucket: "projectx-e57cb.appspot.com",
    messagingSenderId: "291569073073"
  };
  firebase.initializeApp(config);


// Output the app

class MyFire {
  constructor() {

   this.db = firebase.database();

  // Auth Stuff

  this.provider = new firebase.auth.GoogleAuthProvider();

  // this.auth = firebase.auth();

   this.dbRef = this.db.ref();
   // this.dbRef = this.db.ref().child('data');

   this.callbackFunction = null;

   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

  // Keep the state updated
  }

  setCallBackFunction(fn) {
    this.callbackFunction = fn;

    //register this callback with firebase
  }

  async loginWindow(){
    try {
      let result = await firebase.auth().signInWithPopup(this.provider)
       // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      console.log(token)
      console.log(user)

      return [user, token];
    }
    catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

    }

  }

 // Check to see if user exists. If not, add it.
  addUser(name, email, uid){

    var postData = {
      name: name,
      email: email
    };

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/user/' + uid] = postData;

    return this.dbRef.update(updates);
  }

  // Create a new group with the current user as the admin
  createNewGroup(name, description, privpub, userid) {
    console.log("IM HERE BOIII")
    if (description == null){
      description = ""
    }
    // Create a new grp
    var postData = {
      metadata: {name: name,
                 description: description,
                 priv: privpub},
      admins: [userid],
      users: [userid]
    };

    // Get a key for a new Post.
    var newPostKey = this.dbRef.child('groups').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/groups/' + newPostKey] = postData;
    updates['/user/' + userid + '/groups/' + newPostKey] = 1;

    this.dbRef.update(updates);
  }

  // Log the user out using firebase auth logout
  logout(){
    firebase.auth().signOut().then(function() {
      console.log("user successfuly signed out")
    // Sign-out successful.
    }, function(error) {
      console.log("error occured while signing user out")
      // An error happened.
    });
  }

  async currentUser(){
    return new Promise((resolve, reject) => {

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user)
          return;
        } else {
        }
      });


    })
  }

    // updateUsers(state){
    //   this.dbRef.on('value', snapshot => {
    //     this.callbackFunction({data:snapshot.val()});
    //   });
    // }

// FIREBASE LOGIC: handle changes in the groups values
  updateGroups(state){
    this.dbRef.child('groups').on('value', snapshot => {
      this.callbackFunction({groups:snapshot.val()});
    });
  }

  updateState(state){
    this.callbackFunction(state);
  }

  // Check if User Exists


}

// Export new so that it does not create multiple instances
export default new MyFire();
