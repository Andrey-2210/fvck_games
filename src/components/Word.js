 import React, { Component } from 'react';
import { connect} from 'react-redux';
import {  Link } from 'react-router-dom'
import {  Redirect} from 'react-router-dom';

//--------------Settings-----------------//
const char_rplc = "_";
const msg_tryagain = "Попорбуй снова!";
const msg_newlevel = "Ты перешел на новый уровень!";
const msg_end = "Ты прошел игру!"
//-----------------------------------------//

//-----------APP----------//
var char_to_win;
var level;
var life;

function getRandom(min, max) {
     return Math.floor(Math.random() * (max - min) + min);
}

class Word extends Component {
     constructor(props) {
          super(props);
          this.state = {
               new_word: "",
               message: "",
               value: "",
               win: false,
               count: 0,
               namePlayer: ''
          };
          this.handleChange = this.handleChange.bind(this);
          this.Check = this.Check.bind(this);

     }

     componentDidMount() {
          this.GetWord(this.props.words.words_level_1);
          level = 1;
          life = 3;
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

     componentDidUpdate() {
          if (this.state.count === 4) {
               if (level === 3) {
                    alert(msg_end);
                    level = 3;
               } else {
                    level += 1;
               }

               life = 3;
               if (level === 2) {
                    this.GetWord(this.props.words.words_level_2);
               }
               if (level === 3) {
                    this.GetWord(this.props.words.words_level_3);
                    life = 1;
               }
               if (level === 1) {
                    this.GetWord(this.props.words.words_level_1);
               }
               this.setState({
                    count: 0
               });

               alert(msg_newlevel);

          }
     }


     reset() {
          this.setState({
               new_word: "",
               message: "",
               value: "",
               win: false,
               count: 0
          });

     }

     GetWord(array) {
          this.setState({
               value: ""
          });
          let rnd = Math.floor(Math.random() * array.length);
          let curr = array[rnd];
          let length = curr.length;
          let rnd_char = getRandom(0, length);
          char_to_win = curr.charAt(rnd_char);
          curr = curr.slice(0, rnd_char) + char_rplc + curr.slice(rnd_char + 1, length);
          this.setState({
               new_word: curr
          });
     }

     Check() {

          if (char_to_win.toLowerCase() === this.state.value.toLowerCase()) {
               this.setState({
                    count: this.state.count + 1
               });
          } else {
               life -= 1
          }

          if (level === 1) {
               this.GetWord(this.props.words.words_level_1);
          }
          if (level === 2) {
               this.GetWord(this.props.words.words_level_2);
          }
          if (level === 3) {
               this.GetWord(this.props.words.words_level_3);
          }

          if (life < 1) {
               alert(msg_tryagain);
               life = 3;
               if (level === 3) {
                    life = 1;
               }
          }

     }

     handleChange(event) {
          this.setState({
               value: event.target.value
          });
     }
     render() {
          return (
               <div className="body-this words-bg">
                    {this.state.redirect && <Redirect to="/" /> }
                    <div className="cloud">
                         <h4>Имя: {this.state.namePlayer}</h4>
                         <h5>Текущий уровень: {level}</h5>
                         <p>Жизни: {life}</p>
                    </div>
                    <div className="desk">
                         <p>{this.state.new_word}</p>
                         {this.state.new_word !== "" &&
                              <div className="words">
                                   <div className="form-group">
                                        <input type="text"
                                        autoFocus={true}
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        onKeyPress={event => { if (event.key === 'Enter') { this.handleClick(); } } }
                                        className="form-control"
                                        />
                                        <small className="form-text">Введите букву которой не хватает.</small>
                                   </div>
                                   <button className="btn btn-success" onClick={this.Check}>Готово</button>
                              </div>
                         }
                    </div>
                    <Link className="btn btn-danger btn-sm" to='/'>Выход</Link>
               </div>
          );
     }
}
export default connect(

     state => ({
          words: state.words
     }),
     dispatch => ({

     })
)(Word)
