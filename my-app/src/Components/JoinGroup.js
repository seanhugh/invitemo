import React, { Component } from 'react';
import MyFire from '../MyFire.js'
import JoinContent from './JoinContent.js'
import { Redirect } from 'react-router-dom'

import '../Css/Join.css';


class JoinGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }

  }

  // Check if the group is a real group, if so take it to a page that shows some
  // info for the group, if not just redirect to the homepage
  async componentDidMount(){

    // returns true if group exists, false if not
    let isReal = await MyFire.isRealGroup(this.props.group);

    // If group does not exist, redirect to homepage
    if (!isReal){
      this.setState({
        redirect: true
      });
    }
  }

  // Redirects user to the base URL
  renderRedirect(){
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    return(
      <div>
      {this.renderRedirect()}
        <JoinContent group = {this.props.group}/>
      </div>
      )
  }
}

export default JoinGroup;


