"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Form, InputGroup, Button, Card, Alert, Spinner } from "react-bootstrap"
import AOS from "aos"
import "aos/dist/aos.css"

const Explore = () => {
  const [query, setQuery] = useState("")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    AOS.init({ duration: 1300 })
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [users])

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setUsers([])
      setHasSearched(false)
      setError("")
      return
    }

    setLoading(true)
    setError("")
    setHasSearched(true)

    try {
      console.log("Searching for:", searchQuery)
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`)

      console.log("Response status:", response.status)
      console.log("Response headers:", response.headers)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Search failed")
      }

      const data = await response.json()
      console.log("Received data:", data)

      // Handle the response structure - the API returns { result: [...] }
      let suppliers = []

      if (data && data.result && Array.isArray(data.result)) {
        suppliers = data.result
      } else if (Array.isArray(data)) {
        suppliers = data
      } else if (data && typeof data === "object") {
        suppliers = [data]
      }

      console.log("Processed suppliers:", suppliers)
      setUsers(suppliers)
    } catch (err) {
      console.error("Search error:", err)
      setError(err.message || "An error occurred while searching")
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
  }

  return (
    <>
      {/* Hero Section */}
      <div
        className="text-center bg-image position-relative"
        style={{
          backgroundImage: "url('/images/downloads-bg.webp')",
          height: "550px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        ></div>
        <Container fluid className="position-relative d-flex justify-content-center align-items-center h-100">
          <Row className="justify-content-center home-hero">
            <Col lg="7" md="10" data-aos="zoom-out" className="px-5">
              <h1 className="fw-bold text-orange display-5">Discover Leading Textile Buyers, Suppliers & Inspection Experts</h1>
              <p className="mt-3 text-white lead mb-5">
                Utilize advanced NLP-based search to connect with the best in the textile industry
              </p>
              <Form className="mb-5 border-0" onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Search for textile suppliers, manufacturers, or products..."
                    aria-label="Search suppliers"
                    value={query}
                    onChange={handleInputChange}
                    disabled={loading}
                    style={{ fontSize: "1.1rem", padding: "0.75rem 1rem" }}
                  />
                  <Button
                    type="submit"
                    className="conatct-form-btn rounded-0"
                    disabled={loading || !query.trim()}
                    style={{ padding: "0.75rem 1.5rem" }}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <>
                        <i className="bi bi-robot text-white"></i>
                      </>
                    )}
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="expertise mt-5">
        {/* Error State */}
        {error && (
          <Row className="mb-4">
            <Col>
              <Alert variant="danger" data-aos="fade-in">
                <Alert.Heading>
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Search Error
                </Alert.Heading>
                <p className="mb-0">{error}</p>
              </Alert>
            </Col>
          </Row>
        )}

        {/* Loading State */}
        {loading && (
          <Row className="text-center py-5">
            <Col data-aos="fade-in">
              <Spinner animation="border" className="text-orange" size="lg" />
              <p className="mt-3 text-muted fs-5">Searching...</p>
            </Col>
          </Row>
        )}

        {/* No Results */}
        {hasSearched && !loading && !error && users.length === 0 && (
          <Row className="text-center py-5">
            <Col data-aos="fade-in">
              <div className="mb-4">
                <i className="bi bi-search" style={{ fontSize: "4rem", color: "#6c757d" }}></i>
              </div>
              <h3 className="text-muted mb-3">No suppliers found</h3>
              <p className="text-muted fs-5">Try different search terms or check your spelling</p>
              <div className="mt-4">
                <p className="text-muted mb-2">Try searching for:</p>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => {
                      setQuery("textile manufacturers")
                      handleSearch("textile manufacturers")
                    }}
                  >
                    textile manufacturers
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => {
                      setQuery("cotton suppliers")
                      handleSearch("cotton suppliers")
                    }}
                  >
                    cotton suppliers
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => {
                      setQuery("garment exporters")
                      handleSearch("garment exporters")
                    }}
                  >
                    garment exporters
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}

        {/* Results Section */}
        {users.length > 0 ? (
          <>
            <Row data-aos="fade-right">
              <Col>
                <h1 className="fw-bold text-center text-orange">Search Results</h1>
              </Col>
            </Row>

            <Row className="mt-5">
              {users.map((supplier, index) => (
                <Col key={`supplier-${index}`} lg={6} xl={4} className="mb-4">
                  <Card
                    className="h-100 shadow-sm border-0 supplier-card"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <Card.Body className="p-4">
                      <Card.Title className="h4 text-orange mb-3 fw-bold d-flex align-items-center">
                        <i className="bi bi-building me-2"></i>
                        {supplier.name || "Unnamed Supplier"}
                      </Card.Title>

                      {supplier.type_of_garments && (
                        <div className="mb-4">
                          <h6 className="text-muted mb-2 fw-semibold">
                            <i className="bi bi-tags me-2"></i>
                            Products & Services
                          </h6>
                          <p className="text-dark lh-base" style={{ fontSize: "0.9rem" }}>
                            {supplier.type_of_garments}
                          </p>
                        </div>
                      )}

                      <div className="mt-auto">
                        {supplier.address && (
                          <div className="mb-3 p-3 bg-light rounded">
                            <div className="d-flex align-items-start">
                              <i className="bi bi-geo-alt text-orange me-2 mt-1"></i>
                              <div>
                                <small className="text-muted d-block fw-semibold">Location</small>
                                <span className="fw-medium text-dark">{supplier.address}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {supplier.phone && supplier.phone !== "N/A" && (
                          <div className="mb-2 p-3 bg-light rounded">
                            <div className="d-flex align-items-start">
                              <i className="bi bi-telephone text-orange me-2 mt-1"></i>
                              <div>
                                <small className="text-muted d-block fw-semibold">Contact</small>
                                <span className="fw-medium text-dark">{supplier.phone}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          !hasSearched &&
          !loading && (
            <Row data-aos="fade-right">
              <Col>
                <h1 className="fw-bold text-center text-orange display-5">Recommended Profiles</h1>
                <p className="text-center text-muted mt-3 lead">
                  Use the search above to discover textile suppliers, buyers, and inspection experts
                </p>
                <div className="text-center my-5">
                  <p className="text-muted mb-3">Popular searches:</p>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <span className="bg-orange-grad badge text-white px-3 py-2 fs-6">Cotton Suppliers</span>
                    <span className="bg-orange-grad badge text-white px-3 py-2 fs-6">Textile Manufacturers</span>
                    <span className="bg-orange-grad badge text-white px-3 py-2 fs-6">Garment Exporters</span>
                    <span className="bg-orange-grad badge text-white px-3 py-2 fs-6">Quality Inspectors</span>
                    <span className="bg-orange-grad badge text-white px-3 py-2 fs-6">Fabric Suppliers</span>
                  </div>
                </div>
              </Col>
            </Row>
          )
        )}
      </Container>

      <style jsx global>{`
        .text-orange {
          color: #ff6b35 !important;
        }
        
        .conatct-form-btn {
          background-color: #ff6b35;
          border-color: #ff6b35;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .conatct-form-btn:hover:not(:disabled) {
          background-color: #e55a2b;
          border-color: #e55a2b;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
        }
        
        .conatct-form-btn:disabled {
          background-color: #ff6b35;
          border-color: #ff6b35;
          opacity: 0.7;
        }

        .supplier-card {
          border-left: 5px solid #ff6b35 !important;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          border-radius: 12px !important;
          transition: all 0.3s ease;
        }
        
        .supplier-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(255, 107, 53, 0.15);
          border-left-color: #e55a2b !important;
        }

        .form-control {
          border: 2px solid #e9ecef;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: #ff6b35;
          box-shadow: 0 0 0 0.2rem rgba(255, 107, 53, 0.25);
        }

        .badge {
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .badge:hover {
          background-color: #ff6b35 !important;
          color: white !important;
        }

        @media (max-width: 768px) {
          .supplier-card {
            margin-bottom: 1.5rem;
          }
          
          .home-hero h1 {
            font-size: 2rem;
          }
          
          .conatct-form-btn {
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
    </>
  )
}

export default Explore
