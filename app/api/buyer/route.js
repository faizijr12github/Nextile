import connect from "@/libs/mongodb";
import Buyer from "@/app/models/Buyer";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/app/models/User";

export async function POST(req) {
    try {
        await connect();  // Ensure DB is connected
        const { companyName, companyRegNo, email, password, productRequired, productCategory, productSize, additionalDetails } = await req.json();

        // Check if the user already exists
        const existingBuyer = await Buyer.findOne({ email });
        if (existingBuyer) {
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new buyer
        const newBuyer = new Buyer({
            companyName,
            companyRegNo,
            email,
            password: hashedPassword,
            productRequired,
            productCategory,
            productSize,
            additionalDetails,
        });

        await newBuyer.save();

        // Create entry in users collection
        const newUser = new User({
            email,
            password: hashedPassword,
            role: "buyer",
            profileId: newBuyer._id,
        })

        await newUser.save()

        return NextResponse.json({ message: "Buyer registered successfully!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Get Buyers
export const GET = async () => {
    try {
        await connect();  // Ensure DB is connected
        const buyers = await Buyer.find();  // Get all buyers from the database
        return NextResponse.json(buyers);  // Return the buyers as JSON
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};