import React, { useContext } from 'react'
import { useEffect, useState } from "react";
import '../App.css';
import { ListGroup, Form, Col } from "react-bootstrap";
import ProgramExpanded from './ProgramExpanded';
import ProgramCollapsed from './ProgramCollapsed';
import { ProgramsContext } from "./Context";

export default function ProgramList({programs}) {
  const { expandedIndex } = useContext(ProgramsContext);

  return (
    <ListGroup>
      <ListGroup.Item key='listgroupHeader' className='listgroupHeader'>
        <Form.Row className='align-items-center'>
          <Col sm={1}>
            <Form.Label>TÍMI</Form.Label>
          </Col>

          <Col sm={5}>
            <Form.Label>DAGSKRÁRLIÐUR</Form.Label>
          </Col>

          <Col sm={6}>
            <Form.Label>NÁNAR</Form.Label>
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
