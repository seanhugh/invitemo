import React, { Component } from 'react';
import MyFire from '../MyFire.js'
import { Redirect } from 'react-router-dom'

import { Row, Col, Layout, Button } from 'antd';

class JoinContent extends Component {

  constructor(props) {
    super(props);

    this.state = {user: null,
                  redirect: false}

    this.login = this.login.bind(this);

    this.joinTheGroup = this.joinTheGroup.bind(this);


  }

  // Show some info for said group
  async componentDidMount(){
    // Check if the current user is logged in
    let user = await MyFire.currentUser();
    // if user exists, add their UID to state
    if(user){
      this.setState({
        user:user.uid
      });
    }
  }

  async joinTheGroup(){

    // If user has not logged in, bring up the window
    if(!this.state.user){
      await this.login()
    }
    if(this.state.user){
      this.setState({
        redirect: true
      });
    }
  }

  async login(){
    let [user, token] = await MyFire.loginWindow();

    // Do we even need this line of code? To double check?
    let user_real = await MyFire.currentUser();
    this.setState({
      user: user_real.uid
    });
  }

  redirectMe(){
    if(this.state.redirect == true){
      console.log("THIS PART IS RUN")
      MyFire.addUserToGroup(this.state.user, this.props.group)
      return(
      <Redirect to={{
            pathname: '/',
            state: { active_group: this.props.group }
        }}
      />);
    }
  }

  render() {
    return(
      <div>
        {this.redirectMe()}
        <div className = "flex-container">
        <Row className = "JoinContent">
          <div className = "flex-item">
            <h2>Sign up for <em style={{"font-size":"30px", "font-style": "normal"}}>{this.props.group}</em> events now!!</h2>
            <Button type = "primary" onClick = {this.joinTheGroup}>See Events!</Button>
          </div>
        </Row>
        </div>
      </div>
      )
  }
}

export default JoinContent;


