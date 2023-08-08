// import React from 'react';
// import { Container } from 'react-bootstrap';
// import Header from './components/Header/Header';
// import ProductList from './components/ProductList/ProductList';
// import { store } from './app/store';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <Container fluid>
//       <Header />
//       <ProductList />
//     </Container>
//   );
// }

// export default App;
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header/Header';

import FilterComponent from './components/FilterComponent/FilterComponent'; // Import your FilterComponent
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container fluid>
      <Header />
      <Row>
      
          <FilterComponent /> {/* Display your FilterComponent */}
        
        
      </Row>
    </Container>
  );
}

export default App;
