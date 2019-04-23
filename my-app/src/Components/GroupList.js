import React, { Component } from 'react';

// Import Ant Design Components
import { List, Avatar, Col } from 'antd';
import '../Css/grouplist.css'
import CreateNewGroupBig from './CreateNewGroupBig';


class GroupList extends Component {

  constructor(props) {

    super(props);

    this.createGroupList=this.createGroupList.bind(this)

  }

  // Create the list of groups that the current user is a member of
   createGroupList(){
      if(this.props.groups){
        let groups = this.props.groups;
        let selectG = this.props.selectGroup;
        let elements = Object.keys(groups).map(function(key){
          return(
            <List.Item className = "groupList" key={key} onClick={selectG.bind(null, key)}>

            <List.Item.Meta
              title={<a>{groups[key].name}</a>}
            />
          </List.Item>
            )
        });

      return(elements)

      }
  }

  render() {
    return (
      <div className = "allgroups left">
        <List>
        {this.createGroupList()}
        </List>
        <CreateNewGroupBig uid={this.props.uid} />
      </div>
    );
  }
}

export default GroupList;
