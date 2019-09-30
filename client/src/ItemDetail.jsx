import React, { Component} from "react";
import "./App.css";

class ItemDetail extends Component{
  constructor(props) {
    super(props);
  }


  render(){
    return(
      <div>
        <ul> 
          Price: ${this.props.item.price} 
        </ul>
        <ul> 
          Quantity: {this.props.item.quantity}
        </ul>
      </div>
    );
  }
}

export default ItemDetail;