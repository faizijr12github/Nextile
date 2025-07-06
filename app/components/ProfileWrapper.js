"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Container, Spinner } from "react-bootstrap"

export default function ProfileWrapper({ children, requiredRole }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // Check if the user is authenticated and has the required role
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (status === "authenticated") {
      const userRole = session?.user?.role

      if (requiredRole) {
        // For specific role requirements
        if (userRole === requiredRole || userRole === "admin") {
          setAuthorized(true)
        } else {
          router.push("/unauthorized")
        }
      } else {
        // If no specific role is required, just check if authenticated
        setAuthorized(true)
      }
    }
  }, [session, status, router, requiredRole])

  // Show loading state while checking authentication
  if (status === "loading" || !authorized) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }

  // Render children if authorized
  return <>{children}</>
}
