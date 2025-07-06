"use client"

import { Card } from "react-bootstrap"

export default function KPICard({ title, value, icon, delay = 0 }) {
  const formatValue = (val) => {
    if (typeof val === "number") {
      if (val > 1000000000) {
        return `${(val / 1000000000).toFixed(2)}B`
      } else if (val > 1000000) {
        return `${(val / 1000000).toFixed(2)}M`
      } else if (val > 1000) {
        return `${(val / 1000).toFixed(1)}K`
      } else if (val % 1 !== 0) {
        return val.toFixed(2)
      }
      return val.toLocaleString()
    }
    return val
  }

  const getIcon = (title) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes("value") || titleLower.includes("revenue") || titleLower.includes("price"))
      return "currency-dollar"
    if (titleLower.includes("quantity") || titleLower.includes("count") || titleLower.includes("total"))
      return "box-seam-fill"
    if (titleLower.includes("exporter") || titleLower.includes("company")) return "building-fill"
    if (titleLower.includes("product")) return "box-fill"
    if (titleLower.includes("country") || titleLower.includes("destination")) return "globe-americas"
    if (titleLower.includes("average") || titleLower.includes("avg") || titleLower.includes("mean"))
      return "calculator-fill"
    if (titleLower.includes("max") || titleLower.includes("maximum")) return "arrow-up-circle-fill"
    if (titleLower.includes("min") || titleLower.includes("minimum")) return "arrow-down-circle-fill"
    if (titleLower.includes("std") || titleLower.includes("deviation")) return "graph-up-arrow"
    if (titleLower.includes("median")) return "dash-circle-fill"
    if (titleLower.includes("mode")) return "circle-fill"
    if (titleLower.includes("unique") || titleLower.includes("distinct")) return "collection-fill"
    if (titleLower.includes("missing") || titleLower.includes("null")) return "question-circle-fill"
    if (titleLower.includes("duplicate")) return "files"
    if (titleLower.includes("outlier")) return "exclamation-triangle-fill"
    if (titleLower.includes("score") || titleLower.includes("index")) return "speedometer2"
    if (titleLower.includes("completeness")) return "check-circle-fill"
    if (titleLower.includes("diversity")) return "diagram-3-fill"
    if (titleLower.includes("concentration")) return "bullseye"
    if (titleLower.includes("volatility")) return "graph-up-arrow"
    if (titleLower.includes("growth")) return "trending-up"
    return "graph-up"
  }

  const getValueColor = (title, value) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes("completeness") || titleLower.includes("score")) {
      if (typeof value === "number") {
        if (value >= 90) return "text-orange"
        if (value >= 70) return "text-orange"
        return "text-danger"
      }
    }
    return "text-orange"
  }

  return (
    <Card className="h-100 border-0 shadow-sm kpi-card-modern" data-aos="zoom-in" data-aos-delay={delay}>
      <Card.Body className="text-center p-4">
        <div className="kpi-icon-container mb-3">
          <i className={`bi bi-${icon || getIcon(title)} fs-2 text-orange kpi-icon`}></i>
        </div>
        <h4 className={`mb-2 fw-bold ${getValueColor(title, value)}`}>{formatValue(value)}</h4>
        <p className="text-muted mb-0 small fw-semibold">{title}</p>
      </Card.Body>
    </Card>
  )
}
