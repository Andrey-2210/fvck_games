import React, { Component } from 'react';
import Item from './Item';
import {  Link } from 'react-router-dom';
import {  Redirect} from 'react-router-dom';


//------------Settings-------------------//

const msg_win = "Победа!";

//---------------------------------------//


//---------------------APP---------------------//
var time_see = 2000;
var level = 1;
var maxitems;
var styleGrid = {
    width: ''
}

function initialItems() {
    let arr = [];
    let arr_sup = [];
    if (level === 1) {
        maxitems = 4;
        styleGrid = {
            width: '210px'
        };
    }
    if (level === 2) {
        maxitems = 16;
        styleGrid = {
            width: '450px'
        };
        time_see = 5000;
    }
    if (level === 3) {
        maxitems = 36;
        styleGrid = {
            width: '940px'
        };
        time_see = 10000;
    }
    for (let i = 1; i <= maxitems / 2; i++) {
        arr[i] = {
            value: i,
            picked: false,
            flip: true
        };
        arr_sup[i] = {
            value: i,
            picked: false,
            flip: true
        };
    }
    let new_arr = arr.concat(arr_sup);
    new_arr.sort(function () {
        return Math.random() - 0.5;
    });
    return new_arr;
}

function hideItems(array) {
    for (let i = 0; i <= maxitems - 1; i++) {
        array[i].flip = false;
    }
    return array;
}

export default class Memory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: initialItems(),
            bblocked: false,
            lastItem: null,
            ended: 0,
            namePlayer: ''
        };
        setTimeout(() => {
            this.setState({
                items: hideItems(this.state.items)
            })
        }, time_see)
        this.renderItems = this.renderItems.bind(this);
        this.checkPick = this.checkPick.bind(this);
        this.restart = this.restart.bind(this);
    }

    componentDidUpdate() {
        if (this.state.ended === maxitems / 2) {
            setTimeout(() => {
                if (level < 3) {
                    level += 1;
                } else {
                    level = 3;
                }

                alert(msg_win);
                this.restart();
            }, 500);
        }
    }

    componentWillMount() {
        level = 1;
        maxitems = 4;
        this.restart();
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



    checkPick(id, value) {
        if (this.state.blocked) {
            return;
        }
        var items = this.state.items;
        items[id].flip = true;
        this.setState({
            items,
            blocked: true
        });
        if (this.state.lastItem) {
            if (value === this.state.lastItem.value) {
                var ended = this.state.ended;
                items[id].picked = true;
                items[this.state.lastItem.id].picked = true;
                this.setState({
                    items,
                    lastItem: null,
                    blocked: false,
                    ended: ended + 1
                });
            } else {
                setTimeout(() => {
                    items[id].flip = false;
                    items[this.state.lastItem.id].flip = false;
                    this.setState({
                        items,
                        lastItem: null,
                        blocked: false
                    });
                }, 1000);
            }
        } else {
            this.setState({
                lastItem: {
                    id,
                    value
                },
                blocked: false
            });
        }
    }

    restart() {
        this.setState({
            items: initialItems(),
            bblocked: false,
            lastItem: null,
            ended: 0
        });
        setTimeout(() => {
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



    render() {
        return (
            <div className="body-this memory-bg">
                {this.state.redirect && <Redirect to="/" /> }
                <div className="gameplace" style={styleGrid}>
                    {this.renderItems(this.state.items)}
                </div>
                <div className="form-group"><button onClick={this.restart} className="btn btn-info">Начать заново</button> </div>          
                <Link className="btn btn-danger btn-sm" to='/'>Выход</Link>
            </div>
        );
    }
}
