const mongoose = require('mongoose');
import Category from "@models/categoryModel.js";

const createNewCategory = async (data) => {
    try {
        const newCategory = new Category(data);
        await newCategory.save();
        return {
            errCode: 0,
            message: 'Category created successfully!',
            category: newCategory,
        };
    } catch (error) {
        throw {
            errCode: 500,
            errMessage: 'Internal server error',
            error: error.message,
        };
    }
};

const getAllCategories = async () => {
    try {
        const categories = await Category.find();
        return {
            errCode: 0,
            errMessage: 'OK',
            categories,
        };
    } catch (error) {
        throw {
            errCode: 500,
            errMessage: 'Internal server error',
            error: error.message,
        };
    }
};

const getCategoryById = async (categoryId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            throw { errCode: 400, errMessage: 'Invalid category ID' };
        }

        const category = await Category.findById(categoryId);
        if (!category) {
            console.error("Category not found for ID:", categoryId);
            throw { errCode: 404, errMessage: 'Category not found' };
        }
        return category;
    } catch (e) {
        console.error("Database error:", e);
        throw {
            errCode: e.errCode || 500,
            errMessage: e.errMessage || 'Internal server error',
            error: e.message,
        };
    }
};

const updateCategoryData = async (categoryId, data) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, data, {
            new: true,
            runValidators: true,
        });
        if (!updatedCategory) {
            return { errCode: 404, errMessage: 'Category not found' };
        }
        return {
            errCode: 0,
            message: 'Category updated successfully!',
            category: updatedCategory,
        };
    } catch (error) {
        throw {
            errCode: 500,
            errMessage: 'Internal server error',
            error: error.message,
        };
    }
};

const deleteCategory = async (categoryId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return { errCode: 400, errMessage: 'Invalid Category ID' };
        }

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return { errCode: 404, errMessage: 'Category does not exist' };
        }

        return { errCode: 0, message: 'Category deleted successfully!' };
    } catch (e) {
        return { errCode: 500, errMessage: 'Internal server error', error: e.message };
    }
};

export default {
    createNewCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryData,
    deleteCategory,
};
