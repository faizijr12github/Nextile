"use client"

import { useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import Link from "next/link"
import AOS from "aos"

export default function Insights() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    })
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <div data-aos="fade-up">
                <h1 className="display-4 fw-bold my-5"><span className="text-orange">Nextile AI</span> - Unlocking Insights with AI-Powered Data Analytics</h1>
                <p className="lead mb-5">
                  Transform your textile export data into actionable insights with our advanced AI technology
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Predictive Analytics Section */}
      <section className="analytics-section py-5">
        <Container>
          <Row className="align-items-center justify-content-around">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div data-aos="fade-right">
                <div className="feature-icon mb-4">
                  <i className="fas fa-chart-line fa-3x text-primary"></i>
                </div>
                <h2 className="h1 fw-bold mb-4 text-orange">Predictive Analytics</h2>
                <p className="lead mb-4">
                  Do you want predictions on your textile export data? Just upload your CSV, enter your prompt, and get
                  valuable predictions using our AI-powered feature.
                </p>
                <Link href="/predict" className="btn btn-lg bg-orange-grad text-white">
                  <i className="bi bi-lightbulb-fill me-1"></i>Start Predicting
                </Link>
              </div>
            </Col>
            <Col lg={5}>
              <div data-aos="fade-left">
                <img
                  className='img-fluid'
                  src="/images/Prediction-img.png"
                  alt="Prediction-img"
                  layout="responsive"
                  loading="lazy"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* EDA Section */}
      <section className="eda-section py-5">
        <Container>
          <Row className="align-items-center justify-content-around">
            <Col lg={5} className="order-lg-2 mb-4 mb-lg-0">
              <div data-aos="fade-left">
                <div className="feature-icon mb-4">
                  <i className="fas fa-chart-bar fa-3x text-success"></i>
                </div>
                <h2 className="h1 fw-bold mb-4 text-orange">Exploratory Data Analysis</h2>
                <p className="lead mb-4">
                  Upload your CSV data and generate Exploratory Data Analysis instantly. No need to hire data
                  analysts—our powerful AI feature delivers not only EDA but actionable insights and recommendations.
                </p>
                <Link href="/eda" className="btn btn-lg bg-orange-grad text-white">
                  <i className="bi bi-pie-chart-fill me-1"></i>Generate EDA
                </Link>
              </div>
            </Col>
            <Col lg={6} className="order-lg-1">
              <div data-aos="fade-right">
                <img
                  className='img-fluid'
                  src="/images/eda-img.png"
                  alt="EDA-image"
                  layout="responsive"
                  loading="lazy"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
