// Firebase Import

import * as firebase from 'firebase';

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
   this.dbRef = this.db.ref().child('data');

   this.callbackFunction = null;

  // Keep the state updated
  }

  setCallBackFunction(fn) {
    this.callbackFunction = fn;
  }



  updateUsers(state){
    this.dbRef.on('value', snapshot => {
      this.callbackFunction({data:snapshot.val()});
    // App.updateState(data:snapshot.val());
    });
  }


}

// Export new so that it does not create multiple instances
export default new MyFire();
