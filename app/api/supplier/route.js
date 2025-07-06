import { NextResponse } from "next/server";
import Supplier from "@/app/models/Supplier";
import cloudinary from "@/libs/cloudinary";
import connect from "@/libs/mongodb";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";

// Parse multipart/form-data
export const POST = async (req) => {
  try {
    const formData = await req.formData();

    const companyName = formData.get("companyName");
    const companyRegNo = formData.get("companyRegNo");
    const email = formData.get("email");
    const password = formData.get("password");
    const productDetails = formData.get("productDetails");

    const companyProfile = formData.get("companyProfile");
    const productCatalog = formData.get("productCatalog");

    // Convert blobs to buffers
    const profileBuffer = Buffer.from(await companyProfile.arrayBuffer());
    const catalogBuffer = Buffer.from(await productCatalog.arrayBuffer());

    await connect();

    // ✅ Check if supplier already exists (by email or company name)
    const existingSupplier = await Supplier.findOne({
      $or: [{ email }, { companyName }],
    });

    if (existingSupplier) {
      return NextResponse.json(
        { success: false, message: "Supplier already exists." },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const uploadPDF = async (buffer, filename) => {
      return await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            public_id: `suppliers/${filename}`,
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
    const productCatalogUrl = await uploadPDF(catalogBuffer, `${companyName}_catalog`);

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new supplier
    const newSupplier = new Supplier({
      companyName,
      companyRegNo,
      email,
      password: hashedPassword,
      companyProfileUrl,
      productCatalogUrl,
      productDetails,
    });

    await newSupplier.save();

    // Create entry in users collection
    const newUser = new User({
      email,
      password: hashedPassword,
      role: "supplier",
      profileId: newSupplier._id,
    });

    await newUser.save();

    return NextResponse.json({ success: true, message: "Supplier registered successfully." });
  } catch (error) {
    console.error("Supplier registration error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};


// --- GET (Fetch supplier(s)) ---
export const GET = async (req) => {
  try {
    await connect();
    const suppliers = await Supplier.find(); // find all suppliers
    return NextResponse.json(suppliers);
  } catch (error) {
    console.error("Fetch supplier error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};
