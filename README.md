Sure! Below is the **textual version** of your `README.md` content that you can copy and paste directly into your GitHub repository:

---

# 🧵 Nextile – AI-Powered Textile Industry Platform

**Nextile** is an AI-integrated B2B web application developed to modernize how textile buyers, suppliers, and inspection teams discover, interact, and make decisions. It combines role-based access with AI services like search, predictive analysis, and automatic insights from export data – all in one intelligent platform.

---

## 🚀 Features

* **User Roles**: Register/Login as Buyer, Supplier, or Inspection Team
* **Admin Dashboard**: Full control to view, edit, or delete users
* **AI-Powered Search**: Context-aware search for buyers, suppliers, and inspection teams (without directory clutter)
* **EDA on CSV Uploads**: Upload export data files and automatically generate summaries, trends, and insights
* **Predictive Analytics**: Submit export datasets with custom prompts and receive predictions via Gemini AI
* **Inquiry System**: Users can send inquiries via email, directly from the platform
* **Secure Authentication**: Passwords hashed with bcrypt; authentication handled with NextAuth

---

## 🛠️ Technologies Used

* **Next.js** – Full-stack React framework
* **MongoDB Atlas** – Cloud database for storing user data and roles
* **Mongoose** – Data modeling for MongoDB
* **NextAuth.js** – Role-based authentication and session handling
* **Bcrypt / BcryptJS** – Password hashing
* **Cloudinary** – File and image uploads
* **Nodemailer** – Email handling for inquiries
* **Google Gemini API** – AI-based data summarization and prediction
* **React-Bootstrap** & **Bootstrap Icons** – Responsive UI
* **Formidable** – File handling middleware
* **AOS / Swiper.js** – Frontend animations and sliders

---

## 📂 Folder Overview

```
pages/
 ├─ api/ (APIs for auth, user roles, inquiries, AI features)
 ├─ login/, register/, dashboard/ (Frontend pages)

models/         # MongoDB models (Buyer, Supplier, InspectionTeam, Admin, User)
libs/           # MongoDB connection, Cloudinary config
components/     # Reusable components
public/         # Static files and images
.env            # Environment variables
next.config.mjs # Next.js config
```

---

## ⚙️ How to Run Locally

### Prerequisites

* Node.js (v18+)
* MongoDB Atlas database
* Google Gemini API Key
* Tavily API Key
* Gmail App Password (for Nodemailer)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nextile.git
   cd nextile
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add a `.env` file with the following variables:

   ```
   MONGODB_URI=your_mongodb_url
   GEMINI_API_KEY=your_gemini_api_key
   TAVILY_API_KEY=your_tavily_api_key
   EMAIL_USER=your_gmail_email
   EMAIL_PASS=your_gmail_app_password
   NEXTAUTH_SECRET=your_secret_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

---

## 🧪 Testing

* APIs are tested using **Postman**
* Includes:

  * Registration for all roles
  * Login functionality
  * Inquiry email test
  * AI-powered search and prediction tests
* Form and input validation checks
* Role-based access control middleware

---

## 🧑‍💼 Admin Info

* Admin credentials are pre-set in the database.
* Admin can manage (view, edit, delete) buyers, suppliers, and inspection teams.
* For support, password reset, or issues, contact:

  📧 **Email:** [textiles@nextile.com](mailto:textiles@nextile.com)

---

## 🎯 Project Goals

* Centralize all textile business connections in one AI-enhanced platform
* Save time compared to manual Google searches
* Empower companies to make **data-driven decisions**
* Provide a clean UI/UX and seamless interaction for each user type

---

## 📸 Screenshots

(Add screenshots of login, dashboard, profile, inquiry form, AI features here)

---

## 📌 Notes

* This project is developed as part of a **Final Year Project**.
* Not intended for commercial use unless extended with proper production configurations and permissions.

---

> Made with ❤️ by Mohammad Faizal Faizi

---

Let me know if you also want a Markdown file download (`README.md`) or a PDF version.
