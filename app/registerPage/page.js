"use client";
import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Form, Button, Modal, Spinner } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';

const Register = () => {
    useEffect(() => {
        AOS.init({
            duration: 1300,
        });
    }, []);

    return (
        <>
            <Container fluid className='contact-bg py-5'>
                <Container>
                    <Row className='justify-content-around'>
                        <Col className='mt-5' lg="4" md="6" data-aos="fade-right">
                            <h1 className='text-orange fw-bold mb-3 display-5'>For Buyers</h1>
                            <div className='text-white mt-5 lead'>
                                <p><i className="bi bi-check-circle-fill"></i> Hassle-Free Sourcing - Submit your request, and suppliers will reach out to you.</p>
                                <p><i className="bi bi-check-circle-fill"></i> Streamlined Communication - Manage all supplier interactions through inquiry forms.</p>
                                <Link href={'/buyerRegistration'} className='btn bg-orange-grad text-white'>Register as Buyer</Link>
                            </div>
                        </Col>

                        <Col className='mt-5' lg="4" md="6" data-aos="fade-right">
                            <h1 className='text-orange fw-bold mb-3 display-5'>For Suppliers</h1>
                            <div className='text-white mt-5 lead'>
                                <p><i className="bi bi-check-circle-fill"></i> Showcase Your Products - List your offerings and attract interested buyers.</p>
                                <p><i className="bi bi-check-circle-fill"></i> Grow Your Sales - Receive inquiries and convert them into business opportunities.</p>
                                <Link href={'/supplierRegistration'} className='btn bg-orange-grad text-white'>Register as Supplier</Link>
                            </div>
                        </Col>

                        <Col className='mt-5' lg="4" md="6" data-aos="fade-right">
                            <h1 className='text-orange fw-bold mb-3 display-5'>For Inspection Teams</h1>
                            <div className='text-white mt-5 lead'>
                                <p><i className="bi bi-check-circle-fill"></i> Ensure Quality - Verify product quality and compliance with industry standards.</p>
                                <p><i className="bi bi-check-circle-fill"></i> Seamless Coordination - Collaborate with buyers and suppliers for smooth transactions.</p>
                                <Link href={'/inspectionTeamRegistration'} className='btn bg-orange-grad text-white'>Register as Inspection Team</Link>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </Container>
        </>
    );
};

export default Register;
