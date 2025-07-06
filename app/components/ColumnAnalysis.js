"use client"

import { Row, Col, Card, Badge, ProgressBar } from "react-bootstrap"
import ChartComponent from "./ChartComponent"
import KPICard from "./KPICard"

export default function ColumnAnalysis({ column }) {
  if (!column) return null

  const renderStatistics = (stats) => {
    if (!stats) return null

    return (
      <Row className="g-3 mb-4">
        {Object.entries(stats).map(([key, value], index) => (
          <Col xs={6} md={4} lg={3} key={key}>
            <KPICard
              title={key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              value={value}
              delay={index * 50}
            />
          </Col>
        ))}
      </Row>
    )
  }

  const renderDataQuality = (column) => {
    const completeness = ((column.totalValues / (column.totalValues + column.missingValues)) * 100).toFixed(1)
    const uniqueness = ((column.uniqueValues / column.totalValues) * 100).toFixed(1)

    return (
      <Card className="mb-4 border-0 bg-light">
        <Card.Header className="bg-transparent border-0">
          <h6 className="mb-0 text-orange fw-bold">
            <i className="bi bi-shield-check me-2"></i>
            Data Quality Metrics
          </h6>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <div className="quality-metric">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small fw-semibold">Completeness</span>
                  <span className="small text-orange fw-bold">{completeness}%</span>
                </div>
                <ProgressBar
                  now={completeness}
                  variant={completeness > 90 ? "success" : completeness > 70 ? "warning" : "danger"}
                  className="progress-modern"
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="quality-metric">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small fw-semibold">Uniqueness</span>
                  <span className="small text-info fw-bold">{uniqueness}%</span>
                </div>
                <ProgressBar now={uniqueness} variant="info" className="progress-modern" />
              </div>
            </Col>
            <Col md={4}>
              <div className="quality-metric">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small fw-semibold">Data Type</span>
                  <Badge bg={column.type === "numerical" ? "primary" : "success"} className="badge-modern">
                    {column.type === "numerical" ? "Numerical" : "Categorical"}
                  </Badge>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }

  return (
    <div>
      {/* Column Header */}
      <div className="mb-4 p-4 bg-gradient-light rounded-3">
        <div className="d-flex align-items-center mb-3">
          <div className="column-icon me-3">
            <i
              className={`bi bi-${column.type === "numerical" ? "123" : "type"} fs-3 text-${column.type === "numerical" ? "primary" : "success"}`}
            ></i>
          </div>
          <div>
            <h4 className="mb-1 fw-bold">{column.name}</h4>
            <p className="mb-0 text-muted">{column.description || `${column.type} column analysis`}</p>
          </div>
        </div>
      </div>

      {/* Data Quality */}
      {renderDataQuality(column)}

      {/* Statistics */}
      {column.statistics && (
        <div className="mb-5">
          <h6 className="text-orange mb-3 fw-bold">
            <i className="bi bi-calculator me-2"></i>
            Statistical Summary
          </h6>
          {renderStatistics(column.statistics)}
        </div>
      )}

      {/* Charts */}
      {column.charts && column.charts.length > 0 && (
        <div className="mb-5">
          <h6 className="text-orange mb-4 fw-bold">
            <i className="bi bi-bar-chart me-2"></i>
            Visualizations ({column.charts.length} Charts)
          </h6>
          <Row className="g-4">
            {column.charts.map((chart, index) => (
              <Col xs={12} lg={6} key={index}>
                <ChartComponent chart={chart} delay={index * 100} />
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Insights */}
      {column.insights && (
        <Card className="border-0 bg-orange-grad text-white card-modern">
          <Card.Header className="bg-transparent border-0">
            <h6 className="mb-0 text-white fw-bold">
              <i className="bi bi-lightbulb-fill me-2"></i>
              Column Insights & Recommendations
            </h6>
          </Card.Header>
          <Card.Body>
            <div className="insights-content">
              {column.insights.split("\n").map((insight, index) => {
                if (insight.trim().startsWith("•") || insight.trim().startsWith("-")) {
                  return (
                    <div key={index} className="d-flex align-items-start mb-3">
                      <i className="bi bi-arrow-right-circle-fill text-warning me-2 mt-1 flex-shrink-0"></i>
                      <span className="text-white">{insight.replace(/^[•-]\s*/, "")}</span>
                    </div>
                  )
                } else if (insight.trim()) {
                  return (
                    <p key={index} className="mb-3 text-white">
                      {insight}
                    </p>
                  )
                }
                return null
              })}
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}
