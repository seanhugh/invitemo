import React, { Component } from 'react';
import MyFire from '../MyFire';

// Import Ant Design Components
import { Col, Layout } from 'antd';

const { Header, Content, Sider } = Layout;


// Output the app

class RightHalf extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }

  }
RIGHT NOW AM WORKING ON SETTING IT UP SO THAT ON THE PROP CANGE OF ACTIVE STATE IT GOES AND FETCHES ALL THE PROPER DATA
  render() {

    return (
      <Col span={20} className = "right_col full_height">
          <Header className="header">
            <h2>{this.props.active_group}</h2>
          </Header>
      </Col>
    );
  }
}

export default RightHalf;
