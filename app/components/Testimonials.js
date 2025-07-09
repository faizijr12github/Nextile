import Link from 'next/link'
import React from 'react'
import { Container, Row, Card, Col } from 'react-bootstrap'

const Testimonials = () => {
    return (
        <Container>
            <Row className='justify-content-center'>
                <Col lg="6">
                <h2 className='text-center fw-bold'>Our Reviews</h2>
                    <Card style={{ width: '18rem' }} className='border-0 text-center mx-auto'>
                        <img style={{ width: '6rem' }} src="/images/Naveed.jpeg" alt="Naveed Ahmad" className='img-fluid rounded-circle mt-3 mx-auto' />
                        <div>
                            <p className='lead mt-2'>
                                Nextile is a smart and much-needed solution for the textile industry. Its AI-powered features simplify finding buyers, suppliers, and inspection teams, making business faster and more efficient.
                            </p>
                            <h5 className='fw-bold mt-3'> Naveed Ahmad, Sales Champion, Interloop Limited</h5>
                            <Link className='btn btn-lg btn-outline-primary' href="https://www.linkedin.com/in/naveed-ahmad-40269916b/?originalSubdomain=pk" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-linkedin"></i>
                            </Link>
                            
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Testimonials
