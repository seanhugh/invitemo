import React, { Component } from 'react';
import MyFire from '../MyFire';
import RSVPable from './RSVPable';

// Import Ant Design Components
import { Radio, InputNumber  } from 'antd';

const format = 'HH:mm a';

class CreateEvent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.changed = this.changed.bind(this);

  }

  changed(e){
    if(e.target.value == 2){
      this.setState({
        visible: true
      });
      this.props.LimitedRSVP(true);
    } else{
      this.setState({
        visible: false
      });
      this.props.LimitedRSVP(false);
    }
  }

  render() {
    return (
      <div>
        <p>Is the attendance at this event limited? (RSVP Options)</p>
        <Radio.Group defaultValue={1} onChange={this.changed}>
          <Radio value={1}>Open Event</Radio>
          <Radio value={2}>Limited Spots</Radio>
        </Radio.Group>
        {this.state.visible ?
          <div><br /><p>How many people can RSVP?</p><InputNumber min={1} defaultValue={5} onChange={this.props.RSVPchanged} /></div> :
          <div />}
      </div>

    );
  }
}

export default CreateEvent;
