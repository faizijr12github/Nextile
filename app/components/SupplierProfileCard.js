'use client';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { useState } from 'react'
import InquiryModal from './InquiryModal'

const SupplierProfileCard = ({ supplier }) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false)

  const handleInquiryClick = () => {
    setShowInquiryModal(true)
  }

  const handleCloseModal = () => {
    setShowInquiryModal(false)
  }
  return (
    <>
      <div className='body shadow-lg border-0 p-3 rounded-5'>
        <Card className='body border-0'>
          <div className="text-center mb-4">
            <h3 className="mb-3"><i className="bi bi-person-fill-check text-orange me-1"></i>{supplier.companyName}</h3>
            <div className="separator mx-auto mb-3"></div>
            <span className="text-muted">Registration No: {supplier.companyRegNo}</span>
          </div>

          <Row className="mb-3">
            <Col md={6}>
              <div className="mb-3">
                <small className="text-muted">Email:</small>
                <p className="mb-0">{supplier.email}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <small className="text-muted">Products Offering:</small>
                <p className="mb-0">Details inside profile</p>
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <div className="mb-3">
                <small className="text-muted">Account Type:</small>
                <p className="mb-0">
                  <Badge bg="dark">Supplier</Badge>
                </p>
              </div>
            </Col>
            <Col md={8}>
              <div className="mb-3">
                <small className="text-muted">Documents:</small>
                <p className="mb-0">
                  <a
                    href={supplier.companyProfileUrl}
                    className="text-decoration-none hero-btn1 btn mb-2"
                    target="_blank"
                    rel="noopener noreferrer"

                  >
                    Company Profile <i className="bi bi-file-earmark-pdf"></i>
                  </a><br />
                  <a
                    href={supplier.productCatalogUrl}
                    className="text-decoration-none hero-btn1 btn"
                    target="_blank"
                    rel="noopener noreferrer"

                  >
                    Product Catalog <i className="bi bi-file-earmark-pdf"></i>
                  </a>
                </p>
              </div>
            </Col>
          </Row>

          <div className="mb-3">
            <small className="text-muted">Product Details:</small>
            <p className="mb-0 text-muted" style={{ whiteSpace: 'pre-line' }}>
              {supplier.productDetails}
            </p>
          </div>

          <div className="text-center">
            <Button onClick={handleInquiryClick} variant="dark" className="px-4 rounded-pill"><i className="bi bi-envelope me-1"></i>Inquiry</Button>
          </div>
        </Card>
      </div>
      {/* Inquiry Modal */}
      {supplier && (
        <InquiryModal
          show={showInquiryModal}
          onHide={handleCloseModal}
          recipientEmail={supplier.email}
        />
      )}
    </>
  );
};

export default SupplierProfileCard;
