"use client"
import Link from 'next/link';
import React from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';

const Testimonials = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={8}>
                    <h2 className="text-center fw-bold mb-4">Our Reviews</h2>
                    <Card className="border-0 shadow p-5 rounded-5">
                        <Row className="align-items-center">
                            {/* Left Side: Image and Name */}
                            <Col md={4} className="text-center">
                                <img
                                    style={{ width: '8rem' }}
                                    src="/images/Naveed.jpeg"
                                    alt="Naveed Ahmad"
                                    className="img-fluid rounded-circle"
                                />
                                <h5 className="fw-bold mt-3 mb-1">
                                    Naveed Ahmad
                                </h5>
                                <small className="text-muted">
                                    Sales Champion, Interloop Limited
                                </small>
                                <div className="mt-2">
                                    <Link
                                        className="btn btn-outline-primary btn-sm"
                                        href="https://www.linkedin.com/in/naveed-ahmad-40269916b/?originalSubdomain=pk"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="bi bi-linkedin"></i>
                                    </Link>
                                </div>
                            </Col>

                            {/* Right Side: Testimonial Text */}
                            <Col md={8}>
                                <p className="lead mt-3 mt-md-0">
                                    This platform bridges the gap between buyers, sellers, and auditors through seamless collaboration within a trusted and compliant framework. With powerful AI-driven insights, it empowers businesses to analyze performance, make informed decisions, and scale with confidence.
                                </p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Testimonials;

