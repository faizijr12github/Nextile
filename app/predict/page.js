"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Form, Button, Card, Alert, Spinner, ProgressBar } from "react-bootstrap"
import AOS from "aos"
import "aos/dist/aos.css"

const Predictions = () => {
  useEffect(() => {
    AOS.init({
      duration: 1300,
    })
  }, [])

  const [file, setFile] = useState(null)
  const [prompt, setPrompt] = useState("")
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [hasPredicted, setHasPredicted] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      // Validate file type (optional - adjust based on your needs)
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "application/pdf", "text/csv"]
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile)
        setError("")
      } else {
        setError("Please select a valid file type (JPEG, PNG, GIF, PDF, CSV)")
        setFile(null)
      }
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "application/pdf", "text/csv"]
      if (allowedTypes.includes(droppedFile.type)) {
        setFile(droppedFile)
        setError("")
      } else {
        setError("Please select a valid file type (JPEG, PNG, GIF, PDF, CSV)")
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      setError("Please select a file")
      return
    }

    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setLoading(true)
    setError("")
    setHasPredicted(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("prompt", prompt.trim())

      const response = await fetch("/api/prediction", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Prediction Response:", result) // Debug log

      if (result.error) {
        setError(result.error)
        setPrediction(null)
      } else {
        setPrediction(result)
      }
    } catch (error) {
      console.error("Error making prediction:", error)
      setError(error.message || "Failed to process prediction. Please try again.")
      setPrediction(null)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setPrompt("")
    setPrediction(null)
    setError("")
    setHasPredicted(false)
    // Reset file input
    const fileInput = document.getElementById("file-input")
    if (fileInput) fileInput.value = ""
  }

  return (
    <>
      <Container fluid className="bg-orange-grad d-flex justify-content-center align-items-center h-100">
          <Row className="justify-content-center home-hero">
            <Col lg="7" md="10" data-aos="zoom-out" className="px-5">
              <h1 className="fw-bold text-white text-center pt-5">AI-Powered Export Predictions</h1>
              <div>
                <p className="mt-3 text-white">
                  Upload your data and get intelligent predictions for textile export opportunities
                </p>
                <Form onSubmit={handleSubmit} className="mb-5">
                  <Row className="g-3">
                    <Col md={12}>
                      {/* File Upload Area */}
                      <div
                        className={`border-2 border-dashed rounded p-4 text-center ${
                          dragActive ? "border-orange bg-light" : "border-light"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                      >
                        <input
                          type="file"
                          id="file-input"
                          className="d-none"
                          onChange={handleFileChange}
                          disabled={loading}
                        />
                        <label htmlFor="file-input" className="cursor-pointer">
                          <i className="bi bi-cloud-upload fs-1 text-orange d-block mb-2"></i>
                          <p className="mb-2 text-dark">
                            {file ? (
                              <span className="text-success">
                                <i className="bi bi-check-circle me-2"></i>
                                {file.name}
                              </span>
                            ) : (
                              <>
                                <strong>Click to upload</strong> or drag and drop
                              </>
                            )}
                          </p>
                          <small className="text-muted">Supports: CSV, XLSX (Max 10MB)</small>
                        </label>
                      </div>
                    </Col>
                    <Col md={12}>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter your prediction prompt here..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={loading}
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                      />
                    </Col>
                    <Col md={12}>
                      <div className="d-flex gap-2">
                        <Button
                          type="submit"
                          className="conatct-form-btn flex-grow-1"
                          disabled={loading || !file || !prompt.trim()}
                        >
                          {loading ? (
                            <>
                              <Spinner animation="border" size="sm" className="me-2" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-magic me-2"></i>
                              Generate Prediction
                            </>
                          )}
                        </Button>
                        {(file || prompt || hasPredicted) && (
                          <Button variant="outline-light" onClick={resetForm} disabled={loading}>
                            <i className="bi bi-arrow-clockwise"></i>
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>

      {/* Prediction Results Section */}
      {hasPredicted && (
        <Container className="mt-5">
          <Row data-aos="fade-right">
            <Col>
              <h2 className="fw-bold text-center text-orange mb-4">
                {loading ? "Generating Prediction..." : "Prediction Results"}
              </h2>
            </Col>
          </Row>

          {error && (
            <Row className="mb-4">
              <Col>
                <Alert variant="danger" className="text-center">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </Alert>
              </Col>
            </Row>
          )}

          {loading && (
            <Row className="mb-4">
              <Col>
                <Card className="text-center p-4">
                  <Spinner animation="border" role="status" className="mx-auto mb-3">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="mb-0">Processing your request...</p>
                  <ProgressBar animated now={100} className="mt-3" variant="warning" />
                </Card>
              </Col>
            </Row>
          )}

          {prediction && !loading && (
            <Row className="mb-5">
              <Col>
                {/* Main Results Card */}
                <Card className="shadow-lg border-0 mb-4">
                  <Card.Header className="bg-orange-grad text-white py-3">
                    <h5 className="mb-0 d-flex align-items-center">
                      <i className="bi bi-graph-up-arrow me-2"></i>
                      AI Prediction Analysis
                    </h5>
                  </Card.Header>
                  <Card.Body className="p-4">
                    {/* File and Prompt Info */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-file-earmark-text text-orange me-2"></i>
                          <strong>File Processed:</strong>
                        </div>
                        <p className="text-muted ms-4 mb-0">{file?.name}</p>
                      </Col>
                      <Col md={6}>
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-chat-quote text-orange me-2"></i>
                          <strong>Analysis Prompt:</strong>
                        </div>
                        <p className="text-muted ms-4 mb-0 fst-italic">"{prompt}"</p>
                      </Col>
                    </Row>

                    <hr className="my-4" />

                    {/* Enhanced Results Display */}
                    <div className="prediction-results">
                      <h6 className="text-orange mb-4 d-flex align-items-center">
                        <i className="bi bi-lightbulb me-2"></i>
                        Prediction Insights
                      </h6>

                      {(() => {
                        // Parse the prediction result to extract clean text
                        let resultText = ""

                        if (typeof prediction === "object") {
                          // Handle different possible response structures
                          if (prediction.message) {
                            resultText = prediction.message
                          } else if (prediction.result) {
                            // If result is a string, use it directly
                            if (typeof prediction.result === "string") {
                              resultText = prediction.result
                            } else {
                              // If result is an object, try to extract message
                              resultText = prediction.result.message || JSON.stringify(prediction.result)
                            }
                          } else if (prediction.text) {
                            resultText = prediction.text
                          } else if (prediction.content) {
                            resultText = prediction.content
                          } else {
                            // Fallback: convert entire object to string and try to extract meaningful content
                            const jsonString = JSON.stringify(prediction, null, 2)
                            const messageMatch = jsonString.match(/"message":\s*"([^"]+)"/i)
                            if (messageMatch) {
                              resultText = messageMatch[1]
                            } else {
                              resultText = jsonString
                            }
                          }
                        } else {
                          resultText = String(prediction)
                        }

                        // Clean up the text - remove JSON artifacts and formatting
                        resultText = resultText
                          .replace(/\\n/g, "\n") // Convert escaped newlines
                          .replace(/\\"/g, '"') // Convert escaped quotes
                          .replace(/^\{.*?"message":\s*"/, "") // Remove JSON prefix
                          .replace(/",.*?\}$/, "") // Remove JSON suffix
                          .trim()

                        // Split the text into meaningful sections
                        const sections = []

                        // Try to identify different prediction categories
                        const patterns = [
                          {
                            title: "Sales Predictions",
                            regex: /predicted.*?sales?.*?(?=predicted|$)/gi,
                            icon: "graph-up",
                            color: "success",
                          },
                          {
                            title: "Price Analysis",
                            regex: /predicted.*?price.*?(?=predicted|$)/gi,
                            icon: "currency-dollar",
                            color: "info",
                          },
                          {
                            title: "Market Insights",
                            regex: /predicted.*?market.*?(?=predicted|$)/gi,
                            icon: "bar-chart",
                            color: "warning",
                          },
                          {
                            title: "Quality & Availability",
                            regex: /predicted.*?quality.*?(?=predicted|$)/gi,
                            icon: "shield-check",
                            color: "orange",
                          },
                          {
                            title: "Supplier Information",
                            regex: /predicted.*?supplier.*?(?=predicted|$)/gi,
                            icon: "building",
                            color: "secondary",
                          },
                        ]

                        // Extract sections based on patterns
                        patterns.forEach((pattern) => {
                          const matches = resultText.match(pattern.regex)
                          if (matches) {
                            matches.forEach((match) => {
                              sections.push({
                                title: pattern.title,
                                content: match.trim(),
                                icon: pattern.icon,
                                color: pattern.color,
                              })
                            })
                          }
                        })

                        // If no patterns matched, split by sentences or paragraphs
                        if (sections.length === 0) {
                          const sentences = resultText.split(/\.\s+|\n\n+/).filter((s) => s.trim().length > 20)
                          sentences.forEach((sentence, index) => {
                            if (sentence.trim()) {
                              sections.push({
                                title: `Key Insight ${index + 1}`,
                                content: sentence.trim() + (sentence.endsWith(".") ? "" : "."),
                                icon: "lightbulb",
                                color: "orange",
                              })
                            }
                          })
                        }

                        // If still no sections, show as single block
                        if (sections.length === 0) {
                          sections.push({
                            title: "Prediction Analysis",
                            content: resultText,
                            icon: "robot",
                            color: "orange",
                          })
                        }

                        return (
                          <Row className="g-4">
                            {sections.map((section, index) => (
                              <Col md={6} key={index}>
                                <Card className="h-100 border-0 shadow-sm bg-light">
                                  <Card.Body className="p-4">
                                    <div className="d-flex align-items-start">
                                      <div
                                        className={`bg-${section.color} text-white rounded-circle p-2 me-3 flex-shrink-0 bg-dark`}
                                        style={{ width: "45px", height: "45px" }}
                                      >
                                        <i
                                          className={`bi bi-${section.icon} d-block text-center text-orange`}
                                          style={{ fontSize: "1.2rem", lineHeight: "1.8" }}
                                        ></i>
                                      </div>
                                      <div className="flex-grow-1">
                                        <h6 className={`text-${section.color} mb-3 fw-bold`}>{section.title}</h6>
                                        <p
                                          className="text-dark mb-0"
                                          style={{
                                            fontSize: "0.95rem",
                                            lineHeight: "1.6",
                                            textAlign: "justify",
                                          }}
                                        >
                                          {section.content}
                                        </p>
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        )
                      })()}
                    </div>
                  </Card.Body>

                  {/* Footer with metadata */}
                  <Card.Footer className="bg-transparent border-0 px-4 py-3">
                    <Row className="align-items-center">
                      <Col>
                        <small className="text-muted d-flex align-items-center">
                          <i className="bi bi-clock me-1"></i>
                          Generated on {new Date().toLocaleString()}
                        </small>
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="outline-orange"
                          size="sm"
                          onClick={() => {
                            const resultText =
                              typeof prediction === "object" ? JSON.stringify(prediction, null, 2) : String(prediction)
                            navigator.clipboard.writeText(resultText)
                            // You could add a toast notification here
                          }}
                        >
                          <i className="bi bi-clipboard me-1"></i>
                          Copy Results
                        </Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          )}

          {!prediction && !loading && !error && hasPredicted && (
            <Row>
              <Col>
                <Alert variant="info" className="text-center">
                  <i className="bi bi-info-circle me-2"></i>
                  No prediction results received. Please try again.
                </Alert>
              </Col>
            </Row>
          )}
        </Container>
      )}

      {/* Information Section - only show if no prediction has been made */}
      {!hasPredicted && (
        <Container className="my-5">
          <Row data-aos="fade-up">
            <Col>
              <h2 className="fw-bold text-center text-orange mb-4">How It Works</h2>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <i className="bi bi-upload fs-1 text-orange mb-3"></i>
                  <Card.Title>1. Upload Your Data</Card.Title>
                  <Card.Text>Upload your textile data files (images, documents, or datasets) for analysis.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <i className="bi bi-chat-text fs-1 text-orange mb-3"></i>
                  <Card.Title>2. Describe Your Query</Card.Title>
                  <Card.Text>Provide a detailed prompt about what predictions or insights you need.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <i className="bi bi-graph-up fs-1 text-orange mb-3"></i>
                  <Card.Title>3. Get AI Insights</Card.Title>
                  <Card.Text>Receive intelligent predictions and export recommendations powered by AI.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default Predictions
