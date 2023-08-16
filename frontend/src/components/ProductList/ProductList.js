import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


import { useGetProductsQuery, useGetFilterProductsQuery, useGetFilterProductsByCategoriesQuery } from '../../app/api/apiSlice';

import { addItemToCart } from '../../app/cart';

import { useSelector,useDispatch } from 'react-redux';

function ProductList() {
  const dispatch = useDispatch();

  const selectedCategories = useSelector(state => state.filters.selectedCategories);
  const minPrice = useSelector(state => state.filters.minPrice);
  const maxPrice = useSelector(state => state.filters.maxPrice);
  
  let productQuery;
 
   if (minPrice && maxPrice) {
    // alert(minPrice + " " + maxPrice);
    console.log(minPrice);
    console.log(maxPrice);
    productQuery = useGetFilterProductsQuery({ range: { minPrice, maxPrice } } );
  } else if (selectedCategories.length > 0) {
    // alert(selectedCategories);
    
    productQuery = useGetFilterProductsByCategoriesQuery(selectedCategories);
  } else {
    console.log(`It is working fine!`);
  
    productQuery = useGetProductsQuery();
  }
  

  const { data: products, isLoading, isError, isSuccess } = productQuery;

  const handleAddToCart = (product) => {
    console.log(product);
    console.log('added to cart');
    dispatch(addItemToCart(product));
  }
 
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.log('Error' + isError);
    return <p>Error fetching products</p>;
  }
  if (isSuccess) {
    console.log(products);
    
  }
  
    return (
      <Container>
        <h1 className="my-4">Product List</h1>
        <Row>
            {products.length > 0 ? (
              
              products.map((product) => (
               
                <Col key={product.id} xs={12} md={6} lg={4}>
                  <Card className="mb-4">
                    <Card.Img variant="top" src={product.image} alt={product.name} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text>Price: ${product.price}</Card.Text>

                      <Button
                        variant="primary"
                        onClick={() => handleAddToCart({...product,quantity:1})}
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No Product found</p>
            )}

        </Row>
      </Container>
    );

}

export default ProductList;
