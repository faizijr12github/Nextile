"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, Form, Alert, Spinner, ProgressBar } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import AOS from "aos"
import "aos/dist/aos.css"
import ResultsDisplay from "../components/ResultsDisplay"

export default function Home() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState("")
  const [progress, setProgress] = useState(0)
  const [analysisStage, setAnalysisStage] = useState("")

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    })
  }, [])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile)
      setError("")
    } else {
      setError("Please select a valid CSV file")
      setFile(null)
    }
  }

  const simulateProgress = () => {
    const stages = [
      { progress: 10, stage: "Reading CSV file..." },
      { progress: 25, stage: "Analyzing data structure..." },
      { progress: 40, stage: "Generating univariate analysis..." },
      { progress: 55, stage: "Creating bivariate relationships..." },
      { progress: 70, stage: "Performing multivariate analysis..." },
      { progress: 85, stage: "Generating AI insights..." },
      { progress: 95, stage: "Creating visualizations..." },
      { progress: 100, stage: "Analysis complete!" },
    ]

    let currentStage = 0
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress(stages[currentStage].progress)
        setAnalysisStage(stages[currentStage].stage)
        currentStage++
      } else {
        clearInterval(interval)
      }
    }, 1500)

    return interval
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file first")
      return
    }

    setLoading(true)
    setError("")
    setResults(null)
    setProgress(0)
    setAnalysisStage("Initializing...")

    const progressInterval = simulateProgress()

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze file")
      }

      const data = await response.json()
      setResults(data)
      setProgress(100)
      setAnalysisStage("Complete!")
    } catch (err) {
      setError("Error analyzing file: " + err.message)
      console.error("Upload error:", err)
    } finally {
      clearInterval(progressInterval)
      setLoading(false)
      setTimeout(() => {
        setProgress(0)
        setAnalysisStage("")
      }, 2000)
    }
  }

  const resetAnalysis = () => {
    setFile(null)
    setResults(null)
    setError("")
    setProgress(0)
    setAnalysisStage("")
  }

  if (results) {
    return <ResultsDisplay results={results} onReset={resetAnalysis} />
  }

  return (
    <Container fluid className="min-vh-100 bg-gradient-primary py-3 py-md-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={8}>
            <Card className="shadow-lg border-0 card-modern" data-aos="fade-up">
              <Card.Header className="bg-orange-grad text-white text-center py-5 header-gradient">
                <div className="mb-3">
                  <i className="bi bi-cpu-fill display-4 text-white opacity-75"></i>
                </div>
                <h1 className="mb-0 fw-bold display-5">Nextile EDA Platform</h1>
                <p className="mb-0 mt-3 fs-5 opacity-90">
                  Professional Data Analysis with AI Insights
                </p>
              </Card.Header>

              <Card.Body className="p-5">
                <div className="text-center mb-5" data-aos="fade-up" data-aos-delay="200">
                  <div className="feature-icon-container mb-4">
                    <div className="feature-icon bg-orange-grad rounded-5">
                      <i className="bi bi-graph-up-arrow fs-1 text-white"></i>
                    </div>
                  </div>
                  <h3 className="text-orange mb-3">Ready for Professional Analysis?</h3>
                  <p className="text fs-6 lead">
                    Upload your CSV and get comprehensive analysis with histograms, scatter plots, heatmaps, treemaps,
                    network graphs, and 20+ other advanced visualizations powered by AI insights.
                  </p>
                </div>

                <Form data-aos="fade-up" data-aos-delay="400">
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold text-orange fs-5">Select CSV File</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="form-control-lg modern-input"
                      disabled={loading}
                    />
                    <Form.Text className="text-muted fs-6">
                      Upload any CSV file for comprehensive analysis with 25+ chart types and AI recommendations
                    </Form.Text>
                  </Form.Group>

                  {loading && (
                    <div className="mb-4 analysis-progress" data-aos="fade-in">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-orange fw-semibold">{analysisStage}</span>
                        <span className="text-orange fw-bold">{progress}%</span>
                      </div>
                      <ProgressBar now={progress} variant="dark" animated striped className="progress-modern" />
                      <div className="mt-3 p-3 bg-light rounded analysis-info">
                        <small className="text-muted d-block">
                          <i className="bi bi-info-circle me-2"></i>
                          Generating comprehensive analysis with advanced visualizations...
                        </small>
                      </div>
                    </div>
                  )}

                  {error && (
                    <Alert variant="danger" className="mb-4 alert-modern" data-aos="shake">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      {error}
                    </Alert>
                  )}

                  {file && (
                    <Alert variant="success" className="mb-4 alert-modern" data-aos="fade-in">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-file-earmark-check-fill me-3 fs-4"></i>
                        <div>
                          <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
                          <br />
                          <small className="text-muted">Ready for analysis with 25+ chart types and AI insights</small>
                        </div>
                      </div>
                    </Alert>
                  )}

                  <div className="d-grid mb-5">
                    <Button
                      size="lg"
                      onClick={handleUpload}
                      disabled={!file || loading}
                      className="py-3 fw-bold btn bg-orange-grad border-0"
                    >
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" className="me-2" />
                          Analyzing Data...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-rocket-takeoff me-2"></i>
                          Start Professional Analysis
                        </>
                      )}
                    </Button>
                  </div>
                </Form>

                <div className="features-section" data-aos="fade-up" data-aos-delay="600">
                  <h5 className="text-center text-orange mb-4 fw-bold">Advanced Analysis Features</h5>

                  <Row className="g-4">
                    <Col md={4}>
                      <div className="feature-card text-center p-4">
                        <i className="bi bi-bar-chart-fill fs-2 text-orange mb-3"></i>
                        <h6 className="fw-bold">Univariate Analysis</h6>
                        <small className="text-muted">Histograms, Box Plots, Bar Charts, Pie Charts, Count Plots</small>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="feature-card text-center p-4">
                        <i className="bi bi-diagram-3-fill fs-2 text-orange mb-3"></i>
                        <h6 className="fw-bold">Bivariate Analysis</h6>
                        <small className="text-muted">Scatter Plots, Heatmaps, Grouped Bar Charts, Bubble Charts</small>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="feature-card text-center p-4">
                        <i className="bi bi-share-fill fs-2 text-orange mb-3"></i>
                        <h6 className="fw-bold">Multivariate Analysis</h6>
                        <small className="text-muted">Treemaps, Network Graphs, 3D Plots, Sankey Diagrams</small>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-4 pt-4 border-top">
                    <Row className="g-3">
                      <Col xs={6} md={3}>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-cpu text-orange me-2"></i>
                          <small className="text-muted">AI-Powered Insights</small>
                        </div>
                      </Col>
                      <Col xs={6} md={3}>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-graph-up text-orange me-2"></i>
                          <small className="text-muted">25+ Chart Types</small>
                        </div>
                      </Col>
                      <Col xs={6} md={3}>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-lightbulb text-orange me-2"></i>
                          <small className="text-muted">Business Recommendations</small>
                        </div>
                      </Col>
                      <Col xs={6} md={3}>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-shield-check text-orange me-2"></i>
                          <small className="text-muted">Quality Assessment</small>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
