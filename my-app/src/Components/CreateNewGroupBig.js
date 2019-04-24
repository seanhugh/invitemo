import React, { Component } from 'react';
import MyFire from '../MyFire';

// Import Ant Design Components
import { Button, Form, Modal, Input, Radio } from 'antd';


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

class CreateGroupForm extends Component {

  constructor(props) {
    super(props);

    this.showModal=this.showModal.bind(this);
    this.createGroup=this.createGroup.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.handleCreate=this.handleCreate.bind(this);
    this.saveFormRef=this.saveFormRef.bind(this);

    this.state = {
      visible: false
    };

  }

  showModal(){
    this.setState({
      visible:true
    });
  }

  handleCancel(){
    this.setState({
      visible:false
    });
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
      this.setState({
        visible:false
      });
    });
  }

  saveFormRef(formRef){
    this.formRef = formRef;
  }


  // Add a group to the database with the current user as an administrator
  createGroup(name, description, privpub){
    MyFire.createNewGroup(name, description, privpub, this.props.uid);
  }

  render() {
    return (
      <div>

        <div className = "largeBoiContainer">
          <Button shape="circle" icon="plus" className="settingsIcon2 largeBoi" onClick={this.showModal}/>
          <p>Create a new group</p>
        </div>

        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />

      </div>

    );
  }
}

export default CreateGroupForm;
