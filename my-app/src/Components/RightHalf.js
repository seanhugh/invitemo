import React, { Component } from 'react';
import MyFire from '../MyFire';
import InfoButton from './InfoButton';
import ShareButton from './ShareButton';

// Import Ant Design Components
import { Col, Layout, Button } from 'antd';

const { Header, Content, Sider } = Layout;

// Output the app

class RightHalf extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isadmin: false,
      group: {admins: [],
              metadata: {description: "", name: "", priv: ""},
              users: {}},
      events: null,
      users: {}
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

      // Update whether or not the current user is an admin
      if (this.props.uid in data.group.admins){
        this.setState({
          isadmin: true
        });
      } else {
        this.setState({
          isadmin: false
        });
      }

      // TO BE DONE: Download the data for all events associated with the group

     }
   }


  render() {
    return (
      <Col span={20} className = "right_col full_height">
          <Header className="header">


          <InfoButton data = {this.state} group={this.props.active_group}/>
          <ShareButton type = {1} group={this.props.active_group}/>
            { this.state.group.metadata.name ?
            <h3>{this.state.group.metadata.name}</h3> : <div />
            }

          </Header>
        {this.state.isadmin ? <h1>You are an admin</h1> : <h1>You aren't admin </h1>}

      </Col>
    );
  }
}

export default RightHalf;
