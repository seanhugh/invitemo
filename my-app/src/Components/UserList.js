import React, { Component } from 'react';
import UserSettings from './UserSettings';

// Import Ant Design Components
import {
  Drawer, List, Avatar, Divider, Col, Row, Button, Icon
} from 'antd';

class UserList extends Component {

  constructor(props) {

    super(props);

    this.createUserList=this.createUserList.bind(this)

  }

  // Create the list of groups that the current user is a member of
   createUserList(){


      let linked_users = this.props.linked_users
      let users = this.props.users
      let group = this.props.group
      let isadmin = this.props.isadmin;

      // This is what allows for a cool link on the right side
      // <List.Item key={key} actions={[<a >View Profile</a>]}>

      let elements = Object.keys(users).map(function(key){
        return(
        <List.Item key={key}>

          <List.Item.Meta
            avatar={
              <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
            }
            title={<a>{users[key].name}</a>}
            description={users[key].email}
          />
          {(isadmin) ? <UserSettings uid = {key} type = {linked_users[key]} group={group}/>  : <div/>}
        </List.Item>
        )
      });

      return(
        elements
        )

      }

  render() {
    return (
      <div className = "allgroups">
      <List
          bordered>
        {this.createUserList()}
      </List>
      </div>
    );
  }
}

export default UserList;
