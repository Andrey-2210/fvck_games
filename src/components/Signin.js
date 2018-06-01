import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

export default class Signin extends Component{
  constructor(props){
    super(props);
    this.state={
      nameInput: '',
      redirect: false
    }
  }

componentDidMount(){
  if (  localStorage.getItem('name') ){
    this.setState({
      redirect: true
    })
  }
}

  handleSubmit(e){
    e.preventDefault();
    localStorage.setItem('name', this.state.nameInput);
    this.setState({
      redirect: true
    })
  }

  changeInput(e){
    let value = e.target.value;
    this.setState({
      nameInput: value
    })
  }
  render(){
    return(
      <div className="signin">
        {this.state.redirect && <Redirect to="/menu" /> }
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
                <input type="text" onChange={this.changeInput.bind(this)} value={this.state.nameInput} className="form-control form-control-lg" placeholder="Введите имя"/>
            </div>
            <div className="text-center">
                <button className="btn btn-primary">Старт</button>
            </div>
        </form>
    </div>
    )
  }
}
