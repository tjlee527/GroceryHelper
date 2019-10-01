import React, { Component} from "react";
import "./App.css";
import IngredientsList from './IngredientsList.jsx';

class RecipeDetail extends Component{
  constructor(props) {
    super(props);
  }


  render(){
    const ingredients = this.props.recipe.ingredients.split(','); 
    return(
      <div>
        <ul> 
          <a href={this.props.recipe.href}>Go to Recipe</a>
        </ul>
        <ul> 
          <div className='IngredientsList'>INGREDIENTS:</div>
          <div>
            {ingredients.map((item, index) => 
                <IngredientsList key={index} item={item} />
              )}
          </div>
        </ul>
      </div>
    );
  }
}

export default RecipeDetail;