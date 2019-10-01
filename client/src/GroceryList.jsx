import React, { Component} from "react";
import "./App.css";
import ListGroup from 'react-bootstrap/ListGroup';
import ListItem from './ListItem.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown} from '@fortawesome/free-solid-svg-icons'


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

  checkTreats() {
    const nextTime = this.props.nextTime || [];
    const nextTimeTreats = this.props.nextTimeTreats || [];
    const check = nextTime.length > 0 || nextTimeTreats.length > 0;
    return check;
  }


  render(){
    const items = this.props.itemsListRequired || []; 
    const funItems = this.props.itemFun || [];
    const nextTime = this.props.nextTime || [];
    const nextTimeTreats = this.props.nextTimeTreats || [];
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
            <div className='listSection'>
              <div className="listTitle">TREATS</div>
              <ListGroup>
              {funItems.map((item, index) => 
                <ListItem key={index} item={item} />
              )}
              </ListGroup>
            </div>
            {this.checkTreats() ?
            <div className='listSection'> 
              <div className="listTitle" >OVER BUDGET  <FontAwesomeIcon size='lg' onClick={this.clickHandler} className='icon' icon={faChevronDown} /></div>
              {this.state.nextTime ? 
              <ListGroup className='overBudget'> 
              {nextTime.map((item, index) => 
                <ListItem key={index} item={item} />
              )}
              {nextTimeTreats.map((item, index) => 
                <ListItem key={index} item={item} />
              )}
              </ListGroup> : null }
            </div>
            : null }
          </div>
        </Col>
      </Container>
    );
  }
}

export default GroceryList;