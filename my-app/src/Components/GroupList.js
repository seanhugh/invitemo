import React, { Component } from 'react';

// Import Ant Design Components
import { Col } from 'antd';

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
            <div className = "groupEl" key={key} onClick={selectG.bind(null, key)}>
            <Col span={6}>
              <div className = "highlight_bar" />
            </Col>
            <Col span={16}>
              <h3>{groups[key].name}</h3>
              <p>5 others RSVPd to the event <span>Lunch at Grafton Street</span></p>
            </Col>
            </div>
            )
        });

      return(elements)

      }
  }

  render() {
    return (
      <div className = "allgroups">
        {this.createGroupList()}
      </div>
    );
  }
}

export default GroupList;
