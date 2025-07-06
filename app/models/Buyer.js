import mongoose from "mongoose";

const BuyerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyRegNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  productRequired: { type: String, required: true },
  productCategory: { type: String, required: true },
  productSize: { type: String, required: true },
  additionalDetails: { type: String },
}, { timestamps: true });

const Buyer = mongoose.models.Buyer || mongoose.model("Buyer", BuyerSchema);

export default Buyer;