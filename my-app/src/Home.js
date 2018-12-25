import React, { Component } from 'react';
import MyFire from './MyFire';

// Output the app

class Home extends Component {

  constructor(props) {
    super(props);
    // Set initial Values for State Data (onLoad)
    this.state = {}

    this.createGroup=this.createGroup.bind(this)

    // this.createGroupList=this.createGroupList.bind(this)
  }

  // Add a group to the database with the current user as an administrator
  createGroup(){
    MyFire.createNewGroup("GroupNAME", this.props.data.userData.uid)
  }

  // createGroupList(){
  //     let elements = this.state.categories.map(category => {
  //       return (
  //         <SidebarCategory
  //           key={category.title}
  //           title={category.title}
  //         />
  //       )
  //     })
  // }

  render() {
    return (
      <div>
      <p>Hello {this.props.data.userData.displayName}</p>
      <button onClick={this.props.data.actions.logout}>Log Out</button>
      <p>I'm Home</p>
      <button onClick={MyFire.currentUser}>current User</button>
      <button onClick={this.createGroup}>Make a group bro</button>
      <h1>LIST OF ALL GROUPS</h1>
      <ul className = "allgroups">

      </ul>
      </div>
    );
  }
}

export default Home;
