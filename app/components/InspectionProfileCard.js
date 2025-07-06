'use client'
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { useState } from 'react'
import InquiryModal from './InquiryModal'

const InspectionTeamProfileCard = ({ teamData }) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false)

  const handleInquiryClick = () => {
    setShowInquiryModal(true)
  }

  const handleCloseModal = () => {
    setShowInquiryModal(false)
  }
  return (
    <>
      <Card className="shadow-lg border-0 p-3 rounded-5">
        <div className="body">
          <div className="text-center mb-4">
            <h3 className="mb-3"><i className="bi bi-people-fill text-orange me-1"></i>{teamData.companyName}</h3>
            <div className="separator mx-auto mb-3"></div>
          </div>

          <Row className="mb-3">
            <Col md={6}>
              <div className="mb-3">
                <small className="text-muted">Email:</small>
                <p className="mb-0">{teamData.email}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <small className="text-muted">Country:</small>
                <p className="mb-0">{teamData.countryName}</p>
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <div className="mb-3">
                <small className="text-muted">Account Type:</small>
                <p className="mb-0">
                  <Badge bg="dark">Inspection Team</Badge>
                </p>
              </div>
            </Col>
            <Col md={8}>
              <div className="mb-3">
                <small className="text-muted">Documents:</small>
                <p className="mb-0">
                  <a href={teamData.companyProfileUrl} className="text-decoration-none hero-btn1 btn mb-2" target="_blank" rel="noopener noreferrer">
                    Company Profile <i className="bi bi-file-earmark-pdf"></i>
                  </a><br />
                  <a href={teamData.inspectionReportsUrl} className="text-decoration-none hero-btn1 btn mb-2" target="_blank" rel="noopener noreferrer">
                    Inspection Reports <i className="bi bi-file-earmark-pdf"></i>
                  </a>
                </p>
              </div>
            </Col>
          </Row>

          <div className="mb-3">
            <small className="text-muted">Product to be Inspected:</small>
            <p className="mb-0 text-muted" style={{ whiteSpace: 'pre-line' }}>
              {teamData.productDetails}
            </p>
          </div>

          <div className="text-center">
            <Button onClick={handleInquiryClick} variant="dark" className="px-4 rounded-pill"><i className="bi bi-envelope me-1"></i>Contact Team</Button>
          </div>
        </div>
      </Card>
      {/* Inquiry Modal */}
      {teamData && (
        <InquiryModal
          show={showInquiryModal}
          onHide={handleCloseModal}
          recipientEmail={teamData.email}
        />
      )}
    </>
  );
};

export default InspectionTeamProfileCard;
