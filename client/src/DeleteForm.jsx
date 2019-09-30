import React, { Component} from "react";
import "./App.css";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


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
          {this.checkRequiredFields() ? 
            <Form.Group as={Col} md="4" controlId='button'>
              <button className='button' variant="outline-success" type="submit">
                Submit
              </button> 
            </Form.Group>: null} 
        </Form.Row>
      </Form>
    );
  }
}

export default DeleteForm;