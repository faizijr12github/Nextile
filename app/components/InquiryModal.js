'use client'
import { useState } from 'react'
import { Modal, Button, Form, Spinner, Toast, ToastContainer } from 'react-bootstrap'

export default function InquiryModal({ show, onHide, recipientEmail }) {
  const [formData, setFormData] = useState({
    email: '',
    productDescription: '',
    quantity: '',
    leadTime: '',
    paymentTerms: '',
    qualityRequirements: '',
    additionalNotes: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', variant: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recipientEmail,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setToast({ show: true, message: 'Inquiry sent successfully!', variant: 'success' })
        onHide()
        setFormData({
          email: '',
          productDescription: '',
          quantity: '',
          leadTime: '',
          paymentTerms: '',
          qualityRequirements: '',
          additionalNotes: '',
        })
      } else {
        setToast({ show: true, message: data.error || 'Failed to send inquiry.', variant: 'danger' })
      }
    } catch (error) {
      console.error('Submit error:', error)
      setToast({ show: true, message: 'An error occurred while sending the inquiry.', variant: 'danger' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ToastContainer className="position-fixed top-0 start-50 translate-middle-x mt-3 z-3">
        <Toast
          bg={toast.variant}
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white text-center fw-bold">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal
        show={show}
        onHide={onHide}
        centered
        backdrop="static"
        contentClassName="bg-orange-grad text-light"
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title className='fw-bold'>Inquiry Form</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className='bg-orange-grad'>
            {[
              { label: 'Email', type: 'email', name: 'email', placeholder: 'Enter your email' },
              { label: 'Product', type: 'textarea', name: 'productDescription' },
              { label: 'Quantity', type: 'text', name: 'quantity' },
              { label: 'Lead Time / Delivery Time', type: 'text', name: 'leadTime' },
              { label: 'Payment Terms / Conditions', type: 'text', name: 'paymentTerms' },
              { label: 'Quality Requirements / Standards', type: 'text', name: 'qualityRequirements' },
              { label: 'Additional Notes / Comments', type: 'textarea', name: 'additionalNotes' },
            ].map(({ label, type, name, placeholder }, i) => (
              <Form.Group key={i} className="mb-3" controlId={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  as={type === 'textarea' ? 'textarea' : 'input'}
                  rows={type === 'textarea' ? 3 : undefined}
                  type={type !== 'textarea' ? type : undefined}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder || ''}
                  className="bg-secondary text-light border-0"
                  required={['email', 'productDescription', 'quantity', 'leadTime'].includes(name)}
                />
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="dark" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Sending...
                </>
              ) : (
                'Submit Inquiry'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
