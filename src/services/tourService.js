import Tour from '@models/tourModel.js'; 
import mongoose from 'mongoose';

const getAllTours = async () => {
    try {
        const tours = await Tour.find();
        return tours;
    } catch (e) {
        throw {
            errCode: 500,
            errMessage: 'Internal server error',
            error: e.message,
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
            throw {
                errCode: 400,
                errMessage: 'Invalid TourDifficulty value',
            };
        }

        const newTour = new Tour(data);
        await newTour.save();

        return {
            errCode: 0,
            message: 'Tour created successfully!',
            tour: newTour,
        };
    } catch (e) {
        throw {
            errCode: e.errCode || 500,
            errMessage: e.errMessage || 'Internal server error',
            error: e.message,
        };
    }
};

const updateTourData = async (data) => {
    try {
        const { TourId, ...updateData } = data;
        console.log('TourId:', TourId);
        console.log('IsValid:', mongoose.Types.ObjectId.isValid(TourId));        
        if (!TourId || !mongoose.Types.ObjectId.isValid(TourId)) {
            return {
                errCode: 400,
                errMessage: 'Invalid or missing TourId',
            };
        }

        if (updateData.TourDifficulty && !['Easy', 'Medium', 'High'].includes(updateData.TourDifficulty)) {
            return {
                errCode: 400,
                errMessage: 'Invalid TourDifficulty value',
            };
        }

        const updatedTour = await Tour.findByIdAndUpdate(TourId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedTour) {
            return {
                errCode: 404,
                errMessage: 'Tour not found',
            };
        }

        return {
            errCode: 0,
            message: 'Tour updated successfully!',
            tour: updatedTour,
        };
    } catch (e) {
        throw {
            errCode: e.errCode || 500,
            errMessage: e.errMessage || 'Internal server error',
            error: e.message,
        };
    }
};

const deleteTour = async (tourId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(tourId)) {
            return {
                errCode: 400,
                errMessage: 'Invalid tour ID',
            };
        }

        const deletedTour = await Tour.findByIdAndDelete(tourId);

        if (!deletedTour) {
            return {
                errCode: 404,
                errMessage: 'Tour does not exist',
            };
        }

        return {
            errCode: 0,
            message: 'Tour deleted successfully!',
        };
    } catch (e) {
        return {
            errCode: 500,
            errMessage: 'Internal server error',
            error: e.message,
        };
    }
};

const searchTours = async (query) => {
    try {
        const { TourName, TourLocation, CategoryName, TourDifficulty } = query;

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
    getTourById,
    createNewTour,
    updateTourData,
    deleteTour,
    searchTours,
};
