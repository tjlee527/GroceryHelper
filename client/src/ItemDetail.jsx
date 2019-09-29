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
      </div>
    );
  }
}

export default ItemDetail;