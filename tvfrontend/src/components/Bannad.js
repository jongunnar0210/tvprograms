import React from 'react'
import '../App.css';
import { Form  } from "react-bootstrap";

export default function Bannad({bannad}) {
  function getBannadClassName() {
    if (bannad === 'Green') {
      return 'bannad bannadGreen';
    } else if (bannad === 'Yellow') {
      return 'bannad bannadYellow';
    } else {
      return 'bannad bannadRed';
    }
  }
  
  function getBannadText() {
    if (bannad === 'Green') {
      return 'L';
    } else if (bannad === 'Yellow') {
      return '12';
    } else {
      return '16';
    }
  }

  return (
    <Form.Label className={getBannadClassName()}>{getBannadText()}</Form.Label>
  );
}
