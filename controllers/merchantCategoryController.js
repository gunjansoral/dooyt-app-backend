// Assume we have a MerchantCategory model that interacts with the database
const MerchantCategory = require('../models/MerchantCategory');

exports.getMerchantCategories = async (req, res) => {
  try {
    const categories = await MerchantCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

exports.getMerchantCategory = async (req, res) => {
  try {
    const category = await MerchantCategory.findById(req.params.category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
};

exports.createMerchantCategory = async (req, res) => {
  try {
    const newCategory = new MerchantCategory(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

exports.updateMerchantCategory = async (req, res) => {
  try {
    const updatedCategory = await MerchantCategory.findByIdAndUpdate(req.params.category_id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

exports.deleteMerchantCategory = async (req, res) => {
  try {
    const deletedCategory = await MerchantCategory.findByIdAndRemove(req.params.category_id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
