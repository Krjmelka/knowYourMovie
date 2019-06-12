import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CoopGameArea from './components/CoopGameArea/CoopGameArea';

class MultiGamePage extends Component{ 
    render(){
        const { isAuth } = this.props
        if (!isAuth) {
            return <Redirect to="/auth" />
        }
        return(
                <div className="wrapper">
                    <CoopGameArea />
                </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      isAuth: state.userStatus.isAuth
    }
  }
 
export default connect(mapStateToProps)(MultiGamePage)