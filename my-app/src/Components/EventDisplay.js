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

        // Create the time
        let mins = events[key].time.minutes.toString()
        let minutes = (((mins.length) == 1) ? ("0" + mins) : mins)
        let hr = events[key].time.hours
        let hours = (hr > 12) ? (hr-12) : hr
        let pmam = (hr > 12) ? "pm" : "am"
        let time = events[key].time.hours + ":" + minutes + pmam

        return(
          <List.Item
              className = "Event"
              key = {key}
              actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
              extra={<Button>RSVP</Button>}
            >
              <List.Item.Meta
                avatar={<Avatar src={"sadsad.png"} />}
                title={<a>{events[key].name}</a>}/>
              <p>time: <em className = "time">{time}</em></p>
              {(events[key].location) ? (<p>location: <em>{events[key].location}</em></p>) : <div />}
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
