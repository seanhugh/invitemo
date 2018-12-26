import React, { Component } from 'react';
import MyFire from './MyFire';
import './Home.css';

// Import Ant Design Components
import { Form, Popover, Modal, Avatar, Input, Layout, Row, Col, Button, Icon, Radio } from 'antd';

const { Header, Content, Sider } = Layout;
const Search = Input.Search;
const { TextArea } = Input;


// FORM STUFF
// FORM STUFF FOR CREATE GROUP

const CollectionCreateForm = Form.create()(
    // eslint-disable-next-line
    class extends React.Component {
      render() {
        const {
          visible, onCancel, onCreate, form,
        } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            destroyOnClose
            visible={visible}
            title="Create a New Group"
            okText="Create Group"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="Title">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Please input the title of collection!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="Description">
                {getFieldDecorator('description')(<Input type="textarea" />)}
              </Form.Item>
              <Form.Item className="collection-create-form_last-form-item">
                {getFieldDecorator('modifier', {
                  initialValue: 'public',
                })(
                  <Radio.Group>
                    <Radio value="public">Public</Radio>
                    <Radio value="private">Private</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  );


// Output the app

class Home extends Component {

  constructor(props) {
    super(props);
    // Set initial Values for State Data (onLoad)
    this.state = {}

    this.createGroup=this.createGroup.bind(this)
    this.createGroupList=this.createGroupList.bind(this)
    this.logProps=this.logProps.bind(this)
    this.showModal=this.showModal.bind(this)
    this.handleCancel=this.handleCancel.bind(this)
    this.handleCreate=this.handleCreate.bind(this)
    this.saveFormRef=this.saveFormRef.bind(this)

    // this.createGroupList=this.createGroupList.bind(this)

    this.state = {
    visible: false,
    loading: false
    };

  }


  // FORM STUFF -----------------------------------------------------------

  showModal(){
    this.setState({ visible: true });
  }

  handleCancel(){
    this.setState({ visible: false });
  }


 handleCreate(){

    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      this.createGroup(values.title, values.description, values.modifier);
      form.resetFields();
      this.setState({ visible: false });
    });

    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        loading: false,
      });
    }, 500);
  }



  saveFormRef(formRef){
    this.formRef = formRef;
  }
   // FORM STUFF OVER -------------------------------------------------------



  // Add a group to the database with the current user as an administrator
  createGroup(name, description, privpub){
    MyFire.createNewGroup(name, description, privpub, this.props.data.userData.uid);
  }

// Create the list of groups that the current user is a member of
   createGroupList(){
      if(this.props.data.groups){
        let groups = this.props.data.groups;
        let elements = Object.keys(groups).map(function(key){
          return(
            <div className = "groupEl">
            <Col span={6}>
              <div className = "highlight_bar" />
            </Col>
            <Col span={16}>
              <h3>{groups[key].metadata.name}</h3>
              <p>5 others RSVPd to the event <span>Lunch at Grafton Street</span></p>
            </Col>
            </div>
            )
        });

      return(elements)

      }
  }

  logProps(){
    console.log(this.props)
  }

  render() {
    const { visible, loading } = this.state;
    return (
      <div>

        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />


      <Row className = "full_height">
        <Col span={4} className = "left_col full_height">
          <Header className="header">
            <Avatar className="settingsIcon" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
            <Button type = "primary" shape="circle" icon="plus" className="settingsIcon2" onClick={this.showModal}/>
            <div className="logo" />
          </Header>
          <div className = "mySearch">
            <Search placeholder="Search for new groups to join!" />
          </div>

          <div className = "allgroups">
            {this.createGroupList()}
          </div>

        </Col>



        <Col span={20} className = "right_col full_height">
          <Header className="header">

          </Header>

          <p>Hello {this.props.data.userData.displayName}</p>
          <Button type = "primary" onClick={this.props.data.actions.logout}>Log Out</Button>
          <p>I'm Home</p>
          <Button type = "primary" onClick={this.logProps}>Lo Props</Button>
          <h1>LIST OF ALL GROUPS</h1>
        </Col>
      </Row>

      </div>
    );
  }
}

export default Home;
