"use client"
import Link from 'next/link'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <>
            <Container fluid className='bg-black pt-5 pb-3'>
                <Container>
                    <Row className='justify-content-evenly'>
                        <Col lg="4" md="6">
                            <div className='pt-5 text-white'>
                                <img src='/images/Nextile_logo.png' alt='logo' className='img-fluid rounded mb-4' width={80} />
                                <p className='lead'>Nextile - AI Driven Textile Dashboard with Inspection & Market Insights</p>
                            </div>
                        </Col>
                        <Col lg="2" md="6" className='pt-5'>
                            <h4 className='text-white fw-bold'>Quick Links</h4>
                            <ul className="list-unstyled mt-4">
                                <li><Link href="/insights" className="slide-link">AI Insights</Link></li>
                                <li><Link href="/explore" className="slide-link">Explore</Link></li>
                            </ul>
                        </Col>
                        <Col lg="2" md="6" className='pt-5'>
                            <h4 className='text-white fw-bold'>Inquiries</h4>
                            <ul className="list-unstyled mt-4 text-white lh-lg">
                                <li><a href="mailto:textiles@origobiz.com" className='text-white'>textiles@nextile.com</a></li>
                            </ul>
                        </Col>
                        <Col lg="3" md="6" className='pt-5'>
                            <h4 className='text-white fw-bold'>Core Features</h4>
                            <ul className="list-unstyled mt-4 text-white lh-lg">
                                <li>Marketing</li>
                                <li>Business Development</li>
                                <li>Textile & Artificial Intelligence</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
                <Container className='mt-5'>
                <p className='pt-5 text-white text-center border-top border-white'>© Copyright Nextile.com 2025. All Rights Reserve</p>
                </Container>
            </Container>
        </>
    )
}

export default Footer
