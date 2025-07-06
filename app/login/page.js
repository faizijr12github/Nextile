"use client"
import { useState } from "react"
import { Container, Form, Button, Spinner, Alert, Row, Col } from "react-bootstrap"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get error from URL if present
  const errorFromUrl = searchParams.get("error")
  if (errorFromUrl && !loginError) {
    setLoginError(errorFromUrl === "CredentialsSignin" ? "Invalid email or password" : "An error occurred during login")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setLoginError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setLoginError("Invalid email or password")
        setIsSubmitting(false)
        return
      }

      // If login is successful, fetch the user's role to determine redirect
      const response = await fetch("/api/user/role")
      const data = await response.json()

      if (response.ok) {
        // Redirect based on user role
        switch (data.role) {
          case "admin":
            router.push("/admin-dashboard")
            break
          case "buyer":
            router.push("/buyerProfile")
            break
          case "supplier":
            router.push("/supplierProfile")
            break
          case "inspection":
            router.push("/inspectionTeamProfile")
            break
          default:
            router.push("/") // Fallback to home page
        }
      } else {
        // Handle error fetching role
        setLoginError("Login successful but couldn't determine user role")
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Login failed:", error)
      setLoginError("Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Container fluid className='contact-bg py-5'>
        <Container>
          <Row className='justify-content-between align-items-center'>
            <Col className='mt-5' lg="5" data-aos="fade-right">
              <h1 className='text-orange fw-bold mb-3 display-4'>Nextile Advantages</h1>
              <div className='text-white mt-5 lead'>
                <p><i className="bi bi-check-circle-fill"></i> Connect With Textile Buyers & Suppliers - Directly</p>
                <p><i className="bi bi-check-circle-fill"></i> Fulfill Your Textile Needs from Single Platform</p>
                <p><i className="bi bi-check-circle-fill"></i> Global Visibility of Your Products.</p>
              </div>
            </Col>
            <Col className='mt-5' lg="5">
              {/* Login form */}
              {loginError && <Alert variant="danger">{loginError}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="mt-4 w-100 conatct-form-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner animation="border" size="sm" /> Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form>

              <div className="mt-3 text-center">
                <p className="text-white">Don't have an account?</p>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  <Link href="/buyerRegistration" className="btn bg-orange-grad text-white btn-sm">
                    Buyer Registration
                  </Link>
                  <Link href="/supplierRegistration" className="btn bg-orange-grad text-white btn-sm">
                    Supplier Registration
                  </Link>
                  <Link href="/inspectionTeamRegistration" className="btn bg-orange-grad text-white btn-sm">
                    Inspection Team
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

export default LoginPage
