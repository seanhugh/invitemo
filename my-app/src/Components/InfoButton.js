import React, { Component } from 'react';
import MyFire from '../MyFire';
import UserList from './UserList';
import ShareButton from './ShareButton';

import {
  Drawer, List, Avatar, Divider, Col, Row, Button
} from 'antd';

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

class InfoButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }

    this.showDrawer = this.showDrawer.bind(this)
    this.onClose = this.onClose.bind(this)

  }

  showDrawer(){
    this.setState({
      visible: true,
    });
  };

  onClose(){
    this.setState({
      visible: false,
    });
  };


  render() {
    return (
      <div>
        <Button shape="circle" icon="info" className="settingsIcon3" onClick={this.showDrawer}/>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <h2 style={{ ...pStyle, marginBottom: 24 }}>Group Info</h2>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Name" content={this.props.data.group.metadata.name} />{' '}
            </Col>
            <Col span={12}>
              <DescriptionItem title="Status" content={this.props.data.group.metadata.priv} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Description"
                content={this.props.data.group.metadata.description}
              />
            </Col>
          </Row>
          <Divider />

          <Row>
            <Col span={12}>
              <p style={pStyle}>Members</p>
            </Col>
            <Col span={12}>
            {(this.props.isadmin) ? <ShareButton type = {2} group={this.props.group}/> : <div/>}
            </Col>
          </Row>

          <Row>
            <UserList users = {this.props.data.users} linked_users = {this.props.data.group.users} group = {this.props.group} isadmin={this.props.isadmin}/>
          </Row>
          <Divider />
        </Drawer>
      </div>
    );
  }
}

export default InfoButton;
