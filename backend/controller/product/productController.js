const Product = require('../../model/product');
const Category = require('../../model/category');
//gets all products
module.exports.getAllProducts = async(req, res)=> {
    try {
    const products = await Product.find();
    res.status(200).json({
        
      "products":  products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}


//create a product
module.exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, categoryId, image } = req.body;
    console.log(req.body);
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid categoryId. Category not found.' });
    }

    // Create a new product
    const newProduct = new Product({ name, price, description, category: categoryId });
    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//update a product
module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, categoryId } = req.body;

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid categoryId. Category not found.' });
    }

    // Update the product by ID
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category: categoryId },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
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
