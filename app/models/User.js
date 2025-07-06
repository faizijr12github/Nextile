import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["buyer", "supplier", "inspection", "admin"],
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "role",
    },
  },
  { timestamps: true },
)

// This will help with role-based references
UserSchema.virtual("roleModel").get(function () {
  switch (this.role) {
    case "buyer":
      return "Buyer"
    case "supplier":
      return "Supplier"
    case "inspection":
      return "InspectionTeam"
    default:
      return null
  }
})

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User
