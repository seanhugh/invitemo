import React, { Component } from 'react';

// Import Ant Design Components
import {
  Drawer, List, Avatar, Divider, Col, Row, Button, Icon
} from 'antd';

class UserList extends Component {

  constructor(props) {

    super(props);

  }

  render() {
    return (
      <div>
        <Button icon="setting" shape="circle" />
      </div>
    );
  }
}

export default UserList;
