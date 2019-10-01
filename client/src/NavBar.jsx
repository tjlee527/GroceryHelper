import React, { Component} from "react";
import "./App.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome} from '@fortawesome/free-solid-svg-icons'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar'


class Navigation extends Component{
  constructor(props) {
    super(props);
  }


  render(){
    return (
      <Navbar variant="dark" className='navigation'>
        <Navbar.Brand className='navigation'><FontAwesomeIcon className='homeIcon' icon={faHome} /> Home</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Navigation;