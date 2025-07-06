import mongoose from "mongoose"

// Minimal schema for the admin collection
const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
})

// Connect to the existing "admin" collection
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema, "admin")

export default Admin
