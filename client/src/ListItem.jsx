import React, { Component} from "react";
import "./App.css";

class ListItem extends Component{
  constructor(props) {
    super(props);
  }


  render(){
    return(
      <div>
        {this.props.item.item}
      </div>
    );
  }
}

export default ListItem;