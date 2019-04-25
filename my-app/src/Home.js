import React, { Component } from 'react';
import './Css/Home.css';
import MyFire from './MyFire';
import RightHalf from './Components/RightHalf';


// Import Create Group Functionality
import CreateGroupForm from './Components/CreateGroupForm';
import CreateNewGroupBig from './Components/CreateNewGroupBig';
import MyAvatar from './Components/MyAvatar';
import GroupList from './Components/GroupList';

// Import Ant Design Components
import { Input, Layout, Row, Col, Button } from 'antd';

// Import redlogo
import Whitelogo from './Img/whitelogo.svg'

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
    if(this.props.active_group){
    this.setState({
      active_group: this.props.active_group.active_group
    })}
    else if(this.props.data.userData.groups){
      let keys = Object.keys(this.props.data.userData.groups)

      if (keys.length > 0){
        this.setState({
          active_group: keys[0]
        });
      }
    }


    if (this.props.userData){
      //update group stuff on initial load:
      let groupData = await MyFire.updateGroups(this.props.data.userData.groups);
      // Add the downloaded metaData to the state
      this.setState(groupData);
    }

  }

  async componentDidUpdate(prevProps){

    if (this.props.data){
          if (prevProps.data.userData.groups !== this.props.data.userData.groups) {
              // Update the state group data on New prop change
              // Get group data for the given grouplist
              let groupData = await MyFire.updateGroups(this.props.data.userData.groups);
              // Add the downloaded metaData to the state
              this.setState(groupData);
          }
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

          // <div className = "mySearch">
          //   <Search placeholder="Search for new groups to join!" />
          // </div>
  render() {
    return (
      <div>
      <Row className = "full_height">


      {(this.props.mode != "anon") ?
        <Col span={4} className = "left_col full_height">

          <img src={Whitelogo} alt="Logo" className="whitelogo"/>

          <div className="groupListHeader">
            <p className="grouListHeaderText">My Groups</p>
          </div>

        <div>
          {(!this.isEmpty(this.state.group_data)) ? (<GroupList groups = {this.state.group_data} uid = {this.props.data.user} selectGroup = {this.selectGroup}/>) :
          (<CreateNewGroupBig uid={this.props.data.user} />)}
        </div>



        </Col>

        : <div />}

        {this.props.data ?
        (<RightHalf active_group = {this.state.active_group} uid = {this.props.data.user} name = {this.props.data.userData.name} logout = {this.props.data.actions.logout}/>) :
        (<RightHalf active_group = {this.props.active_group} mode={"anon"} login = {this.props.login}/>)
      }
      </Row>

      </div>
    );
  }
}

export default Home;


// Commented out things

//  old header:
// <Header className="header">
            // <MyAvatar name = {this.props.data.userData.name} logOut = {this.props.data.actions.logout}/>
            // <CreateGroupForm uid={this.props.data.user} />
            // <div className="logo" />
          // </Header>
