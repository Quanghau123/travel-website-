import mongoose from 'mongoose';
import Tour from '@models/tourModel';
import Review from '@models/reviewModel';
import Category from '@models/categoryModel';

const getAllTours = async (page, limit) => {
    try {
        if (page && limit) {
            const skip = (page - 1) * limit;
            const tours = await Tour.find().skip(skip).limit(limit);
            const totalTours = await Tour.countDocuments();

            return {
                errCode: 0,
                errMessage: 'OK',
                tours,
                pagination: {
                    total: totalTours,
                    page,
                    pages: Math.ceil(totalTours / limit),
                },
            };
        } else {
            const tours = await Tour.find();
            return {
                errCode: 0,
                errMessage: 'OK',
                tours,
            };
        }
    } catch (e) {
        throw {
            errCode: 500,
            errMessage: 'Internal server error',
            error: e.message,
        };
    }
};

const getAllToursByCategory = async (categoryId, page, limit) => {
    try {
        const skip = (page - 1) * limit;

        const category = await Category.findById(categoryId);
        if (!category) {
            return { errCode: 404, errMessage: 'Category not found' };
        }

        const tours = await Tour.find({ CategoryName: category.name }).skip(skip).limit(limit);
        const totalTours = await Tour.countDocuments({ CategoryName: category.name });

        return {
            errCode: 0,
            errMessage: 'OK',
            tours,
            pagination: {
                total: totalTours,
                page,
                pages: Math.ceil(totalTours / limit),
            },
        };
    } catch (error) {
        throw {
            errCode: 500,
            errMessage: 'Internal server error',
            error: error.message,
        };
    }
};

const getTourById = async (tourId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(tourId)) {
            throw { errCode: 400, errMessage: 'Invalid tour ID' };
        }

        const tour = await Tour.findById(tourId);
        if (!tour) {
            throw { errCode: 404, errMessage: 'Tour not found' };
        }

        return tour;
    } catch (e) {
        throw {
            errCode: e.errCode || 500,
            errMessage: e.errMessage || 'Internal server error',
            error: e.message,
        };
    }
};

const createNewTour = async (data) => {
    try {
        if (!['Easy', 'Medium', 'High'].includes(data.TourDifficulty)) {
            throw { errCode: 400, errMessage: 'Invalid TourDifficulty value' };
        }

        const newTour = new Tour(data);
        await newTour.save();

        return {
            errCode: 0,
            message: 'Tour created successfully!',
            tour: newTour,
        };
    } catch (e) {
        throw { errCode: e.errCode || 500, errMessage: e.errMessage || 'Internal server error', error: e.message };
    }
};

const getTourDifficultyOptions = () => {
    const difficulties = ['Easy', 'Medium', 'High'];
    const options = difficulties.map((diff, index) => ({
        _id: index + 1,
        DifficultyLabel: diff,
    }));

    return {
        errCode: 0,
        message: 'Fetched tour difficulty options',
        options,
    };
};

const updateTourData = async (data) => {
    try {
        const { TourId, ...updateData } = data;

        if (!TourId || !mongoose.Types.ObjectId.isValid(TourId)) {
            return { errCode: 400, errMessage: 'Invalid or missing TourId' };
        }

        if (updateData.TourDifficulty && !['Easy', 'Medium', 'High'].includes(updateData.TourDifficulty)) {
            return { errCode: 400, errMessage: 'Invalid TourDifficulty value' };
        }

        // Cập nhật Tour
        const updatedTour = await Tour.findByIdAndUpdate(TourId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedTour) {
            return { errCode: 404, errMessage: 'Tour not found' };
        }

        return {
            errCode: 0,
            message: 'Tour updated successfully!',
            tour: updatedTour,
        };
    } catch (e) {
        throw { errCode: e.errCode || 500, errMessage: e.errMessage || 'Internal server error', error: e.message };
    }
};

const deleteTour = async (tourId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(tourId)) {
            return { errCode: 400, errMessage: 'Invalid tour ID' };
        }

        const deletedTour = await Tour.findByIdAndDelete(tourId);

        if (!deletedTour) {
            return { errCode: 404, errMessage: 'Tour does not exist' };
        }

        return { errCode: 0, message: 'Tour deleted successfully!' };
    } catch (e) {
        return { errCode: 500, errMessage: 'Internal server error', error: e.message };
    }
};

const searchTours = async (query) => {
    try {
        const { TourName, TourLocation, CategoryName, TourDifficulty, TourTime, TourPrice, Rating } = query;

        let filter = {};

        if (TourName) {
            filter.TourName = { $regex: TourName, $options: 'i' };
        }

        if (TourLocation) {
            filter.TourLocation = { $regex: TourLocation, $options: 'i' };
        }

        if (CategoryName) {
            filter.CategoryName = CategoryName;
        }

        if (TourDifficulty) {
            filter.TourDifficulty = TourDifficulty;
        }

        if (TourTime) {
            if (TourTime === "1") {
                filter.TourTime = 1;
            } else if (TourTime === "1-3") {
                filter.TourTime = { $gte: 1, $lte: 3 };
            } else if (TourTime === ">3") {
                filter.TourTime = { $gt: 3 };
            }
        }

        if (TourPrice) {
            filter.TourPrice = { $lte: Number(TourPrice) };
        }

        if (Rating) {
            filter.Rating = { $gte: Number(Rating) };
        }

        if (Object.keys(filter).length === 0) {
            return {
                errCode: 400,
                errMessage: 'No valid filters provided',
            };
        }

        const tours = await Tour.find(filter);

        return {
            errCode: 0,
            errMessage: 'OK',
            tours,
        };
    } catch (e) {
        throw {
            errCode: 500,
            errMessage: 'Internal server error',
            error: e.message,
        };
    }
};

export default {
    getAllTours,
    getAllToursByCategory,
    getTourById,
    createNewTour,
    getTourDifficultyOptions,
    updateTourData,
    deleteTour,
    searchTours,
};
