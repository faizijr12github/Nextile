import { NextResponse } from "next/server"
import connect from "@/libs/mongodb"
import Buyer from "@/app/models/Buyer"
import User from "@/app/models/User"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// GET a specific buyer by ID
export async function GET(request, { params }) {
  try {
    // Await the params object before accessing its properties
    const id = params.id

    await connect()
    const buyer = await Buyer.findById(id)

    if (!buyer) {
      return NextResponse.json({ error: "Buyer not found" }, { status: 404 })
    }

    return NextResponse.json(buyer)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// UPDATE a buyer
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
    const data = await request.json()

    // Remove email from update data if it exists (email shouldn't be changed)
    const { email, ...updateData } = data

    const updatedBuyer = await Buyer.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true })

    if (!updatedBuyer) {
      return NextResponse.json({ error: "Buyer not found" }, { status: 404 })
    }

    return NextResponse.json(updatedBuyer)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE a buyer
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

    // Find the buyer to get their email
    const buyer = await Buyer.findById(id)

    if (!buyer) {
      return NextResponse.json({ error: "Buyer not found" }, { status: 404 })
    }

    // Delete the buyer
    await Buyer.findByIdAndDelete(id)

    // Delete the corresponding user account
    await User.findOneAndDelete({ email: buyer.email })

    return NextResponse.json({ message: "Buyer deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
