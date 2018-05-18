import React, { Component } from 'react';
import './../assets/css/App.css';
import Word from './Word';
import Memory from './Memory';
import Attention from './Attention';
import Menu from './Menu';
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
      return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Menu}/>
          <Route path='/words-game' component={Word}/>
          <Route path='/memory-game' component={Memory}/>
          <Route path='/attention-game' component={Attention}/>
        </Switch>
      </div>
    );
  }
}

export default App;
