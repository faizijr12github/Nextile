"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, Alert, Nav, Badge, Accordion } from "react-bootstrap"
import AOS from "aos"
import ChartComponent from "./ChartComponent"
import KPICard from "./KPICard"
import ColumnAnalysis from "./ColumnAnalysis"
import InsightCard from "./InsightCard"

export default function ResultsDisplay({ results, onReset }) {
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    AOS.refresh()
  }, [])

  const sections = [
    { key: "overview", title: "📊 Executive Overview", icon: "speedometer2", color: "dark" },
    { key: "univariate", title: "📈 Column Analysis", icon: "bar-chart", color: "dark" },
    { key: "bivariate", title: "🔗 Relationships", icon: "diagram-2", color: "dark" },
    { key: "multivariate", title: "🎯 Multi-Dimensional", icon: "diagram-3", color: "dark" },
    { key: "insights", title: "🤖 AI Insights", icon: "cpu", color: "dark" },
    { key: "quality", title: "🔍 Data Quality", icon: "shield-check", color: "dark" },
  ]

  const renderDetailedKPIs = (kpis) => {
    if (!kpis) return null

    const kpiCategories = {
      "📊 Dataset Overview": ["total_rows", "total_columns", "file_size", "completeness_score"],
      "💰 Financial Metrics": [
        "total_export_value",
        "avg_unit_price",
        "revenue_per_exporter",
        "top_exporter_revenue",
        "price_volatility_index",
      ],
      "📦 Volume Metrics": [
        "total_quantity",
        "avg_quantity_per_shipment",
        "quantity_concentration_ratio",
        "volume_growth_rate",
      ],
      "🌍 Market Metrics": [
        "total_exporters",
        "total_countries",
        "total_products",
        "market_diversity_index",
        "geographic_concentration",
      ],
    }

    return (
      <div className="mb-5">
        {Object.entries(kpiCategories).map(([category, keys]) => {
          const categoryKPIs = keys.filter((key) => kpis[key] !== undefined)
          if (categoryKPIs.length === 0) return null

          return (
            <div key={category} className="mb-5">
              <h5 className="text-orange mb-4 fw-bold">{category}</h5>
              <Row className="g-4">
                {categoryKPIs.map((key, index) => (
                  <Col xs={6} md={4} lg={3} key={key}>
                    <KPICard
                      title={key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      value={kpis[key]}
                      delay={index * 50}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )
        })}
      </div>
    )
  }

  const renderCharts = (charts) => {
    if (!charts || !Array.isArray(charts)) return null

    return (
      <Row className="g-4">
        {charts.map((chart, index) => (
          <Col xs={12} lg={6} xl={4} key={index}>
            <ChartComponent chart={chart} delay={index * 100} />
          </Col>
        ))}
      </Row>
    )
  }

  const renderColumnAnalysis = (columns) => {
    if (!columns || !Array.isArray(columns)) return null

    return (
      <Accordion defaultActiveKey="0" className="accordion-modern">
        {columns.map((column, index) => (
          <Accordion.Item eventKey={index.toString()} key={index} className="mb-3 accordion-item-modern">
            <Accordion.Header>
              <div className="d-flex align-items-center w-100">
                <div className="column-type-icon me-3">
                  <i
                    className={`bi bi-${column.type === "numerical" ? "123" : "type"} fs-5 text-${column.type === "numerical" ? "dark" : "dark"
                      }`}
                  ></i>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center">
                    <strong className="me-2">{column.name}</strong>
                    <Badge bg={column.type === "numerical" ? "dark" : "dark"} className="badge-modern">
                      {column.type === "numerical" ? "Numerical" : "Categorical"}
                    </Badge>
                  </div>
                  <small className="text-muted">
                    {column.type === "numerical" ? "Statistical Analysis" : "Frequency Analysis"} •{" "}
                    {column.charts?.length || 0} Charts
                  </small>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-4">
              <ColumnAnalysis column={column} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    )
  }

  const renderInsights = (insights) => {
    if (!insights) return null

    const sections = insights.split("##").filter((section) => section.trim())

    return (
      <div>
        {sections.map((section, index) => {
          const lines = section.trim().split("\n")
          const title = lines[0].trim()
          const content = lines.slice(1).join("\n")

          return (
            <InsightCard
              key={index}
              title={title}
              content={content}
              delay={index * 100}
              variant={index % 2 === 0 ? "dark" : "dark"}
            />
          )
        })}
      </div>
    )
  }

  const renderContent = (sectionKey) => {
    const sectionData = results[sectionKey]
    if (!sectionData) {
      return (
        <Alert variant="info" className="alert-modern">
          <i className="bi bi-info-circle me-2"></i>
          No data available for this section.
        </Alert>
      )
    }

    return (
      <div>
        {sectionKey === "overview" && sectionData.kpis && renderDetailedKPIs(sectionData.kpis)}
        {sectionKey === "univariate" && sectionData.columns && renderColumnAnalysis(sectionData.columns)}
        {sectionData.charts && renderCharts(sectionData.charts)}
        {sectionData.insights && renderInsights(sectionData.insights)}
      </div>
    )
  }

  return (
    <Container fluid className="min-vh-100 bg-gradient-light py-4">
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm card-modern" data-aos="fade-down">
              <Card.Body className="py-4">
                <Row className="align-items-center">
                  <Col xs={12} md={8}>
                    <div className="d-flex align-items-center">
                      <div className="header-icon me-3">
                        <i className="bi bi-cpu-fill fs-2 text-orange"></i>
                      </div>
                      <div>
                        <h2 className="mb-1 text-orange fw-bold">Professional Analysis Results</h2>
                        <p className="mb-0 text-muted">Comprehensive EDA with 25+ Chart Types & AI-Powered Insights</p>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
                    <Button onClick={onReset} className="btn bg-orange-grad border-0">
                      <i className="bi bi-arrow-left me-2"></i>
                      New Analysis
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Navigation Tabs */}
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm bg-dark text-light card-modern" data-aos="fade-up">
              <Card.Body className="p-3">
                <Nav variant="pills" className="nav-modern flex-nowrap overflow-auto">
                  {sections.map((section) => (
                    <Nav.Item key={section.key} className="flex-shrink-0">
                      <Nav.Link
                        active={activeTab === section.key}
                        onClick={() => setActiveTab(section.key)}
                        className={`nav-link-modern d-flex align-items-center px-4 py-3 text-nowrap position-relative ${activeTab === section.key ? 'bg-secondary text-white' : 'bg-dark text-light'
                          }`}
                      >
                        <i className={`bi bi-${section.icon} me-2`}></i>
                        <span className="d-none d-lg-inline">{section.title}</span>
                        <span className="d-lg-none">{section.title.split(" ")[1] || section.title}</span>
                        {results[section.key] && (
                          <Badge bg="light" text="dark" className="ms-2 position-absolute top-0 end-0 badge-indicator">
                            ✓
                          </Badge>
                        )}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Content */}
        <Row>
          <Col>
            <Card className="border-0 shadow-sm card-modern" data-aos="fade-up" data-aos-delay="200">
              <Card.Header
                className={`header-gradient bg-${sections.find((s) => s.key === activeTab)?.color || "dark"} text-white py-4`}
              >
                <div className="d-flex align-items-center">
                  <i className={`bi bi-${sections.find((s) => s.key === activeTab)?.icon} me-3 fs-4`}></i>
                  <h4 className="mb-0 fw-bold">{sections.find((s) => s.key === activeTab)?.title}</h4>
                </div>
              </Card.Header>
              <Card.Body className="p-4 p-md-5">{renderContent(activeTab)}</Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Summary Stats */}
        {results.metadata && (
          <Row className="mt-5">
            <Col>
              <Card
                className="border-0 shadow-sm bg-orange-grad text-white card-modern"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <Card.Body className="text-center py-5">
                  <h5 className="text-white mb-4 fw-bold opacity-90">Analysis Summary</h5>
                  <Row>
                    <Col xs={6} md={3}>
                      <div className="summary-stat">
                        <h3 className="mb-1 fw-bold">{results.metadata.rows?.toLocaleString() || "N/A"}</h3>
                        <small className="opacity-75">Total Records</small>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="summary-stat">
                        <h3 className="mb-1 fw-bold">{results.metadata.columns || "N/A"}</h3>
                        <small className="opacity-75">Columns Analyzed</small>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="summary-stat">
                        <h3 className="mb-1 fw-bold">{results.metadata.file_size || "N/A"}</h3>
                        <small className="opacity-75">Dataset Size</small>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="summary-stat">
                        <h3 className="mb-1 fw-bold">{results.metadata.analysis_time || "N/A"}</h3>
                        <small className="opacity-75">Completed</small>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  )
}
