import React, { Component } from 'react';
import MyFire from '../MyFire';

// Import Ant Design Components
import { Menu, Dropdown, Icon, Avatar } from 'antd';

const SubMenu = Menu.SubMenu;

class MyAvatar extends Component {

  constructor(props) {
    super(props);

    this.getFirstWord = this.getFirstWord.bind(this);

    this.state = {
      name: "",
      letter: ""
    };

  }

  componentDidMount(){
    this.setState({
      name: this.getFirstWord(this.props.name),
      letter: this.getFirstLetter(this.props.name)
    });
  }

   getFirstWord(str) {
          let spacePosition = str.indexOf(' ');
          if (spacePosition === -1)
              return str;
          else
              return str.substr(0, spacePosition);
      };

   getFirstLetter(str) {
        return str.charAt(0)
    };

  render() {
    const menu = (
      <Menu>
        <Menu.Item disabled style={{cursor:"default"}}>Hi {this.state.name}!</Menu.Item>
        <Menu.Item onClick = {this.props.logOut}>Logout</Menu.Item>
      </Menu>
    );
    return (
      <div>
      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar className="settingsIcon" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{this.state.letter}</Avatar>
      </Dropdown>
      </div>
    );
  }
}

export default MyAvatar;
