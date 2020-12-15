import React, { useContext } from 'react'
import { useEffect, useState } from "react";
import '../App.css';
import { ListGroup, Form, Col } from "react-bootstrap";
import ProgramExpanded from './ProgramExpanded';
import ProgramCollapsed from './ProgramCollapsed';
import { ProgramsContext } from "./Context";

export default function ProgramList({programs}) {
  const { expandedIndex } = useContext(ProgramsContext);

  //console.log('programs: ' + JSON.stringify(programs));

  return (
    <ListGroup>
      <ListGroup.Item key='listgroupHeader' className='listgroupHeader'>
        <Form.Row className='align-items-center'>
          <Col lg={1} className="d-none d-lg-block">
            <Form.Label>TÍMI</Form.Label>
          </Col>

          <Col lg={3} className="d-none d-lg-block">
            <Form.Label>DAGSKRÁRLIÐUR</Form.Label>
          </Col>

          <Col lg={3} className="d-none d-lg-block">
            <Form.Label>NÁNAR</Form.Label>
          </Col>

          <Col lg={5} className="d-none d-lg-block">
            <Form.Label>LÝSING</Form.Label>
          </Col>
        </Form.Row>
      </ListGroup.Item>

      {programs.map((program, index) =>
        index === expandedIndex ?
          <ProgramExpanded program={program} index={index} key={index} /> :
          <ProgramCollapsed program={program} index={index} key={index} />
      )}
    </ListGroup>
  );
}
