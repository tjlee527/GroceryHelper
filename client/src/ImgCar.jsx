import React, { Component} from "react";
import "./App.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ImgCar extends Component{
  constructor(props) {
    super(props);
  }


  render(){
    return(
      <Col className='imgCar' sm={3}>
        <div className='square'>
          <img src={this.props.url}></img>
        </div>
      </Col>
    );
  }
}

export default ImgCar;