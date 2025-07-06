// models/Supplier.js
import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
  companyName: String,
  companyRegNo: String,
  email: String,
  password: String,
  companyProfileUrl: String,
  productCatalogUrl: String,
  productDetails: String,
});

export default mongoose.models.Supplier || mongoose.model("Supplier", SupplierSchema);
