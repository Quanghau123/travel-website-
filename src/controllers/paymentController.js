import paymentService from "@services/paymentService.js";

let handleGetAllPayments = async (req, res) => {
    try {
        let response = await paymentService.getAllPayments();
        return res.status(response.errCode === 0 ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            errCode: 500,
            errMessage: "Internal server error",
            error: error.message
        });
    }
};

let handleGetPaymentById = async (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        });
    }

    try {
        let response = await paymentService.getPaymentById(id);
        return res.status(response.errCode === 0 ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            errCode: 500,
            errMessage: "Internal server error",
            error: error.message
        });
    }
};

let handleCreateNewPayment = async (req, res) => {
    try {
        let response = await paymentService.createNewPayment(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(error.errCode || 500).json(error);
    }
};

let handleUpdatePayment = async (req, res) => {
    try {
        let response = await paymentService.updatePayment(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(error.errCode || 500).json(error);
    }
};

let handleDeletePayment = async (req, res) => {
    let paymentId = req.params.id;

    if (!paymentId) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        });
    }

    try {
        let response = await paymentService.deletePayment(paymentId);
        return res.status(response.errCode === 0 ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            errCode: 500,
            errMessage: "Internal server error",
            error: error.message
        });
    }
};

let handleProcessMomoPayment = async (req, res) => {
    try {
        let { UserId, BookTourId } = req.body;

        if (!UserId || !BookTourId) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Thiếu thông tin thanh toán"
            });
        }

        let result = await paymentService.processMomoPayment(UserId, BookTourId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            errMessage: error.message
        });
    }
};

let handleMomoIPN = async (req, res) => {
    try {
        let { orderId, resultCode } = req.body;

        if (!orderId) {
            return res.status(400).json({ errCode: 1, errMessage: "Thiếu orderId" });
        }

        let payment = await paymentService.getPaymentByTransactionId(orderId);
        if (!payment) {
            return res.status(404).json({ errCode: 2, errMessage: "Không tìm thấy giao dịch" });
        }

        if (resultCode === 0) {
            await paymentService.updatePayment({ PaymentId: payment.PaymentId, PaymentStatus: true });
            return res.status(200).json({ errCode: 0, message: "Thanh toán thành công!" });
        } else {
            return res.status(400).json({ errCode: 3, errMessage: "Thanh toán thất bại" });
        }
    } catch (error) {
        return res.status(500).json({ errCode: -1, errMessage: error.message });
    }
};

export default {
    handleGetAllPayments,
    handleGetPaymentById,
    handleCreateNewPayment,
    handleUpdatePayment,
    handleDeletePayment,
    handleProcessMomoPayment,
    handleMomoIPN,
};
