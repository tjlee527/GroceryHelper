import React, { Component} from "react";
import "./App.css";
import $ from 'jquery';
import Form from './Form.jsx';
import GroceryList from './GroceryList.jsx';


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      form: true
    };

    this.addNewItem = this.addNewItem.bind(this);
  }

  addNewItem(dataObj) {
    $.ajax({
      type: 'POST',
      url: '/api/item',
      data: dataObj,
      success: (response) => {
        console.log(response);
        this.setState({
          form: false
        })
      }
    })
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/api/item/required',
      success: (response) => {
        this.setState({
          itemsListRequired: response
        })
      }
    })
    $.ajax({
      type: 'GET',
      url: '/api/item/fun',
      success: (response) => {
        this.setState({
          itemFun: response
        })
      }
    })
  }


  render(){
    return(
      <div className="App">
        <h1> Groceries </h1>
        {this.state.itemsListRequired && this.state.itemFun ? <GroceryList itemFun={this.state.itemFun} itemsListRequired={this.state.itemsListRequired}/> : null}
        <Form addNewItem={this.addNewItem}/>
      </div>
    );
  }
}

export default App;