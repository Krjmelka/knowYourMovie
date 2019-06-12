import React, { Component } from 'react'
import AuthForm from './components/AuthForm'
import { Form } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class AuthPage extends Component{
    
    render(){
        const { isAuth } = this.props
        if (isAuth) {
            return <Redirect to="/main" />
        }
        const MainAuthForm = Form.create()(AuthForm)
        return(
           <div className="wrapper">
               <h1>Sign In</h1>
               <MainAuthForm />
           </div>
    );
        
    }
}
const mapStateToProps = (state) => {
    return {
      isAuth: state.userStatus.isAuth
    }
  }
 
export default connect(mapStateToProps)(AuthPage)