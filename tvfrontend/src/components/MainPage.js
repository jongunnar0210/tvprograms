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
    // Populate the date dropdown list of dates from yesterday to one week into the future:
    let theDates = [];
    let aDate = new Date();
    aDate.setDate(aDate.getDate() - 1);
    theDates.push(moment(aDate).format(DATE_FORMAT));
    for (let index = 0; index < 8; index++) {
      aDate.setDate(aDate.getDate() + 1);
      theDates.push(moment(aDate).format(DATE_FORMAT));
    }
    set_dates(theDates);

    // Set the selected date to today:
    const selInitialDate = theDates[1];
    set_selectedDate(selInitialDate);

    console.log('Getting the channels...');
    // Populate the channel dropdown list:
    axios.get('/channels').then(response => {
      let theChannels = response.data;
      theChannels.push("RÚV");  // Add our extra channel, RÚV.
      set_channels(response.data);

      // Set the selected channel:
      if (theChannels.length > 0) {
        const selChannel = theChannels[0];
        set_selectedChannel(selChannel);

        // Populate the main tv program list:
        axios.get(`/programs/${selChannel}/${selInitialDate}`).then(response => {
          console.log(JSON.stringify(response));
          set_programs(response.data);
        });
      }
    });
  }, []);

  function changeDate(date) {
    console.log('Changed date to ' + date);
    set_selectedDate(date);

    // Populate the main tv program list:
    axios.get(`/programs/${selectedChannel}/${date}`).then(response => {
      set_programs(response.data);
    });
  }

  function changeChannel(channel) {
    console.log('Changed channel to ' + channel + ' selectedDate: ' + selectedDate);
    set_selectedChannel(channel);

    // Populate the main tv program list:
    axios.get(`/programs/${channel}/${selectedDate}`).then(response => {
      set_programs(response.data);
    });
  }

  return (
    <Form className='mainPage'>
      <Form.Group as={Row} controlId='dropdownListsRow'>
        <Col sm={6}>
          <Form.Control as='select' value={selectedDate} onChange={e => changeDate(e.target.value)}>
            {dates.map(d => <option key={d} value={d}>{d}</option>)}
          </Form.Control>        
        </Col>
        <Col sm={6}>
          <Form.Control as='select' value={selectedChannel} onChange={e => changeChannel(e.target.value)}>
            {channels.map(c => <option key={c} value={c}>{c}</option>)}
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId='programListRow'>
        <ListGroup>
          {programs.map((p, index) => <ListGroup.Item key={index}>
            {p.isltitill} {p.upphaf} {p.thattur} af {p.thattafjoldi}
          </ListGroup.Item>)}
        </ListGroup>
      </Form.Group>
    </Form>
  )
}
