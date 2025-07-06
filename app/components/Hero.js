"use client"
import { Container, Row, Col } from "react-bootstrap"
import Link from "next/link"
import { useSession } from "next-auth/react"

const HeroSection = () => {
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"

  return (
    <div
      className="text-center bg-image position-relative"
      style={{
        backgroundImage: "url('/images/textile-slider.webp')",
        height: "600px",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Full-width dark overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      ></div>

      <Container fluid className="position-relative d-flex justify-content-center align-items-center h-100">
        <Row className="justify-content-center home-hero">
          <Col lg="7" md="10" data-aos="zoom-out" className="px-5">
            <h1 className="fw-bold mb-3 display-4 text-white">Nextile</h1>
            <div>
              <p className="text-white lead">
                Nextile is a dedicated web platform that aims to connect buyers and suppliers in the textile industry
                based on the products they deal in, creating a centralized, industry-specific platform. The system will
                include AI powered recommended suppliers, detailed profiles, and inquiry forms to facilitate
                transactions.
              </p>
              <Link href={"/downloads"} className="hero-btn1 btn fw-bold me-3">
                Downloads <i className="bi bi-download ms-2"></i>
              </Link>

              {isAuthenticated && (
                <>
                  {session?.user?.role === "buyer" && (
                    <Link href={"/buyerProfile"} className="hero-btn1 btn fw-bold">
                      View Suppliers & Teams
                    </Link>
                  )}
                  {session?.user?.role === "supplier" && (
                    <Link href={"/supplierProfile"} className="hero-btn1 btn fw-bold">
                      View Buyers
                    </Link>
                  )}
                  {session?.user?.role === "inspection" && (
                    <Link href={"/inspectionTeamProfile"} className="hero-btn1 btn fw-bold">
                      View Buyers
                    </Link>
                  )}
                </>
              )}

              {!isAuthenticated && (
                <Link href={"/login"} className="hero-btn1 btn fw-bold">
                  Get Started
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HeroSection
