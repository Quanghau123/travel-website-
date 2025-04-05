import detailService from "@services/detailService.js";

let handleGetAllDetails = async (req, res) => {
    try {
        let details = await detailService.getAllDetails();
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            details
        });
    } catch (error) {
        return res.status(error.errCode || 500).json({
            errCode: error.errCode || 500,
            errMessage: error.errMessage || "Internal server error"
        });
    }
};

let handleGetDetailById = async (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        });
    }

    try {
        let detail = await detailService.getDetailById(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            detail
        });
    } catch (error) {
        return res.status(error.errCode || 500).json({
            errCode: error.errCode || 500,
            errMessage: error.errMessage || "Detail not found"
        });
    }
};

let handleGetDetailByTourId = async (req, res) => {
    let tourId = req.params.tourId;

    if (!tourId) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter: TourId"
        });
    }

    try {
        let details = await detailService.getDetailByTourId(tourId);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            details
        });
    } catch (error) {
        return res.status(error.errCode || 500).json({
            errCode: error.errCode || 500,
            errMessage: error.errMessage || "No details found for the specified TourId"
        });
    }
};

let handleCreateNewDetail = async (req, res) => {
    try {
        let response = await detailService.createNewDetail(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(error.errCode || 500).json(error);
    }
};

let handleUpdateDetail = async (req, res) => {
    try {
        let response = await detailService.updateDetail(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(error.errCode || 500).json(error);
    }
};

let handleDeleteDetail = async (req, res) => {
    let detailId = req.params.id;

    if (!detailId) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        });
    }

    try {
        let response = await detailService.deleteDetail(detailId);
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
    handleGetAllDetails,
    handleGetDetailById,
    handleGetDetailByTourId,
    handleCreateNewDetail,
    handleUpdateDetail,
    handleDeleteDetail
};