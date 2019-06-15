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
    startAgain,
    globalScoreUpdate } from '../../../store/actions/multiplayerGame'
import io from 'socket.io-client'
let socket = null

class CoopGameArea extends Component{
    constructor(props){
        super(props)
        socket = io.connect('http://localhost:8000')
        socket.emit('multiConnect', {username: this.props.username, userId: this.props.userId})
        socket.on('gamers', (data) => {
            this.props.getPlayersList(data)
        })
        socket.on('gotInvite', (data) => {
            this.props.gotInvite(data)
        })
        socket.on('readyForGame', () => {
        })
        socket.on('getGameTask', (data) => {
            this.props.movieData(data)
        })
        socket.on('gotaWinner', (data) => {
            this.props.gotaWinner(data)
        })
        socket.on('updateUserScore', (data) => {
            this.props.globalScoreUpdate(data)
        })
    }
    state = {
        answered: false
    }
    acceptTheInvite = () => {
        socket.emit('readyForGame')
        this.props.readyForGame()

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
            this.props.updateScore(this.props.playerScore + 10)
        }
        else{
            btnAnswer.background = "#ef2f2f"
            btnAnswer.borderColor = "red"
            let correctButton = document.getElementsByClassName(answer.mdb_id.toString())
            correctButton[0].style.background = "#179317"
            correctButton[0].style.borderColor = "green"
            this.props.updateScore(this.props.playerScore - 5)
        }
    }
    nextQuestion = (e) => {
        this.setState({
            answered: false
        })
        this.props.nextMovie(socket, this.props.playerScore)
    }
    GamerWinner = () => (
        <>
            <h1>Congratulations!</h1> <div>You are a winner! You got a 200 points.</div>
        </>
    )
    OpponentWinner = (props) => (
        <>
            <h1>{props.opponent} is a winner</h1> <div>Better luck next time =(</div>
        </>
    )

    render(){
        const { gamers, opponent, playerReady, gameData, waitingForOpponent, username, playerScore, winner } = this.props
        
        if(!gamers) return <div><Icon type="loading" style={{fontSize: "50px", color: "#00305e"}} /></div>
        
        if(playerReady && opponent && !gameData) return <div><Icon type="loading" style={{fontSize: "50px", color: "#00305e"}} /></div>
        
        if(winner) return (
            <article className="game-area">
                {winner === username ? <this.GamerWinner /> : <this.OpponentWinner opponent = {opponent.username}/>}
                <Button type="primary" onClick={() => this.props.history.push('/main')}>Got it</Button>
            </article>
        )
        
        if(playerReady && opponent && gameData) return (
                <article className="game-area">
                    <div className="game-info">
                        <div>Game {gameData.gameNumber} of 10</div>
                        <div>Your Game Score: {playerScore}</div>
                        <div>{opponent.username} Game Score: {opponent.score}</div>
                    </div>
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
            <article className="game-area">
                <h2>Choose your opponent</h2>
                {opponent? <Button onClick={this.acceptTheInvite}>Accept {opponent.username}</Button> : null}
                {gamers.length === 1? <div>There are no players online =(</div> : 
                    gamers.map(item => 
                        <div key={item.userId} style={{display: item.nick === username? "none" : "block" }}>{item.nick} <Button disabled={item.ready} style={{visibility: item.nick === username ? "hidden": "visible"}} size={"small"} onClick={() => this.props.invitePlayer(socket, item.id)}>Invite</Button></div>
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
      startAgain: () => dispatch(startAgain()),
      globalScoreUpdate: (data) => dispatch(globalScoreUpdate(data))
        
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CoopGameArea))
