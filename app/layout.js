import { Geist, Geist_Mono } from "next/font/google"
import "bootstrap/dist/css/bootstrap.min.css"
import NavScrollExample from "./components/NavScrollExample"
import { AuthProvider } from "@/providers/AuthProvider"
import './globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from "./components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Nextile",
  description: "Connecting Markets",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* Add suppressHydrationWarning to ignore attributes added by browser extensions */}
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <NavScrollExample />
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  )
}
