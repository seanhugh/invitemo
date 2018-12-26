import React, { Component } from 'react';
import MyFire from './MyFire';
import './Home.css';

// Import Ant Design Components
import { Input, Layout, Row, Col, Button, Icon } from 'antd';

const { Header, Content, Sider } = Layout;
const Search = Input.Search;

// Output the app

class Home extends Component {

  constructor(props) {
    super(props);
    // Set initial Values for State Data (onLoad)
    this.state = {}

    this.createGroup=this.createGroup.bind(this)
    this.createGroupList=this.createGroupList.bind(this)
    this.logProps=this.logProps.bind(this)

    // this.createGroupList=this.createGroupList.bind(this)
  }

  // Add a group to the database with the current user as an administrator
  createGroup(){
    MyFire.createNewGroup("GroupNAME", this.props.data.userData.uid);
    MyFire.updateGroups();
  }

// Create the list of groups that the current user is a member of
   createGroupList(){
      if(this.props.data.groups){
        let groups = this.props.data.groups;
        let elements = Object.keys(groups).map(function(key){
          return(
            <div className = "groupEl">
            <Col span={6}>
              <div className = "highlight_bar" />
            </Col>
            <Col span={16}>
              <h3>{groups[key].metadata.name}</h3>
              <p>5 others RSVPd to the event <span>Lunch at Grafton Street</span></p>
            </Col>
            </div>
            )
        });

      return(elements)

      }
  }

  logProps(){
    console.log(this.props)
  }

  render() {
    return (
      <div>

      <Row className = "full_height">
        <Col span={4} className = "left_col full_height">
          <Header className="header">
            <Icon type="setting" className="settingsIcon" />
            <Icon type="plus-circle" className="settingsIcon2" />
            <div className="logo" />
          </Header>

          <div className = "mySearch">
            <Search placeholder="Search for new groups to join!" />
          </div>

          <div className = "allgroups">
            {this.createGroupList()}
          </div>

        </Col>
        <Col span={20} className = "right_col full_height">
          <Header className="header">

          </Header>

          <p>Hello {this.props.data.userData.displayName}</p>
          <Button type = "primary" onClick={this.props.data.actions.logout}>Log Out</Button>
          <p>I'm Home</p>
          <Button type = "primary" onClick={this.createGroup}>Make a group bro</Button>
          <Button type = "primary" onClick={this.logProps}>Lo Props</Button>
          <h1>LIST OF ALL GROUPS</h1>
        </Col>
      </Row>
      </div>
    );
  }
}

export default Home;
