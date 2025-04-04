import categoryService from '@services/categoryService';

const handleCreateCategory = async (req, res) => {
    try {
        const data = req.body;
        const result = await categoryService.createNewCategory(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errCode: 500,
            errMessage: 'Internal server error',
            error: error.message,
        });
    }
};

const handleGetCategories = async (req, res) => {
    try {
        const result = await categoryService.getAllCategories();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errCode: 500,
            errMessage: 'Internal server error',
            error: error.message,
        });
    }
};

const handleGetCategory = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        });
    }

    try {
        let category = await categoryService.getCategoryById(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            category
        });
    } catch (e) {
        return res.status(e.errCode || 500).json({
            errCode: e.errCode || 1,
            errMessage: e.errMessage || "Category not found",
            error: e.error || e.message
        });
    }
};

const handleUpdateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const data = req.body;
        const result = await categoryService.updateCategoryData(categoryId, data);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errCode: 500,
            errMessage: 'Internal server error',
            error: error.message,
        });
    }
};

const handleDeleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const result = await categoryService.deleteCategory(categoryId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errCode: 500,
            errMessage: 'Internal server error',
            error: error.message,
        });
    }
};

export default {
    handleCreateCategory,
    handleGetCategories,
    handleGetCategory,
    handleUpdateCategory,
    handleDeleteCategory,
};
