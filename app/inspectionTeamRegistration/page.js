"use client";
import { useState } from "react";
import { Container, Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

const RegistrationForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryName, setCountryName] = useState("");
  const [companyProfile, setCompanyProfile] = useState(null);
  const [inspectionReports, setInspectionReports] = useState(null);
  const [productDetails, setProductDetails] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();  // Initialize the router

  const resetForm = () => {
    setCompanyName("");
    setEmail("");
    setPassword("");
    setCountryName("");
    setCompanyProfile(null);
    setInspectionReports(null);
    setProductDetails("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRegistrationError("");

    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("countryName", countryName);
    formData.append("companyProfile", companyProfile);
    formData.append("inspectionReports", inspectionReports);
    formData.append("productDetails", productDetails);

    try {
      const res = await fetch("/api/inspection-team", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Registration successful!");
        resetForm();
        router.push("/login");  // Redirect to the login page after successful registration
      } else {
        setRegistrationError(data.message || "Registration failed.");
      }
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
            <h1 className='text-orange fw-bold mb-3'>Inspection Teams's Advantages</h1>
            <div className='text-white mt-5'>
              <p><i className="bi bi-check-circle-fill"></i> Ensure Quality - Verify product quality and compliance with industry standards.</p>
              <p><i className="bi bi-check-circle-fill"></i> Streamlined Inspections - Conduct inspections efficiently with structured processes.</p>
              <p><i className="bi bi-check-circle-fill"></i> Comprehensive Reports - Provide detailed assessments to buyers and suppliers.</p>
              <p><i className="bi bi-check-circle-fill"></i> Seamless Coordination - Collaborate with buyers and suppliers for smooth transactions.</p>
            </div>
            <h2 className="text-white fw-bold">Inspection Team Advisory & Disclaimer:</h2>
            <div className="text-white mt-3">
              <p>
                <i className="bi bi-check-circle-fill"></i> Submit a complete profile including your certifications, areas of expertise, past project experience, and client feedback to gain buyer and supplier trust.
              </p>
              <p>
                <i className="bi bi-check-circle-fill"></i> Any false claims or unethical practices may result in removal from the platform.
              </p>
            </div>
          </Col>
          <Col className='mt-5' lg="5">
            {/* Inspection Team register form */}
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

              <Form.Group controlId="countryName" className="mt-3">
                <Form.Label>Country Name</Form.Label>
                <Form.Control
                  type="text"
                  value={countryName}
                  onChange={(e) => setCountryName(e.target.value)}
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

              <Form.Group controlId="inspectionReports" className="mt-3">
                <Form.Label>Inspection Reports (PDF)</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setInspectionReports(e.target.files[0])}
                  accept=".pdf"
                  required
                />
              </Form.Group>

              <Form.Group controlId="productDetails" className="mt-3">
                <Form.Label>Product to be Inspected</Form.Label>
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
