import React from 'react'
import { useEffect, useState } from "react";
import '../App.css';
import { ListGroup } from "react-bootstrap";

// Main component
export default function ProgramExpanded({program, index}) {
  return (
    <ListGroup.Item key={index}>
      <div>
        {program.isltitill} {program.upphaf} {program.thattur} af {program.thattafjoldi} {program.bannad} {program.lysing} {program.midill_heiti} {program.from} {program.to} IMDB Rating: {program.vote_average}
      </div>
      {
        program.poster_path && <div>
          <img src={program.poster_path} alt="img"/>
        </div>
      }
    </ListGroup.Item>
  );
}
