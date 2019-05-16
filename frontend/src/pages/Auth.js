import React, { Component } from 'react'
import AuthForm from './components/AuthForm'
import { Form } from 'antd'

class AuthPage extends Component{
    
    render(){
        const MainAuthForm = Form.create()(AuthForm)
        return(
           <div className="wrapper">
               <h1>Auth page</h1>
               <MainAuthForm />
           </div>
    );
        
    }
}

export default AuthPage