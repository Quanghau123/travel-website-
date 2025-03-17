import Review from '@models/reviewModel.js';
import mongoose from 'mongoose';

// Get all reviews (with optional pagination)
const getAllReviews = async (page = 1, limit = 5) => {
    try {
        const skip = (page - 1) * limit;

        const reviews = await Review.find({})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalReviews = await Review.countDocuments();

        return {
            reviews,
            currentPage: page,
            totalPages: Math.ceil(totalReviews / limit),
            totalReviews
        };
    } catch (error) {
        throw {
            errCode: 500,
            errMessage: 'Internal server error',
            error: error.message
        };
    }
};

// Get all reviews for a tour (optional: pagination)
const getReviewsByTourId = async (tourId, page = 1, limit = 5) => {
    try {
        const skip = (page - 1) * limit;
        const reviews = await Review.find({ TourId: tourId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalReviews = await Review.countDocuments({ TourId: tourId });

        return {
            reviews,
            currentPage: page,
            totalPages: Math.ceil(totalReviews / limit),
            totalReviews
        };
    } catch (error) {
        throw {
            errCode: 500,
            errMessage: 'Internal server error',
            error: error.message
        };
    }
};

// Create review
const createReview = async (data) => {
    try {
        const newReview = new Review(data);
        await newReview.save();

        return {
            errCode: 0,
            message: 'Review created successfully!',
            review: newReview
        };
    } catch (error) {
        throw {
            errCode: 500,
            errMessage: 'Internal server error',
            error: error.message
        };
    }
};

// Update review
const updateReview = async (reviewId, data) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return { errCode: 400, errMessage: 'Invalid review ID' };
        }

        const updatedReview = await Review.findByIdAndUpdate(reviewId, data, {
            new: true,
            runValidators: true
        });

        if (!updatedReview) {
            return { errCode: 404, errMessage: 'Review not found' };
        }

        return {
            errCode: 0,
            message: 'Review updated successfully!',
            review: updatedReview
        };
    } catch (error) {
        throw {
            errCode: 500,
            errMessage: 'Internal server error',
            error: error.message
        };
    }
};

// Delete review
const deleteReview = async (reviewId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return { errCode: 400, errMessage: 'Invalid review ID' };
        }

        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return { errCode: 404, errMessage: 'Review not found' };
        }

        return {
            errCode: 0,
            message: 'Review deleted successfully!'
        };
    } catch (error) {
        return {
            errCode: 500,
            errMessage: 'Internal server error',
            error: error.message
        };
    }
};

export default {
    getAllReviews,
    getReviewsByTourId,
    createReview,
    updateReview,
    deleteReview
};
