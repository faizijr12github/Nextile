import { NextResponse } from "next/server"
import connect from "@/libs/mongodb"
import InspectionTeam from "@/app/models/InspectionTeam"
import User from "@/app/models/User"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import cloudinary from "@/libs/cloudinary"

// GET a specific inspection team by ID
export async function GET(request, { params }) {
  try {
    // Await the params object before accessing its properties
    const id = params.id

    await connect()
    const inspectionTeam = await InspectionTeam.findById(id)

    if (!inspectionTeam) {
      return NextResponse.json({ error: "Inspection team not found" }, { status: 404 })
    }

    return NextResponse.json(inspectionTeam)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// UPDATE an inspection team
export async function PUT(request, { params }) {
  try {
    // Await the params object before accessing its properties
    const id = params.id

    const session = await getServerSession(authOptions)

    // Check if user is authenticated and has permission
    if (!session || (session.user.role !== "admin" && session.user.profileId !== id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connect()

    // Get the existing inspection team
    const existingTeam = await InspectionTeam.findById(id)

    if (!existingTeam) {
      return NextResponse.json({ error: "Inspection team not found" }, { status: 404 })
    }

    // Parse form data
    const formData = await request.formData()

    // Prepare update data
    const updateData = {
      companyName: formData.get("companyName") || existingTeam.companyName,
      countryName: formData.get("countryName") || existingTeam.countryName,
      productDetails: formData.get("productDetails") || existingTeam.productDetails,
    }

    // Handle file uploads if provided
    const companyProfile = formData.get("companyProfile")
    const inspectionReports = formData.get("inspectionReports")

    // Upload company profile if provided
    if (companyProfile && companyProfile.size > 0) {
      const profileBuffer = Buffer.from(await companyProfile.arrayBuffer())

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw",
              public_id: `inspection_team/${updateData.companyName}_profile`,
              format: "pdf",
            },
            (error, result) => {
              if (error) return reject(error)
              resolve(result.secure_url)
            },
          )
          .end(profileBuffer)
      })

      updateData.companyProfileUrl = uploadResult
    }

    // Upload inspection reports if provided
    if (inspectionReports && inspectionReports.size > 0) {
      const reportsBuffer = Buffer.from(await inspectionReports.arrayBuffer())

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw",
              public_id: `inspection_team/${updateData.companyName}_inspection_reports`,
              format: "pdf",
            },
            (error, result) => {
              if (error) return reject(error)
              resolve(result.secure_url)
            },
          )
          .end(reportsBuffer)
      })

      updateData.inspectionReportsUrl = uploadResult
    }

    // Update the inspection team
    const updatedTeam = await InspectionTeam.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    )

    return NextResponse.json(updatedTeam)
  } catch (error) {
    console.error("Inspection team update error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE an inspection team
export async function DELETE(request, { params }) {
  try {
    // Await the params object before accessing its properties
    const id = params.id

    const session = await getServerSession(authOptions)

    // Check if user is authenticated and has permission
    if (!session || (session.user.role !== "admin" && session.user.profileId !== id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connect()

    // Find the inspection team to get their email
    const inspectionTeam = await InspectionTeam.findById(id)

    if (!inspectionTeam) {
      return NextResponse.json({ error: "Inspection team not found" }, { status: 404 })
    }

    // Delete the inspection team
    await InspectionTeam.findByIdAndDelete(id)

    // Delete the corresponding user account
    await User.findOneAndDelete({ email: inspectionTeam.email })

    return NextResponse.json({ message: "Inspection team deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
