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

  render(){
    const items = this.props.itemFun; 
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