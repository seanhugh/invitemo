import React, { Component } from 'react';

import { Input, message, Modal, Button } from 'antd';

import Clipboard from 'react-clipboard.js';

const Search = Input.Search;

class ShareEventArea extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }

  }

  onSuccess(){
    message.success('Sharable Link Succesfully Copied');
  }

  render() {
    // Add group ID and a link to share the group
    let link = window.location.href + "join/" + this.props.group;
    return (
      <div className="shareEventArea">
          <h4>Let's get going!</h4>
          <h1>Invite your friends to RSVP:</h1>
          <Clipboard className="clipboard" data-clipboard-text={link} onSuccess={this.onSuccess}>
                <Search
                  placeholder={link}
                  enterButton="Copy Link"
                  className = "copySearch"
                />
          </Clipboard>
      </div>
    );
  }
}

export default ShareEventArea;
