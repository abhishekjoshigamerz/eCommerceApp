
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header/Header';

import ProductList from './components/ProductList/ProductList'; 
import FilterComponent from './components/FilterComponent/FilterComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
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

export default App;
