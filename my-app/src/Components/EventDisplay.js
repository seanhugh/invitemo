import React, { Component } from 'react';
import MyFire from '../MyFire'


import { List, Avatar, Icon, Button } from 'antd';
import RSVPButton from './RSVPButton';

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
      userEvent: {name: 1}
    })

    MyFire.setCBEventDisplay(this.updateState.bind(this));

  }

  updateState(newState){
    this.setState(newState);
  }

  componentDidMount(prevProps) {
    // Create a listener for which groups the current user is in so that
    // stuff automatically updates

    // Stores the list of events that the user is a member of in the state as
    // userEvent
    MyFire.createUserEventListener(this.props.uid);
  }


  generateList(){

    let events = this.props.events
    let userEvent = (this.state.userEvent ? this.state.userEvent : {name: 1})
    let uid = this.props.uid
    let elements = Object.keys(events).map(function(key){

        // Create the time
        let mins = events[key].time.minutes.toString()
        let minutes = (((mins.length) == 1) ? ("0" + mins) : mins)
        let hr = events[key].time.hours
        let hours = (hr > 12) ? (hr - 12) : hr
        let pmam = (hr > 12) ? "pm" : "am"
        let time = hours + ":" + minutes + pmam

        return(
          <div
              className = {((userEvent[key] == 1) ? "Event Green" : "Event")}
              key = {key}   >


            <div className = "leftSide">
              <h4>{events[key].name}</h4>
              <p className = "timeBlock" style = {{float:"left"}}><em className = "time">{time}</em></p>
              {(events[key].location) ? (<p>location: <em>{events[key].location}</em></p>) : <div />}
            </div>

            <div className = "rightSide">
              <div className="howManyHolder myCoolButton">
                <p className = "howMany">{Object.keys(events[key].people).length - 1} Going</p>
              </div>
              <RSVPButton uid = {uid} keyName = {key} eventData = {userEvent}  />
            </div>


          </div>
        )});

    return(elements);

  }

  render(){
    return(
      <div>
        {(this.props.events) ? this.generateList() : <div />}
      </div>
      )
  }

}















// OLD LIST STUFF



//   generateList(){

//     let events = this.props.events
//     let userEvent = (this.state.userEvent ? this.state.userEvent : {name: 1})
//     let uid = this.props.uid
//     let elements = Object.keys(events).map(function(key){

//         // Create the time
//         let mins = events[key].time.minutes.toString()
//         let minutes = (((mins.length) == 1) ? ("0" + mins) : mins)
//         let hr = events[key].time.hours
//         let hours = (hr > 12) ? (hr - 12) : hr
//         let pmam = (hr > 12) ? "pm" : "am"
//         let time = hours + ":" + minutes + pmam

//         return(
//           <List.Item
//               className = {((userEvent[key] == 1) ? "Event Green" : "Event")}
//               key = {key}
//               // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
//               extra={<RSVPButton uid = {uid} keyName = {key} eventData = {userEvent}  />}
//             >
//               <List.Item.Meta
//                 // avatar={<Avatar src={"sadsad.png"} />}
//                 title={<a>{events[key].name}</a>}/>
//               <p style = {{float:"left"}}>time: <em className = "time">{time}</em></p>
//               {(events[key].location) ? (<p>location: <em>{events[key].location}</em></p>) : <div />}
//               <p className = "howMany">{Object.keys(events[key].people).length - 1} / X spots filled</p>
//           </List.Item>
//         )});

//     return(elements);

//   }

//   render(){
//     return(
//       <List itemLayout="vertical" size="large">
//         {(this.props.events) ? this.generateList() : <div />}
//       </List>
//       )
//   }

// }

export default EventDisplay;
