import React, { Component } from 'react';
import './../assets/css/App.css';
import {  Link } from 'react-router-dom'
import {  Redirect} from 'react-router-dom';

class Menu extends Component {
    state = {
        namePlayer: '',
        redirect: false
    }

    componentDidMount() {
        if (localStorage.getItem('name')) {
            this.setState({
                namePlayer: localStorage.getItem('name')
            })
        } else {
            this.setState({
                redirect: true
            })
        }
    }

    logOut() {
        localStorage.removeItem('name');
        this.setState({
            redirect: true
        })
    }
    render() {
        return (
            <div className="menu-container">
                {this.state.redirect && <Redirect to="/" /> }
                <nav className="menu nav flex-column">
                    <li><Link className="nav-link" to='/words-game'>Игра в слова</Link></li>
                    <li><Link className="nav-link" to='/memory-game'>Игра на память</Link></li>
                    <li><Link className="nav-link" to='/attention-game'>Игра на воображение</Link></li>        
                </nav>
                <button className="btn btn-danger btn-sm" onClick={this.logOut.bind(this)}>Выйти</button>
            </div>
        );
    }
}

export default Menu;
