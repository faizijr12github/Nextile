import React from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import IndustrySlider from './components/IndustrySlider'
import SupplierSteps from './components/SupplierSteps'
import FAQAccordion from './components/FAQAccordion'
import BusinessPartner from './components/BusinessPartner'

const page = () => {
  return (
    <div>
      <Hero/>
      <Services/>
      <IndustrySlider/>
      <SupplierSteps/>
      <FAQAccordion/>
      <BusinessPartner/>
    </div>
  )
}

export default page


