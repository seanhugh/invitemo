import React, { Component } from 'react';
import MyFire from '../MyFire';
import InfoButton from './InfoButton';

// Import Ant Design Components
import { Col, Layout, Button } from 'antd';

const { Header, Content, Sider } = Layout;

// Output the app

class RightHalf extends Component {

  constructor(props) {
    super(props);

    this.state = {
      group: {admins: [],
              metadata: {description: "", name: "", priv: ""},
              users: {}},
      events: null
    }

  }


  async componentDidUpdate(prevProps) {
     if (prevProps.active_group !== this.props.active_group) {
      // DO THE STUFF IN HERE ON ACTIVE GROUP CHANGE
      let data = await MyFire.downloadRightHalf(this.props.active_group);
      this.setState(data)
      let userEventData = await MyFire.groupUserData(this.state.group);
      this.setState(userEventData)
     }
   }


  render() {
    console.log(this.state)
    return (
      <Col span={20} className = "right_col full_height">
          <Header className="header">
            <h3>{this.state.group.metadata.name}</h3>
          </Header>
        <InfoButton data = {this.state} />

      </Col>
    );
  }
}

export default RightHalf;
