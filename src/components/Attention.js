import React, { Component } from 'react';
import Alphabet from './Alphabet';
import { connect} from 'react-redux';
import {  Link } from 'react-router-dom';
import {  Redirect} from 'react-router-dom';


//---------------Settings------------//
const msg_win = "Ты прав,парень!"
const msg_lose = "Попробуй еще раз("
const msg_timeleft = "У тебя кончилось время,попробуй еще!"
const deftime = 30;
//----------------------------------//

//--------------APP----------------//
var level=1;
var timeoftimer;
var arr= [];



function getRandom(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

//Поиск буквы соотвествующей цифре
function searchWord(number){
    for(let i of arr){
      if (i.number === number){
        return i.word;
      }
    }
}

//Декодирование цифр в слова
function decoding(numbers){
  let arr = [];
  for(let item of numbers){
      arr.push(searchWord(item));
  }
  return arr;
}

//Найти цифру соотвествующая букве
function searchIndex(char){
    for(let i of arr){
      if (i.word.toLowerCase() === char.toLowerCase()){
        return i.number;
      }
    }
}

//Кодирование слова в цифры
function encoding(word){
  let arr = [];
  for(let item of word){
      arr.push(searchIndex(item));
  }
  return arr;
}

//Получить случайное слово задания
function getWord(array){
  let rnd = getRandom(0,array.length);
  let word = array[rnd];
  return word;
}

//Записать все буквы в массив от А до Я
//Добавить им случайные номера для расшифровки
function initialWords(){
  let j = 1040;
  let i = 0;
  while(i <= 31){
    let rnd = getRandom(1,100);
    let rnd_in_arr = arr.some(function(element, index){return element.number===rnd});
    if(!rnd_in_arr){
      let char = String.fromCharCode(j);
      arr[i] = { word: char, number: rnd};
      j++;
      i++;
    }
  }
  return arr;
}

class Attention extends Component {
  constructor(props){
    super(props);
    this.state ={
      words: initialWords(),
      enc_numbers: encoding(getWord(this.props.attention_words)),
      enc_word: null,
      valueofinput: "",
      timeleft: null,
      timer: null,
      namePlayer: ''
    }

    this.handleChange=this.handleChange.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.reset=this.reset.bind(this);
 }

 componentDidMount(){
   this.setState({
     enc_word: decoding(this.state.enc_numbers),
     isMounted: true
   });
   level = 1;
   timeoftimer=Math.round(deftime/level)
   this.startTimer(timeoftimer)
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

 componentDidUpdate(){
    timeoftimer=Math.round(deftime/level)
 }


startTimer(timeleft){
   clearInterval(this.state.timer);
    let timer = setInterval(()=>{
     var timeleft = this.state.timeleft - 1;
     if (timeleft < 0){
       clearInterval(timer);
       alert(msg_timeleft);
       this.reset();
     }
     this.setState({
       timeleft: timeleft
     })

   },1000)
   return this.setState({timeleft: timeleft, timer: timer});
 }

//Вывести таблицу букв и цифр
 renderWords(items) {
   return items.map((item, index) => {
     return (
       <Alphabet
         key={index}
         id={index}
         word={item.word}
         number={item.number}
         />
     );
   });
 }

//Вывод расшифоравнного слова (тест)
 renderDecodings(items) {
   return items.map((item, index) => {
     return (
        <span key={index}>{item}</span>
     );
   });
 }
//Вывод зашифрованного массива цифр
 renderEncodings(items) {
   return items.map((item, index) => {
     return (
       <span key={index}>{item}</span>
     );
   });
 }

 reset(){
  this.setState({
    words: initialWords(),
    enc_numbers: encoding(getWord(this.props.attention_words)),
    enc_word: null,
    valueofinput: "",
    timeleft: 0
  });
  setTimeout(()=>{
    this.setState({
      enc_word: decoding(this.state.enc_numbers)
    });
    this.startTimer(timeoftimer)
  },100)

 }

handleChange(event) {
 let val = event.target.value;
 this.setState({valueofinput: val});
}

handleKeyPress = (event) => {
  var code = event.keyCode || event.which;
     if(code === 13) {
       console.log()
     }
  }

handleClick(){
  if (this.state.valueofinput.toLowerCase() === this.state.enc_word.join('').toLowerCase()){
    alert(msg_win);
    this.reset();
    if (level < 3){
      level +=1;
    }else{
      level = 3;
    }

  }else{
    alert(msg_lose)
  }
}



  render() {
    return (
        <div className="body-this">
          {this.state.redirect && <Redirect to="/" /> }
        <h3>Имя: {this.state.namePlayer}</h3>
          <h2>Текущий уровень: {level}</h2>
          <div className="timer">
          <p>Времени осталось:</p> <span>{this.state.timeleft >= 0 && this.state.timeleft}</span>
          </div>
          <div className="table-body">
            {this.renderWords(this.state.words)}
          </div>

          <div className="codes">
            {this.renderEncodings(this.state.enc_numbers)}
          </div>
          <div className="place_input">
          <input type="text"
          autoFocus={true}
          value={this.state.valueofinput}
          onChange={this.handleChange}
          onKeyPress={event => { if (event.key === 'Enter') { this.handleClick(); } } }
          />
          <button onClick={this.handleClick}
          >Проверить</button>
          </div>
          {/*<div className="words">
           {this.state.enc_word != null &&
             this.renderDecodings(this.state.enc_word)}
          </div>*/}

          <Link className="menu__link" to='/'>Меню</Link>
        </div>
    );
  }
}

export default connect(

  state => ({
    attention_words: state.attention_words
  }),
  dispatch => ({

  })
)(Attention)
