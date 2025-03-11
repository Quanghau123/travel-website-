import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    TourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    UserName: { type: String, required: true },
    Rating: { type: Number, min: 1, max: 5, required: true },
    Title: { type: String, required: true },
    Comment: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
