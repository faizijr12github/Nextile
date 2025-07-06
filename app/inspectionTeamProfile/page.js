"use client"

import { useEffect, useState } from "react"
import { Container, Row, Col, Spinner } from "react-bootstrap"
import { useSession } from "next-auth/react"
import ProfileWrapper from "../components/ProfileWrapper"
import BuyerProfileCard from "../components/BuyerProfilecard"

export default function InspectionTeamDashboard() {
  const { data: session } = useSession()
  const [buyers, setBuyers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const res = await fetch("/api/buyer")
        const data = await res.json()
        setBuyers(data)
      } catch (error) {
        console.error("Error fetching buyers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBuyers()
  }, [])

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }

  return (
    <ProfileWrapper requiredRole="inspection">
      <Container className="py-5">
        <h1 className="mb-4">Welcome, <span className="text-orange fw-bold">{session?.user?.name || "Inspection Team"}</span></h1>

        <h2 className="mb-4 text-orange">Buyers</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {buyers.length > 0 ? (
            buyers.map((buyer) => (
              <Col key={buyer._id}>
                <BuyerProfileCard buyer={buyer} />
              </Col>
            ))
          ) : (
            <Col>
              <p>No buyers found.</p>
            </Col>
          )}
        </Row>
      </Container>
    </ProfileWrapper>
  )
}
