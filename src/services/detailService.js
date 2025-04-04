import Detail from "@models/detailModel.js";

let getAllDetails = async () => {
    try {
        let details = await Detail.find()
            .populate({
                path: "TourId",
                select: "TourTime TourDifficulty TourMinAge Image"
            })
            .exec();

        return details;
    } catch (e) {
        throw { errCode: 500, errMessage: "Database error", error: e.message };
    }
};

let getDetailById = async (detailId) => {
    try {
        if (!detailId) {
            throw { errCode: 1, errMessage: "Missing required parameter" };
        }

        let detail = await Detail.findById(detailId)
            .populate({
                path: "TourId",
                select: "TourTime TourDifficulty TourMinAge Image"
            })
            .exec();

        if (!detail) {
            throw { errCode: 1, errMessage: "Detail not found" };
        }

        return detail;
    } catch (e) {
        throw { errCode: 500, errMessage: "Database error", error: e.message };
    }
};

let createNewDetail = async (data) => {
    try {
        if (!data.TourId || !data.Des_Enjoy || !data.Des_Included) {
            throw { errCode: 1, errMessage: "Missing required parameters" };
        }

        const newDetail = new Detail({
            TourId: data.TourId,
            Des_Enjoy: data.Des_Enjoy,
            Des_Included: data.Des_Included,
            Des_Map: data.Des_Map || "",
            Des_Itinerary: data.Des_Itinerary || ""
        });

        await newDetail.save();

        return { errCode: 0, message: "Detail created successfully!" };
    } catch (e) {
        throw { errCode: 500, errMessage: "Database error", error: e.message };
    }
};

let updateDetail = async (data) => {
    try {
        const { DetailId } = data;

        if (!DetailId) {
            return {
                errCode: 2,
                errMessage: "Missing DetailId"
            };
        }

        const detail = await Detail.findById(DetailId).exec();

        if (!detail) {
            return {
                errCode: 1,
                errMessage: "Detail not found"
            };
        }

        const allowedFields = ["TourId", "Des_Enjoy", "Des_Included", "Des_Map", "Des_Itinerary"];
        allowedFields.forEach((field) => {
            if (data[field] !== undefined) {
                detail[field] = data[field];
            }
        });

        await detail.save();

        return {
            errCode: 0,
            message: "Detail updated successfully!"
        };
    } catch (e) {
        return {
            errCode: 500,
            errMessage: "Database error",
            errorDetail: e.message
        };
    }
};

let deleteDetail = async (detailId) => {
    try {
        if (!detailId) {
            return { errCode: 1, errMessage: "Missing DetailId" };
        }

        const detail = await Detail.findById(detailId).exec();

        if (!detail) {
            return { errCode: 2, errMessage: "Detail does not exist" };
        }

        await Detail.deleteOne({ _id: detailId }).exec();

        return { errCode: 0, message: "Detail deleted successfully!" };
    } catch (e) {
        return { errCode: 500, errMessage: "Database error", error: e.message };
    }
};

export default {
    getAllDetails,
    getDetailById,
    createNewDetail,
    updateDetail,
    deleteDetail
};
