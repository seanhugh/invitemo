import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyFire from './MyFire';
import Home from './Home';
import Login from './Login';


// Output the app

class App extends Component {

  constructor(props) {
    super(props);

    // Set initial Values for State Data (onLoad)
    this.state = {user: {},
                  data: 3};

    // Pass through the callback function to Firebase
    MyFire.setCallBackFunction(this.updateState.bind(this))
  }

  componentWillMount(){

    // On Page Load Update User Data
    MyFire.updateUsers()
  }

  // Function That Updates the State on Input
  updateState(newState){
    this.setState(newState);
  }

  render() {
    return (
      <div className="App">
      <h1>{this.state.data}</h1>
      {this.state.user ? (<Home />) : (<Login/>)}
      </div>
    );
  }
}

export default App;
