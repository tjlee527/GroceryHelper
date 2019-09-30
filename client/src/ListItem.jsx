import React, { Component} from "react";
import "./App.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'

import ItemDetail from './ItemDetail.jsx';
import ListGroup from 'react-bootstrap/ListGroup';

class ListItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showItem: false
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const show = !this.state.showItem
    this.setState({
      showItem: show
    })
  }


  render(){
    return(
      <ListGroup.Item>
        <h5>
          {this.props.item.item} <FontAwesomeIcon onClick={this.clickHandler} className='icon' icon={faPlus} />
        </h5>
        {this.state.showItem ? <ItemDetail item={this.props.item}/> : null}
      </ListGroup.Item>
    );
  }
}

export default ListItem;