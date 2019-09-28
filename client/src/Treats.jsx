import React, { Component} from "react";
import "./App.css";
import ListItem from './ListItem.jsx';

class Treats extends Component{
  constructor(props) {
    super(props);
    this.state = {
      affordableTreats: []
    }
  }

  rankGroceries() {
    let currentCost = 0;
    let budget = 20;
    let budgItems = [];
    let items = this.props.itemsListFun; 
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
      affordableTreats: budgItems
    })
  }

  componentDidMount() {
    this.rankGroceries();
  }

  render(){
    const items = this.state.affordableTreats; 
    return(
      <div className="splurges">
        <h4>Treats:</h4>
        <ul> 
        {items.map((item, index) => 
          <ListItem key={index} item={item} />
        )}
        </ul>
      </div>
    );
  }
}

export default Treats;