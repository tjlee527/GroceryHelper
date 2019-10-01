import React, { Component} from "react";
import "./App.css";
import ImgCar from './ImgCar.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'


class Carousel extends Component{
  constructor(props) {
    super(props);
    this.state = {
      current: ['https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', 'https://images.unsplash.com/photo-1553455860-2fa544e14141?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', 'https://images.unsplash.com/photo-1475855841503-917d97ca77b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'],
      start: 0,
      end: 3
    }

    this.clickHandlerRight = this.clickHandlerRight.bind(this);
    this.clickHandlerLeft = this.clickHandlerLeft.bind(this);
  }

  increment(side) {
    let stateObj;
    if (side === 'right') {
      let newStart = this.state.start + 1;
      let newEnd = this.state.end + 1;
      stateObj = {
        start: newStart,
        end: newEnd
      }
    }
    if (side === 'left') {
      let newStart = this.state.start - 1;
      let newEnd = this.state.end - 1;
      stateObj = {
        start: newStart,
        end: newEnd
      }
    }
    return stateObj;
  }

  clickHandlerRight() {
    const state = this.increment('right');
    this.setState(state);
  }

  clickHandlerLeft() {
    const state = this.increment('left');
    this.setState(state);
  }


  render(){
    const imgs = this.state.current.slice(this.state.start, this.state.end); 
    return(
      <Container>
        <Row>
          <Col sm={12}>
            <div className="listTitle">INSPIRATION</div>
          </Col>
        </Row>
        <Row>
          <Col sm={1}>
            {this.state.start === 0 ? null :
            <FontAwesomeIcon value='left' size='2x' onClick={this.clickHandlerLeft} className='arrow' icon={faChevronLeft}/> }
          </Col>
          {imgs.map((image, index) => 
            <ImgCar key={index} url={image} />
          )}
          <Col sm={1}>
            {this.state.end === 6 ? null :
            <FontAwesomeIcon value='right' size='2x' onClick={this.clickHandlerRight} className='arrowRight arrow' icon={faChevronRight}/> }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Carousel;