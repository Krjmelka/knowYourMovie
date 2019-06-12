import React, { Component } from 'react'
import { Form } from 'antd'
import RegForm from './components/RegForm/RegForm';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class RegPage extends Component{
    
    render(){
        const { isAuth } = this.props
        if (isAuth) {
            return <Redirect to="/main" />
        }
        const MainRegForm = Form.create()(RegForm)
        return(
            <div className="wrapper">
                <h1>The Registration Page</h1>
                <MainRegForm />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      isAuth: state.userStatus.isAuth
    }
  }
 
export default connect(mapStateToProps)(RegPage)