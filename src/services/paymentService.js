import Payment from "@models/paymentModel.js";
import BookTour from "@models/bookTourModel.js";
import Tour from "@models/tourModel.js";
import User from "@models/userModel.js";
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

const getPaymentsByUserId = async (userId) => {
    try {
        const payments = await Payment.find({ UserId: userId })
            .populate('UserId', 'UserName Phone Email')
            .populate({
                path: 'BookTourId',
                populate: {
                    path: 'TourId',
                    select: 'TourName'
                }
            });

        if (!payments || payments.length === 0) {
            return { errCode: 1, errMessage: "No payments found for this user" };
        }

        return { errCode: 0, data: payments };
    } catch (error) {
        return { errCode: 500, errMessage: "Database error", error: error.message };
    }
};

const searchPaymentsByUserInfo = async (keyword) => {
    try {
        const users = await User.find({
            $or: [
                { UserName: { $regex: keyword, $options: 'i' } },
                { Phone: { $regex: keyword, $options: 'i' } },
                { Email: { $regex: keyword, $options: 'i' } }
            ]
        });

        if (!users || users.length === 0) {
            return { errCode: 1, errMessage: "No users matched the keyword" };
        }

        const userIds = users.map(user => user._id);

        const payments = await Payment.find({ UserId: { $in: userIds } })
            .populate('UserId', 'UserName Phone Email')
            .populate({
                path: 'BookTourId',
                populate: {
                    path: 'TourId',
                    select: 'TourName'
                }
            });

        if (payments.length === 0) {
            return { errCode: 2, errMessage: "No payments found for the matched users" };
        }

        return { errCode: 0, data: payments };
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

        const amount = bookTour.TotalPrice;

        const newPayment = new Payment({
            BookTourId,
            UserId,
            PaymentMethod: PaymentMethod || "Unknown",
            TransactionId: `TXN_${Date.now()}`,
            Amount: amount,
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
        const { PaymentId, PaymentStatus, updateAmountFromTour } = data;

        if (!PaymentId) {
            return { errCode: 2, errMessage: "Missing required parameter" };
        }

        const payment = await Payment.findById(PaymentId);
        if (!payment) {
            return { errCode: 1, errMessage: "Payment not found!" };
        }

        if (PaymentStatus !== undefined) payment.PaymentStatus = PaymentStatus;

        if (updateAmountFromTour) {
            const bookTour = await BookTour.findById(payment.BookTourId);
            if (bookTour) {
                const tour = await Tour.findById(bookTour.TourId);
                if (tour) {
                    payment.Amount = bookTour.TotalPrice;
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

        // Lấy thông tin bookTour và tour từ database
        const bookTour = await BookTour.findById(BookTourId);
        if (!bookTour) {
            return { errCode: 2, errMessage: "BookTour not found" };
        }

        const tour = await Tour.findById(bookTour.TourId);
        if (!tour) {
            return { errCode: 3, errMessage: "Tour not found" };
        }

        const amount = bookTour.TotalPrice;
        const orderId = `ORDERID_${Date.now()}`;
        const requestId = `REQUESTID_${Date.now()}`;

        const partnerCode = process.env.MOMO_PARTNER_CODE;
        const accessKey = process.env.MOMO_ACCESS_KEY;
        const secretKey = process.env.MOMO_SECRET_KEY;

        const requestType = "captureWallet";
        const orderInfo = `Thanh toán tour ${BookTourId}`;
        const redirectUrl = process.env.MOMO_REDIRECT_URL;
        const ipnUrl = process.env.MOMO_IPN_URL;
        const extraData = "";  // Nếu có dữ liệu thêm thì thay đổi

        // Tạo signature cho yêu cầu gửi tới Momo
        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

        const signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        // Cấu hình request gửi tới Momo
        const requestBody = {
            partnerCode,
            accessKey,
            requestId,
            amount: amount.toString(),
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

        // Gửi yêu cầu tới API của Momo
        const momoResponse = await axios.post(process.env.MOMO_API_URL, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Kiểm tra phản hồi từ Momo
        if (!momoResponse.data || momoResponse.data.resultCode !== 0) {
            return { errCode: -2, errMessage: momoResponse.data.message || "Momo payment failed" };
        }

        // Tạo một bản ghi thanh toán mới
        const newPayment = new Payment({
            BookTourId,
            UserId,
            PaymentMethod: "Momo",
            TransactionId: orderId,
            Amount: amount,
            PaymentStatus: false
        });

        await newPayment.save();

        // Trả về đường dẫn thanh toán cho frontend
        const payUrl = momoResponse.data.payUrl || momoResponse.data.url || "";  // Đảm bảo lấy đúng đường dẫn thanh toán

        if (!payUrl) {
            return { errCode: -3, errMessage: "Không có đường dẫn thanh toán Momo trả về." };
        }

        return { errCode: 0, payUrl: payUrl };  // Trả về URL thanh toán
    } catch (error) {
        console.error("Lỗi trong quá trình xử lý thanh toán:", error);
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
    getPaymentsByUserId,
    searchPaymentsByUserInfo,
    createNewPayment,
    updatePayment,
    deletePayment,
    processMomoPayment,
    updatePaymentStatusByTransactionId,
    getPaymentByTransactionId
};
