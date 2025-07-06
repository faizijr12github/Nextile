import mongoose from "mongoose";

const InspectionTeamSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  countryName: { type: String, required: true },
  productDetails: { type: String },
  companyProfileUrl: { type: String },
  inspectionReportsUrl: { type: String },
}, { timestamps: true });

export default mongoose.models.InspectionTeam || mongoose.model("InspectionTeam", InspectionTeamSchema);
