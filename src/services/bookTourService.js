import mongoose from "mongoose";
import BookTour from "@models/bookTourModel";
import Tour from "@models/tourModel"

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

        // Kiểm tra dữ liệu đầu vào
        if (!TourId || !UserId || QuantityAdults < 0 || QuantityChildren < 0) {
            return { errCode: 400, errMessage: "Invalid input data" };
        }

        if (QuantityAdults + QuantityChildren === 0) {
            return { errCode: 400, errMessage: "At least one person must be booked" };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (DepartureDate && new Date(DepartureDate).setHours(0, 0, 0, 0) < today) {
            return { errCode: 400, errMessage: "Departure date cannot be in the past" };
        }

        // Lấy thông tin TourPrice từ bảng Tour
        const tour = await Tour.findById(TourId);
        if (!tour) {
            return { errCode: 404, errMessage: "Tour not found" };
        }

        const { TourPrice } = tour;

        // Tính toán số tiền cần thanh toán
        const priceForAdults = TourPrice * QuantityAdults;
        const priceForChildren = (TourPrice * 0.6) * QuantityChildren;
        const totalPrice = priceForAdults + priceForChildren;

        // Tạo đối tượng BookTour
        const newBookTour = new BookTour({
            TourId,
            UserId,
            DepartureDate: DepartureDate ? new Date(DepartureDate) : undefined,
            QuantityAdults,
            QuantityChildren,
            TotalPrice: totalPrice // Lưu tổng tiền thanh toán vào DB
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
            return { errCode: 400, errMessage: "Missing or invalid BookTourId" };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (DepartureDate && new Date(DepartureDate).setHours(0, 0, 0, 0) < today) {
            return { errCode: 400, errMessage: "Departure date cannot be in the past" };
        }

        // Lấy thông tin TourPrice từ bảng Tour
        const tour = await Tour.findById(TourId);
        if (!tour) {
            return { errCode: 404, errMessage: "Tour not found" };
        }

        const { TourPrice } = tour;

        // Tính toán lại số tiền cần thanh toán
        const priceForAdults = TourPrice * QuantityAdults;
        const priceForChildren = (TourPrice * 0.6) * QuantityChildren;
        const totalPrice = priceForAdults + priceForChildren;

        const updatedData = {};
        if (TourId) updatedData.TourId = TourId;
        if (UserId) updatedData.UserId = UserId;
        if (DepartureDate) updatedData.DepartureDate = new Date(DepartureDate);
        if (QuantityAdults !== undefined) updatedData.QuantityAdults = QuantityAdults;
        if (QuantityChildren !== undefined) updatedData.QuantityChildren = QuantityChildren;
        updatedData.TotalPrice = totalPrice; // Cập nhật tổng tiền vào DB

        const updated = await BookTour.findByIdAndUpdate(BookTourId, updatedData, { new: true });

        if (!updated) {
            return { errCode: 404, errMessage: "Book tour not found!" };
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
