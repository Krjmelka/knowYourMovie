import React, { Component } from 'react'
import { Button } from 'antd'
import { GraphQLClient } from 'graphql-request'
import io from 'socket.io-client'
import './GameArea.css'

const gql = new GraphQLClient("http://localhost:8000/graphql", {headers: {}})
const socketURL = "http://localhost:8000"
class GameArea extends Component{
    state = {
        movies: [],
        answer: null,
        imageUrl: "",
        answered: false
    }
    componentWillMount(){
        this.getMovieData()
        this.initSocket()
        
    }
    initSocket = () => {
        const socket = io(socketURL)
        socket.on("connect", () => {
            console.log("connected");
        })
    }
    checkTheAnswer = (e) => {
        this.setState({
            answered: true
        })
        console.log(this.state);
        let answer = this.state.movies.find((item) => item.answer === true)
        if(answer.title === e.target.name){
            
            e.target.style.background = "#179317"
            e.target.style.borderColor = "green"
        }
        else{
            e.target.style.background = "#ef2f2f"
            e.target.style.borderColor = "red"
            let correctButton = document.getElementsByClassName(answer.mdb_id.toString())
            correctButton[0].style.background = "#179317"
            correctButton[0].style.borderColor = "green"
        }

    }
    getMovieData = async () =>{
        try{
            // this.setState({
            //     movies: []
            // })
            let res = await gql.request(`query GetMovies{
                getMovieTask{
                  movies {
                    mdb_id
                    title
                    answer
                  }
                  imageURL
                }
              }`,{})

            this.setState({
                movies: res.getMovieTask.movies,
                answer: res.getMovieTask.movies.find((item) => item.answer === true),
                imageUrl: res.getMovieTask.imageURL,
                answered: false
            })

            }
            catch(err){
                console.log(err);
            }
    }
    
    render(){
        return(
            <article className="wrapper">
                <h1>Choose the correct movie title</h1>
                
                <div className="game-img" style={{background : `url("${this.state.imageUrl}") 100% 100% no-repeat`}} /> 
                <div className="button-answers">
                    {this.state.movies.map((item)=> 
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
                <Button style={{display: this.state.answered ? "block" : "none" }} onClick={this.getMovieData} className="next-button" >Next</Button>
            </article>
        )
    }
}

export default GameArea