import React, { Component } from 'react';
import './../css/App.css';
import Word from './Word';
import Memory from './Memory';
import Attention from './Attention';





function OnLink(props){
  return <a href={`#${props.link}`} className="menu__link" onClick={handleSetPlace.bind(this, props.link)}>{props.name}</a>
}

function handleSetPlace(place, e) {
  e.preventDefault();
  this.setState({place : place});
}

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {place: "start"};
  handleSetPlace=handleSetPlace.bind(this);
}
  render() {
    return (
      <div className="App">

      {this.state.place === "start" &&
      <div className="menu">
        <OnLink name="Начать" link="menu" />
      </div>
      }
        {this.state.place === "menu" &&
          <div className="menu">
            <ul className="list">
              <li className="list__item">
                <OnLink name="Слова" link="word" />
              </li>
              <li className="list__item">
                <OnLink name="Память" link="memory" />
              </li>
              <li className="list__item">
                <OnLink name="Внимание" link="warning" />
              </li>
            </ul>
          </div>
        }

        {this.state.place === "word" &&
          <div className="body">
            <Word />
            <OnLink name="Меню" link="menu"/>
          </div>
        }

        {this.state.place === "memory" &&
          <div className="body">
            <Memory />
            <OnLink name="Меню" link="menu"/>
          </div>
        }
        {this.state.place === "warning" &&
          <div className="body">
            <Attention />
            <OnLink name="Меню" link="menu"/>
          </div>
        }

      </div>
    );
  }
}

export default App;
