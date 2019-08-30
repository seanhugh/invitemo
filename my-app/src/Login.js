import React, { Component } from 'react';

import './Css/homepage.css';

import WhiteLogo from './Img/whitelogo.svg';
import Mail from './Img/mail_graphic.svg';
import side_image from './Img/home_image.gif';


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
              

            <img src={WhiteLogo} alt="Logo" className="home_logo"/>

            <div className = "righButtons">
              <Button type="link" icon="user" className="headerButton" onClick={this.props.data.actions.login} ghost>
                Sign In
              </Button>
            </div>
          

          </Header>

            <Content className="content">

              <Row type="flex">

                <Col xs={24} sm={24} md={10} lg={10} xl={10}>

                <div className="leftArea">

                  <h1 className="headerh1">Create events. Invite People. Get RSVPs.</h1>
                    <div className="subtitleArea">
                      <p className="subtitle">The best tool for inviting people to a series of events and gathering RSVPs.</p>
                    </div>

                  <div className = "twentyspace" />
                  <Button type="primary" className = "calltoaction" onClick={this.props.data.actions.login}>Create a group!</Button>

                </div>

                </Col>

                <Col xs={0} sm={0} md={1} lg={1} xl={1}>
                </Col>

                <Col xs={24} sm={24} md={13} lg={13} xl={13}>

                <div className="rightArea">

                  <img src={side_image} alt="Logo" className="side_image"/>

                </div>


                </Col>

              </Row>

            </Content>

          </Layout>
          <div className = "header_back" />  

          </Row>

          <div className = "footer">
            <div className = "footer_content">

                <Row type="flex">
                  <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                  <img src={Mail} alt="Logo" className="mail_logo"/>
                  <h4 className="myemail">sean@invitemo.com</h4>
                  </Col>
                  <Col xs={0} sm={0} md={2} lg={2} xl={2}>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <h4 className="lastFooterSection">Interested in Helping?</h4>
                  <p>Enjoy designing or coding? Just want to learn more about the product? Send me an email. I'd love to talk.</p>
                  </Col>

                </Row>

            </div>
          </div>

        


      </div>

    );
  }
}

export default Login;
