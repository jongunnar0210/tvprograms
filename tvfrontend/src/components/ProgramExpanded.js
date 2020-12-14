import React, { useContext } from 'react'
import '../App.css';
import { ListGroup, Form, Col } from "react-bootstrap";
import Bannad from './Bannad';
import { ProgramsContext } from "./Context";
import { useSpring, animated, config } from "react-spring";

export default function ProgramExpanded({program, index}) {
  const { expandedIndex, set_expandedIndex } = useContext(ProgramsContext);
  const downProps = useSpring({ from: { opacity: 0, marginTop: -50 }, opacity: 1, config: config.gentle, marginTop: 0 });
  // const li1Props = useSpring({ from: { opacity: 0, marginTop: -50 }, opacity: 1, config: config.wobbly, marginTop: 0 });
  // const li2Props = useSpring({ from: { opacity: 0, marginTop: -50 }, opacity: 1, config: config.stiff, marginTop: 0 });
  // const li3Props = useSpring({ from: { opacity: 0, marginTop: -50 }, opacity: 1, config: config.slow, marginTop: 0 });
  const titleProps = useSpring({ from: { marginLeft: -100 }, friction: 40, config: config.gentle, marginLeft: 0 });
  const posterProps = useSpring({ from: { transform: 'rotateX(180deg)' }, friction: 40, config: config.slow, transform: 'rotateX(0deg)' });

  function handleClick() {
    if (expandedIndex === index) {
      set_expandedIndex(-1);
    } else {
      set_expandedIndex(index);
    }
  }

  function getThattaTexti() {
    if (program.thattafjoldi === 0)
      return null;
    else if (program.thattafjoldi < program.thattur)
      return <li>Þáttur {program.thattur}</li>

    return <li>Þáttur {program.thattur} af {program.thattafjoldi}</li>
  }

  return (
    <ListGroup.Item key={index} className='programExpandedList' onClick={handleClick}>
      <animated.div style={downProps}>
        <Form.Row className='align-items-center'>
          <Col lg={10} md={9}>
            <Form.Row>
              <Col>
                <animated.div style={titleProps}><h4>{program.isltitill}</h4></animated.div>
              </Col>
            </Form.Row>
              
            <Form.Row>
              <Col lg={2} sm={12}>
                <ul>
                  <li>{program.midill_heiti}</li>
                </ul>
              </Col>
              <Col lg={6} sm={12}>
                <ul>
                  <li>{program.from} - {program.to}</li>
                  {getThattaTexti()}
                  {program.vote_average != null && <li><Form.Label className='imdbLabel'>IMDb</Form.Label> {program.vote_average}</li>}
                  {program.bannad && <li><Bannad bannad={program.bannad} /></li>}
                </ul>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <animated.div style={downProps}>{program.lysing}</animated.div>
              </Col>
            </Form.Row>
          </Col>
          <Col lg={2} md={3}>
            {
              program.poster_path && <animated.div style={posterProps}><img src={program.poster_path} alt="img"/></animated.div>
            }
          </Col>
        </Form.Row>
      </animated.div>
    </ListGroup.Item>
  );
}
