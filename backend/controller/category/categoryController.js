const Category = require('../../model/category'); 

module.exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//create a category
// Create a new category
module.exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the category name already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category name already exists' });
    }

    // Create a new category
    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//update a category

// Update a category by ID
module.exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true } // Return the updated category
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//delete a category

// Delete a category by ID
module.exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    await Product.deleteMany({ category: id });
    
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};
