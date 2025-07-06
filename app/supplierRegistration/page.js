"use client";
import { useState } from "react";
import { Container, Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

const RegistrationForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyRegNo, setCompanyRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyProfile, setCompanyProfile] = useState(null);
  const [productCatalog, setProductCatalog] = useState(null);
  const [productDetails, setProductDetails] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRegistrationError("");

    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("companyRegNo", companyRegNo);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("companyProfile", companyProfile);
    formData.append("productCatalog", productCatalog);
    formData.append("productDetails", productDetails);

    try {
      const res = await fetch("/api/supplier", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message || "Registration successful.");

      // Reset form fields after successful registration
      setCompanyName("");
      setCompanyRegNo("");
      setEmail("");
      setPassword("");
      setCompanyProfile(null);
      setProductCatalog(null);
      setProductDetails("");

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Form submission failed:", error);
      setRegistrationError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className='contact-bg py-5'>
      <Container>
        <Row className='justify-content-between align-items-center'>
          <Col className='mt-5' lg="5" data-aos="fade-right">
            <h1 className='text-orange fw-bold mb-3'>Supplier's Advantages</h1>
            <div className='text-white mt-5'>
              <p><i className="bi bi-check-circle-fill"></i> Reach More Buyers - Get connected with potential customers effortlessly.</p>
              <p><i className="bi bi-check-circle-fill"></i> Showcase Your Products - List your offerings and attract interested buyers.</p>
              <p><i className="bi bi-check-circle-fill"></i> Grow Your Sales - Receive inquiries and convert them into business opportunities.</p>
              <p><i className="bi bi-check-circle-fill"></i> Simplified Communication - Manage all buyer interactions through Inquiry forms.</p>
            </div>
            <h2 className="text-white fw-bold">Supplier Advisory & Disclaimer:</h2>
            <div className="text-white mt-3">
              <p>
                <i className="bi bi-check-circle-fill"></i> Incomplete or vague profiles may lead to lower trust among buyers.
              </p>
              <p>
                <i className="bi bi-check-circle-fill"></i> Misrepresentation of information may result in account suspension or removal from the platform.
              </p>
            </div>
          </Col>
          <Col className='mt-5' lg="5">
            {/* Supplier Register form */}
            {registrationError && (
              <div className="alert alert-danger">{registrationError}</div>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="companyRegNo" className="mt-3">
                <Form.Label>Company Reg No</Form.Label>
                <Form.Control
                  type="text"
                  value={companyRegNo}
                  onChange={(e) => setCompanyRegNo(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="companyProfile" className="mt-3">
                <Form.Label>Upload Company Profile (PDF)</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setCompanyProfile(e.target.files[0])}
                  accept=".pdf"
                  required
                />
              </Form.Group>

              <Form.Group controlId="productCatalog" className="mt-3">
                <Form.Label>Upload Product Catalog (PDF)</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setProductCatalog(e.target.files[0])}
                  accept=".pdf"
                  required
                />
              </Form.Group>

              <Form.Group controlId="productDetails" className="mt-3">
                <Form.Label>Product Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                />
              </Form.Group>

              <Button
                type="submit"
                className="mt-4 w-100 conatct-form-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      className="me-2"
                    />
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </Form>

          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default RegistrationForm;
