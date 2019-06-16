import React, { Component } from 'react'
import { Menu, Button, Layout } from 'antd'
import { NavLink } from 'react-router-dom' 
import { connect } from 'react-redux'
import './NavBar.css'
import { logOut, checkToken } from '../../../store/actions/auth'
// const { SubMenu } = Menu
class NavBar extends Component{
    state = {
        collapsed: false,
    }
    componentDidMount(){
        this.props.checkToken()
    }
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }
    render(){
        const { isAuth, userData } = this.props
        return(

                <Layout.Header style={ { width: '100%'}}>
                <Menu mode="horizontal" theme="dark" selectable = {false} style={{ lineHeight: '64px' }}>
                    <Menu.Item key="main" className="logo">
                        <NavLink to="/">Know Your Movie</NavLink>
                    </Menu.Item>
                    <Menu.Item key="single-game">
                        <NavLink to="/single-game">Single Game</NavLink>
                    </Menu.Item>
                    <Menu.Item key="multiplayer-game">
                        <NavLink to="/multiplayer-game">Multiplayer Game</NavLink>
                    </Menu.Item>
                {isAuth ? 
                    <Menu.Item key="user" className="user-auth" style={{float: "right"}}>
                        {userData.username} : <span className="user-score">{userData.score}</span>
                        <Button onClick={this.props.logOut} type="primary">
                              Log Out
                        </Button>
                    </Menu.Item>
                    :
                    <Menu.Item key="auth" style={{float: 'right'}}>
                        <NavLink to="/auth">Log In</NavLink>
                    </Menu.Item>
                }
                </Menu>
                </Layout.Header>

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