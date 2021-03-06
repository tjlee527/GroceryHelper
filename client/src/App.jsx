import React, { Component} from "react";
import "./App.css";
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket} from '@fortawesome/free-solid-svg-icons'

import Navigation from './NavBar.jsx';
import NewForm from './Form.jsx';
import GroceryList from './GroceryList.jsx';
import Budget from './Budget.jsx';
import UpdateForm from './UpdateForm.jsx';
import DeleteForm from './DeleteForm.jsx';
import Carousel from './Carousel.jsx';
import Recipes from './Recipes.jsx';




class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      form: false,
      pickBudget: true,
      updateItem: false,
      deleteItem: false,
      nextTime: [],
      nextTreats: [],
      clicked: 'pickBudget',
    };

    this.addNewItem = this.addNewItem.bind(this);
    this.changeBudget = this.changeBudget.bind(this);
    this.formButtonHandler = this.formButtonHandler.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

  }

  addNewItem(dataObj) {
    $.ajax({
      type: 'POST',
      url: '/api/item',
      data: dataObj,
      success: (response) => {
        this.setState({
          form: false,
          clicked: ''
        })
        this.getAllRequiredItems();
      }
    })
  }

  getAllRequiredItems() {
    $.ajax({
      type: 'GET',
      url: '/api/item/required',
      success: (response) => {
        const sortedResponse = this.rankGroceries(response, this.state.budget);
        
        this.setState({
          itemsListRequired: sortedResponse.budgItems,
          treatBudget: sortedResponse.changeLeft,
          nextTime: sortedResponse.nextTime
        });
        this.getFunItems();
      }
    })
  }

  getFunItems() {
    $.ajax({
      type: 'GET',
      url: '/api/item/fun',
      success: (response) => {
        const sortedResponse = this.rankGroceries(response, this.state.treatBudget);
        this.setState({
          itemFun: sortedResponse.budgItems,
          leftoverChange: sortedResponse.changeLeft,
          nextTimeTreats: sortedResponse.nextTime
        })
      }
    })
  }

  updateItem(dataObj) {
    $.ajax({
      type: 'PUT',
      data: dataObj,
      url: '/api/item/update',
      success: () => {
        this.setState({
          updateItem: false,
          clicked: ''
        });
        this.getAllRequiredItems();
      }
    })
  }

  deleteItem(dataObj) {
    $.ajax({
      type: 'DELETE',
      url: '/api/item/delete',
      data: dataObj,
      success: (response) => {
        this.setState({
          deleteItem: false,
          clicked: ''
        });
        this.getAllRequiredItems();
      }
    })
  }

  changeBudget(budget) {
    this.setState({
      budget: budget,
      pickBudget: false,
      clicked: ''
    });
    this.getAllRequiredItems();
  }

  formButtonHandler(event) {
    let button = event.target.value;
    let toggle = !this.state[button];
    let current = ''
    if (toggle === true) {
      current = button;
    }
    this.setState({
      [button]: toggle,
      clicked: current
    })
  }

  rankGroceries(items, budget) {
    let currentCost = 0;
    let budgItems = [];
    let nextTime = [];
    
    items.sort((a, b) => {
      return parseFloat(a.price) - parseFloat(b.price)
    })

    for (var i = 0; i < items.length; i++) {
      let cost = parseFloat(items[i].price);
      let amt = parseFloat(items[i].quantity);
      if ( (cost * amt) + currentCost <= budget) { 
        currentCost += (cost * amt);
        budgItems.push(items[i]);
      } else {
        nextTime.push(items[i]);
      }
    }

    let changeLeft = budget - currentCost; 
    const result = {
      budgItems,
      changeLeft,
      nextTime: nextTime
    }
    return result;
  }

  checkState(buttonName) {
    let check = (this.state.budget && this.state.clicked === '' || this.state.clicked === buttonName)
    return check
  }


  render(){
    return (
      <div>
      <Navigation />
      <Container>
        <Col md={8}>
          <div className="App">
            <h1> <FontAwesomeIcon size='lg' className='icon' icon={faShoppingBasket}/>  GROCERY LIST </h1>
            <div className='budgetTitle'>
              <h4>Budget: ${this.state.budget ? parseFloat(this.state.budget).toFixed(2) : null}</h4>
              <h4>Change: ${this.state.leftoverChange ? parseFloat(this.state.leftoverChange).toFixed(2) : null}</h4>
            </div>
            {
              this.state.itemsListRequired && this.state.itemFun && this.state.budget ? 
              <GroceryList 
                itemFun={this.state.itemFun} 
                itemsListRequired={this.state.itemsListRequired} 
                budget={this.state.budget}
                nextTime={this.state.nextTime}
                nextTimeTreats={this.state.nextTimeTreats}/> 
              : null
            }
            {
              this.checkState('pickBudget') ? 
              (this.state.pickBudget ? 
              < Budget 
                changeBudget={this.changeBudget} 
                budget={this.state.budget}/> 
              : <button className='button' variant="outline-success" value='pickBudget' onClick={this.formButtonHandler}>Adjust Budget</button>)
              : null
            }
            {
              this.checkState('form') ? 
              (this.state.form ? 
              <div>
                <NewForm addNewItem={this.addNewItem}/> 
                <button className='button' variant="outline-secondary" value='form' onClick={this.formButtonHandler}>Go Back</button>
              </div> : 
                <button className='button' variant="outline-success" value='form' onClick={this.formButtonHandler}>Add New Item</button>)
              : null
            }
            {
              this.checkState('updateItem') ? 
              (this.state.updateItem ? 
              <div>
                <UpdateForm 
                updateItem={this.updateItem}/> 
                <button className='button' variant="outline-secondary" value='updateItem' onClick={this.formButtonHandler}>Go Back</button>
              </div> : 
                <button className='button' variant="outline-success" value='updateItem' onClick={this.formButtonHandler}>Update Item</button>)
                : null
            }
            {
              this.checkState('deleteItem') ? 
              (this.state.deleteItem  ? 
              <div>
                <DeleteForm 
                deleteItem={this.deleteItem}/> 
                <button className='button' variant="outline-secondary" value='deleteItem' onClick={this.formButtonHandler}>Go Back</button>
              </div> : 
                <button className='button' variant="outline-success" value='deleteItem' onClick={this.formButtonHandler}>Delete Item</button>)
                : null
            }
          </div>
        </Col>
        {this.state.itemsListRequired ? <Recipes itemsListRequired={this.state.itemsListRequired}/> : null}
        {this.state.itemsListRequired ? <Carousel itemsListRequired={this.state.itemsListRequired}/> : null }
      </Container>
      </div>
    );
  }
}

export default App;