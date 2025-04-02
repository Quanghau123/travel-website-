import mongoose from 'mongoose';
import Tour from '@models/tourModel'; // Import model Tour
import Review from '@models/reviewModel'; // Import model Review

// Hàm cập nhật Rating cho tour từ bảng Review
const updateTourRating = async (tourId) => {
    try {
        // Lấy tất cả các đánh giá của tour
        const reviews = await Review.find({ TourId: tourId });

        if (reviews.length === 0) {
            // Nếu không có đánh giá, gán Rating là 0
            await Tour.findByIdAndUpdate(tourId, { Rating: 0 });
            return;
        }

        // Tính Rating trung bình từ các đánh giá
        const totalRating = reviews.reduce((acc, review) => acc + review.Rating, 0);
        const averageRating = totalRating / reviews.length;

        // Cập nhật Rating trong bảng Tour
        await Tour.findByIdAndUpdate(tourId, { Rating: averageRating });
    } catch (error) {
        console.error("Error updating tour rating:", error);
    }
};

// Lấy tất cả các tour
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

// Lấy thông tin một tour theo ID
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

// Tạo mới tour
const createNewTour = async (data) => {
    try {
        // Kiểm tra TourDifficulty
        if (!['Easy', 'Medium', 'High'].includes(data.TourDifficulty)) {
            throw { errCode: 400, errMessage: 'Invalid TourDifficulty value' };
        }

        // Tạo mới Tour
        const newTour = new Tour(data);
        await newTour.save();

        // Cập nhật Rating từ Review (nếu có)
        await updateTourRating(newTour._id);

        return {
            errCode: 0,
            message: 'Tour created successfully!',
            tour: newTour,
        };
    } catch (e) {
        throw { errCode: e.errCode || 500, errMessage: e.errMessage || 'Internal server error', error: e.message };
    }
};

// Cập nhật thông tin tour
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

        // Cập nhật lại Rating từ Review
        await updateTourRating(updatedTour._id);

        return {
            errCode: 0,
            message: 'Tour updated successfully!',
            tour: updatedTour,
        };
    } catch (e) {
        throw { errCode: e.errCode || 500, errMessage: e.errMessage || 'Internal server error', error: e.message };
    }
};

// Xóa tour
const deleteTour = async (tourId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(tourId)) {
            return { errCode: 400, errMessage: 'Invalid tour ID' };
        }

        const deletedTour = await Tour.findByIdAndDelete(tourId);

        if (!deletedTour) {
            return { errCode: 404, errMessage: 'Tour does not exist' };
        }

        // Sau khi xóa, gán Rating của tour đó về mặc định (hoặc cập nhật theo đánh giá khác nếu cần)
        await updateTourRating(tourId);

        return { errCode: 0, message: 'Tour deleted successfully!' };
    } catch (e) {
        return { errCode: 500, errMessage: 'Internal server error', error: e.message };
    }
};

// Tìm kiếm tour theo các tiêu chí
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

// Phân trang tour
const getAllToursPaginated = async (page = 1, limit = 10) => {
    try {
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
    getAllToursPaginated,
};
