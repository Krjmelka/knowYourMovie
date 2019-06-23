import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import './CoopGameArea.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' 
import { 
    getPlayersList, 
    invitePlayer, 
    gotInvite, 
    readyForGame, 
    exitGame, 
    gameData, 
    nextMovie, 
    updateScore, 
    gotaWinner,
    globalScoreUpdate,
    removeOpponent,
    canceledGame } from '../../../store/actions/multiplayerGame'
import io from 'socket.io-client'
let socket = null

class CoopGameArea extends Component{
    constructor(props){
        super(props)
        socket = io.connect('https://knowyourmovie.herokuapp.com')
        socket.emit('multiConnect', {username: this.props.username, userId: this.props.userId})

        socket.on('gamers', (data) => this.props.getPlayersList(data))

        socket.on('gotInvite', (data) => this.props.gotInvite(data))

        socket.on('getGameTask', (data) => this.props.movieData(data))

        socket.on('gotaWinner', (data) => this.props.gotaWinner(data))

        socket.on('updateUserScore', (data) => this.props.globalScoreUpdate(data))

        socket.on('opponentCanceled', () => this.props.canceledGame())
    }
    state = {
        answered: false
    }
    componentWillUnmount() {
        socket.disconnect()
        this.props.exitGame()
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
            btnAnswer.color = "white"            
            this.props.updateScore(this.props.playerScore + 10)
        }
        else{
            btnAnswer.background = "#ef2f2f"
            btnAnswer.borderColor = "red"
            btnAnswer.color = "white"
            let correctButton = document.getElementsByClassName(answer.mdb_id.toString())[0]
            correctButton.style.background = "#179317"
            correctButton.style.borderColor = "green"
            correctButton.style.color = "white"
            this.props.updateScore(this.props.playerScore - 5)
        }
    }
    nextQuestion = (e) => {
        this.setState({
            answered: false
        })
        this.props.nextMovie(socket, this.props.playerScore)
    }
    gamerWinner = () => (
        <>
            <h1>Congratulations!</h1> <p>You are a winner! You got a 200 points.</p>
        </>
    )
    opponentWinner = (props) => (
        <>
            <h1>{props.opponent} is a winner</h1> <p>Better luck next time =(</p>
        </>
    )
    drawResult = () => (
        <>
            <h1>Its draw</h1><p>Both got a 100 points.</p>
        </>
    )

    render(){
        const { gamers, opponent, playerReady, gameData, dataIsLoading, waitingForOpponent, username, playerScore, winner } = this.props
        
        if(!gamers) return <div><Icon type="loading" style={{fontSize: "50px", color: "#00305e"}} /></div>
        
        if(playerReady && opponent && !gameData) return <div><Icon type="loading" style={{fontSize: "50px", color: "#00305e"}} /></div>
        
        if(winner) return (
            <article className="game-area">
                {winner.draw ? <this.drawResult /> : 
                    winner.username === username ? <this.gamerWinner /> : 
                        <this.opponentWinner opponent = {opponent.username}/>
                }
                <Button type="primary" onClick={() => this.props.history.push('/main')}>Main menu</Button>
            </article>
        )
        
        if(playerReady && opponent && gameData) return (
                <article className="game-area">
                    <div className="game-info">
                        <div><p>Your score:</p><p style={{fontSize: "20px"}}>{playerScore}</p></div>
                        <div><p>Game</p> <p style={{fontSize: "20px"}}>{gameData.gameNumber} of 10</p></div>
                        <div><p>{opponent.username}</p><p style={{fontSize: "20px"}}>{opponent.score}</p></div>
                    </div>
                    {dataIsLoading ? <Icon type="loading" style={{fontSize: "50px", color: "#00305e"}} /> : 
                        <>
                            <div className="game-img" style={{background : `url("${gameData.imageURL}") 50% 50% no-repeat`}} /> 
                            <div className="button-answers">
                                {gameData.movies.map((item)=> 
                                    <Button 
                                        type="primary" 
                                        disabled={this.state.answered || waitingForOpponent} 
                                        key={item.mdb_id}
                                        className={item.mdb_id.toString()}
                                        name={item.title} 
                                        onClick={this.checkTheAnswer}> 
                                        {item.title}
                                    </Button>
                                )}
                            </div>
                        </>
                    }
                    <Button 
                        type="primary" 
                        style={{cursor: "pointer", display: this.state.answered || waitingForOpponent ? "block" : "none" }}
                        disabled={waitingForOpponent} 
                        onClick={this.nextQuestion} 
                        className="next-button" >
                            {waitingForOpponent ? "Waiting for opponent answer..." : "Next"}
                    </Button>
                </article>
            )
        
        return(
            <article className="gamers-list">
                <h2>Choose your opponent</h2>
                {opponent? 
                    <div style={{margin: "5px"}} >
                        <Button 
                            type="primary" 
                            onClick={() => this.props.readyForGame(socket)}>
                                Accept {opponent.username}
                        </Button>
                        <Button 
                            type="primary" 
                            style={{float: "right"}} 
                            onClick={() => this.props.removeOpponent(socket)}>
                                Dismiss
                        </Button>
                    </div> : null
                }
                {waitingForOpponent? 
                    <div>
                        <span>Waiting for opponent...</span>
                        <Button 
                            type="primary" 
                            size={"small"} 
                            style={{float: "right"}} 
                            onClick={() => this.props.removeOpponent(socket)}>
                                Cancel
                        </Button>
                    </div> : null
                }
                {gamers.length === 1? <p style={{fontSize: "16px"}}>There are no players online </p> : 
                    gamers.map(item => 
                        <div key={item.userId} style={{display: item.nick === username? "none" : "block" }}>{item.nick} 
                            <Button 
                                type="primary" 
                                disabled={item.ready || waitingForOpponent || opponent || item.waiting} 
                                style={{float: "right", visibility: item.nick === username ? "hidden": "visible", cursor: "pointer"}} 
                                size={"small"} 
                                onClick={() => this.props.invitePlayer(socket, item.id)}>
                                    Invite
                            </Button>
                        </div>
                    )
                }
            </article>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      gamers: state.multiplayerGameStatus.gamers,
      opponent: state.multiplayerGameStatus.opponent,
      userId: state.userStatus.userData.userId,
      username: state.userStatus.userData.username,
      playerReady: state.multiplayerGameStatus.playerReady,
      dataIsLoading: state.multiplayerGameStatus.dataIsLoading,
      gameData: state.multiplayerGameStatus.data,
      waitingForOpponent: state.multiplayerGameStatus.waitingForOpponent,
      playerScore: state.multiplayerGameStatus.gameScore,
      winner: state.multiplayerGameStatus.winner
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      getPlayersList: (data) => dispatch(getPlayersList(data)),
      invitePlayer: (socket, opponent) => dispatch(invitePlayer(socket, opponent)),
      gotInvite: (data) => dispatch(gotInvite(data)),
      readyForGame: (socket) => dispatch(readyForGame(socket)),
      exitGame: () => dispatch(exitGame()),
      movieData: (data) => dispatch(gameData(data)),
      nextMovie: (socket, data) => dispatch(nextMovie(socket, data)),
      updateScore: ( data) => dispatch(updateScore( data)),
      gotaWinner: (data) => dispatch(gotaWinner(data)),
      globalScoreUpdate: (data) => dispatch(globalScoreUpdate(data)),
      removeOpponent: (socket) => dispatch(removeOpponent(socket)),
      canceledGame: () => dispatch(canceledGame())
        
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CoopGameArea))
