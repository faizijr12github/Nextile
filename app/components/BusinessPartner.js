import Link from 'next/link'
import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'

const BusinessPartner = () => {
    return (
        <>
            <Container className='expertise mt-5'>
                <Row data-aos="fade-up" className='justify-content-center text-center mt-5'>
                    <Col lg="7" md="9">
                        <h1 className='fw-bold display-5'>Our Business Partner</h1>
                        <div className="separator mx-auto"></div>
                        <p className="lead text-muted mt-3">
                            Collaborating with industry leaders to deliver exceptional textile solutions
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container className='mb-5'>
                <Row className="justify-content-around align-items-center">
                    <Col className='mt-5' lg="5" data-aos="fade-right">
                        <img src="/images/business_partner.png" className="img-fluid rounded" alt="Business Partner" />
                    </Col>
                    <Col className='mt-5' lg="5" data-aos="fade-left">
                        <h2 className='text-success fw-bold'>Textile Yard</h2>
                        <p className='lead mt-3'>
                        In collaboration with Textile Yard, we can access original export data from Pakistan's textile industry. This data can be analyzed and used to apply machine learning algorithms for predictive insights.
                        </p>
                        <Link className='btn btn-outline-success fw-bold' href={'https://textileyard.com/'} target='blank'>Visit Textile Yard <i className="bi bi-arrow-up-right"></i></Link>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default BusinessPartner
