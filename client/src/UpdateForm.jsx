import React, { Component} from "react";
import "./App.css";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
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
      <Form className='form' onSubmit={this.handleSubmit}>
        <h4>Update Item</h4>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId='item'>
            <Form.Label>
              Item: 
              <Form.Control
                name="item"
                type="text"
                placeholder='ex. apples'
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
                placeholder='00.00'
                onChange={this.handleInputChange} />
            </Form.Label>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId='quantity'>
            <Form.Label>
              Quantity: 
              <Form.Control
                placeholder='ex. 5'
                name="quantity"
                type="text"
                onChange={this.handleInputChange} />
            </Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId='button'>
            <button className='button' variant="outline-success" type="submit">
              Submit
            </button>
          </Form.Group>
        </Form.Row>
      </Form>
    );
  }
}

export default UpdateForm;