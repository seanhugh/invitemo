import React, { Component } from 'react';
import MyFire from '../MyFire';
import InfoButton from './InfoButton';
import MyAvatar from './MyAvatar';
import EventDisplay from './EventDisplay';
import ShareEventArea from './ShareEventArea';
import ShareButton from './ShareButton';
import CreateEvent from './CreateEvent';
import WhiteLogo from '../Img/whitelogo.svg';
import SideMenu from './SideMenu';


// Import Ant Design Components
import { Col, Layout, Button, Menu, Icon } from 'antd';

const { SubMenu } = Menu;

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

  async componentDidMount(){
    if (this.props.mode == "anon"){
      // Download the group data if the user is anonymous from a join call

      console.log("I WILL DOWNLOAD HERE")

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
      <div className = "layout_dash right_col">

        <div className = "header_back" />  
          <Header className="header">

            <Icon type="menu" className = "menuItem hamburger" style={{ fontSize: '20px' }} />
            <img src={WhiteLogo} alt="Logo" className="home_logo"/>

            {(this.state.isadmin && this.props.mode != "anon") ? 
            <div className="titleBlock">
              { this.state.group.metadata.name ?
              <h3 className="pageTitle">{this.state.group.metadata.name}</h3> : <div />
              }
              <InfoButton data = {this.state} group={this.props.active_group} isadmin={this.state.isadmin} />
            </div>
            : <div/>}

            <div className = "righButtons">
            {(this.props.mode != "anon") ?
            <MyAvatar name = {this.props.name} logOut = {this.props.logout} /> : <div /> }
            </div>
          </Header>

          <SideMenu />

          <div className = "eventContainer">


            { this.state.group.metadata.name ?
              <h1 className="bigTitle">{this.state.group.metadata.name} Events</h1> : <h1 className="bigTitle">Current Events</h1>
              }

            {(this.state.isadmin) ? <CreateEvent uid = {this.props.uid} guid ={this.props.active_group}/> : <div/>}
            



            <div className= "eventRestriction">
              <EventDisplay events={this.state.events} uid = {this.props.uid} login={this.props.login} mode={this.props.mode} active_group={this.props.active_group}/>
              {(this.state.isadmin) ? 
              <ShareEventArea group={this.props.active_group}/> : <div />}
            </div>
          </div>

      </div>
    );
  }
}

export default RightHalf;

        
          // {this.state.isadmin ? 

          //   (<div className = "eventArea"><div className = "eventCreateBar">
          //   <ShareButton type = {1} group={this.props.active_group}/></div></div>) : <div />}
