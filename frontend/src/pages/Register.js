import React, { Component } from 'react'
import { Form } from 'antd'
import RegForm from './components/RegForm/RegForm';

class RegPage extends Component{
    render(){
        const MainRegForm = Form.create()(RegForm)
        return(
            <div className="wrapper">
                <h1>The Registration Page</h1>
                <MainRegForm />
            </div>
        )
    }
}

export default RegPage