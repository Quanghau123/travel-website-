import TourService from "@services/tourService.js";

let handleGetAllTours = async (req, res) => {
    try {
        let tours = await TourService.getAllTours();
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            tours
        });
    } catch (e) {
        return res.status(500).json({
            errCode: e.errCode || 2,
            errMessage: e.errMessage || "An error occurred"
        });
    }
};

let handleGetTourById = async (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        });
    }

    try {
        let tour = await TourService.getTourById(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            tour
        });
    } catch (e) {
        return res.status(404).json({
            errCode: e.errCode || 1,
            errMessage: e.errMessage || "Tour not found"
        });
    }
};

let handleCreateNewTour = async (req, res) => {
    try {
        let message = await TourService.createNewTour(req.body);
        return res.status(200).json(message);
    } catch (e) {
        return res.status(500).json({
            errCode: 2,
            errMessage: e.message || "An error occurred"
        });
    }
};

let handleUpdateTour = async (req, res) => {
    try {
        let message = await TourService.updateTourData(req.body);
        return res.status(200).json(message);
    } catch (e) {
        return res.status(500).json({
            errCode: e.errCode || 2,
            errMessage: e.errMessage || "An error occurred"
        });
    }
};

let handleDeleteTour = async (req, res) => {
    let tourId = req.params.id;

    if (!tourId) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        });
    }

    try {
        let response = await TourService.deleteTour(tourId);
        return res.status(response.errCode === 0 ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            errCode: 500,
            errMessage: "Internal server error",
            error: error.message
        });
    }
};

let handleSearchTours = async (req, res) => {
    try {
        let searchParams = req.body;

        let tours = await TourService.searchTours(searchParams);

        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            tours
        });
    } catch (e) {
        return res.status(500).json({
            errCode: e.errCode || 2,
            errMessage: e.errMessage || "An error occurred"
        });
    }
};

let handleGetAllToursPaginated = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        let result = await TourService.getAllToursPaginated(page, limit);

        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({
            errCode: e.errCode || 2,
            errMessage: e.errMessage || "An error occurred"
        });
    }
};

export default {
    handleGetAllTours,
    handleGetTourById,
    handleCreateNewTour,
    handleUpdateTour,
    handleDeleteTour,
    handleSearchTours,
    handleGetAllToursPaginated,
};
