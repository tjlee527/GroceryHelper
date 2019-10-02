import React, { Component} from "react";
import $ from 'jquery';
import "./App.css";
import RecipeList from './RecipeList.jsx';

import ListGroup from 'react-bootstrap/ListGroup';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown} from '@fortawesome/free-solid-svg-icons'


class Recipies extends Component{
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }

  getItemNames() {
    const items = this.props.itemsListRequired || [];
    const list = items.reduce((arr, itemObj) => {
      arr.push(itemObj.item);
      return arr;
    }, []);
    this.setState({
      list
    });
    return list;
  };

  componentDidMount() {
    const list = this.getItemNames();
    this.getRecipes(list);
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemsListRequired !== prevProps.itemsListRequired) {
      const list = this.getItemNames();
      this.getRecipes(list);
    }
  }

  getRecipes(dataArr) {
    $.ajax({
      type: 'GET',
      url: '/api/recipes',
      data: {
        list: dataArr,
      }, 
      success: (response) => {
        this.setState({
          recipes: response
        });
      }
    })
  }




  render(){
    const recipes = this.state.recipes || [];
    return(
      <Container>
        <Row>
          <Col sm={8}>
            <div className="listTitle">RECIPES</div>
          </Col>
        </Row>
            <ListGroup>
              {recipes.map((recipe, index) => 
                <RecipeList key={index} recipe={recipe} />
              )}
            </ListGroup>
      </Container>
    );
  }
}

export default Recipies;