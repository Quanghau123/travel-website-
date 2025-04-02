import mongoose from "mongoose";

const bookTourSchema = new mongoose.Schema({
    TourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        required: true
    },
    DepartureDate: {
        type: Date,
        min: new Date(),
        set: (val) => new Date(val),
    },
    QuantityAdults: {
        type: Number,
        default: 0
    },
    QuantityChildren: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
    timestamps: true
});

const BookTour = mongoose.model('BookTour', bookTourSchema);

export default BookTour;
