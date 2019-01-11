import React, { Component } from 'react';
import './tailwind.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Main from './components/Main.jsx';
import Home from './components/Home.jsx';
import Project from './components/Project.jsx';
import Team from './components/Team.jsx';
import Reports from './components/Reports.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path='/' component={ Main } />
            <Route path='/home' component={ Home } />
            <Route path='/project/:id' component={ Project } />
            <Route path='/team' component={ Team } />
            <Route path='/reports/:id' component={ Reports }/>
          </Switch>
        </HashRouter>
        <ToastContainer />
      </div>
    );
  }
}

export default (App);
