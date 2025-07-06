import { NextResponse } from "next/server"
import connect from "@/libs/mongodb"
import Supplier from "@/app/models/Supplier"
import User from "@/app/models/User"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import cloudinary from "@/libs/cloudinary"

// GET a specific supplier by ID
export async function GET(request, { params }) {
  try {
    // Await the params object before accessing its properties
    const id = params.id

    await connect()
    const supplier = await Supplier.findById(id)

    if (!supplier) {
      return NextResponse.json({ error: "Supplier not found" }, { status: 404 })
    }

    return NextResponse.json(supplier)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// UPDATE a supplier
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

    // Get the existing supplier
    const existingSupplier = await Supplier.findById(id)

    if (!existingSupplier) {
      return NextResponse.json({ error: "Supplier not found" }, { status: 404 })
    }

    // Parse form data
    const formData = await request.formData()

    // Prepare update data
    const updateData = {
      companyName: formData.get("companyName") || existingSupplier.companyName,
      companyRegNo: formData.get("companyRegNo") || existingSupplier.companyRegNo,
      productDetails: formData.get("productDetails") || existingSupplier.productDetails,
    }

    // Handle file uploads if provided
    const companyProfile = formData.get("companyProfile")
    const productCatalog = formData.get("productCatalog")

    // Upload company profile if provided
    if (companyProfile && companyProfile.size > 0) {
      const profileBuffer = Buffer.from(await companyProfile.arrayBuffer())

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw",
              public_id: `suppliers/${updateData.companyName}_profile`,
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

    // Upload product catalog if provided
    if (productCatalog && productCatalog.size > 0) {
      const catalogBuffer = Buffer.from(await productCatalog.arrayBuffer())

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw",
              public_id: `suppliers/${updateData.companyName}_catalog`,
              format: "pdf",
            },
            (error, result) => {
              if (error) return reject(error)
              resolve(result.secure_url)
            },
          )
          .end(catalogBuffer)
      })

      updateData.productCatalogUrl = uploadResult
    }

    // Update the supplier
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    )

    return NextResponse.json(updatedSupplier)
  } catch (error) {
    console.error("Supplier update error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE a supplier
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

    // Find the supplier to get their email
    const supplier = await Supplier.findById(id)

    if (!supplier) {
      return NextResponse.json({ error: "Supplier not found" }, { status: 404 })
    }

    // Delete the supplier
    await Supplier.findByIdAndDelete(id)

    // Delete the corresponding user account
    await User.findOneAndDelete({ email: supplier.email })

    return NextResponse.json({ message: "Supplier deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
