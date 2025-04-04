import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    CategoryName: { type: String, required: true },
    Description: { type: String },
}, {
    versionKey: false,
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
