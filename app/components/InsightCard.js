"use client"

import { Card } from "react-bootstrap"

export default function InsightCard({ title, content, delay = 0, variant = "primary" }) {
  const getVariantIcon = (variant) => {
    const iconMap = {
      primary: "cpu-fill",
      success: "check-circle-fill",
      warning: "exclamation-triangle-fill",
      danger: "shield-exclamation",
      info: "info-circle-fill",
    }
    return iconMap[variant] || "lightbulb-fill"
  }

  return (
    <Card
      className={`mb-4 border-0 shadow-sm card-modern insight-card-${variant}`}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <Card.Header className={`bg-${variant} text-white header-gradient`}>
        <h6 className="mb-0 fw-bold d-flex align-items-center">
          <i className={`bi bi-${getVariantIcon(variant)} me-2`}></i>
          {title}
        </h6>
      </Card.Header>
      <Card.Body className="p-4">
        <div className="insights-content">
          {content.split("\n").map((line, index) => {
            if (line.trim().startsWith("•") || line.trim().startsWith("-") || line.trim().startsWith("*")) {
              return (
                <div key={index} className="d-flex align-items-start mb-3">
                  <i className={`bi bi-arrow-right-circle-fill text-${variant} me-2 mt-1 flex-shrink-0`}></i>
                  <span className="text-dark">{line.replace(/^[•\-*]\s*/, "")}</span>
                </div>
              )
            } else if (line.trim().startsWith("###")) {
              return (
                <h6 key={index} className={`text-${variant} mt-4 mb-3 fw-bold`}>
                  {line.replace(/^#+\s*/, "")}
                </h6>
              )
            } else if (line.trim()) {
              return (
                <p key={index} className="mb-3 text-dark">
                  {line}
                </p>
              )
            }
            return null
          })}
        </div>
      </Card.Body>
    </Card>
  )
}
