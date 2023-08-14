const Product = require('../../model/product');
const Category = require('../../model/category');
//gets all products
module.exports.getAllProducts = async(req, res)=> {
    try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}


//create a product
module.exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, categoryId, image } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid categoryId. Category not found.' });
    }

    // Create a new product
    const newProduct = new Product({ name, price, description, image,category: categoryId });
    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//update a product
// Update a product
module.exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, categoryId, image } = req.body;
    const productId = req.params.id; 
    
    console.log(req.params);
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid categoryId. Category not found.' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        description,
        image,
        category: categoryId
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};


//delete a product
module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting Product:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//get product by price range

module.exports.getProductByPriceRange = async (req, res) => {
   try {
    const { minPrice, maxPrice } = req.query;
    console.log(minPrice, maxPrice);
    const parsedMinPrice = parseFloat(minPrice);
    const parsedMaxPrice = parseFloat(maxPrice);

    if (isNaN(parsedMinPrice) || isNaN(parsedMaxPrice)) {
      return res.status(400).json({ message: 'Invalid minPrice or maxPrice' });
    }

    const filteredProducts = await Product.find({
      price: { $gte: parsedMinPrice, $lte: parsedMaxPrice },
    });
    console.log(filteredProducts);
    res.json(filteredProducts);
  } catch (error) {
    console.error('Error filtering Products:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

//get product by category

module.exports.filterProductsByCategories = async (req, res) => {
  const { categories } = req.params;
  console.log(categories);
  try {
    const filteredProducts = await Product.find({ category: { $in: categories } });
    
    res.json(filteredProducts);
  } catch (error) {
    console.error('Error filtering products:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};



