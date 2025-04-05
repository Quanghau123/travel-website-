import bookTourService from "@services/bookTourService.js";

let handleGetAllBookTours = async (req, res) => {
    try {
        let response = await bookTourService.getAllBookTours();
        return res.status(response.errCode === 0 ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            errCode: 500,
            errMessage: "Internal server error",
            error: error.message
        });
    }
};

let handleGetBookTourById = async (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        });
    }

    try {
        let response = await bookTourService.getBookTourById(id);
        return res.status(response.errCode === 0 ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            errCode: 500,
            errMessage: "Internal server error",
            error: error.message
        });
    }
};

let handleGetBookTourByTourId = async (req, res) => {
    let tourId = req.params.tourId;

    if (!tourId) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter: TourId"
        });
    }

    try {
        let bookTour = await bookTourService.getBookTourByTourId(tourId);

        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            bookTour // <- Không còn là details (mảng) nữa
        });
    } catch (error) {
        return res.status(error.errCode || 500).json({
            errCode: error.errCode || 500,
            errMessage: error.errMessage || "No bookTour found for the specified TourId"
        });
    }
};

let handleCreateNewBookTour = async (req, res) => {
    try {
        let response = await bookTourService.createNewBookTour(req.body);
        return res.status(response.errCode === 0 ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            errCode: 500,
            errMessage: "Internal server error",
            error: error.message
        });
    }
};

let handleUpdateBookTour = async (req, res) => {
    try {
        let response = await bookTourService.updateBookTour(req.body);
        return res.status(response.errCode === 0 ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            errCode: 500,
            errMessage: "Internal server error",
            error: error.message
        });
    }
};

let handleDeleteBookTour = async (req, res) => {
    let bookTourId = req.params.id;

    if (!bookTourId) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        });
    }

    try {
        let response = await bookTourService.deleteBookTour(bookTourId);
        return res.status(response.errCode === 0 ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            errCode: 500,
            errMessage: "Internal server error",
            error: error.message
        });
    }
};

export default {
    handleGetAllBookTours,
    handleGetBookTourById,
    handleGetBookTourByTourId,
    handleCreateNewBookTour,
    handleUpdateBookTour,
    handleDeleteBookTour
};
