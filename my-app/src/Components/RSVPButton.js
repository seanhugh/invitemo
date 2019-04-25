import React, { Component } from 'react';
import MyFire from '../MyFire'
import { Redirect } from 'react-router-dom'

import { List, Avatar, Icon, Button } from 'antd';

class RSPVButton extends Component {
  constructor(props) {
    super(props);

    this.rsvpMe = this.rsvpMe.bind(this)
    this.unrsvpMe = this.unrsvpMe.bind(this)
    this.loginAndRsvp = this.loginAndRsvp.bind(this)

    this.state=({
      user:null,
      redirect:false
    })

  }

  rsvpMe(){
    // add current user ID to the people list for the event
    MyFire.rsvpUser(this.props.uid, this.props.keyName)
  }

  unrsvpMe(){
    // add current user ID to the people list for the event
    MyFire.unrsvpUser(this.props.uid, this.props.keyName)
  }

  async loginAndRsvp(){

    if(!this.state.user){
      await this.props.login()

      let user = await MyFire.currentUser();

      this.setState({
        user: user.uid
      })

    }


    if(this.state.user){
      console.log("WE HAVE USER, adding to group and event:")
      MyFire.addUserToGroup(this.state.user, this.props.active_group)
      MyFire.rsvpUser(this.state.user, this.props.keyName)

      this.setState({
        redirect: true
      })

    }
  }

  renderRedirect(){
    if (this.state.redirect) {
      return <Redirect to={{
            pathname: '/',
            state: { active_group: this.props.active_group }
        }}
      />
    }
  }

  render(){
    console.log("RSVP STUFF")
    console.log(this.props)
    console.log(this.state)
    return(
      <div>

      {this.renderRedirect()}

    {(this.props.mode != "anon") ?
      (<div className="RSVPDIV">  
        {(this.props.eventData[this.props.keyName] > 0) ?

        ((this.props.eventData[this.props.keyName] == 3) ?
        <div className = "myCoolButton disabled">Event Creator</div> :
        <div className="myCoolButton cancel" onClick={this.unrsvpMe}>Cancel</div>) :

        <div className = "myCoolButton" onClick={this.rsvpMe}>RSVP</div>}
      </div>) :
      <div className="RSVPDIV">
        <div className = "myCoolButton" onClick={this.loginAndRsvp}>RSVP</div>
      </div>
     }
     </div>


      )
  }
}


export default RSPVButton;
