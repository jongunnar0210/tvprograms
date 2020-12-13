import React, { useContext } from 'react'
import { useEffect, useState } from "react";
import '../App.css';
import { ListGroup } from "react-bootstrap";
import ProgramExpanded from './ProgramExpanded';
import ProgramCollapsed from './ProgramCollapsed';
import { ProgramsContext } from "./Context";

export default function ProgramList({programs}) {
  const { expandedIndex } = useContext(ProgramsContext);

  return (
    <ListGroup>
      {programs.map((program, index) =>
        index === expandedIndex ?
          <ProgramExpanded program={program} index={index} key={index} /> :
          <ProgramCollapsed program={program} index={index} key={index} />
      )}
    </ListGroup>
  );
}
