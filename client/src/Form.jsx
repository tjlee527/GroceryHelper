import React, { Component} from "react";
import "./App.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      required: false,
      item: '',
      type: '',
      price: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleTypeChange(event) {
    this.setState({type: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addNewItem(this.state);
  }

  checkRequiredFields() {
    const {item, type, price} = this.state;
    return item && type && price;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Item: 
          <input
            name="item"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Select Type: 
          <select value={this.state.type} onChange={this.handleTypeChange}>
            <option value=""></option>
            <option value="protein">Protein</option>
            <option value="vegetable">Vegetable</option>
            <option value="carb">Carb</option>
            <option value="pantry">Pantry Staple</option>
            <option value="snack">Other Yummies</option>
          </select>
        </label>
        <br />
        <label>
          Price$: 
          <input
            name="price"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Required?:
          <input
            name="required"
            type="checkbox"
            checked={this.state.required}
            onChange={this.handleInputChange} />
        </label>
        <br />
        {this.checkRequiredFields() ? <input type="submit" value="Submit" /> : null}
      </form>
    );
  }
}

export default Form;