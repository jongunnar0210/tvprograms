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

  function getThattaTexti() {
    if (program.thattafjoldi === 0)
      return null;
    else if (program.thattafjoldi < program.thattur)
      return <li>{program.thattur}</li>

    return <li>{program.thattur} af {program.thattafjoldi}</li>
  }

  return (
    <ListGroup.Item key={index} className='programCollapsedList' onClick={handleClick}>
      <Form.Row className='align-items-center'>
        <Col lg={1} md={12}>
          <Form.Label>{program.from}</Form.Label>
        </Col>

        <Col lg={3} md={4} sm={12}>
          <ul>
            <li><h5>{program.isltitill}</h5></li>
          </ul>
        </Col>
        <Col lg={3} md={6} sm={12}>
          <ul>
            {program.vote_average != null && <li><Form.Label className='imdbLabel'>IMDb</Form.Label> {program.vote_average}</li>}
            {program.bannad && <li><Bannad bannad={program.bannad} /></li>}
            {getThattaTexti()}
          </ul>
        </Col>

        <Col lg={5} md={12} className='d-none d-sm-block'>
          <Form.Label className='shortDesc'>{program.lysing}</Form.Label>
        </Col>
      </Form.Row>
    </ListGroup.Item>
  );
}
