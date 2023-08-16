import React from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Header.css';
function Header() {
  const cart = useSelector(state => state.cart.items);
  return (
    <Navbar bg="light" variant="light">
  <Container>
    <Navbar.Brand>eCommerce App</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-nav" />
    <Navbar.Collapse id="navbar-nav">
      <Row className="w-100">
        <Col xs={12} className="d-flex justify-content-end">
          <NavLink to={"/cart"} className="cartButton">
            Cart{ cart.length > 0 ?  <span className="redColor">{cart.length}</span> : null }
          </NavLink>
          <NavLink to={"/transactions"} className="transactions" >
            Transactions
          </NavLink>
        </Col>
      </Row>
    </Navbar.Collapse>
  </Container>
</Navbar>



  );
}

export default Header;
