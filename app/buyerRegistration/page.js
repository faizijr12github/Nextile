"use client";
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyRegNo: "",
    email: "",
    password: "",
    productRequired: "",
    productCategory: "",
    productSize: "",
    additionalDetails: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1300 });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/buyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("🎉 Registration successful!");
        setFormData({
          companyName: "",
          companyRegNo: "",
          email: "",
          password: "",
          productRequired: "",
          productCategory: "",
          productSize: "",
          additionalDetails: "",
        });
        router.push("/login");
      } else {
        alert(data.error || "Registration failed!");
      }
    } catch (error) {
      alert("An unexpected error occurred.");
    }

    setIsSubmitting(false);
  };

  return (
    <Container fluid className="contact-bg py-5">
      <Container>
        <Row className="justify-content-between align-items-center">
          <Col className="mt-5" lg="5" data-aos="fade-right">
            <h1 className="text-orange fw-bold mb-3">Buyers' Advantages</h1>
            <div className="text-white mt-5 mb-5">
              <p>
                <i className="bi bi-check-circle-fill"></i> Easy Sourcing - Just
                fill a form, and suppliers will contact you.
              </p>
              <p>
                <i className="bi bi-check-circle-fill"></i> Best Prices - Get
                quotes from many suppliers and choose the best deal.
              </p>
              <p>
                <i className="bi bi-check-circle-fill"></i> More Choices - Find
                a variety of suppliers easily.
              </p>
              <p>
                <i className="bi bi-check-circle-fill"></i> One Place for All -
                Talk to all suppliers through Inquiry forms.
              </p>
            </div>
            <h2 className="text-white fw-bold">Buyer Advisory & Disclaimer:</h2>
            <div className="text-white mt-3">
              <p>
                <i className="bi bi-check-circle-fill"></i> Please inquire only from suppliers who have uploaded comprehensive company profiles, including certifications, machinery details, and client endorsements.
              </p>
              <p>
                <i className="bi bi-check-circle-fill"></i> Prioritize suppliers who have provided detailed product specifications in their PDF documents.
              </p>
              <p>
                <i className="bi bi-check-circle-fill"></i> Always verify supplier credentials and product authenticity before finalizing any business deal.
              </p>
            </div>
          </Col>

          <Col className="mt-5" lg="5">
            <Form onSubmit={handleSubmit} data-aos="fade-down">
              <Form.Group controlId="name">
                <Form.Label className="form-label">Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="RegNo" className="mt-3">
                <Form.Label className="form-label">Company Reg No</Form.Label>
                <Form.Control
                  type="text"
                  name="companyRegNo"
                  value={formData.companyRegNo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email" className="mt-3">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mt-3">
                <Form.Label className="form-label">Set your Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="productRequired" className="mt-3">
                <Form.Label className="form-label">Product Required</Form.Label>
                <Form.Control
                  type="text"
                  name="productRequired"
                  value={formData.productRequired}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="productCategory" className="mt-3">
                <Form.Label className="form-label">Product Category</Form.Label>
                <Form.Control
                  type="text"
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="productSize" className="mt-3">
                <Form.Label className="form-label">Product Size</Form.Label>
                <Form.Control
                  type="text"
                  name="productSize"
                  value={formData.productSize}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="message" className="mt-3">
                <Form.Label className="form-label">Additional Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleChange}
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
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
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
