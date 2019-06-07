import React, { Component } from 'react'
import { Menu, Button, Icon } from 'antd'
import { NavLink } from 'react-router-dom' 
import { connect } from 'react-redux'
import { logOut, checkToken } from '../../../store/actions/auth'
const { SubMenu } = Menu
class NavBar extends Component{
    componentDidMount(){
        this.props.checkToken()
    }
    render(){
        const { isAuth, userData } = this.props
        return(
            <header className="header-nav">
                <Menu mode="horizontal" theme="dark" selectable = {false} >
                <Menu.Item key="main">
                    <NavLink to="/">Main</NavLink>
                </Menu.Item>
                <Menu.Item key="game">
                    <NavLink to="/game">Start Game</NavLink>
                </Menu.Item>
                {isAuth ? 
                    // <>
                    // <div key="user">
                    //     {userData.username}
                    // </div>
                    // <Button onClick={this.props.logOut}>
                    //     Log Out
                    // </Button>
                    // </>
                    <SubMenu 
                        title={
                            <span className="submenu-title-wrapper">
                            <Icon type="user" />
                            {userData.username}
                            </span>
                        }>
                        <Menu.Item key="user">
                            <Icon type="setting" />Current Score : {userData.score}
                        </Menu.Item>
                        <Menu.Item key="logout">
                        <Button onClick={this.props.logOut}>
                         Log Out
                     </Button>
                        </Menu.Item>
                    </SubMenu>
                    :
                  
                    <Menu.Item key="auth">
                        <NavLink to="/auth">Log In</NavLink>
                    </Menu.Item>
                    // <Menu.Item key="signup">
                    //     <NavLink to="/signup">Sign Up</NavLink>
                    // </Menu.Item>
                    
                }
                
                
                </Menu>
            </header>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      isAuth: state.userStatus.isAuth,
      userData: state.userStatus.userData
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      logOut: () => dispatch(logOut()),
      checkToken: () => dispatch(checkToken())
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(NavBar)