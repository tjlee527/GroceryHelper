import React, { Component} from "react";
import "./App.css";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: ''
    }


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({
      budget: value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.changeBudget(this.state.budget);
  }
  checkRequiredFields() {
    const {budget} = this.state;
    return budget;
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId='item'>
              <Form.Label>
                Budget: 
                <Form.Control
                  name="budget"
                  type="text"
                  onChange={this.handleInputChange} />
              </Form.Label>
            </Form.Group>
          </Form.Row>
            {this.checkRequiredFields() ? 
              <Form.Group as={Col} md="4" controlId='button'>
                <button className='button' variant="outline-success" type="submit">
                  Submit
                </button> 
              </Form.Group>
              : null}
        </Form>
      </div>
    );
  }
}

export default Budget;