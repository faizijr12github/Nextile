"use client"
import { useState, useEffect } from "react"
import { Container, Form, Button, Card, Modal, Spinner, Alert } from "react-bootstrap"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import ProfileWrapper from "@/app/components/ProfileWrapper"
import { use } from "react"

export default function AdminManageBuyer({ params }) {
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
    productRequired: "",
    productCategory: "",
    productSize: "",
    additionalDetails: "",
  })

  useEffect(() => {
    const fetchBuyerProfile = async () => {
      try {
        const res = await fetch(`/api/buyer/${id}`)
        if (res.ok) {
          const data = await res.json()
          setFormData({
            companyName: data.companyName || "",
            companyRegNo: data.companyRegNo || "",
            email: data.email || "",
            productRequired: data.productRequired || "",
            productCategory: data.productCategory || "",
            productSize: data.productSize || "",
            additionalDetails: data.additionalDetails || "",
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

    fetchBuyerProfile()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    setSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch(`/api/buyer/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
      const res = await fetch(`/api/buyer/${id}`, {
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
            <h1 className="text-orange">Manage Buyer Profile</h1>
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
                  <Form.Label>Product Required</Form.Label>
                  <Form.Control
                    type="text"
                    name="productRequired"
                    value={formData.productRequired}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Product Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Product Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="productSize"
                    value={formData.productSize}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Additional Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="additionalDetails"
                    value={formData.additionalDetails}
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
            <Modal.Body>Are you sure you want to update this buyer profile?</Modal.Body>
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
                Are you sure you want to delete this buyer profile? This will permanently remove all their data from the
                system.
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
