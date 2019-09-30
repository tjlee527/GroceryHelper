import React, { Component} from "react";
import "./App.css";

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // required: false,
      item: '',
      // updateObj: {}
      // price: '',
      // quantity: ''
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
    this.props.updateItem(this.state);
    this.setState({ });
  }

  checkRequiredFields() {
    const {item, price} = this.state;
    return item && price;
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
        <br />
        <label>
          Price $: 
          <input
            name="price"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Quantity: 
          <input
            name="quantity"
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
       <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default UpdateForm;