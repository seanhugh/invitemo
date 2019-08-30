import React, { Component } from 'react';

import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;


class SideMenu extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 320 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1', 'sub2']}
        mode="inline"

        className = "mySlider"
      >
                <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>Owned Groups</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="appstore" />
              <span>Member Groups</span>
            </span>
          }
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
        </SubMenu>
        
      </Menu>
    );
  }
}

export default SideMenu;
