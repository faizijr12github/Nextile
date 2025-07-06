"use client";
import React from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';

const SupplierSteps = () => {
    useEffect(() => {
        AOS.init({
            // You can add options here
            duration: 1300,
        });
    }, []);
    return (
        <>
            <Container className='bg-orange-grad py-5 my-5 shadow-lg rounded-5'>
                <Row data-aos="fade-down" className='justify-content-center text-center my-5'>
                    <Col lg="8" md="9">
                        <h1 className='fw-bold display-5 text-white'>Textile Manufacturers and Suppliers</h1>
                        <h3 className='mt-3 text-white'>Get Started With These Easy Steps</h3>
                    </Col>
                </Row>
                <Row data-aos="fade-up" className='px-3 justify-content-center'>
                    <Col className='mt-5' lg="2" md="4">
                        <Card className="h-100 text-center border-0 shadow-sm rounded-5">
                            <Card.Body>
                                <i className="bi bi-door-open-fill fs-1"></i>
                                <Card.Title>1. Register for Free</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='mt-5' lg="2" md="4">
                        <Card className="h-100 text-center border-0 shadow-sm rounded-5">
                            <Card.Body>
                                <i className="bi bi-building-check fs-1"></i>
                                <Card.Title>2. Publish Company Profile</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='mt-5' lg="2" md="4">
                        <Card className="h-100 text-center border-0 shadow-sm rounded-5">
                            <Card.Body>
                                <i className="bi bi-tv-fill fs-1"></i>
                                <Card.Title>3. Display Your
                                    Products</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='mt-5' lg="2" md="4">
                        <Card className="h-100 text-center border-0 shadow-sm rounded-5">
                            <Card.Body>
                                <i className="bi bi-pencil-square fs-1"></i>
                                <Card.Title>4. Receive Inquiry from Buyers</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='mt-5' lg="2" md="4">
                        <Card className="h-100 text-center border-0 shadow-sm rounded-5">
                            <Card.Body>
                                <i className="bi bi-people-fill fs-1"></i>
                                <Card.Title>5. Deal with the Best Buyers</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='text-center mt-5'>
                            <Link href={'/supplierRegistration'} className='hero-btn1 btn'>Get Started Now</Link>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default SupplierSteps;
