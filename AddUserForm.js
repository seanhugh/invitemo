import React, { Component } from 'react';
import MyFire from '../MyFire';

// Import Ant Design Components
import { Button, Form, Modal, Input, Radio } from 'antd';

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
            title="Add New Users to Your Group"
            okText="Add Users"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="What Type of User are You Adding?" className="collection-create-form_last-form-item">
                {getFieldDecorator('admin', {
                  initialValue: 'public',
                })(
                  <Radio.Group>
                    <Radio value="public">Admin</Radio>
                    <Radio value="private">Basic User</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="Please Enter the Users' Emails, Seperated by Commas:">
                {getFieldDecorator('emails')(<TextArea type="textarea" autosize={{ minRows: 2}}
                  placeholder="Example: johndoe@gmail.com, phil@gmail.com, elizabeth@gmail.com........"/>)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  );


// Output the app

class AddUserForm extends Component {

  constructor(props) {
    super(props);

    this.showModal=this.showModal.bind(this);
    this.addUser2Group=this.addUser2Group.bind(this);
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
      this.addUser2Group(values.emails, values.admin);
      form.resetFields();
      this.setState({
        visible:false
      });
    });
  }

  saveFormRef(formRef){
    this.formRef = formRef;
  }

  // Takes in some clunky text and returns a list of all of the emails
  extractEmails(text){
      return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  }

  // Add user / users to the group from their emails!
  addUser2Group(emails, admin){
    // Decide on what functionality we are looking for here. Should just send an
    // email to everyone on the list and tell them "Hey, you've been invited."
    // Maybe it would be better to just provide a link that you can share with
    // your friends?
    let prettyEmails = this.extractEmails(emails);
    console.log(prettyEmails)
  }

  render() {
    return (
      <div>
        <Button style={{float:'right'}} type="primary" onClick = {this.showModal}>Add User</Button>
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

export default AddUserForm;
