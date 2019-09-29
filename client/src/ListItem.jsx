import React, { Component} from "react";
import "./App.css";
import ItemDetail from './ItemDetail.jsx';

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
      <div>
        <div onClick={this.clickHandler}>
          {this.props.item.item}
        </div>
        {this.state.showItem ? <ItemDetail item={this.props.item}/> : null}
      </div>
    );
  }
}

export default ListItem;