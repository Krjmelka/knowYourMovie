import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import MainPage from './pages/Main';
import AuthPage from './pages/Auth';
import NavBar from './pages/components/NavBar/NavBar';
import RegPage from './pages/Register';
import GamePage from './pages/Game';
import MultiplayerGame from './pages/MultiplayerGame';

const store = configureStore()
store.subscribe(() => {
  store.getState();
});
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar />
        <Switch>
          <Redirect from="/" to="/main" exact/>
          <Route path="/main" component={MainPage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/signup" component={RegPage} />
          <Route path="/single-game" component={GamePage} />
          <Route path="/multiplayer-game" component={MultiplayerGame} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
