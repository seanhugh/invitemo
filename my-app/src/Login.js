import React, { Component } from 'react';

import './Css/homepage.css';

import Redlogo from './Img/redlogo.svg';
import side_image from './Img/side_image.png';


// Import Ant Design Components
import { Menu, Layout, Row, Col, Button } from 'antd';

const {
  Header, Footer, Sider, Content,
} = Layout;

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  setLogin(fn){
    this.login = fn;
  }

  render() {
    return (

      <div className="homepage">

        <Row type="flex" justify="center">
        
          <Layout className="layout">
            <Header className="header">
              <img src={Redlogo} alt="Logo" className="logo"/>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px', 'float': 'right' }}
              >
                <Menu.Item className = "contactUs" key="1">Contact Us</Menu.Item>
              </Menu>
            </Header>

            <Content className="content">

              <Row>

                <Col span={10}>

                <div className="leftArea">

                  <h1 className="headerh1">Create events. Invite People. Get RSVPs.</h1>
                    <div className="subtitleArea">
                      <p className="subtitle">The best tool for inviting people to a series of events and gathering RSVPs.</p>
                    </div>
                  <div className="myfancybutton" onClick={this.props.data.actions.login}>Create a group!</div>

                </div>

                </Col>

                <Col span={12}>

                <img src={side_image} alt="Logo" className="side_image"/>


                </Col>

              </Row>

            </Content>

            <Footer className="footer">
            </Footer>
          </Layout>

        </Row>

      </div>

    );
  }
}

export default Login;
