import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';

import ProductList from '../ProductList/ProductList'; 
import FilterComponent from '../FilterComponent/FilterComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
const Home = () => {

return (
    <Container fluid>
     
      <Header />
      <Row>
         <Col md={3}>
          <FilterComponent />
         </Col>
        <Col md={9}>
          <ProductList />
        </Col> 
      </Row>
    </Container>
  );

}

export default Home;