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

    this.state=({
      active_group: null,
      group_data: {}
    })

  }

  async componentDidMount(){

    // Set the initial active group
    let keys = Object.keys(this.props.data.userData.groups)

    if(this.props.active_group){
      this.setState({
        active_group: this.props.active_group.active_group
      });
    } else if (keys.length > 0){
      this.setState({
        active_group: keys[0]
      });
    }

    //update group stuff on initial load:
    let groupData = await MyFire.updateGroups(this.props.data.userData.groups);
    // Add the downloaded metaData to the state
    this.setState(groupData);

  }

  async componentDidUpdate(prevProps){

    if (prevProps.data.userData.groups !== this.props.data.userData.groups) {
    // Update the state group data on New prop change
    // Get group data for the given grouplist
    let groupData = await MyFire.updateGroups(this.props.data.userData.groups);
    // Add the downloaded metaData to the state
    this.setState(groupData);

    }
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


          {(!this.isEmpty(this.state.group_data)) ? (<GroupList groups = {this.state.group_data} selectGroup = {this.selectGroup}/>) :
          (<p>YOURE NOT IN ANY GROUPS!</p>)}


        </Col>

        <RightHalf active_group = {this.state.active_group} uid = {this.props.data.user}/>
      </Row>

      </div>
    );
  }
}

export default Home;
