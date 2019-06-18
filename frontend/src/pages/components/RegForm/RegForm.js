import React, { Component } from 'react'
import { Form, Icon, Input, Button, Tooltip, message } from 'antd';
import { withRouter } from 'react-router-dom' 
import { connect } from 'react-redux'
import "./RegForm.css"
import { userSignup } from '../../../store/actions/signup'

class RegForm extends Component{
    state = {
        confirmDirty: false
    };
    componentWillMount(){
        if(this.props.isAuth){
          this.props.history.push('/main')
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            await this.props.userSignup(values)
            if(this.props.isFailed){
                message.error(this.props.error, 1.5)
            }
            if(this.props.signUpSuccess){
                message.success('Registration Succsess')
                this.props.history.push('/main')
            }
          }
        });
    };
    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
    };
    
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const { checkingUser } = this.props
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
        return(
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="reg-form">
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            validator: this.validateToNextPassword,
                        },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        {
                            validator: this.compareToFirstPassword,
                        },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                        Nickname&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                        </span>
                    }
                    >
                    {getFieldDecorator('nickname', {
                        rules: [{ 
                            required: true, 
                            message: 'Please input your nickname!'
                        },{
                            min: 4,
                            message: 'Nickname must be 4 symbols minimum!'
                        },{
                            max: 10,
                            message: 'Nickname must be 10 symbols maximum!'
                        }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" disabled={checkingUser} htmlType="submit">
                        Register {checkingUser? <Icon type="loading" /> : null}
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      isAuth: state.userStatus.isAuth,
      isFailed: state.userStatus.isFailed,
      error: state.userStatus.error,
      checkingUser: state.userStatus.checkingUser,
      signUpSuccess: state.userStatus.signUpSuccess
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      userSignup: ({nickname, password, email}) => dispatch(userSignup(nickname, password, email))
    }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(RegForm))
