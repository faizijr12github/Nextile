"use client"
import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, Tabs, Tab, Spinner, Alert } from "react-bootstrap"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import ProfileWrapper from "../components/ProfileWrapper"
import Link from "next/link"

export default function AdminDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [data, setData] = useState({
    buyers: [],
    suppliers: [],
    inspectionTeams: [],
  })

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true)

        // Fetch all buyers
        const buyersRes = await fetch("/api/buyer")
        const buyersData = await buyersRes.json()

        // Fetch all suppliers
        const suppliersRes = await fetch("/api/supplier")
        const suppliersData = await suppliersRes.json()

        // Fetch all inspection teams
        const inspectionRes = await fetch("/api/inspection-team")
        const inspectionData = await inspectionRes.json()

        setData({
          buyers: buyersData,
          suppliers: suppliersData,
          inspectionTeams: inspectionData,
        })
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  if (loading) {
    return (
      <ProfileWrapper requiredRole="admin">
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </ProfileWrapper>
    )
  }

  return (
    <ProfileWrapper requiredRole="admin">
      <Container className="py-4">
        <h1 className="mb-4 text-orange"><i className="bi bi-tv me-1"></i>Admin Dashboard</h1>
        {error && <Alert variant="danger">{error}</Alert>}

        <Tabs defaultActiveKey="buyers" className="mb-4">
          <Tab eventKey="buyers" title={`Buyers (${data.buyers.length})`}>
            <Row xs={1} md={2} lg={3} className="g-4">
              {data.buyers.map((buyer) => (
                <Col key={buyer._id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title>{buyer.companyName}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Buyer</Card.Subtitle>
                      <Card.Text>
                        <strong>Registration:</strong> {buyer.companyRegNo}
                        <br />
                        <strong>Email:</strong> {buyer.email}
                        <br />
                        <strong>Product Required:</strong> {buyer.productRequired}
                        <br />
                        <strong>Category:</strong> {buyer.productCategory}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-transparent">
                      <div className="d-flex justify-content-between">
                        <Link href={`/admin/manage-buyer/${buyer._id}`} passHref>
                          <Button className="conatct-form-btn btn-sm" size="sm">
                            <i className="bi bi-tools me-1"></i>
                            Manage
                          </Button>
                        </Link>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
              {data.buyers.length === 0 && (
                <Col xs={12}>
                  <Alert variant="info">No buyers found.</Alert>
                </Col>
              )}
            </Row>
          </Tab>

          <Tab eventKey="suppliers" title={`Suppliers (${data.suppliers.length})`}>
            <Row xs={1} md={2} lg={3} className="g-4">
              {data.suppliers.map((supplier) => (
                <Col key={supplier._id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title>{supplier.companyName}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Supplier</Card.Subtitle>
                      <Card.Text>
                        <strong>Registration:</strong> {supplier.companyRegNo}
                        <br />
                        <strong>Email:</strong> {supplier.email}
                        <br />
                        <strong>Products:</strong> {supplier.productDetails}
                      </Card.Text>
                      {supplier.companyProfileUrl && (
                        <a
                          href={supplier.companyProfileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-dark me-2"
                        >
                          Company Profile
                        </a>
                      )}
                      {supplier.productCatalogUrl && (
                        <a
                          href={supplier.productCatalogUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-dark"
                        >
                          Product Catalog
                        </a>
                      )}
                    </Card.Body>
                    <Card.Footer className="bg-transparent">
                      <div className="d-flex justify-content-between">
                        <Link href={`/admin/manage-supplier/${supplier._id}`} passHref>
                          <Button className="conatct-form-btn btn-sm" size="sm">
                            <i className="bi bi-tools me-1"></i>
                            Manage
                          </Button>
                        </Link>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
              {data.suppliers.length === 0 && (
                <Col xs={12}>
                  <Alert variant="info">No suppliers found.</Alert>
                </Col>
              )}
            </Row>
          </Tab>

          <Tab eventKey="inspection" title={`Inspection Teams (${data.inspectionTeams.length})`}>
            <Row xs={1} md={2} lg={3} className="g-4">
              {data.inspectionTeams.map((team) => (
                <Col key={team._id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title>{team.companyName}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Inspection Team</Card.Subtitle>
                      <Card.Text>
                        <strong>Country:</strong> {team.countryName}
                        <br />
                        <strong>Email:</strong> {team.email}
                        <br />
                        <strong>Products Inspected:</strong> {team.productDetails}
                      </Card.Text>
                      {team.companyProfileUrl && (
                        <a
                          href={team.companyProfileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-dark me-2"
                        >
                          Company Profile
                        </a>
                      )}
                      {team.inspectionReportsUrl && (
                        <a
                          href={team.inspectionReportsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-dark"
                        >
                          Inspection Reports
                        </a>
                      )}
                    </Card.Body>
                    <Card.Footer className="bg-transparent">
                      <div className="d-flex justify-content-between">
                        <Link href={`/admin/manage-team/${team._id}`} passHref>
                          <Button className="conatct-form-btn btn-sm" size="sm">
                            <i className="bi bi-tools me-1"></i>
                            Manage
                          </Button>
                        </Link>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
              {data.inspectionTeams.length === 0 && (
                <Col xs={12}>
                  <Alert variant="info">No inspection teams found.</Alert>
                </Col>
              )}
            </Row>
          </Tab>
        </Tabs>
      </Container>
    </ProfileWrapper>
  )
}
