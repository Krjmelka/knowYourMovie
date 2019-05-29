import React, { Component, Suspense, lazy} from 'react'
import { connect } from 'react-redux'
// import GameArea from './components/GameArea/GameArea';

const GameArea = lazy(() => import('./components/GameArea/GameArea'))
class GamePage extends Component{ 
    componentWillMount(){
        console.log(this.props);
        if (!this.props.isAuth){
            this.props.history.push('/auth')
        }
    } 
     
    render(){
        return(
            
                <Suspense fallback={<h1>Loading...</h1>} >
                    <GameArea />
                </Suspense>
            
        )
    }
}
const mapStateToProps = (state) => {
    return {
      isAuth: state.userIsAuth
    }
  }
export default connect(mapStateToProps)(GamePage)