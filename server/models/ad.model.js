import mongoose from "mongoose"

const adSchema = new mongoose.Schema({
    photos: { type: Array, required: true },
    title: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    fuel: { type: String, default: null },
    kilometers: { type: String, default: null },
    location: { type: String, default: null },
    owner: { type: String, default: null },
    gear: { type: String, default: null },
    model: { type: String, default: null },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now, required: true }
})


export default mongoose.model.Ads || mongoose.model("Ad",adSchema)