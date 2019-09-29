import React, { Component} from "react";
import "./App.css";
import ListItem from './ListItem.jsx';
import Treats from './Treats.jsx';


class GroceryList extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const items = this.props.itemsListRequired; 

    return(
      <div className="necessities">
        <h4>Necessities:</h4>
        <ul> 
        {items.map((item, index) => 
          <ListItem key={index} item={item} />
        )}
        </ul>
      </div>
    );
  }
}

export default GroceryList;