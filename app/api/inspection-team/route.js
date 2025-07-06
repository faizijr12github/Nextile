import { NextResponse } from "next/server";
import InspectionTeam from "@/app/models/InspectionTeam";
import cloudinary from "@/libs/cloudinary";
import connect from "@/libs/mongodb";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";

// Parse multipart/form-data
export const POST = async (req) => {
  try {
    const formData = await req.formData();

    const companyName = formData.get("companyName");
    const countryName = formData.get("countryName"); // Correct field
    const email = formData.get("email");
    const password = formData.get("password");
    const productDetails = formData.get("productDetails");

    const companyProfile = formData.get("companyProfile");
    const inspectionReports = formData.get("inspectionReports");

    if (!companyName || !countryName || !email || !password || !companyProfile || !inspectionReports) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    // Convert blobs to buffers
    const profileBuffer = Buffer.from(await companyProfile.arrayBuffer());
    const reportsBuffer = Buffer.from(await inspectionReports.arrayBuffer());

    // Upload to Cloudinary
    const uploadPDF = async (buffer, filename) => {
      return await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            public_id: `inspection_team/${filename}`,
            format: "pdf",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        ).end(buffer);
      });
    };

    const companyProfileUrl = await uploadPDF(profileBuffer, `${companyName}_profile`);
    const inspectionReportsUrl = await uploadPDF(reportsBuffer, `${companyName}_inspection_reports`);

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to MongoDB
    await connect();

    const newInspectionTeam = new InspectionTeam({
      companyName,
      countryName,
      email,
      password: hashedPassword, // Save hashed password
      companyProfileUrl,
      inspectionReportsUrl,
      productDetails,
    });

    await newInspectionTeam.save();

    // Create entry in users collection
    const newUser = new User({
      email,
      password: hashedPassword,
      role: "inspection",
      profileId: newInspectionTeam._id,
    })

    await newUser.save()

    return NextResponse.json({ success: true, message: "Inspection Team registered successfully." });
  } catch (error) {
    console.error("Inspection Team registration error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

// --- GET (Fetch Inspection Teams) ---
export const GET = async () => {
  try {
    await connect();
    const inspectionTeams = await InspectionTeam.find();
    console.log('Fetched inspection teams:', inspectionTeams);
    return NextResponse.json(inspectionTeams);
  } catch (error) {
    console.error("Fetch Inspection Teams error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};
