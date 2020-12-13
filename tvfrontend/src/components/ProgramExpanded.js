import React from 'react'
import { useEffect, useState } from "react";
import '../App.css';
import { ListGroup, Form, Col } from "react-bootstrap";

// Main component
export default function ProgramExpanded({program, index}) {
  return (
    <ListGroup.Item key={index} className='programExpandedList'>
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
                <li>{program.thattur} af {program.thattafjoldi}</li>
                <li>IMDB Rating: {program.vote_average}</li>
                <li>{program.bannad}</li>
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

      {/* <div>
        {program.upphaf}
      </div>
      {
        program.poster_path && <div>
          <img src={program.poster_path} alt="img"/>
        </div>
      } */}
    </ListGroup.Item>
  );
}
