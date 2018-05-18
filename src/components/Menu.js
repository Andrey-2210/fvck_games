import React, { Component } from 'react';
import './../assets/css/App.css';
import {  Link } from 'react-router-dom'

class Menu extends Component {
  render() {
      return (
        <header>
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
