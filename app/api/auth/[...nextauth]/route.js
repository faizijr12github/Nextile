import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import connect from "@/libs/mongodb"
import User from "@/app/models/User"
import Admin from "@/app/models/Admin"
import Buyer from "@/app/models/Buyer"
import Supplier from "@/app/models/Supplier"
import InspectionTeam from "@/app/models/InspectionTeam"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          await connect()

          // STEP 1: First check if the user is an admin
          const admin = await Admin.findOne({ email: credentials.email })

          if (admin) {
            // Verify admin password
            const isPasswordValid = await bcrypt.compare(credentials.password, admin.password)

            if (isPasswordValid) {
              // Return admin user data
              return {
                id: admin._id.toString(),
                email: admin.email,
                name: "Administrator",
                role: "admin",
              }
            }
          }

          // STEP 2: If not admin, check regular users (buyer, supplier, inspection)
          const user = await User.findOne({ email: credentials.email })

          if (!user) {
            return null
          }

          // Verify user password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            return null
          }

          // STEP 3: Get profile data based on role
          let profileData = null

          if (user.role === "buyer") {
            profileData = await Buyer.findById(user.profileId)
          } else if (user.role === "supplier") {
            profileData = await Supplier.findById(user.profileId)
          } else if (user.role === "inspection") {
            profileData = await InspectionTeam.findById(user.profileId)
          }

          // STEP 4: Return user data with role information
          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            profileId: user.profileId?.toString(),
            name: profileData?.companyName || "User",
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.profileId = user.profileId
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.profileId = token.profileId
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
