import React, {Component} from 'react';
import classnames from 'classnames';

const format = "jpg";
const path_to_img = 'assets/img/';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (!this.props.flip) {
      this.props.checkPick(this.props.id,this.props.value);
    }
  }

  render() {

    var classes = classnames(
      'item',
      {'item--flip': this.props.flip},
      {'item--picked': this.props.picked}
    );
    let value= this.props.value;
    var imagestr = <img src={require('./../' + path_to_img + value + '.' + format)} alt={this.props.value} />
    var itemValue = this.props.picked ? imagestr : '';
    return (
        <div className={classes} dataid={this.props.value} onClick={this.handleClick}>
        {!this.props.picked &&
        this.props.flip && <img src={require('./../' + path_to_img + value + '.'+ format)} alt={this.props.value} />}
        {itemValue}
        </div>
    );
  }
}
