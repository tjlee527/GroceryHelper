import React, { Component} from "react";
import "./App.css";

class IngredientsList extends Component{
  constructor(props) {
    super(props);
  }


  render(){
    return(
      <div>
        <ul className='ingredient'> 
          {this.props.item}
        </ul>
      </div>
    );
  }
}

export default IngredientsList;