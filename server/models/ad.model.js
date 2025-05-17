import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
  photos: { type: Array, required: true },
  name: { type: String, required: true },
  adtitle: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  fuel: { type: String, default: null },
  kilometers: { type: String, default: null },
  location: {
    state: { type: String, default: null },
    city: { type: String, default: null },
    neighbourhood: { type: String, default: null }
  },
  owner: { type: String, default: null },
  gear: { type: String, default: null },
  model: { type: String, default: null },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now, required: true },
  dateto: {
    type: Date,
    default: function () {
      const oneMonthLater = new Date(this.date);
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
      return oneMonthLater;
    },
    required: true
  }
});

export default mongoose.models.Ads || mongoose.model("Ad", adSchema);