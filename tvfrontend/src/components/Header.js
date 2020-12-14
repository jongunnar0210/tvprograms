import React from 'react'
import '../App.css';
import { Form, Image } from "react-bootstrap";
import LogoImage from '../multicolor-holiday-christmas-decorations-with-blue-silver-ribbon-snowflakes-header-background-hd-1920x720.jpg';

var sectionStyle = {
   backgroundImage: `url(${LogoImage})`
}

export default function Header({program, index}) {
  return (
    <header style={sectionStyle}>
      <ul>
        <li key='header1'>
          <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Vodafone_icon.svg/1020px-Vodafone_icon.svg.png' />
        </li>
        <li key='header2'>
          <Form.Label>Dagskrá</Form.Label>
        </li>
      </ul>
    </header>
  );
}
