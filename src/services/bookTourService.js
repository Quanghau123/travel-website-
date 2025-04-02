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
            return { errCode: 1, errMessage: "Invalid BookTourId" };
        }

        const bookTour = await BookTour.findById(bookTourId);
        if (!bookTour) {
            return { errCode: 1, errMessage: "BookTour not found" };
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
            return { errCode: 1, errMessage: "Invalid input data" };
        }

        if (DepartureDate && new Date(DepartureDate) < new Date()) {
            return { errCode: 1, errMessage: "Departure date cannot be in the past" };
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
            return { errCode: 2, errMessage: "Missing or invalid BookTourId" };
        }

        if (DepartureDate && new Date(DepartureDate) < new Date()) {
            return { errCode: 1, errMessage: "Departure date cannot be in the past" };
        }

        const updated = await BookTour.findByIdAndUpdate(
            BookTourId,
            {
                TourId,
                UserId,
                DepartureDate: DepartureDate ? new Date(DepartureDate) : undefined,
                QuantityAdults,
                QuantityChildren
            },
            { new: true }
        );

        if (!updated) {
            return { errCode: 1, errMessage: "Book tour not found!" };
        }

        return { errCode: 0, message: "Book tour updated successfully!", data: updated };
    } catch (error) {
        return { errCode: 500, errMessage: error.message };
    }
};

const deleteBookTour = async (bookTourId) => {
    try {
        if (!bookTourId || !mongoose.Types.ObjectId.isValid(bookTourId)) {
            return { errCode: 1, errMessage: "Missing or invalid BookTourId" };
        }

        const deleted = await BookTour.findByIdAndDelete(bookTourId);
        if (!deleted) {
            return { errCode: 2, errMessage: "Book tour does not exist" };
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
