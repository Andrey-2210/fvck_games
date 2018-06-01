import React, { Component } from 'react';

export default class Alphabet extends Component {
    render() {
        return (
            <div className="alpha__li">{this.props.word} - {this.props.number}</div>
        );
    }
}
