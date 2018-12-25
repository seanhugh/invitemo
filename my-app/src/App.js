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
                  }};

    // Pass through the callback function to Firebase
    MyFire.setCallBackFunction(this.updateState.bind(this))
  }

  componentWillMount(){
    // On Page Load Update User Data
    // MyFire.updateUsers()
  }

  // Function That Updates the State on Input
  updateState(newState){
    this.setState(newState);
  }

  // set the login options
  async login(){
   let [user, token] = await MyFire.loginWindow();
   this.setState({
    user: token,
    userData: user
   })

  // Add a user with name, email, and token
  MyFire.addUser(user.displayName, user.email, user.uid);

  }

  // set the logout options
  logout(){
    this.setState({
      user: null,
      userData: null
    });
  }

  render() {
    return (
      <div className="App">
      <h1>{this.state.data}</h1>
      {this.state.user ? (<Home data={this.state}/>) :
        (<Login data={this.state}/>)}
      </div>
    );
  }
}

export default App;
