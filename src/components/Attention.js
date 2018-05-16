import React, { Component } from 'react';
import Alphabet from './Alphabet';


const msg_win = "Ты прав,парень!"
const msg_lose = "Попробуй еще раз("

var arr= [];

const words_de=[
  "Автомат",
  "Пулемет",
  "Каша",
  "Машина",
  "Пуля"
]

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

export default class Attention extends Component {
  constructor(props){
    super(props);
    this.state ={
      words: initialWords(), 
      enc_numbers: encoding(getWord(words_de)),
      enc_word: null,
      valueofinput: ""
    };
    
    this.handleChange=this.handleChange.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.reset=this.reset.bind(this);
 }
 
 componentDidMount(){
   this.setState({
     enc_word: decoding(this.state.enc_numbers)
   });
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
    enc_numbers: encoding(getWord(words_de)),
    enc_word: null,
    valueofinput: ""
  });
  setTimeout(()=>{
    this.setState({
      enc_word: decoding(this.state.enc_numbers)
    });
  },100)
 }
 
handleChange(event) {
 let val = event.target.value;
 this.setState({valueofinput: val});
}

handleClick(){
  if (this.state.valueofinput.toLowerCase() === this.state.enc_word.join('').toLowerCase()){
    alert(msg_win);
    this.reset();
  }else{
    alert(msg_lose)
  }
}



  render() {
    return (
        <div className="body-this">
          <div className="table-body">
            {this.renderWords(this.state.words)}
          </div>

          <div className="codes">
            {this.renderEncodings(this.state.enc_numbers)}
          </div>
          <div className="place_input">
          <input type="text"
          value={this.state.valueofinput}
          onChange={this.handleChange}
          />
          <button onClick={this.handleClick}>Проверить</button>
          </div>
          {/*<div className="words">
           {this.state.enc_word != null &&
             this.renderDecodings(this.state.enc_word)}
          </div>*/}
        </div>
    );
  }
}
