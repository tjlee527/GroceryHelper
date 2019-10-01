import React, { Component} from "react";
import "./App.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'

import RecipeDetail from './RecipeDetail.jsx';
import ListGroup from 'react-bootstrap/ListGroup';

class RecipeList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showItem: false
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const show = !this.state.showItem
    this.setState({
      showItem: show
    })
  }


  render(){
    return(
      <ListGroup.Item>
        <h4 className='Recipes'>
          {this.props.recipe.title.toUpperCase()} <FontAwesomeIcon onClick={this.clickHandler} className='icon' icon={faPlus} />
        </h4>
        {this.state.showItem ? <RecipeDetail recipe={this.props.recipe}/> : null}
      </ListGroup.Item>
    );
  }
}

export default RecipeList;