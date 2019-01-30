import React, { Component } from 'react';
import Home from '../Home';
import Login from '../Login';

class Default extends Component {

  constructor(props) {
    super(props);

  }



  render() {
  return (
      <div className="App">
            {(this.props.user) ? (<Home data={this.props.data} active_group = {this.props.props.location.state}/>) :
              (<Login data={this.props.data}/>)}
      </div>
    );
  }
}


export default Default;

