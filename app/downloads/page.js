"use client";
import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Downloads = () => {
    useEffect(() => {
        AOS.init({
            // You can add options here
            duration: 1300,
        });
    }, []);
    return (
        <>
            {/* textile-hero */}
            <Container fluid className='bg-orange-grad text-white py-5'>
                <Row className='d-flex flex-column align-items-center justify-content-center text-center h-700 pb-4'>
                    <Col lg="6" md="8" data-aos="zoom-out" data-aos-duration="3000">
                        <h1 className="display-4 fw-bold my-5">Downloads</h1>
                        <div className='hero-p mt-3'>
                            <p className='mt-4 lead'>Nextile is an AI-powered web platform designed for the textile industry, connecting buyers, suppliers, and inspection teams in one smart space. It goes beyond basic sourcing by offering verified inspections, AI-driven analytics, smart inquiries, and secure communication—streamlining operations while boosting trust, transparency, and productivity across the global textile supply chain.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className='text-center' data-aos="fade-up">
                <h1 className='fst-italic fw-bold mt-5'>Connecting Markets</h1>
                <h2 className='mt-5 text-orange fw-bold'>Download <i className="bi bi-download fs-2"></i></h2>
                <p>Access Your Preferred Media Here!</p>
            </Container>
            <Container className='mb-5'>
                <Row>
                    <Col className='mt-5' lg='4' md='6' data-aos="fade-up">
                        <Card className="border-0 text-center mx-auto" style={{ width: '16rem' }}>
                            <div className="img-container">
                                <Card.Img
                                    className="expertise-card-img rounded"
                                    variant="top"
                                    src="/images/Nextile_logo.png"
                                    alt="Nextile Logo"
                                />
                            </div>
                            <Card.Body className="px-0">
                                <Card.Title className="card-title fw-bold">Nextile Profile</Card.Title>
                                <a
                                    href="/Documentation.pdf"
                                    download="Nextile_Profile.pdf"
                                    className="btn bg-orange-grad text-white mt-3 d-inline-flex align-items-center"
                                >
                                    Download
                                    <i className="bi bi-file-pdf-fill ms-2"></i>
                                </a>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col className='mt-5' lg='4' md='6' data-aos="fade-down">
                        <Card className="border-0 text-center mx-auto" style={{ width: '16rem' }}>
                            <div className="img-container">
                                <Card.Img
                                    className="expertise-card-img rounded"
                                    variant="top"
                                    src="/images/Nextile_logo.png"
                                    alt="Nextile Logo"
                                />
                            </div>
                            <Card.Body className="px-0">
                                <Card.Title className="card-title fw-bold">Nextile Poster</Card.Title>
                                <a
                                    href="/FYP-Poster.pdf"
                                    download="Nextile_Profile.pdf"
                                    className="btn bg-orange-grad text-white mt-3 d-inline-flex align-items-center"
                                >
                                    Download
                                    <i className="bi bi-file-pdf-fill ms-2"></i>
                                </a>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col className='mt-5' lg='4' md='6' data-aos="fade-up">
                        <Card className="border-0 text-center mx-auto" style={{ width: '16rem' }}>
                            <div className='img-container'>
                                <Card.Img className='expertise-card-img rounded' variant="top" src="/images/Nextile_logo.png" />
                            </div>
                            <Card.Body className='px-0'>
                                <Card.Title className="card-title fw-bold">Coming Soon!</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Downloads;
