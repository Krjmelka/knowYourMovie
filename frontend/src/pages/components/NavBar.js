import React, { Component } from 'react'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom' 

class NavBar extends Component{
    render(){
        return(
            <header className="header-nav">
                <Menu mode="horizontal" theme="dark" >
                <Menu.Item key="main">
                    <NavLink to="/">Main</NavLink>
                </Menu.Item>
                <Menu.Item key="auth">
                    <NavLink to="/auth">Auth</NavLink>
                </Menu.Item>
                <Menu.Item key="game">
                    <NavLink to="/game">Start Game</NavLink>
                </Menu.Item>
                </Menu>
            </header>
        )
    }
}

export default NavBar