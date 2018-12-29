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
      groups: {}
    }

    // Pass through the callback function to Firebase
    MyFire.setCallBackFunction(this.updateState.bind(this));

  }

  async componentDidMount(){
    // pass through userdata to firebase. Return all appropriate group data.
    let data = await MyFire.updateGroups(this.props.data.userData);
    this.setState(data);
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

  isEmpty(obj){
    return (Object.keys(obj).length === 0);
  }

  render() {
    return (
      <div>
      <Row className = "full_height">
        <Col span={4} className = "left_col full_height">
          <Header className="header">
            <MyAvatar name = {this.props.data.userData.name} logOut = {this.props.data.actions.logout}/>
            <CreateGroupForm uid={this.props.data.user} />
            <div className="logo" />
          </Header>
          <div className = "mySearch">
            <Search placeholder="Search for new groups to join!" />
          </div>


          {(!this.isEmpty(this.state.groups)) ? (<GroupList groups = {this.state.groups} selectGroup = {this.selectGroup}/>) :
          (<p>YOURE NOT IN ANY GROUPS!</p>)}


        </Col>

        <RightHalf active_group = {this.state.active_group} />
      </Row>

      </div>
    );
  }
}

export default Home;
