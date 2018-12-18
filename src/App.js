import React, { Component } from 'react';
import './tailwind.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Main from './components/Main.jsx';
import Signup from './components/Signup.jsx';
import Home from './components/Home.jsx';
import Project from './components/Project.jsx';
import Team from './components/Team.jsx';
import ProjectEdit from './components/ProjectEdit.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path='/' component={ Main } />
            <Route path='/signup' component={ Signup } />
            <Route path='/home' component={ Home } />
            <Route path='/project' component={ Project } />
            <Route path='/team' component={ Team } />
            <Route path='/editproject' component={ ProjectEdit }/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
