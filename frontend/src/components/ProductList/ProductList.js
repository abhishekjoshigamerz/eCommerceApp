import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useGetProductsQuery } from '../../app/api/apiSlice';

function ProductList({finalFilteredProducts,resetedFilteredProducts}) {
  
  if (!resetedFilteredProducts) {

    return (
        <Container>
        <h1 className="my-4">Product List</h1>
        <Row>
          {finalFilteredProducts.map((product) => (
            <Col key={product.id} xs={12} md={6} lg={4}>
              <Card className="mb-4">
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );

  }else if ( resetedFilteredProducts && finalFilteredProducts.length == 0) {
    
  const { data: products, isLoading, isError, isSuccess } = useGetProductsQuery();

  const handleAddToCart = (productId) => {
    // Implement your logic here to add the product to the cart
    console.log(`Product with ID ${productId} added to cart`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching products</p>;
  }
    return (
      <Container>
        <h1 className="my-4">Product List</h1>
        <Row>
          {products.products.map((product) => (
            <Col key={product.id} xs={12} md={6} lg={4}>
              <Card className="mb-4">
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  

  
}

export default ProductList;
