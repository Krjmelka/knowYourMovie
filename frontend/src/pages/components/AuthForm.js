import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { userAuth } from '../../store/actions/auth';
import { withRouter } from 'react-router-dom' 


class AuthForm extends Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields( async (err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            await this.props.userAuth(values.username, values.password)
            if(this.props.isAuth){
              this.props.history.push('/main')
            }
          }
        });
      };
    render(){
        
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!'}],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>        
          <Button type="primary" htmlType="submit" className="login-form-button" block={true}>
            Log in
          </Button>
          Or <NavLink to="/signup">register now!</NavLink>
        </Form.Item>
      </Form>
    );
        
    }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.userIsAuth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    userAuth: (user, password) => dispatch(userAuth(user, password))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AuthForm))