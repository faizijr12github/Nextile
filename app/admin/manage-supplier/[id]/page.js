"use client"
import { useState, useEffect } from "react"
import { Container, Form, Button, Card, Modal, Spinner, Alert } from "react-bootstrap"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import ProfileWrapper from "@/app/components/ProfileWrapper"
import { use } from "react"

export default function AdminManageSupplier({ params }) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params)
  const id = resolvedParams.id
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [formData, setFormData] = useState({
    companyName: "",
    companyRegNo: "",
    email: "",
    productDetails: "",
  })

  // Files can't be pre-filled, so we'll just track if they're changed
  const [companyProfileFile, setCompanyProfileFile] = useState(null)
  const [productCatalogFile, setProductCatalogFile] = useState(null)
  const [currentFiles, setCurrentFiles] = useState({
    companyProfileUrl: "",
    productCatalogUrl: "",
  })

  useEffect(() => {
    const fetchSupplierProfile = async () => {
      try {
        const res = await fetch(`/api/supplier/${id}`)
        if (res.ok) {
          const data = await res.json()
          setFormData({
            companyName: data.companyName || "",
            companyRegNo: data.companyRegNo || "",
            email: data.email || "",
            productDetails: data.productDetails || "",
          })
          setCurrentFiles({
            companyProfileUrl: data.companyProfileUrl || "",
            productCatalogUrl: data.productCatalogUrl || "",
          })
        } else {
          setError("Failed to fetch profile data")
        }
      } catch (err) {
        setError("An error occurred while fetching the profile")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSupplierProfile()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    if (e.target.name === "companyProfile") {
      setCompanyProfileFile(e.target.files[0])
    } else if (e.target.name === "productCatalog") {
      setProductCatalogFile(e.target.files[0])
    }
  }

  const handleUpdate = async () => {
    setSubmitting(true)
    setError("")
    setSuccess("")

    const formDataToSend = new FormData()
    formDataToSend.append("companyName", formData.companyName)
    formDataToSend.append("companyRegNo", formData.companyRegNo)
    formDataToSend.append("email", formData.email)
    formDataToSend.append("productDetails", formData.productDetails)

    if (companyProfileFile) {
      formDataToSend.append("companyProfile", companyProfileFile)
    }

    if (productCatalogFile) {
      formDataToSend.append("productCatalog", productCatalogFile)
    }

    try {
      const res = await fetch(`/api/supplier/${id}`, {
        method: "PUT",
        body: formDataToSend,
      })

      if (res.ok) {
        setSuccess("Profile updated successfully!")
        setShowUpdateModal(false)
      } else {
        const data = await res.json()
        setError(data.error || "Failed to update profile")
      }
    } catch (err) {
      setError("An error occurred while updating the profile")
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setSubmitting(true)
    setError("")

    try {
      const res = await fetch(`/api/supplier/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        router.push("/admin-dashboard")
      } else {
        const data = await res.json()
        setError(data.error || "Failed to delete profile")
        setShowDeleteModal(false)
      }
    } catch (err) {
      setError("An error occurred while deleting the profile")
      console.error(err)
      setShowDeleteModal(false)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <ProfileWrapper requiredRole="admin">
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </ProfileWrapper>
    )
  }

  return (
    <ProfileWrapper requiredRole="admin">
      <Container fluid className="contact-bg py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-orange">Manage Supplier Profile</h1>
          <Button className="btn-dark btn-sm" onClick={() => router.push("/admin-dashboard")}>
          <i className="bi bi-arrow-left-short me-1"></i>
            Back to Dashboard
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Card className="bg-transparent border-0">
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Company Registration Number</Form.Label>
                <Form.Control
                  type="text"
                  name="companyRegNo"
                  value={formData.companyRegNo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled
                />
                <Form.Text className="text-danger">Email cannot be changed as it is used for authentication.</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Upload Company Profile (PDF)</Form.Label>
                <Form.Control type="file" name="companyProfile" onChange={handleFileChange} accept=".pdf" />
                {currentFiles.companyProfileUrl && (
                  <div className="mt-2">
                    <a
                      href={currentFiles.companyProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-dark"
                    >
                      View Current Company Profile
                    </a>
                  </div>
                )}
                <Form.Text className="text-warning">Leave empty to keep the current company profile.</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Upload Product Catalog (PDF)</Form.Label>
                <Form.Control type="file" name="productCatalog" onChange={handleFileChange} accept=".pdf" />
                {currentFiles.productCatalogUrl && (
                  <div className="mt-2">
                    <a
                      href={currentFiles.productCatalogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-dark"
                    >
                      View Current Product Catalog
                    </a>
                  </div>
                )}
                <Form.Text className="text-warning">Leave empty to keep the current product catalog.</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="productDetails"
                  value={formData.productDetails}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="primary" onClick={() => setShowUpdateModal(true)}>
                  Update Profile
                </Button>
                <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                  Delete Profile
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Update Confirmation Modal */}
        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to update this supplier profile?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdate} disabled={submitting}>
              {submitting ? <Spinner animation="border" size="sm" /> : "Update"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-danger fw-bold">Warning: This action cannot be undone!</p>
            <p>
              Are you sure you want to delete this supplier profile? This will permanently remove all their data from
              the system.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={submitting}>
              {submitting ? <Spinner animation="border" size="sm" /> : "Delete"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      </Container>
    </ProfileWrapper>
  )
}
