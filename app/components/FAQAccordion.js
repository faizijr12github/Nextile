"use client"
import Accordion from "react-bootstrap/Accordion"
import { Col, Container, Row } from "react-bootstrap"

function FAQAccordion() {
  return (
    <>
      <Container className='expertise'>
        <Row data-aos="fade-down" className='justify-content-center text-center mt-5'>
          <Col lg="7" md="9">
            <h1 className='fw-bold display-5 text-orange'>Frequently Asked Questions</h1>
            <h4 className='mt-3'>Find answers from the Nextile Team</h4>
          </Col>
        </Row>
      </Container>
      <Container className='my-5'>
        <Row className='justify-content-center mt-5'>
          <Col lg="7" md="9">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Why selling on the Nextile marketplace and not through an online shop?</Accordion.Header>
                <Accordion.Body>
                  On a marketplace such as Nextile, you can show your business and product portfolio to a wide range of new buyers without the need to develop your own online shop or expand your marketing efforts for an existing online shop.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Is Nextile free of charge?</Accordion.Header>
                <Accordion.Body>
                  Yes, the registration and use of the Nextile marketplace are free of charge for both buyers and suppliers. This includes creating your account, listing, and selling your products using our marketplace.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>We are already selling online. What can you do for us?</Accordion.Header>
                <Accordion.Body>
                  That’s great. It means we can help you enhance your market and sell with more exposure while saving on your marketing costs. We also provide textile market insights through Artificial Intelligence!
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>How can I get started?</Accordion.Header>
                <Accordion.Body>
                  <ul className='lh-lg'>
                    <li>Firstly, you need to register your company account on Nextile.</li>
                    <li>Secondly, create company profile and list your products.</li>
                    <li>Thirdly, you negotiate the requests you receive. Every information you share doing this phase, such as terms & prices, will only be available to the company you are directly negotiating with.</li>
                    <li>That's it.</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default FAQAccordion
