import React, { Component } from 'react';

const char_rplc= "_";
const words = ["машина","люди","конструктор", "перфоратор"]; //Уровень 1
const words2 = ["караганда","константинопль","уфа", "белгород"]; //Уровень 2
const words3 = ["хуй","хуй","хуй", "хуй"]; //Уровень 3
var char_to_win;
var level;
var life;

function getRandom(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

export default class Word extends Component {
  constructor(props){
    super(props);
    this.state ={
      new_word : "",
      message : "",
      value : "",
      win : false,
      count: 0
    };
    this.handleChange=this.handleChange.bind(this);
    this.Check=this.Check.bind(this);

}

componentDidMount(){
    this.GetWord(words);
    level = 1;
    life = 3;
}

reset(){
  console.log("word");
  this.setState({
    new_word : "",
    message : "",
    value : "",
    win : false,
    count: 0
  });

}

GetWord(array){
  this.setState({value: ""});
  let rnd = Math.floor(Math.random() * words.length);
  let curr = array[rnd];
  let length = curr.length;
  let rnd_char = getRandom(0,length);
  char_to_win = curr.charAt(rnd_char);
  curr = curr.slice(0,rnd_char) + char_rplc + curr.slice(rnd_char+1,length);
  this.setState({new_word: curr});
}

Check(){

  if (char_to_win.toLowerCase() === this.state.value.toLowerCase()){
    this.setState({count : this.state.count+1});
  }else{
    life -=1
  }

  if (level===1){
    this.GetWord(words);
  }
  if (level===2){
    this.GetWord(words2);
  }
  if (level===3){
    this.GetWord(words3);
  }

  if (life < 1 ){
      alert("Попорбуй снова!");
      life = 3;
      if (level===3){
        life = 1;
      }
  }

}
componentDidUpdate(){
  if(this.state.count === 4){
    if (level === 3){

      level = 3;
    }else{
      level+=1;

    }

    life = 3;
    if (level===2){
      this.GetWord(words2);
    }
    if (level===3){
      this.GetWord(words3);
      life=1;
    }
    if (level===1){
      this.GetWord(words);
    }
    this.setState({
      count: 0
    });

   alert("Ты перешел на новый уровень!");

 }
}
handleChange(event) {
 this.setState({value: event.target.value});
}


  render() {
    return (
        <div className="body-this">
        <h2>Текущий уровень: {level}</h2>
        <p>Жизни: {life}</p>
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
