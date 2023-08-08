import React from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>eCommerce App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Row className="w-100">
          
            <Col xs={12} className="text-end">
              <span>Cart Box</span>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
