import React, { Component } from 'react'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom' 

class NavBar extends Component{
    render(){
        return(
            <header className="header-nav">
                <Menu mode="horizontal" theme="dark" selectable = {false} >
                <Menu.Item key="main">
                    <NavLink to="/">Main</NavLink>
                </Menu.Item>
                <Menu.Item key="game">
                    <NavLink to="/game">Start Game</NavLink>
                </Menu.Item>
                <Menu.Item key="auth">
                    <NavLink to="/auth">Log In</NavLink>
                </Menu.Item>
                <Menu.Item key="signup">
                    <NavLink to="/signup">Sign Up</NavLink>
                </Menu.Item>
                
                </Menu>
            </header>
        )
    }
}

export default NavBar