import React, { Component } from 'react';
import './../assets/css/App.css';
import {  Link } from 'react-router-dom'
import {  Redirect} from 'react-router-dom';

class Menu extends Component {
  state = {
    namePlayer: '',
    redirect: false
}

componentDidMount(){
  if (localStorage.getItem('name')){
    this.setState({
      namePlayer: localStorage.getItem('name')
    })
  }else{
    this.setState({
      redirect: true
    })
  }
}

  logOut(){
    localStorage.removeItem('name');
    this.setState({
      redirect: true
    })
  }
  render() {
      return (
        <header>
        {this.state.redirect && <Redirect to="/" /> }
        <h3>Имя: {this.state.namePlayer}</h3>
        <button onClick={this.logOut.bind(this)}>Выйти</button>
           <nav className="menu">
             <ul>
               <li><Link className="menu__link" to='/words-game'>Игра в слова</Link></li>
               <li><Link className="menu__link" to='/memory-game'>Игра на память</Link></li>
               <li><Link className="menu__link" to='/attention-game'>Игра на воображение</Link></li>
             </ul>
           </nav>
         </header>
    );
  }
}

export default Menu;
