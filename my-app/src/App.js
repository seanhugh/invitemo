import React, { Component } from 'react';
import './Css/App.css';
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
                  actions: {
                    login: this.login.bind(this),
                    logout: this.logout.bind(this)
                  }};
  }


  componentDidMount() {
    // Check the login status of the user
    this.check_login();
  }

  // set the login options
  async login(){
    let [user, token] = await MyFire.loginWindow();
    this.check_login();
  }

  async check_login(){
    let user = await MyFire.currentUser();
    let userData = await MyFire.getUserData(user.uid);
    this.setState({
      user: user.uid,
      userData: userData
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
