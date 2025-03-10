import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
    TestId: {
        type: Number,
        required: true,
        unique: true
    },
    TestName: {
        type: String,
        required: true
    },
    TestAge: {
        type: String
    },
    TestAdd: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true 
});

const Test = mongoose.model("Test", TestSchema);

export default Test;
