import React, { useState,useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useGetCategoryQuery, useFilterProductsMutation,useFilterProductsByCategoriesMutation } from '../../app/api/apiSlice';
import { Col } from 'react-bootstrap';

import ProductList from '../ProductList/ProductList';


function FilterComponent() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999999);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { data: categories, isLoading, isError } = useGetCategoryQuery();
  const [resetedFilteredProducts,setresetedFilteredProducts] = useState(true);
  const [finalFilteredProducts, setFinalFilteredProducts] = useState([]);

  const [filterProducts, { data: filteredProducts, isLoading: productsLoading, isError: productsError, isSuccess: filterSuccess }] = useFilterProductsMutation();

  const [filterProductsByCategories, { data: filteredProductsByCategories, isLoading: productsLoadingByCategories, isError: productsErrorByCategories, isSuccess: filterSuccessByCategories }] = useFilterProductsByCategoriesMutation();


//   const handleCategoryToggle = async(categoryId) => {
    
//     console.log(categoryId + " " + selectedCategories);

//     if(selectedCategories.includes(categoryId)){
//       alert("Already Selected");

//     }else{
//         if(selectedCategories.length == 0){
//             setSelectedCategories([categoryId]);
//             console.log(selectedCategories);
//         }else{
//             console.log(selectedCategories);
//             setSelectedCategories([...selectedCategories,categoryId]);
//             console.log(selectedCategories);
//         }
        
//     }
// };

const handleCategoryToggle = async (categoryId) => {

        
  setSelectedCategories((prevSelectedCategories) => {
    const newSelectedCategories = prevSelectedCategories.includes(categoryId)
      ? prevSelectedCategories.filter((id) => id !== categoryId)
      : [...prevSelectedCategories, categoryId];

    console.log(categoryId + " " + newSelectedCategories);

    return newSelectedCategories;
  });
};








  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching products</p>;
  }

  const handleFilter = async () => {
    try {
      const result = await filterProducts({
        minPrice,
        maxPrice,
      });

      console.log('Filtered Products:', result);
      finalFilteredProducts(result.data);
      setresetedFilteredProducts(false);
    } catch (error) {
      console.error('Error filtering products:', error);
    }
  };

  const resetFilter = async () => {
    setresetedFilteredProducts(true);

  };


  return (
    <>
    <Col md={3} className="p-3">
    <div className='mt-5'>
      <h3>Filter</h3>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        {categories.map((category) => (
          <Form.Check
            key={category.id}
            type="checkbox"
            id={category._id}
            value={category._id}
            label={category.name}
            
            onChange={() => handleCategoryToggle(category._id)}
          />
        ))}
      </Form.Group>
      <Form.Group>
        <Form.Label>Pricing Range</Form.Label>
        <br />
        <input type='text' value={minPrice} onChange={e => setMinPrice(e.target.value)} /> <br /><br />
        <input type='text' value={maxPrice} onChange={e => setMaxPrice(e.target.value)} /> <br /><br />
        <input type='button' value='Filter Out' onClick={handleFilter} />
        <input type='button' value='Filter Out' onClick={resetFilter} />    
         <br /><br />
      </Form.Group>
    </div>
    </Col>
    <Col md={9} className="p-3">
          <ProductList finalFilteredProducts={finalFilteredProducts} resetedFilteredProducts={resetedFilteredProducts} /> {/* Display your ProductList */}
    </Col>
    </>
  );
}

export default FilterComponent;
