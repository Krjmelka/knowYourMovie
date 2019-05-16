import React, { Component } from 'react'
import { Button } from 'antd'
import { GraphQLClient } from 'graphql-request'

const gql = new GraphQLClient("http://localhost:8000/graphql", {headers: {}})

class GamePage extends Component{
    state = {
        movies: [],
        imageUrl: "",
        answered: false
    }
    componentWillMount(){
        this.getMovieData()
        
    }
    checkTheAnswer = (e) => {
        this.setState({
            answered: true
        })
        let answer = this.state.movies.find((item) => item.answer === true)
        if(answer.title === e.target.name){
            
            e.target.style.background = "#179317"
            e.target.style.borderColor = "green"
        }
        else{
            e.target.style.background = "#ef2f2f"
            e.target.style.borderColor = "red"
        }

    }
    getMovieData = async () =>{
        try{
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
                <h1>The Game Page</h1>
                
                <div className="game-img" style={
                    {
                        background : `url("${this.state.imageUrl}") 50% 50% no-repeat`,
                        height: "300px",
                        width: "500px"
                    }
                } /> 
                <div className="button-answers">
                    {this.state.movies.map((item)=> <Button type="primary" disabled={this.state.answered} key={item.mdb_id} name={item.title} onClick={this.checkTheAnswer}>{item.title}</Button>)}
                </div>
                <Button style={{visibility: this.state.answered ? "visible" : "hidden" }} onClick={this.getMovieData}>Next</Button>
            </article>
        )
    }
}

export default GamePage