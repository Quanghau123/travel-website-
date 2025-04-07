import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    BookTourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookTour',
        required: true
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    PaymentMethod: {
        type: String,
        default: 'Unknown'
    },
    TransactionId: {
        type: String,
        unique: true,
        required: true
    },
    Amount: {
        type: Number,
        default: 0
    },
    PaymentStatus: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
