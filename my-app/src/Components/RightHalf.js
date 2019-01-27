import React, { Component } from 'react';
import MyFire from '../MyFire';
import InfoButton from './InfoButton';
import EventDisplay from './EventDisplay';
import ShareButton from './ShareButton';
import CreateEvent from './CreateEvent';

// Import Ant Design Components
import { Col, Layout, Button } from 'antd';

const { Header, Content, Sider } = Layout;

// Output the app

class RightHalf extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isadmin: false,
      group: {metadata: {description: "", name: "", priv: ""},
              users: {}},
      events: null,
      users: {}
    }

    MyFire.setCallBackFunctionRightHalf(this.updateState.bind(this));

  }

 // On active group change, download the appropriate data for said group
  async componentDidUpdate(prevProps) {
     if (prevProps.active_group !== this.props.active_group) {

      // Download the data for that group (saves it in the group section of state)
      let data = await MyFire.downloadRightHalf(this.props.active_group);
      this.setState(data)

      // Loop through all users in that group and download their metadata
      let userEventData = await MyFire.groupUserData(this.state.group);
      this.setState(userEventData)

      // Loop through all events in that group and download their metadata
      let groupEventData = await MyFire.groupEventData(this.state.group);
      this.setState(groupEventData)

      // Update whether or not the current user is an admin
      if (data.group.users[this.props.uid] == 2 || data.group.users[this.props.uid] == 3){
        this.setState({
          isadmin: true
        });
      } else {
        this.setState({
          isadmin: false
        });
      }

      // Create a listener for the group so that it updates as values change
      MyFire.createGroupListener(this.props.active_group);

      // TO BE DONE: Download the data for all events associated with the group

     }
   }


  updateState(newState){
    this.setState(newState)
  }


  render() {
    console.log(this.state)
    return (
      <Col span={20} className = "right_col full_height">


          <Header className="header">


          <InfoButton data = {this.state} group={this.props.active_group} isadmin={this.state.isadmin} />

            {(this.state.isadmin) ? <ShareButton type = {1} group={this.props.active_group}/> : <div/>}
              { this.state.group.metadata.name ?
              <h3>{this.state.group.metadata.name}</h3> : <div />
              }

          </Header>
          <div className = "eventContainer">
            <div className= "eventRestriction">
              <EventDisplay events={this.state.events}/>
            </div>
          </div>

        <div className = "eventArea">
          {this.state.isadmin ? (<div className = "eventCreateBar">
            <CreateEvent uid = {this.props.uid} guid ={this.props.active_group}/></div>) : <div />}
        </div>

      </Col>
    );
  }
}

export default RightHalf;
