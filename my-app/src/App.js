import React, { Component } from 'react';
import './Css/App.css';
import MyFire from './MyFire';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import JoinGroup from './Components/JoinGroup'
import Default from './Components/Default';

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

    this.SetUpGroup = this.SetUpGroup.bind(this);
    this.login = this.login.bind(this);


    MyFire.setCallBackFunctionApp(this.updateState.bind(this));
  }

  componentDidMount() {
    // Check the login status of the user
    console.log("CHECKING LOGIN")
    this.check_login();
  }

  // set the login options
  async login(){
    let [user, token] = await MyFire.loginWindow();
    let d = await this.check_login();
  }

  async check_login(){
    let user = await MyFire.currentUser();
    if (user){
      let userData = await MyFire.getUserData(user.uid);
      console.log("USERDATA IS THIS")
      console.log(userData)
      this.setState({
        user: user.uid,
        userData: userData
      });
      // SET UP A LISTENER FOR CHANGES IN THE USER DATA (Relates to groups etc.)
      MyFire.createUserListener(user.uid);
    }
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

  SetUpGroup({match}) {
  return (
      <div>
        <JoinGroup group={match.params.id} login = {this.login} user={this.state.userData}/>
      </div>
    );
  }

  render() {
    let myUser = this.state.user;
    let myState = this.state;
    return (
    <Router>
      <div>

        <Route exact path="/" render={props => (<Default  props={props} user = {myUser} data={myState}/>)} />
        <Route path="/join/:id" component={this.SetUpGroup} />
      </div>
    </Router>
    );
  }
}

export default App;
