import mongoose from "mongoose";
import BookTour from "@models/bookTourModel";

const getAllBookTours = async () => {
    try {
        const bookTours = await BookTour.find();
        return { errCode: 0, data: bookTours };
    } catch (error) {
        return { errCode: 500, errMessage: "Database error", error: error.message };
    }
};

const getBookTourById = async (bookTourId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(bookTourId)) {
            return { errCode: 400, errMessage: "Invalid BookTourId" };  // Thay errCode = 1 thành 400
        }

        const bookTour = await BookTour.findById(bookTourId);
        if (!bookTour) {
            return { errCode: 404, errMessage: "BookTour not found" };  // Thay errCode = 1 thành 404
        }

        return { errCode: 0, data: bookTour };
    } catch (error) {
        return { errCode: 500, errMessage: "Database error", error: error.message };
    }
};

const createNewBookTour = async (data) => {
    try {
        const { TourId, UserId, DepartureDate, QuantityAdults = 0, QuantityChildren = 0 } = data;

        if (!TourId || !UserId || QuantityAdults < 0 || QuantityChildren < 0) {
            return { errCode: 400, errMessage: "Invalid input data" };  // Thay errCode = 1 thành 400
        }

        if (QuantityAdults + QuantityChildren === 0) {
            return { errCode: 400, errMessage: "At least one person must be booked" };  // Thêm kiểm tra tổng số người
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Loại bỏ giờ phút giây
        if (DepartureDate && new Date(DepartureDate).setHours(0, 0, 0, 0) < today) {
            return { errCode: 400, errMessage: "Departure date cannot be in the past" };  // Thay errCode = 1 thành 400
        }

        const newBookTour = new BookTour({
            TourId,
            UserId,
            DepartureDate: DepartureDate ? new Date(DepartureDate) : undefined,
            QuantityAdults,
            QuantityChildren
        });

        await newBookTour.save();

        return { errCode: 0, message: "Book tour created successfully!", data: newBookTour };
    } catch (error) {
        return { errCode: 500, errMessage: error.message };
    }
};

const updateBookTour = async (data) => {
    try {
        const { BookTourId, TourId, UserId, DepartureDate, QuantityAdults, QuantityChildren } = data;

        if (!BookTourId || !mongoose.Types.ObjectId.isValid(BookTourId)) {
            return { errCode: 400, errMessage: "Missing or invalid BookTourId" };  // Thay errCode = 2 thành 400
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Loại bỏ giờ phút giây
        if (DepartureDate && new Date(DepartureDate).setHours(0, 0, 0, 0) < today) {
            return { errCode: 400, errMessage: "Departure date cannot be in the past" };  // Thay errCode = 1 thành 400
        }

        const updatedData = {};
        if (TourId) updatedData.TourId = TourId;
        if (UserId) updatedData.UserId = UserId;
        if (DepartureDate) updatedData.DepartureDate = new Date(DepartureDate);
        if (QuantityAdults !== undefined) updatedData.QuantityAdults = QuantityAdults;
        if (QuantityChildren !== undefined) updatedData.QuantityChildren = QuantityChildren;

        const updated = await BookTour.findByIdAndUpdate(BookTourId, updatedData, { new: true });

        if (!updated) {
            return { errCode: 404, errMessage: "Book tour not found!" };  // Thay errCode = 1 thành 404
        }

        return { errCode: 0, message: "Book tour updated successfully!", data: updated };
    } catch (error) {
        return { errCode: 500, errMessage: error.message };
    }
};

const deleteBookTour = async (bookTourId) => {
    try {
        if (!bookTourId || !mongoose.Types.ObjectId.isValid(bookTourId)) {
            return { errCode: 400, errMessage: "Missing or invalid BookTourId" };  // Thay errCode = 1 thành 400
        }

        const deleted = await BookTour.findByIdAndDelete(bookTourId);
        if (!deleted) {
            return { errCode: 404, errMessage: "Book tour does not exist" };  // Thay errCode = 2 thành 404
        }

        return { errCode: 0, message: "Book tour deleted successfully!" };
    } catch (error) {
        return { errCode: 500, errMessage: "Database error", error: error.message };
    }
};

export default {
    getAllBookTours,
    getBookTourById,
    createNewBookTour,
    updateBookTour,
    deleteBookTour
};
