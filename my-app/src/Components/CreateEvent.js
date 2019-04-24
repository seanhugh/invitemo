import React, { Component } from 'react';
import MyFire from '../MyFire';
import RSVPable from './RSVPable';

// Import Ant Design Components
import { Button, Modal, Input, Radio, TimePicker, message } from 'antd';
import moment from 'moment';

// React Dates
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const format = 'HH:mm a';

class CreateEvent extends Component {

  constructor(props) {
    super(props);

    this.showModal=this.showModal.bind(this);
    this.createEvent=this.createEvent.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.handleCreate=this.handleCreate.bind(this);
    this.saveFormRef=this.saveFormRef.bind(this);
    this.timeChange=this.timeChange.bind(this);
    this.nameChange=this.nameChange.bind(this);
    this.RSVPchanged=this.RSVPchanged.bind(this);
    this.LimitedRSVP=this.LimitedRSVP.bind(this);
    this.locChange=this.locChange.bind(this);

    this.state = {
      visible: false,
      name: null,
      date: null,
      hours: 0,
      minutes: 0,
      limited: false,
      rsvpNum: 5,
    };

  }

  showModal(){
    this.setState({
      visible:true
    });
  }

  handleCancel(){
    this.setState({
      visible:false,
      name: null,
      date: null,
      hours: 0,
      minutes: 0,
      location: null,
      rsvpNum: 5,
      limited: false
    });
  }

 handleCreate(){
      // this.createEvent(values.title, values.description, values.modifier);
      // Check to see if the required values are filled out

      if(this.state.name && this.state.date && (this.state.hours || (this.state.hours == 0)) && (this.state.minutes || (this.state.minutes == 0)) ){
        this.createEvent()
        this.setState({
          visible:false
        });
      } else{
        message.warning('Please fill out all required values (marked with *)')
      }
  }

  saveFormRef(formRef){
    this.formRef = formRef;
  }

  timeChange(value){
    this.setState({hours: value._d.getHours(),
                  minutes: value._d.getMinutes()});
  }

  nameChange(e){
    this.setState({name:e.target.value });
  }

  locChange(e){
    this.setState({location:e.target.value});
  }

  RSVPchanged(value){
    this.setState({rsvpNum:value});
  }

  LimitedRSVP(value){
    this.setState({limited:value});
  }

  // Add a group to the database with the current user as an administrator
  createEvent(){
    MyFire.createEvent(this.state, this.props.uid, this.props.guid)
  }


  render() {
    return (
      <div>

        <Button className="eventButton" icon="plus" type = "primary" onClick={this.showModal}>Add New Event</Button>

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          destroyOnClose
        >
        <p>*Event Name:</p>
        <div>
            <Input placeholder="Enter your event name here...." onChange={this.nameChange}/>
          </div>
        <br/>
        <p>*Date and Time:</p>
        <div>
            <SingleDatePicker
              date={this.state.date} // momentPropTypes.momentObj or null
              onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
              id="your_unique_id" // PropTypes.string.isRequired,
              numberOfMonths= {1}
            />
            <TimePicker use12Hours defaultValue={moment('24:00', format)} format={format} onChange={this.timeChange}/>
          </div>
          <br/>
          <RSVPable RSVPchanged = {this.RSVPchanged} LimitedRSVP = {this.LimitedRSVP}/>
          <br />
          <p>Location:</p>
          <div>
            <Input placeholder="Enter your event location here...." onChange={this.locChange}/>
          </div>

          </Modal>
        </div>

    );
  }
}

export default CreateEvent;
