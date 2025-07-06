"use client"
import { useEffect, useState } from "react"
import { Container, Row, Col, Spinner } from "react-bootstrap"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import ProfileWrapper from "../components/ProfileWrapper"
import SupplierProfileCard from "../components/SupplierProfileCard"
import InspectionTeamProfileCard from "../components/InspectionProfileCard"

export default function BuyerDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [suppliers, setSuppliers] = useState([])
  const [inspectionTeams, setInspectionTeams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [suppliersRes, inspectionRes] = await Promise.all([
          fetch("/api/supplier"),
          fetch("/api/inspection-team")
        ])

        const suppliersData = await suppliersRes.json()
        const inspectionData = await inspectionRes.json()

        setSuppliers(suppliersData)
        setInspectionTeams(inspectionData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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
    <ProfileWrapper requiredRole="buyer">
      <Container className="py-5">
        <h1 className="mb-4">Welcome, <span className="text-orange fw-bold">{session?.user?.name || "Buyer"}</span></h1>

        <h2 className="mb-3 text-orange fw-bold">Suppliers</h2>
        <Row xs={1} md={2} lg={3} className="g-4 mb-5">
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <Col key={supplier._id}>
                <SupplierProfileCard supplier={supplier} />
              </Col>
            ))
          ) : (
            <Col><p>No suppliers found.</p></Col>
          )}
        </Row>

        <h2 className="mb-4 text-orange fw-bold">Inspection Teams</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {inspectionTeams.length > 0 ? (
            inspectionTeams.map((team) => (
              <Col key={team._id}>
                <InspectionTeamProfileCard teamData={team} />
              </Col>
            ))
          ) : (
            <Col><p>No inspection teams found.</p></Col>
          )}
        </Row>
      </Container>
    </ProfileWrapper>
  )
}
