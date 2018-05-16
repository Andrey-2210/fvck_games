import React, { Component } from 'react';
import Item from './Item';

var maxitems = 16; //Сколько клеток

const msg_win="Ты победил,дружок!";
const time_see = 5000;


function initialItems(){
  let arr = [];
  let arr_sup =[];
  for (let i = 1;i<= maxitems/2; i++){
    arr[i] = { value: i, picked: false, flip: true};
    arr_sup[i] = { value: i, picked: false, flip: true};
  }
  let new_arr = arr.concat(arr_sup);
    new_arr.sort(function(){
      return Math.random() - 0.5;
    });
  return new_arr;
}

function hideItems(array){
  console.log(array);
  for (let i = 0;i<= maxitems-1; i++){
    array[i].flip = false;
  }
  return array;
}

export default class Memory extends Component {

  constructor(props){
    super(props);
    this.state ={
      items: initialItems(),
      bblocked: false,
      lastItem: null,
      ended: 0
    };
    setTimeout(()=>{
      this.setState({
        items: hideItems(this.state.items)
      })
    }, time_see)
    this.renderItems = this.renderItems.bind(this);
    this.checkPick = this.checkPick.bind(this);
    this.reset = this.reset.bind(this);

}



checkPick(id,value){
  if (this.state.blocked){
    return;
  }
    var items = this.state.items;
    items[id].flip = true;
    this.setState({items, blocked: true});
    if (this.state.lastItem) {
      if (value === this.state.lastItem.value) {
        var ended = this.state.ended;
        items[id].picked = true;
        items[this.state.lastItem.id].picked = true;
        this.setState({items, lastItem: null, blocked: false, ended: ended + 1});
      } else {
        setTimeout(() => {
          items[id].flip = false;
          items[this.state.lastItem.id].flip = false;
          this.setState({items, lastItem: null, blocked: false});
        }, 1000);
      }
    } else {
      this.setState({
        lastItem: {id, value},
        blocked: false
      });
    }
}

reset(){
  this.setState({
    items: initialItems(),
    bblocked: false,
    lastItem: null,
    ended: 0
  });
  setTimeout(()=>{
    this.setState({
      items: hideItems(this.state.items),
    })
  }, time_see)
}

renderItems(items) {
  return items.map((item, index) => {
    return (
      <Item
        key={index}
        value={item.value}
        id={index}
        picked={item.picked}
        flip={item.flip}
        checkPick={this.checkPick} />
    );
  });
}

componentDidUpdate(){
  if (this.state.ended === maxitems / 2){
    setTimeout(() => {
      alert(msg_win);
    }, 500);
  }
}

  render() {
    return (
        <div className="body-this">
           <div>
             <button onClick={this.reset}>Рестарт</button>
           </div>
           <div className="gameplace">
            {this.renderItems(this.state.items)}
           </div>
        </div>
    );
  }
}
