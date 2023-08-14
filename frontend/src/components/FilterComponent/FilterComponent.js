import React, { useState,useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useGetCategoryQuery, useFilterProductsMutation,useFilterProductsByCategoriesMutation } from '../../app/api/apiSlice';
import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setSelectedCategories, setPriceRange, resetAllData } from '../../app/filter';
import './FilterComponent.css';


function FilterComponent() {
  const dispatch = useDispatch();

  const [minPrice,setMinPrice] = useState(0);
  const [maxPrice,setMaxPrice] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [radioOption, setRadioOption] = useState('');
  //redux slice
  const { data: categories, isLoading, isError, isSuccess } = useGetCategoryQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching categories</p>;
  }

  if(isSuccess){
    console.log(categories);
  }


  const handleCategoryToggle = (categoryId) => {

    const selectedCategories = [categoryId]; // You
    console.log(selectedCategories);
    setRadioOption(categoryId);
    dispatch(setSelectedCategories(selectedCategories));
  }

  const handlePriceRangeChange = () => {
    if(minPrice && maxPrice){ 
      dispatch(setPriceRange({ minPrice, maxPrice }));
    }else {
      alert('Please enter valid price range');
    }
  };


  const resetFilter = () => {
    dispatch(resetAllData());
    setMinPrice(''); 
    setMaxPrice('');
    setRadioOption('');
  }

  return (
     <>
      <Col md={3} className="p-3">
        <div className='mt-5'>
          <h3>Filter</h3>
          <Form.Group>
          
            {categories.map((category) => (
                <div key={category._id} className='categoryName'>
                  <input type='radio'  name='selectedCategory'
                  value = {category._id}  onChange={() => handleCategoryToggle(category._id)}/> {category.name}
                </div>
              ))} 

          </Form.Group>
           <Form.Group>
        <Form.Label className="customLabelClass">Pricing Range </Form.Label>
          <br /><br />
          <div className='pricingRange'>
            Min: <input type='text' className='inputBox' value={minPrice}  placeholder='$0' onChange={(e)=>setMinPrice(e.target.value)} /> 
            Max: <input type='text' className='inputBox' value={maxPrice} placeholder='$999999' onChange={(e)=>setMaxPrice(e.target.value)} /> 
          </div>
          <div className="buttonContainer">
            <input type='button' className="filterButton" value='Filter Out' onClick={handlePriceRangeChange} />
            <input type='button' className="resetButton" value='Reset' onClick={resetFilter} />
          </div>
          <br /><br />
        </Form.Group>    
        </div>
      </Col>
    </>
  );
}

export default FilterComponent;
