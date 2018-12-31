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
                  userData: {
                    email: null,
                    groups: {},
                    name: null
                  },
                  actions: {
                    login: this.login.bind(this),
                    logout: this.logout.bind(this)
                  }};


    MyFire.setCallBackFunctionApp(this.updateState.bind(this));
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
    if (userData.groups == null){
      userData.groups = {}
    }
    this.setState({
      user: user.uid,
      userData: userData
    });

    // SET UP A LISTENER FOR CHANGES IN THE USER DATA (Relates to groups etc.)
    MyFire.createUserListener(user.uid);
  }

  // set the logout options
  logout(){
    this.setState({
      user: null,
      userData: null
    });
    MyFire.logout();
  }

  updateState(newState){
    this.setState(newState);
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
