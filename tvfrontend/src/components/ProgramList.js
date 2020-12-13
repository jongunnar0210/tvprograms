import React from 'react'
import { useEffect, useState } from "react";
import '../App.css';
import { ListGroup } from "react-bootstrap";
import ProgramExpanded from './ProgramExpanded';

export default function ProgramList({programs}) {
  return (
    <ListGroup>
      {programs.map((program, index) =>
        <ProgramExpanded program={program} index={index} key={index} />
      )}
    </ListGroup>
  );
}
