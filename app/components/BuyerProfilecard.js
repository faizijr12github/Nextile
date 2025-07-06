'use client'
import { Card, Row, Col, Badge, Button } from 'react-bootstrap'
import { useState } from 'react'
import InquiryModal from './InquiryModal'

const BuyerProfileCard = ({ buyer }) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false)

  const handleInquiryClick = () => {
    setShowInquiryModal(true)
  }

  const handleCloseModal = () => {
    setShowInquiryModal(false)
  }
  return (
    <>
      <Card className="shadow-lg border-0 p-3 rounded-5 mb-4">
        <div className="body">
          <div className="text-center mb-4">
            <h3 className="mb-3"><i className="bi bi-person-circle me-1 text-orange"></i>{buyer.companyName}</h3>
            <div className="separator mx-auto mb-3"></div>
            <span className="text-muted">Registration No: {buyer.companyRegNo}</span>
          </div>

          <Row className="mb-3">
            <Col md={6}>
              <div className="mb-3">
                <small className="text-muted">Email:</small>
                <p className="mb-0">{buyer.email}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <small className="text-muted">Product Required:</small>
                <p className="mb-0">{buyer.productRequired}</p>
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <div className="mb-3">
                <small className="text-muted">Account Type:</small>
                <p className="mb-0">
                  <Badge bg="dark">Buyer</Badge>
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-3">
                <small className="text-muted">Product Size:</small>
                <p className="mb-0">{buyer.productSize}</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-3">
                <small className="text-muted">Product Category:</small>
                <p className="mb-0">{buyer.productCategory}</p>
              </div>
            </Col>
          </Row>

          <div className="mb-3">
            <small className="text-muted">Additional Details:</small>
            <p className="mb-0 text-muted" style={{ whiteSpace: 'pre-line' }}>
              {buyer.additionalDetails}
            </p>
          </div>

          <div className="text-center">
            <Button onClick={handleInquiryClick} variant="dark" className="px-4 rounded-pill"><i className="bi bi-envelope me-1"></i>Inquiry</Button>
          </div>
        </div>
      </Card>
      {/* Inquiry Modal */}
      {buyer && (
        <InquiryModal
          show={showInquiryModal}
          onHide={handleCloseModal}
          recipientEmail={buyer.email}
        />
      )}
    </>
  )
}

export default BuyerProfileCard
