import React, { Component } from 'react';
import MyFire from '../MyFire';
import InfoButton from './InfoButton';
import MyAvatar from './MyAvatar';
import EventDisplay from './EventDisplay';
import ShareEventArea from './ShareEventArea';
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

   // Run on callback from group data
  async updateState(newState){

    // Update state with new date
    this.setState(newState);

    // Loop through all events in that group and download their metadata
    let groupEventData = await MyFire.groupEventData(newState.group);
    this.setState(groupEventData)

    // Loop through all users in that group and download their metadata
    let userEventData = await MyFire.groupUserData(newState.group);
    this.setState(userEventData)
  }


  render() {
    return (
      <Col span={20} className = "right_col full_height">


          <Header className="header">
              

            {(this.state.isadmin) ? 
            <div className="titleBlock">
              { this.state.group.metadata.name ?
              <h3 className="pageTitle">{this.state.group.metadata.name}</h3> : <div />
              }
              <InfoButton data = {this.state} group={this.props.active_group} isadmin={this.state.isadmin} />
            </div>
            : <div/>}

            <MyAvatar name = {this.props.name} logOut = {this.props.logout} />

          </Header>
          <div className = "eventContainer">


            { this.state.group.metadata.name ?
              <h1 className="bigTitle">{this.state.group.metadata.name} Events</h1> : <h1 className="bigTitle">Current Events</h1>
              }

            {(this.state.isadmin) ? <CreateEvent uid = {this.props.uid} guid ={this.props.active_group}/> : <div/>}
            



            <div className= "eventRestriction">
              <EventDisplay events={this.state.events} uid = {this.props.uid}/>
              {(this.state.isadmin) ? 
              <ShareEventArea group={this.props.active_group}/> : <div />}
            </div>
          </div>
        

      </Col>
    );
  }
}

export default RightHalf;

        
          // {this.state.isadmin ? 

          //   (<div className = "eventArea"><div className = "eventCreateBar">
          //   <ShareButton type = {1} group={this.props.active_group}/></div></div>) : <div />}
