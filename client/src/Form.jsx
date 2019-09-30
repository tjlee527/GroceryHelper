import React, { Component} from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      required: false,
      item: '',
      type: '',
      price: '',
      quantity: ''
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
    const {item, price} = this.state;
    return item && price;
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId='item'>
            <Form.Label>
              Item: 
              <Form.Control
                name="item"
                type="text"
                onChange={this.handleInputChange} />
            </Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId='price'>
            <Form.Label>
              Price $: 
              <Form.Control
                name="price"
                type="text"
                onChange={this.handleInputChange} />
            </Form.Label>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId='quantity'>
            <Form.Label>
              Quantity: 
              <Form.Control
                name="quantity"
                type="text"
                onChange={this.handleInputChange} />
            </Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="formBasicCheckbox">
            Required?:
            <Form.Check
              name="required"
              type="checkbox"
              checked={this.state.required}
              onChange={this.handleInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {this.checkRequiredFields() ? 
          <Form.Group as={Col} md="4" controlId='button'>
            <Button variant="outline-success" type="submit">
            Submit
            </Button> 
          </Form.Group> : null} 
        </Form.Row>
      </Form>
    );
  }
}

export default NewForm;