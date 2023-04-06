import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './MainContent.css';
import FormSegment from '../FormSegment/FormSegment';

function MainContent() {
  //state for rendering popup
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className='button' onClick={handleShow}>
        Save Segment
      </button>
      <Offcanvas show={show} onHide={handleClose} placement='end' backdrop="static">
        <Offcanvas.Header closeButton closeVariant='white'>
          <Offcanvas.Title>Saving Segment</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormSegment/>         
        </Offcanvas.Body>
      </Offcanvas>
      
    </>
  );
}

export default MainContent