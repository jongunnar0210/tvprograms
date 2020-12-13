import React, { useContext } from 'react'
import '../App.css';
import { ListGroup, Form, Col } from "react-bootstrap";
import Bannad from './Bannad';
import { ProgramsContext } from "./Context";

export default function ProgramCollapsed({program, index}) {
  const { expandedIndex, set_expandedIndex } = useContext(ProgramsContext);

  function handleClick() {
    if (expandedIndex === index) {
      set_expandedIndex(-1);
    } else {
      set_expandedIndex(index);
    }
  }

  return (
    <ListGroup.Item key={index} className='programCollapsedList' onClick={handleClick}>
      <Form.Row className='align-items-center'>
        <Col sm={10}>
          {program.isltitill}
        </Col>
      </Form.Row>
    </ListGroup.Item>
  );
}
