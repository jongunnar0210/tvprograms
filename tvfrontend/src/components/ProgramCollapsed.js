import React from 'react'
import '../App.css';
import { ListGroup, Form, Col } from "react-bootstrap";
import Bannad from './Bannad';

export default function ProgramCollapsed({program, index}) {
  return (
    <ListGroup.Item key={index} className='programCollapsedList'>
      <Form.Row className='align-items-center'>
        <Col sm={10}>
          {program.isltitill}
        </Col>
      </Form.Row>
    </ListGroup.Item>
  );
}
