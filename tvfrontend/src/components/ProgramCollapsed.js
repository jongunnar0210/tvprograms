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
        <Col sm={1}>
          <Form.Label>{program.from}</Form.Label>
        </Col>

        <Col sm={5}>
          <ul>
            <li><h5>{program.isltitill}</h5></li>
            {program.vote_average != null && <li><Form.Label className='imdbLabel'>IMDb</Form.Label> {program.vote_average}</li>}
            {program.bannad && <li><Bannad bannad={program.bannad} /></li>}
            {getThattaTexti()}
          </ul>
        </Col>

        <Col sm={6}>
          <Form.Label className='shortDesc'>{program.lysing}</Form.Label>
        </Col>
      </Form.Row>
    </ListGroup.Item>
  );
}
