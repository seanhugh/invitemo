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

   this.userDataId = this.userDataId.bind(this)
   this.groupMetadata = this.groupMetadata.bind(this)

   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

   this.callbackFunctionApp = null;

 }

  setCallBackFunctionApp(fn) {
    this.callbackFunctionApp = fn;
  }

// LOGIN STUFF ALL GOES HERE ---------------------------------------------------

  async loginWindow(){
    try {
      let result = await firebase.auth().signInWithPopup(this.provider)
       // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      // ADD THE USER TO THE DATABASE IF IT ISNT ALREADY THERE
      let added = await this.addUser(user.displayName, user.email, user.uid);

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
  async addUser(name, email, uid){

    var postData = {
      name: name,
      email: email
    };

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/user/' + uid] = postData;

    let updates2 = await this.dbRef.update(updates);

    return updates2;
  }

  // Given a user ID, retrieve his data from the db
  async getUserData(id){
    return new Promise((resolve, reject) => {

      this.db.ref('/user/' + id).once('value').then(function(snapshot) {
           if (snapshot) {
            resolve(snapshot.val())
            return;
          } else {
          }
        });

      })
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

  // Function for creating a listener on the user's data
  createUserListener(id){
      this.db.ref('/user/' + id).on('value', snapshot => {
        let user_data = snapshot.val();
        if (user_data.groups == null){
          user_data.groups = {}
        }
        this.callbackFunctionApp({userData:user_data});
      });
  }

// GROUP ADDING FEATURE --------------------------------------------------------

  // Create a new group with the current user as the admin
  createNewGroup(name, description, privpub, userid) {

    if (description == null){
      description = ""
    }

    // Create a new grp
    var postData = {
      metadata: {name: name,
                 description: description,
                 priv: privpub},
      admins: {},
      users: {}
    };

    postData["admins"][userid] = 1;
    postData["users"][userid] = 1;

    // Get a key for a new Post.
    var newPostKey = this.dbRef.child('groups').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/groups/' + newPostKey] = postData;
    updates['/user/' + userid + '/groups/' + newPostKey] = 1;

    this.dbRef.update(updates);
  }

  pick_one(lst){
    let el = Object.keys(lst)[0]
    return el
  }


// GET METADATA FOR ALL GROUPS WHICH USER IS A MEMBER OF ----------------------

// Goal here is to get all the metadata for these groups so that you can display
//     it on the left column

  groupMetadata(id){
      let theDB = this.db;
      return new Promise((resolve, reject) => {

      theDB.ref('/groups/' + id + '/metadata').once('value').then(function(snapshot) {
           if (snapshot) {
            resolve(snapshot.val())
            return;
          } else {
          }
        });

      })
  }

  async updateGroups(groupData){
    if(groupData){
      // The user is a member of groups. Gather group data and send to user

      let groupList = Object.keys(groupData)

      return Promise.all(
          groupList.map(this.groupMetadata)
        ).then(allData => {
          // Put the data into an array and return it

          // Match the data back with its key and push to the object
          var i;
          let arr = {};
          for (i = 0; i < groupList.length; i++) {
            arr[groupList[i]] = allData[i]
          }
          return {group_data: arr}
      });


    } else{
    // User is not in any groups, return null values for groups to the user
      return {groups:{}}
    }
  }

// DOWNLOAD USER DATA FOR A GIVEN GROUP ---------------------------------------

  userDataId(id){
      return new Promise((resolve, reject) => {

      this.db.ref('/user/' + id).once('value').then(function(snapshot) {
           if (snapshot) {
            resolve(snapshot.val())
            return;
          } else {
          }
        });

      })
  }

  // Get the data for each user in a given group
  async groupUserData(group){
    let userList = Object.keys(group.users)

    return Promise.all(
        userList.map(this.userDataId)
      ).then(allData => {
      // Put the data into an array and return it

      // Match the data back with its key and push to the object
      var i;
      let arr = {};
      for (i = 0; i < userList.length; i++) {
        arr[userList[i]] = allData[i]
      }
      return {users: arr}
    });
  }


// DOWNLOAD GROUP INFO FOR GIVEN GROUP ---------------------------------------

// Given a group_id this function downloads all of the data for that group
//    - Data for that group
//    - Data for users in the group
//    - Data for events in the group

  async downloadRightHalf(group){

    return Promise.all([

      // Group Data Here
      new Promise((resolve, reject) => {

        this.db.ref('/groups/' + group).once('value').then(function(snapshot) {
             if (snapshot) {
              resolve(snapshot.val())
              return;
            } else {
            }
          });

      })

    ]).then(allData => {
      // Put the data into an array and return it
      return {group: allData[0]}
    });
  }

}

// Export new so that it does not create multiple instances
export default new MyFire();
