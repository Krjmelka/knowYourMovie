import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import MainPage from './pages/Main';
import AuthPage from './pages/Auth';
import NavBar from './pages/components/NavBar';
import RegPage from './pages/Register';
import GamePage from './pages/Game';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Redirect from="/" to="/main" exact/>
        <Route path="/main" component={MainPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/signup" component={RegPage} />
        <Route path="/game" component={GamePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
