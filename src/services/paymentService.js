import Payment from "@models/paymentModel.js";
import BookTour from "@models/bookTourModel.js";
import Tour from "@models/tourModel.js";
import dotenv from "dotenv";
import crypto from "crypto";
import axios from "axios";

dotenv.config();

const getAllPayments = async () => {
    try {
        const payments = await Payment.find()
            .populate('UserId', 'UserName Phone Email')
            .populate({
                path: 'BookTourId',
                populate: {
                    path: 'TourId',
                    select: 'TourName'
                }
            });

        return { errCode: 0, data: payments };
    } catch (error) {
        return { errCode: 500, errMessage: "Database error", error: error.message };
    }
};

const getPaymentById = async (paymentId) => {
    try {
        const payment = await Payment.findById(paymentId)
            .populate('UserId', 'UserName Phone Email')
            .populate({
                path: 'BookTourId',
                populate: {
                    path: 'TourId',
                    select: 'TourName'
                }
            });

        if (!payment) {
            return { errCode: 1, errMessage: "Payment not found" };
        }

        return { errCode: 0, data: payment };
    } catch (error) {
        return { errCode: 500, errMessage: "Database error", error: error.message };
    }
};

const createNewPayment = async (data) => {
    try {
        const { BookTourId, UserId, PaymentMethod, PaymentStatus } = data;

        if (!BookTourId || !UserId || PaymentStatus === undefined) {
            return {
                errCode: 1,
                errMessage: "Missing required fields"
            };
        }

        const bookTour = await BookTour.findById(BookTourId);
        if (!bookTour) {
            return { errCode: 2, errMessage: "BookTour not found" };
        }

        const tour = await Tour.findById(bookTour.TourId);
        if (!tour) {
            return { errCode: 3, errMessage: "Tour not found" };
        }

        const adultPrice = tour.TourPrice;
        const childPrice = adultPrice * 0.6;

        const totalAmount = (bookTour.QuantityAdults * adultPrice) + (bookTour.QuantityChildren * childPrice);

        const newPayment = new Payment({
            BookTourId,
            UserId,
            PaymentMethod: PaymentMethod || "Unknown",
            TransactionId: `TXN_${Date.now()}`,
            Amount: totalAmount,
            PaymentStatus
        });

        await newPayment.save();

        return { errCode: 0, message: "Payment created successfully!" };
    } catch (error) {
        return { errCode: 500, errMessage: "Database error", error: error.message };
    }
};

const updatePayment = async (data) => {
    try {
        if (!data.PaymentId) {
            return { errCode: 2, errMessage: "Missing required parameter" };
        }

        const payment = await Payment.findById(data.PaymentId);
        if (!payment) {
            return { errCode: 1, errMessage: "Payment not found!" };
        }

        if (data.PaymentStatus !== undefined) payment.PaymentStatus = data.PaymentStatus;

        if (data.updateAmountFromTour) {
            const bookTour = await BookTour.findById(payment.BookTourId);
            if (bookTour) {
                const tour = await Tour.findById(bookTour.TourId);
                if (tour) {
                    payment.Amount = tour.TourPrice;
                }
            }
        }

        await payment.save();

        return { errCode: 0, message: "Payment updated successfully!" };
    } catch (error) {
        return { errCode: 500, errMessage: "Database error", error: error.message };
    }
};

const deletePayment = async (paymentId) => {
    try {
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return { errCode: 2, errMessage: "Payment does not exist" };
        }

        await Payment.findByIdAndDelete(paymentId);

        return { errCode: 0, message: "Payment deleted successfully!" };
    } catch (error) {
        return { errCode: 500, errMessage: "Database error", error: error.message };
    }
};

const processMomoPayment = async (UserId, BookTourId) => {
    try {
        if (!UserId || !BookTourId) {
            return { errCode: 1, errMessage: "Missing parameters" };
        }

        const bookTour = await BookTour.findById(BookTourId);
        if (!bookTour) {
            return { errCode: 2, errMessage: "BookTour not found" };
        }

        const tour = await Tour.findById(bookTour.TourId);
        if (!tour) {
            return { errCode: 3, errMessage: "Tour not found" };
        }

        const adultPrice = tour.TourPrice;
        const childPrice = adultPrice * 0.6;
        const totalAmount = (bookTour.QuantityAdults * adultPrice) + (bookTour.QuantityChildren * childPrice); // Tổng số tiền

        const orderId = `ORDERID_${Date.now()}`;
        const requestId = `REQUESTID_${Date.now()}`;

        const partnerCode = process.env.MOMO_PARTNER_CODE;
        const accessKey = process.env.MOMO_ACCESS_KEY;
        const secretKey = process.env.MOMO_SECRET_KEY;

        const requestType = "captureWallet";
        const orderInfo = `Thanh toán tour ${BookTourId}`;
        const redirectUrl = process.env.MOMO_REDIRECT_URL;
        const ipnUrl = process.env.MOMO_IPN_URL;
        const extraData = "";

        const rawSignature = `accessKey=${accessKey}&amount=${totalAmount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

        const signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        const requestBody = {
            partnerCode,
            accessKey,
            requestId,
            amount: totalAmount.toString(),
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            extraData,
            requestType,
            signature,
            lang: 'vi'
        };

        console.log("Request gửi tới Momo:", requestBody);

        const momoResponse = await axios.post(process.env.MOMO_API_URL, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!momoResponse.data || momoResponse.data.resultCode !== 0) {
            return { errCode: -2, errMessage: momoResponse.data.message || "Momo payment failed" };
        }

        const newPayment = new Payment({
            BookTourId,
            UserId,
            PaymentMethod: "Momo",
            TransactionId: orderId,
            Amount: totalAmount,
            PaymentStatus: false
        });

        await newPayment.save();

        return { errCode: 0, data: momoResponse.data };
    } catch (error) {
        return { errCode: -1, errMessage: error.message };
    }
};

const updatePaymentStatusByTransactionId = async (transactionId, paymentStatus) => {
    try {
        const payment = await Payment.findOne({ TransactionId: transactionId });
        if (!payment) {
            return { errCode: 2, errMessage: "Payment not found" };
        }

        payment.PaymentStatus = paymentStatus;
        await payment.save();

        return { errCode: 0, message: "Payment status updated!" };
    } catch (error) {
        return { errCode: -1, errMessage: error.message };
    }
};

const getPaymentByTransactionId = async (transactionId) => {
    try {
        const payment = await Payment.findOne({ TransactionId: transactionId });
        return payment || null;
    } catch (error) {
        return null;
    }
};

export default {
    getAllPayments,
    getPaymentById,
    createNewPayment,
    updatePayment,
    deletePayment,
    processMomoPayment,
    updatePaymentStatusByTransactionId,
    getPaymentByTransactionId
};
