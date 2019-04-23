import React, { Component } from 'react';
import MyFire from '../MyFire'

import { List, Avatar, Icon, Button } from 'antd';

class RSPVButton extends Component {
  constructor(props) {
    super(props);

    this.rsvpMe = this.rsvpMe.bind(this)
    this.unrsvpMe = this.unrsvpMe.bind(this)

    this.state=({
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

  render(){
    return(
      <div className="RSVPDIV">  
        {(this.props.eventData[this.props.keyName] > 0) ?

        ((this.props.eventData[this.props.keyName] == 3) ?
        <div className = "myCoolButton disabled">Event Creator</div> :
        <div className="myCoolButton cancel" onClick={this.unrsvpMe}>Cancel</div>) :

        <div className = "myCoolButton" onClick={this.rsvpMe}>RSVP</div>}
      </div>
      )
  }
}


export default RSPVButton;
