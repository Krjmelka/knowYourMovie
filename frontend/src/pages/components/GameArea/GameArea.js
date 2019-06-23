import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import './GameArea.css'
import { connect } from 'react-redux'
import { getMovieData, updateScore } from '../../../store/actions/game'
import io from 'socket.io-client'
let socket = null
class GameArea extends Component{
    constructor(props){
        super(props)
        socket = io.connect('https://knowyourmovie.herokuapp.com')
    }
    state = {
        answered: false
    }
    componentWillMount = () => {
        this.props.getMovieData(socket)
    }
    componentWillUnmount() {
        socket.disconnect()
    }
    checkTheAnswer = (e) => {
        this.setState({
            answered: true
        })
        
        let answer = this.props.gameData.movies.find((item) => item.answer === true)
        let btnAnswer = e.target.style
        if(answer.title === e.target.name){        
            btnAnswer.background = "#179317"
            btnAnswer.borderColor = "green"
            this.props.updateScore(this.props.userId, socket)
        }
        else{
            btnAnswer.background = "#ef2f2f"
            btnAnswer.borderColor = "red"
            let correctButton = document.getElementsByClassName(answer.mdb_id.toString())
            correctButton[0].style.background = "#179317"
            correctButton[0].style.borderColor = "green"
        }
    }
    nextQuestion = (e) => {
        this.setState({
            answered: false
        })
        this.props.getMovieData(socket)
    }
    
    render(){
        const { isLoading, isLoaded, gameData } = this.props
        if (isLoading) return <div><Icon type="loading" style={{fontSize: "50px", color: "#00305e"}} /></div>
        if (!isLoaded || !gameData) return null
        
        return(
            <article className="game-area">
                <h1>Choose the correct movie title</h1>
                <div className="game-img" style={{background : `url("${gameData.imageURL}") no-repeat`}} /> 
                <div className="button-answers">
                    {gameData.movies.map((item)=> 
                        <Button 
                            type="primary" 
                            disabled={this.state.answered} 
                            key={item.mdb_id}
                            className={item.mdb_id.toString()}
                            name={item.title} 
                            onClick={this.checkTheAnswer}> 
                            {item.title}
                        </Button>
                    )}
                </div>
                <Button style={{display: this.state.answered ? "block" : "none" }} onClick={this.nextQuestion} className="next-button" >Next</Button>
            </article>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      gameData: state.gameData.data,
      isLoading: state.gameData.isLoading,
      isLoaded: state.gameData.isLoaded,
      userId: state.userStatus.userData.userId,
      username: state.userStatus.userData.username
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      getMovieData: (socket) => dispatch(getMovieData(socket)),
      updateScore: (userId, socket) => dispatch(updateScore(userId, socket))
      

    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(GameArea)