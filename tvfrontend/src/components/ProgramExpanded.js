import React from 'react'
import { useEffect, useState } from "react";
import '../App.css';
import { ListGroup, Form, Col } from "react-bootstrap";

// Main component
export default function ProgramExpanded({program, index}) {
  return (
    <ListGroup.Item key={index} className='programExpandedList'>
      <Form.Row>
        <Col>
          <h4>{program.isltitill}</h4>
        </Col>
      </Form.Row>
        
      <Form.Row>
        <Col sm={7}>
          <Form.Row>
            <Col sm={2}>
              {program.midill_heiti}
            </Col>
            <Col sm={2}>
              {program.from} - {program.to}
            </Col>
            <Col sm={2}>
              {program.thattur} af {program.thattafjoldi}
            </Col>
            <Col sm={2}>
              {program.bannad}
            </Col>
            <Col sm={3}>
              IMDB Rating: {program.vote_average}
            </Col>
          </Form.Row>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          {program.lysing}
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
