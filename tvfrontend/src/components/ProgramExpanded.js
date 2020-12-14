import React, { useContext } from 'react'
import '../App.css';
import { ListGroup, Form, Col } from "react-bootstrap";
import Bannad from './Bannad';
import { ProgramsContext } from "./Context";

export default function ProgramExpanded({program, index}) {
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
      return <li>Þáttur {program.thattur}</li>

    return <li>Þáttur {program.thattur} af {program.thattafjoldi}</li>
  }

  return (
    <ListGroup.Item key={index} className='programExpandedList' onClick={handleClick}>
      <Form.Row className='align-items-center'>
        <Col sm={10}>
          <Form.Row>
            <Col>
              <h4>{program.isltitill}</h4>
            </Col>
          </Form.Row>
            
          <Form.Row>
            <Col sm={7}>
              <ul>
                <li>{program.midill_heiti}</li>
                <li>{program.from} - {program.to}</li>
                {getThattaTexti()}
                {program.vote_average != null && <li>IMDB Rating: {program.vote_average}</li>}
                {program.bannad && <li><Bannad bannad={program.bannad} /></li>}
              </ul>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              {program.lysing}
            </Col>
          </Form.Row>
        </Col>
        <Col sm={2}>
          {
            program.poster_path && <img src={program.poster_path} alt="img"/>
          }
        </Col>
      </Form.Row>
    </ListGroup.Item>
  );
}
