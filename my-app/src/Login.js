import React, { Component } from 'react';
// Output the app

class Login extends Component {

  constructor(props) {
    super(props);
    // Set initial Values for State Data (onLoad)
    this.state = {}
  }

  setLogin(fn){
    this.login = fn;
  }

  render() {
    return (
      <div><p>Im Login</p>
      <div className="wrapper">
        {this.props.user ?
          <button onClick={this.props.data.actions.logout}>Log Out</button>
          :
          <button onClick={this.props.data.actions.login}>Log In With Google</button>
        }
      </div></div>
    );
  }
}

export default Login;
