import React, { Component} from "react";
import "./App.css";

class DeleteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: ''
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
    this.props.deleteItem(this.state);
  }

  checkRequiredFields() {
    const {item} = this.state;
    return item;
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
        {this.checkRequiredFields() ? <input type="submit" value="Submit" /> : null}
      </form>
    );
  }
}

export default DeleteForm;