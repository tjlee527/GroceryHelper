import React, { Component} from "react";
import "./App.css";
import $ from 'jquery';
import Form from './Form.jsx';
import GroceryList from './GroceryList.jsx';
import Budget from './Budget.jsx';
import UpdateForm from './UpdateForm.jsx';
import DeleteForm from './DeleteForm.jsx';



class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      form: false,
      pickBudget: true,
      updateItem: false,
      deleteItem: false,
      nextTime: []
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

  updateItem(dataObj) {
    $.ajax({
      type: 'PUT',
      data: dataObj,
      url: '/api/item/update',
      success: () => {
        this.setState({
          updateItem: false
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
          deleteItem: false
        });
        this.getAllRequiredItems();
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
      let amt = parseFloat(items[i].quantity);
      if ( (cost * amt) + currentCost <= budget) {
        currentCost += (cost * amt);
        budgItems.push(items[i]);
      } else {
        this.state.nextTime.push(items[i]);
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
        <h4>Budget: ${this.state.budget ? parseFloat(this.state.budget).toFixed(2) : null}</h4>
        <h4>Change: ${this.state.leftoverChange ? parseFloat(this.state.leftoverChange).toFixed(2) : null}</h4>
        {
          this.state.itemsListRequired && this.state.itemFun && this.state.budget ? 
          <GroceryList 
            itemFun={this.state.itemFun} 
            itemsListRequired={this.state.itemsListRequired} 
            budget={this.state.budget}
            nextTime={this.state.nextTime}/> 
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
        {
          this.state.updateItem ? 
          <UpdateForm 
            updateItem={this.updateItem}/> : 
            <button value='updateItem' onClick={this.formButtonHandler}>Update Item</button>
        }
        {
          this.state.deleteItem ? 
          <DeleteForm 
            deleteItem={this.deleteItem}/> : 
            <button value='deleteItem' onClick={this.formButtonHandler}>Delete Item</button>
        }
      </div>
    );
  }
}

export default App;