import React, { Component } from 'react';
import MyFire from '../MyFire.js'
import { Redirect } from 'react-router-dom'

import { Row, Col, Layout, Button } from 'antd';

class JoinContent extends Component {

  constructor(props) {
    super(props);

    this.state = {user: null,
                  redirect: false,
                  name: null}

    this.joinTheGroup = this.joinTheGroup.bind(this);

    this.setName = this.setName.bind(this);


  }

  // Show some info for said group
  async componentDidMount(){

    MyFire.getGroupName(this.props.group, this.setName)

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

    await this.props.login()

    let user = await MyFire.currentUser();

    if(user){
      console.log("WE HAVE USER:")
      console.log(user)
      this.setState({
        redirect: true
      });
    }
  }


  redirectMe(){
    if(this.state.redirect == true){
      MyFire.addUserToGroup(this.state.user, this.props.group)
      return(
      <Redirect to={{
            pathname: '/',
            state: { active_group: this.props.group }
        }}
      />);
    }
  }

  setName(name){
    this.setState({
      name: name
    })
  }

  render() {
    return(
      <div>
        {this.redirectMe()}
        <div className = "flex-container">
        <Row className = "JoinContent">
          <div className = "flex-item">
            <h2>Sign up for <em style={{"fontSize":"30px", "fontStyle": "normal"}}>{this.state.name}</em> events now!!</h2>
            <Button type = "primary" onClick = {this.joinTheGroup}>See Events!</Button>
          </div>
        </Row>
        </div>
      </div>
      )
  }
}

export default JoinContent;


