import React, { Component } from 'react';

import { Input, message, Modal, Button } from 'antd';

import Clipboard from 'react-clipboard.js';

const Search = Input.Search;

class ShareButton extends Component {

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

  onSuccess(){
    message.success('Sharable Link Succesfully Copied');
  }

  render() {
    // Add group ID and a link to share the group
    let link = window.location.href + "join/" + this.props.group;
    return (
      <div>
        {(this.props.type == 1) ? <Button type="primary" icon="user-add" className="settingsIcon3" onClick={this.showDrawer}>Invite Users</Button> :
        <Button type="primary" className="settingsIcon3" icon="user-add" onClick={this.showDrawer} style ={{"margin":0}}>Invite Users</Button>}
        <Modal
          title="Share Group"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.onClose}
          footer={null}
        >
          <p>Invite Users to the Group with this Link:</p>
          <Clipboard className="clipboard" data-clipboard-text={link} onSuccess={this.onSuccess}>
                <Search
                  placeholder={link}
                  enterButton="Copy Link"
                  className = "copySearch"
                />
          </Clipboard>
        </Modal>
      </div>
    );
  }
}

export default ShareButton;
