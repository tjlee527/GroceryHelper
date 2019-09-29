import React, { Component} from "react";
import "./App.css";
import $ from 'jquery';
import Form from './Form.jsx';
import GroceryList from './GroceryList.jsx';
import Budget from './Budget.jsx';
import Treats from './Treats.jsx';


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      form: false,
      pickBudget: true,
    };

    this.addNewItem = this.addNewItem.bind(this);
    this.changeBudget = this.changeBudget.bind(this);
    this.formButtonHandler = this.formButtonHandler.bind(this);
  }

  addNewItem(dataObj) {
    $.ajax({
      type: 'POST',
      url: '/api/item',
      data: dataObj,
      success: (response) => {
        this.setState({
          form: false
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
          treatBudget: sortedResponse.changeLeft
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
          leftoverChange: sortedResponse.changeLeft
        })
      }
    })
  }

  changeBudget(budget) {
    this.setState({
      budget: budget,
      pickBudget: false,
    });
    this.getAllRequiredItems();
  }

  formButtonHandler(event) {
    let button = event.target.value;
    this.setState({
      [button]: true
    })
  }

  rankGroceries(items, budget) {
    let currentCost = 0;
    let budgItems = [];
    
    items.sort((a, b) => {
      return parseFloat(a.price) - parseFloat(b.price)
    })

    for (var i = 0; i < items.length; i++) {
      let cost = parseFloat(items[i].price);
      if ( cost + currentCost <= budget) {
        currentCost += cost;
        budgItems.push(items[i]);
      } else {
        break;
      }
    }

    let changeLeft = budget - currentCost; 
    const result = {
      budgItems,
      changeLeft
    }
    return result;
  }


  render(){
    return(
      <div className="App">
        <h1> Groceries </h1>
        <h4>Budget: {this.state.budget ? this.state.budget : null}</h4>
        <h4>Change: {this.state.leftoverChange ? parseFloat(this.state.leftoverChange).toFixed(2) : null}</h4>
        {
          this.state.itemsListRequired && this.state.itemFun && this.state.budget ? 
          <GroceryList 
            itemFun={this.state.itemFun} 
            itemsListRequired={this.state.itemsListRequired} 
            budget={this.state.budget}/> 
          : null
        }
        {
          this.state.itemFun ? 
          <Treats 
            itemFun={this.state.itemFun} />
          : null
        }
        {
          this.state.pickBudget ? 
          < Budget 
            changeBudget={this.changeBudget} 
            budget={this.state.budget}/> 
          : <button value='pickBudget' onClick={this.formButtonHandler}>Adjust Budget</button>
        }
        {
          this.state.form ? 
          <Form 
            addNewItem={this.addNewItem}/> : 
            <button value='form' onClick={this.formButtonHandler}>Add New Item</button>
        }
      </div>
    );
  }
}

export default App;