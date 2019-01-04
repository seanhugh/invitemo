import React, { Component } from 'react';
import "../Css/UserSettings.css";
import MyFire from '../MyFire';

// Import Ant Design Components
import {
  Dropdown, Drawer, List, Avatar, Divider, Col, Row, Button, Icon, Menu
} from 'antd';



class UserList extends Component {

  constructor(props) {

    super(props);

    this.changeStatus = this.changeStatus.bind(this);
    this.changeStat1 = this.changeStat1.bind(this);
    this.changeStat2 = this.changeStat2.bind(this);
  }

  changeStat1(){
    this.changeStatus(1);
  }

  changeStat2(){
    this.changeStatus(2);
  }

  changeStatus(type){
    if(type != this.props.type){
      MyFire.updateUserStatus(this.props.group, this.props.uid, type);
    }
  }

  createMenu(){
    return(
      <Menu>
        <Menu.Item>
          <a className = "adminEdit" onClick={this.changeStat2}>{(this.props.type == 2) ? <Icon type="check" /> : <div className = "space"/>}Can Create & Edit</a>
        </Menu.Item>
        <Menu.Item>
          <a className = "adminEdit" onClick={this.changeStat1}>{(this.props.type == 1) ? <Icon type="check" /> : <div className = "space"/>}Can View & RSVP</a>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <div>
      {(this.props.type == 3) ? (<h4 style={{marginBottom:0}}>Group Creator</h4>) :
      (<Dropdown overlay={this.createMenu()} trigger={['click']} placement="bottomLeft" >
        <Button style={{"paddingLeft": 10, "paddingRight": 10}}>
          {(this.props.type == 1) ? (<Icon type="eye" />) : (<Icon type="edit" />)}
          <Icon style={{"marginLeft":3}} type="down" /></Button>
      </Dropdown>)}
      </div>
    );
  }
}

export default UserList;
