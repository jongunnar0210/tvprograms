import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import { Form, Col, Row } from "react-bootstrap";
import moment from "moment";
import ProgramList from './ProgramList';
import Header from './Header';
import { Fragment } from 'react';
import { ProgramsContext } from "./Context";

// Main component
export default function MainPage() {
  const [programs, set_programs] = useState([]);
  const [dates, set_dates] = useState([]);
  const [channels, set_channels] = useState([]);
  const [selectedDate, set_selectedDate] = useState('');
  const [selectedChannel, set_selectedChannel] = useState('');
  const [expandedIndex, set_expandedIndex] = useState(-1);

  const DATE_FORMAT = 'YYYY-MM-DD';

  //const ProgramsContext = createContext();

  useEffect(() => {
    async function fetchInitialData() {
      // Populate the date dropdown list of dates from today to one week into the future:
      let theDates = [];
      let aDate = new Date();
      theDates.push(moment(aDate).format(DATE_FORMAT));
      for (let index = 0; index < 7; index++) {
        aDate.setDate(aDate.getDate() + 1);
        theDates.push(moment(aDate).format(DATE_FORMAT));
      }
      set_dates(theDates);

      // Set the selected date to today:
      const selInitialDate = theDates[0];
      set_selectedDate(selInitialDate);

      // Populate the channel dropdown list:
      try {
        let response = await axios.get('/channels');
        
        let theChannels = response.data;
        theChannels.push("RÚV");  // Add our extra channel, RÚV.
        set_channels(response.data);

        // Set the selected channel:
        if (theChannels.length > 0) {
          const selChannel = theChannels[0];
          set_selectedChannel(selChannel);

          // Populate the main tv program list:
          response = await axios.get(`/programs/${selChannel}/${selInitialDate}`);
          // response.data.forEach(program => {
          //   program.expanded = false;
          // });
          set_programs(response.data);
        }
      } catch (error) {
        console.log('Error getting channels: ' + error);
      }
    }

    fetchInitialData();
  }, []);

  async function fetchProgramList(channel, date) {
    set_programs([]);

    // Populate the main tv program list:
    const response = await axios.get(`/programs/${channel}/${date}`);
    // response.data.forEach(program => {
    //   program.expanded = false;
    // });
    set_programs(response.data);
  }

  function changeDate(date) {
    console.log('Changed date to ' + date);
    set_selectedDate(date);

    fetchProgramList(selectedChannel, date);
  }

  function changeChannel(channel) {
    console.log('Changed channel to ' + channel + ' selectedDate: ' + selectedDate);
    set_selectedChannel(channel);

    fetchProgramList(channel, selectedDate);
  }

  // function toggleExpanded(index) {
  //   console.log('in main toggle. programs length: ' + programs.length);
  //   let copyPrograms = [...programs];
  //   if (index < copyPrograms.length && copyPrograms[index].expanded != null) {
  //     copyPrograms[index].expanded = !copyPrograms[index].expanded;
  //     set_programs(copyPrograms);
  //   }
  // }

  return (
    <Fragment>
      <Header></Header>
      <ProgramsContext.Provider value={{ expandedIndex, set_expandedIndex }}>
        <div className='mainPage'>
          <Form.Group as={Row} controlId='dropdownListsRow'>
            <Col sm={4}>
              <Form.Control as='select' value={selectedDate} onChange={e => changeDate(e.target.value)}>
                {dates.map(d => <option key={d} value={d}>{d}</option>)}
              </Form.Control>        
            </Col>
            <Col sm={4}>
              <Form.Control as='select' value={selectedChannel} onChange={e => changeChannel(e.target.value)}>
                {channels.map(c => <option key={c} value={c}>{c}</option>)}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='programListRow'>
            <Col sm={12}>
              {
                programs.length > 0 ? (<ProgramList programs={programs}/>) : (<Form.Label className='labelLoading'>Sæki efni...</Form.Label>)
              }
              <ProgramList programs={programs} />
            </Col>
          </Form.Group>
        </div>
      </ProgramsContext.Provider>
    </Fragment>
  )
}
