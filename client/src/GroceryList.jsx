import React, { Component} from "react";
import "./App.css";

class GroceryList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      form: true
    };
  }


  render(){
    return(
      <div className="GroceryList">
        <h1> Grocery List </h1>
      </div>
    );
  }
}

export default GroceryList;