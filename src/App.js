import React, { Component } from 'react';
import './tailwind.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Main from './components/Main.jsx';
import Signup from './components/Signup.jsx';
import Home from './components/Home.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path='/' component={ Main } />
            <Route path='/signup' component={ Signup } />
            <Route path='/home' component={ Home } />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
