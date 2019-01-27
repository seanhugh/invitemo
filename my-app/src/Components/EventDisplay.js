import React, { Component } from 'react';

import { List, Avatar, Icon, Button } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


class EventDisplay extends Component {

  constructor(props) {
    super(props);

    this.state=({
    })

  }

  async componentDidUpdate(prevProps) {
     if (prevProps.events !== this.props.events) {
      // Do something when events change (recalc?)

     }
  }

  generateList(){

    let events = this.props.events
    let elements = Object.keys(events).map(function(key){
        return(
          <List.Item
              className = "Event"
              key = {key}
              actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
              extra={<Button>RSVP</Button>}
            >
              <List.Item.Meta
                avatar={<Avatar src={"sadsad.png"} />}
                title={<a href={"google.com"}>{events[key].name}</a>}
                description={events[key].name}
              />
          </List.Item>
        )});

    return(elements);

  }

  render(){
    return(
      <List itemLayout="vertical" size="large">
        {(this.props.events) ? this.generateList() : <div />}
      </List>
      )
  }

}

export default EventDisplay;
