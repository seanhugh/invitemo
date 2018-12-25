import React, { Component } from 'react';
// Output the app

class Home extends Component {

  constructor(props) {
    super(props);
    // Set initial Values for State Data (onLoad)
    this.state = {}
  }

  render() {
    return (
      <div>
      <p>Hello {this.props.data.userData.displayName}</p>
      <button onClick={this.props.data.actions.logout}>Log Out</button>
      <p>I'm Home</p>
      <h1>LIST OF ALL EVENT</h1>
      </div>
    );
  }
}

export default Home;
