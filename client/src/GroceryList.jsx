import React, { Component} from "react";
import "./App.css";
import ListGroup from 'react-bootstrap/ListGroup';
import ListItem from './ListItem.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class GroceryList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      nextTime: false
    }

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const show = !this.state.nextTime
    this.setState({
      nextTime: show
    })
  }


  render(){
    const items = this.props.itemsListRequired || []; 
    const funItems = this.props.itemFun || [];
    const nextTime = this.props.nextTime || [];
    return(
      <Container>
        <Col sm={10}>
          <div className="necessities">
            <div className="listTitle">NECESSITIES</div>
            <ListGroup>
              {items.map((item, index) => 
                <ListItem key={index} item={item} />
              )}
            </ListGroup>
            
            <div className="listTitle">TREATS</div>
            <ListGroup>
            {funItems.map((item, index) => 
              <ListItem key={index} item={item} />
            )}
            </ListGroup>
            <div className="listTitle" onClick={this.clickHandler}>OVER BUDGET</div>
            {this.state.nextTime ? 
            <ListGroup> 
            {nextTime.map((item, index) => 
              <ListItem key={index} item={item} />
            )}
            </ListGroup> : null }
          </div>
        </Col>
      </Container>
    );
  }
}

export default GroceryList;