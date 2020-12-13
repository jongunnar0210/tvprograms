import React from 'react'
import { useEffect, useState } from "react";
import '../App.css';
import { ListGroup } from "react-bootstrap";
import ProgramExpanded from './ProgramExpanded';
import ProgramCollapsed from './ProgramCollapsed';

export default function ProgramList({programs, toggleExpanded}) {
  return (
    <ListGroup>
      {programs.map((program, index) =>
        program.expanded ?
          <ProgramExpanded program={program} index={index} key={index} toggleExpanded={toggleExpanded} /> :
          <ProgramCollapsed program={program} index={index} key={index} toggleExpanded={toggleExpanded} />
      )}
    </ListGroup>
  );
}
