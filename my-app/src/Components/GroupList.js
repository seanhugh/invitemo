import React, { Component } from 'react';

// Import Ant Design Components
import { List, Avatar, Col } from 'antd';
import '../Css/grouplist.css'

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
            <List.Item key={key} onClick={selectG.bind(null, key)}>

            <List.Item.Meta
              avatar={
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }
              title={<a>{groups[key].name}</a>}
              description={key}
            />
          </List.Item>
            )
        });

      return(elements)

      }
  }

  render() {
    return (
      <div className = "allgroups">
        <List>
        {this.createGroupList()}
        </List>
      </div>
    );
  }
}

export default GroupList;
