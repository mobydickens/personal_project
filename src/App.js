import React, { Component } from 'react';
import './tailwind.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Main from './components/Main.jsx';
import Signup from './components/Signup.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path='/' component={ Main } />
            <Route exact path='/signup' component={ Signup } />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
