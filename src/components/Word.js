import React, { Component } from 'react';

const msg_win="Ты победил,дружок!";
const msg_lose="Попробуй снова ((!"
const char_rplc= "_";
const words = ["машина","люди","конструктор", "перфоратор"];
var char_to_win;

function getRandom(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

export default class Word extends Component {
  constructor(props){
    super(props);
    this.state ={
      new_word: "",
      message : "",
      value: "",
      win: false
    };
    this.handleChange=this.handleChange.bind(this);
    this.Check=this.Check.bind(this);

}

componentDidMount(){
  this.GetWord();
}

GetWord(){
  this.setState({value: ""});
  let rnd = Math.floor(Math.random() * words.length);
  let curr = words[rnd];
  let length = curr.length;
  let rnd_char = getRandom(0,length);
  char_to_win = curr.charAt(rnd_char);
  curr = curr.slice(0,rnd_char) + char_rplc + curr.slice(rnd_char+1,length);
  this.setState({new_word: curr});
}

Check(){
  if (this.state.win){
    alert(this.state.message);
    this.GetWord();
  }else{
    alert(this.state.message);
  }
}

handleChange(event) {
  let val = event.target.value;
  if (char_to_win.toLowerCase() === val.toLowerCase()){
      this.setState({win : true});
      this.setState({message: msg_win});
  }else{
     this.setState({win : false});
     this.setState({message: msg_lose});
  }

   this.setState({value: val});
 }

  render() {
    return (
        <div className="body-this">
        <p className="current-word">{this.state.new_word}</p>
          {this.state.new_word !== "" &&
            <div>
              <input type="text"
              value={this.state.value}
              onChange={this.handleChange}
              />
              <button onClick={this.Check}>Проверить</button>
              <p className="subscribe">Введите букву которой не хватает.</p>
            </div>
          }
        </div>
    );
  }
}
