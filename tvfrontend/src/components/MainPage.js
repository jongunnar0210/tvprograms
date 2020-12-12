import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import { Form, Col, ListGroup, Row } from "react-bootstrap";
import moment from "moment";

export default function MainPage() {
  const [programs, set_programs] = useState([]);
  const [dates, set_dates] = useState([]);
  const [channels, set_channels] = useState([]);
  const [selectedDate, set_selectedDate] = useState('');
  const [selectedChannel, set_selectedChannel] = useState('');

  const DATE_FORMAT = 'YYYY-MM-DD';

  useEffect(() => {
    // Populate the date dropdown list:
    let theDates = [];
    let aDate = new Date();
    aDate.setDate(aDate.getDate() - 1);
    theDates.push(moment(aDate).format(DATE_FORMAT));
    for (let index = 0; index < 8; index++) {
      aDate.setDate(aDate.getDate() + 1);
      theDates.push(moment(aDate).format(DATE_FORMAT));
    }
    set_dates(theDates);

    // Populate the channel dropdown list:
    axios.get('/channels').then(response => {
      let theChannels = response.data;
      theChannels.push("RÚV");  // Add our extra channel, RÚV.
      set_channels(response.data);
    });

    // Populate the main tv program list:
    axios.get('/programs/stod2/2020-12-10').then(response => {
      //console.log(response.data[1].isltitill);
      set_programs(response.data);
    });
  }, []);

  return (
    <Form className='mainPage'>
      <Form.Group as={Row} controlId='dropdownListsRow'>
        <Col sm={6}>
          <Form.Control as='select'>
            {dates.map(d => <option key={d} value={d}>{d}</option>)}
          </Form.Control>        
        </Col>
        <Col sm={6}>
          <Form.Control as='select'>
            {channels.map(c => <option key={c} value={c}>{c}</option>)}
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId='programListRow'>
        <ListGroup>
          {programs.map((p, index) => <ListGroup.Item key={index}>{p.isltitill} {p.upphaf}</ListGroup.Item>)}
        </ListGroup>
      </Form.Group>
    </Form>
  )
}
