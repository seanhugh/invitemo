import React, { Component } from 'react';
import './Css/Home.css';
import MyFire from './MyFire';
import RightHalf from './Components/RightHalf';


// Import Create Group Functionality
import CreateGroupForm from './Components/CreateGroupForm';
import MyAvatar from './Components/MyAvatar';
import GroupList from './Components/GroupList';

// Import Ant Design Components
import { Input, Layout, Row, Col, Button } from 'antd';

const { Header, Content, Sider } = Layout;
const Search = Input.Search;


// Output the app

class Home extends Component {

  constructor(props) {
    super(props);

    this.selectGroup = this.selectGroup.bind(this)

    this.state = {
      active_group: null,
      groups: null
    }

    // Pass through the callback function to Firebase
    MyFire.setCallBackFunction(this.updateState.bind(this))

    // Install all event handlers for firebase
    MyFire.updateGroups();

  }

  // Function That Updates the State on Input
  updateState(newState){
    this.setState(newState);
  }

  selectGroup(key){
    this.setState({
      active_group: key
    });
  }

  render() {
    return (
      <div>
      <Row className = "full_height">
        <Col span={4} className = "left_col full_height">
          <Header className="header">
            <MyAvatar name = {this.props.data.userData.displayName} logOut = {this.props.data.actions.logout}/>
            <CreateGroupForm uid={this.props.data.userData.uid} />
            <div className="logo" />
          </Header>
          <div className = "mySearch">
            <Search placeholder="Search for new groups to join!" />
          </div>

          <GroupList groups = {this.state.groups} selectGroup = {this.selectGroup}/>

        </Col>

        <RightHalf active_group = {this.state.active_group} />
      </Row>

      </div>
    );
  }
}

export default Home;
