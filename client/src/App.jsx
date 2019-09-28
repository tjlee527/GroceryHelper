import React, { Component} from "react";
import "./App.css";
import Form from './Form.jsx';
import $ from 'jquery';

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
      url: '/api/item',
      success: (response) => {
        this.setState({
          itemsList: response
        })
      }
    })
  }


  render(){
    return(
      <div className="App">
        <h1> Groceries </h1>
        <Form addNewItem={this.addNewItem}/>
      </div>
    );
  }
}

export default App;