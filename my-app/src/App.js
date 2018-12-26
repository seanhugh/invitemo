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
    this.state = {user: null,
                  userData: null,
                  data: 3,
                  actions: {
                    login: this.login.bind(this),
                    logout: this.logout.bind(this)
                  },
                  groups: null};

    // Pass through the callback function to Firebase
    MyFire.setCallBackFunction(this.updateState.bind(this))
  }


  componentDidMount() {
    // Check the login status of the user
    this.check_login();

    // Install all event handlers for firebase
    MyFire.updateGroups();
  }

  // Function That Updates the State on Input
  updateState(newState){
    this.setState(newState);
  }

  // set the login options
  async login(){
    let [user, token] = await MyFire.loginWindow();
    this.check_login();

    // Add a user with name, email, and token
    MyFire.addUser(user.displayName, user.email, user.uid);
  }

  async check_login(){
    let user = await MyFire.currentUser();
    this.setState({
      user: user.uid,
      userData: user
    })
  }

  // set the logout options
  logout(){
    this.setState({
      user: null,
      userData: null
    });
    MyFire.logout();
  }

  render() {
    return (
      <div className="App">
      {this.state.user ? (<Home data={this.state} />) :
        (<Login data={this.state}/>)}
      </div>
    );
  }
}

export default App;
