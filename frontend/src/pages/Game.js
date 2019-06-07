import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import GameArea from './components/GameArea/GameArea';

class GamePage extends Component{ 
    render(){
        const { isAuth } = this.props
        if (!isAuth) {
            return <Redirect to="/auth" />
        }
        return(
                <div className="wrapper">
                    <GameArea />
                </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      isAuth: state.userStatus.isAuth
    }
  }
 
export default connect(mapStateToProps)(GamePage)