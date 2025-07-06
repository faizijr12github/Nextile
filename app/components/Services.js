"use client"
import React from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';



const Services = () => {
  useEffect(() => {
    AOS.init({
      // You can add options here
      duration: 1300,
    });
  }, []);
  return (
    <>
      <Container fluid className='why-origo-bg py-5'>
        <Container className='expertise'>
          <Row data-aos="fade-down" className='justify-content-center text-center mt-5'>
            <Col lg="7" md="9">
              <h1 className='text-orange fw-bold display-5'>Services</h1>
              <p className='mt-3 text-white lead'>Nextile empowers textile businesses with a global marketplace, AI-driven insights, direct buyer connections, and opportunities for marketing, selling, and product inspection.</p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className='justify-content-around align-items-center'>
            <Col data-aos="fade-right" className='mt-5' lg="5">
              <Card className='border-0 bg-black text-center'>
                <div className='img-container rounded-circle float-animation'>
                  <img
                    src="/images/Comprehensive-Solutions.png"
                    alt="Comprehensive Solutions"
                    width={100}
                    height={100}
                    layout="fixed"
                    loading="lazy"
                  />
                </div>

                <Card.Body>
                  <Card.Title><h2 className='fw-bold text-orange'>Nextile & AI</h2></Card.Title>
                  <Card.Text className='text-white'>
                  Nextile AI leverages NLP-driven search results and export sales predictions to boost productivity and drive market success.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col data-aos="fade-left" className='mt-5' lg="5">
            <Card className='border-0 bg-black text-center'>
                <div className='img-container rounded-circle float-animation'>
                  <img
                    src="/images/global-reach.png"
                    alt="Quality Assurance"
                    width={100}
                    height={100}
                    layout="fixed"
                    loading="lazy"
                  />
                </div>

                <Card.Body>
                  <Card.Title><h2 className='fw-bold text-orange'>Market Your Product</h2></Card.Title>
                  <Card.Text className='text-white'>
                    Let buyers find your product fast! Market and sell your textiles to buyers globally.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className='justify-content-around align-items-center'>
            <Col data-aos="fade-up" className='mt-5' lg="5">
              <Card className='border-0 bg-black text-center'>
                <div className='img-container rounded-circle float-animation'>
                  <img
                    src="/images/Connecting-Buyers.webp"
                    alt="Connecting Buyers"
                    width={100}
                    height={100}
                    layout="fixed"
                    loading="lazy"
                  />
                </div>

                <Card.Body>
                  <Card.Title><h2 className='fw-bold text-orange'>Inspection Teams</h2></Card.Title>
                  <Card.Text className='text-white'>
                  Join Nextile as an expert inspection team and ensure top-quality standards for textile products.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col data-aos="fade-up" className='mt-5' lg="5">
              <Card className='border-0 bg-black text-center'>
                <div className='img-container rounded-circle float-animation'>
                  <img
                    src="/images/Price-Negotiations.png"
                    alt="Price Negotiations"
                    width={100}
                    height={100}
                    layout="fixed"
                    loading="lazy"
                  />
                </div>

                <Card.Body>
                  <Card.Title><h2 className='fw-bold text-orange'>Sell Textiles Directly</h2></Card.Title>
                  <Card.Text className='text-white'>
                    Find and connect with textile buyers globally through Nextile marketplace.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row data-aos="fade-down" className='justify-content-around align-items-center'>
            <Col className='mt-5' lg="5">
              <Card className='border-0 bg-black text-center'>
                <div className='img-container rounded-circle float-animation'>
                  <img
                    src="/images/Sustainable-Practices.png"
                    alt="Sustainable Practices"
                    width={100}
                    height={100}
                    layout="fixed"
                    loading="lazy"
                  />
                </div>

                <Card.Body>
                  <Card.Title><h2 className='fw-bold text-orange'>Connect & Grow Fast</h2></Card.Title>
                  <Card.Text className='text-white'>
                    Expand your textile business by using Nextile to connect & communicate directly.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

export default Services
