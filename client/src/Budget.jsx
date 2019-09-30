import React, { Component} from "react";
import "./App.css";

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
        <form onSubmit={this.handleSubmit}>
          <label>
            Change Budget:
            <input
              name="budget"
              type="text"
              onChange={this.handleInputChange} />
          </label>
          <br />
           {this.checkRequiredFields() ? <input type="submit" value="Submit" /> : null}
        </form>
      </div>
    );
  }
}

export default Budget;