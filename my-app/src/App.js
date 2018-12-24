import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Initial Firebase Stuff

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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {data: 3};
  }

  db = firebase.database();
  dbRef = this.db.ref().child('data');

  componentWillMount(){
    this.dbRef.on('value', snapshot => {
      this.setState({
        data:snapshot.val()
      });
    });
  }

  render() {
    return (
      <div className="App">
      <h3>{this.state.data}</h3>
      </div>
    );
  }
}

export default App;
