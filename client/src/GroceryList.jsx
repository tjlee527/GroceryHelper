import React, { Component} from "react";
import "./App.css";
import ListItem from './ListItem.jsx';


class GroceryList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      nextTime: false
    }

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const show = !this.state.nextTime
    this.setState({
      nextTime: show
    })
  }


  render(){
    const items = this.props.itemsListRequired || []; 
    const funItems = this.props.funItems || [];
    const nextTime = this.props.nextTime || [];
    return(
      <div className="necessities">
        <h4>Necessities:</h4>
        <ul> 
        {items.map((item, index) => 
          <ListItem key={index} item={item} />
        )}
        </ul>
        <h4>Treats:</h4>
        <ul> 
        {funItems.map((item, index) => 
          <ListItem key={index} item={item} />
        )}
        </ul>
        <h4 onClick={this.clickHandler}>Over Budget:</h4>
        {this.state.nextTime ? 
        <ul> 
        {nextTime.map((item, index) => 
          <ListItem key={index} item={item} />
        )}
        </ul> : null }
      </div>
    );
  }
}

export default GroceryList;