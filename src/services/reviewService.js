import Review from '@models/reviewModel.js';
import Tour from '@models/tourModel.js';
import mongoose from 'mongoose';

async function updateTourTotalRating(tourId) {
    const reviews = await Review.find({ TourId: tourId });
    if (reviews.length === 0) {
        await Tour.findByIdAndUpdate(tourId, { TotalRating: 0 });
        return;
    }

    const total = reviews.reduce((sum, r) => sum + r.Rating, 0);
    const avg = Math.round((total / reviews.length) * 10) / 10;

    await Tour.findByIdAndUpdate(tourId, { TotalRating: avg });
}

const getAllReviews = async (page = 1, limit = 6) => {
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

const getReviewsByTourId = async (tourId, page = 1, limit = 6) => {
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

const createReview = async (data) => {
    try {
        const newReview = new Review(data);
        await newReview.save();

        await updateTourTotalRating(newReview.TourId);
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

        await updateTourTotalRating(updatedReview.TourId);
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

const deleteReview = async (reviewId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return { errCode: 400, errMessage: 'Invalid review ID' };
        }

        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return { errCode: 404, errMessage: 'Review not found' };
        }

        await updateTourTotalRating(deletedReview.TourId);
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
