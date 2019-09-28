import React, { Component} from "react";
import "./App.css";
import ListItem from './ListItem.jsx';
import Treats from './Treats.jsx';


class GroceryList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      affordable: []
    }
  }

  rankGroceries() {
    let currentCost = 0;
    let budget = 20;
    let budgItems = [];
    let items = this.props.itemsListRequired; 
    items.sort((a, b) => {
      return parseFloat(a.price) - parseFloat(b.price)
    })
    for (var i = 0; i < items.length; i++) {
      let cost = parseFloat(items[i].price);
      if ( cost + currentCost <= budget) {
        currentCost += cost;
        budgItems.push(items[i]);
      } else {
        break;
      }
    }
    this.setState({
      affordable: budgItems
    })
  }

  componentDidMount() {
    this.rankGroceries();
  }

  render(){
    const items = this.state.affordable; 

    return(
      <div>
        <div className="necessities">
          <h4>Necessities:</h4>
          <ul> 
          {items.map((item, index) => 
            <ListItem key={index} item={item} />
          )}
          </ul>
        </div>
      {this.state.affordable ? < Treats itemsListFun={this.props.itemFun} /> : null}
      </div>
    );
  }
}

export default GroceryList;