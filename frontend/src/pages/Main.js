import React, { Component } from 'react'
import { Button } from 'antd'

class MainPage extends Component{
    componentWillMount(){
        console.log(process.env);
    }
    render(){
        return(
            <div className="wrapper">
                <h1 className="main-logo">Know Your Movie</h1>
                <div className="main-text">
                    <p>Welcome to online interactive game</p>
                    <p>to choose the correct movie title</p>
                    <p>by image</p>
                </div>
                <div className="main-buttons">
                    <Button type="primary" onClick={() => this.props.history.push('/single-game')}>Single Game</Button>
                    <Button type="primary" onClick={() => this.props.history.push('/multiplayer-game')}>Multiplayer Game</Button>
                </div>
            </div>
        )
    }
}

export default MainPage