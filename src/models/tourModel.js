import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  TourName: { type: String, required: true },
  CategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  TourLocation: { type: String },
  TourTime: { type: Number },
  TourPrice: { type: Number, default: 0 },
  TourDifficulty: { type: String, enum: ['Easy', 'Medium', 'High'], default: 'Easy' },
  TourMinAge: { type: Number },
  DescribeTour: { type: String },
  TotalRating: { type: Number, default: 0 },
  Image: { type: String },
}, {
  versionKey: false,
  timestamps: true
});

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;