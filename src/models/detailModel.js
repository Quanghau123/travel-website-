import mongoose from "mongoose";

const detailSchema = new mongoose.Schema({
    TourId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Tour"
    },
    Des_Enjoy: { type: String, required: true },
    Des_Included: { type: String, required: true },
    Des_Map: { type: String },
    Des_Itinerary: { type: String }
}, {
    versionKey: false,
    timestamps: true
});

const Detail = mongoose.model("Detail", detailSchema);

export default Detail;
