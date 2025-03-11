import ReviewService from '@services/reviewService.js';

let handleGetReviewsByTourId = async (req, res) => {
    const tourId = req.params.tourId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
        const result = await ReviewService.getReviewsByTourId(tourId, page, limit);

        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            ...result
        });
    } catch (error) {
        return res.status(500).json({
            errCode: error.errCode || 2,
            errMessage: error.errMessage || 'An error occurred'
        });
    }
};

let handleCreateReview = async (req, res) => {
    try {
        const data = req.body;

        const result = await ReviewService.createReview(data);

        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({
            errCode: error.errCode || 2,
            errMessage: error.errMessage || 'An error occurred'
        });
    }
};

let handleUpdateReview = async (req, res) => {
    const reviewId = req.params.id;
    try {
        const result = await ReviewService.updateReview(reviewId, req.body);

        return res.status(result.errCode === 0 ? 200 : 400).json(result);
    } catch (error) {
        return res.status(500).json({
            errCode: error.errCode || 2,
            errMessage: error.errMessage || 'An error occurred'
        });
    }
};

let handleDeleteReview = async (req, res) => {
    const reviewId = req.params.id;
    try {
        const result = await ReviewService.deleteReview(reviewId);

        return res.status(result.errCode === 0 ? 200 : 400).json(result);
    } catch (error) {
        return res.status(500).json({
            errCode: error.errCode || 2,
            errMessage: error.errMessage || 'An error occurred'
        });
    }
};

export default {
    handleGetReviewsByTourId,
    handleCreateReview,
    handleUpdateReview,
    handleDeleteReview
};
