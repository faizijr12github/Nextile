"use client"

import { useEffect, useRef } from "react"
import { Card, Badge } from "react-bootstrap"
import Chart from "chart.js/auto"

export default function ChartComponent({ chart, delay = 0 }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current && chart) {
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      // Enhanced chart configuration
      const config = {
        type: chart.type || "bar",
        data: {
          labels: chart.labels || [],
          datasets: chart.datasets || [
            {
              label: chart.label || "Data",
              data: chart.data || [],
              backgroundColor: getChartColors(chart.type, chart.data?.length || 0, 0.8),
              borderColor: getChartColors(chart.type, chart.data?.length || 0, 1),
              borderWidth: chart.type === "line" ? 3 : 2,
              fill: chart.type === "line" ? false : true,
              tension: chart.type === "line" ? 0.4 : 0,
              pointRadius: chart.type === "line" ? 6 : 0,
              pointHoverRadius: chart.type === "line" ? 8 : 0,
              borderRadius: chart.type === "bar" ? 8 : 0,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: chart.title || "Chart",
              font: {
                size: 16,
                weight: "bold",
              },
              padding: 20,
              color: "#2c3e50",
            },
            legend: {
              display: chart.type === "pie" || chart.type === "doughnut" || chart.datasets?.length > 1,
              position: "bottom",
              labels: {
                padding: 20,
                usePointStyle: true,
                font: {
                  size: 12,
                },
                generateLabels: function (chart) {
                  const original = Chart.defaults.plugins.legend.labels.generateLabels
                  const labels = original.call(this, chart)

                  labels.forEach((label) => {
                    label.borderRadius = 4
                  })

                  return labels
                },
              },
            },
            tooltip: {
              backgroundColor: "rgba(0,0,0,0.9)",
              titleColor: "white",
              bodyColor: "white",
              borderColor: "rgba(255,255,255,0.2)",
              borderWidth: 1,
              cornerRadius: 12,
              displayColors: true,
              titleFont: {
                size: 14,
                weight: "bold",
              },
              bodyFont: {
                size: 13,
              },
              padding: 12,
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || ""
                  if (label) {
                    label += ": "
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat().format(context.parsed.y)
                  }
                  return label
                },
              },
            },
          },
          scales: getScaleConfig(chart.type),
          animation: {
            duration: 2000,
            easing: "easeInOutQuart",
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          elements: {
            point: {
              hoverBackgroundColor: "#fff",
              hoverBorderWidth: 3,
            },
            bar: {
              borderRadius: 8,
            },
          },
        },
      }

      // Special configurations for different chart types
      if (chart.type === "doughnut") {
        config.options.cutout = "60%"
        config.options.plugins.legend.position = "right"
      }

      if (chart.type === "radar") {
        config.options.scales = {
          r: {
            beginAtZero: true,
            grid: {
              color: "rgba(0,0,0,0.1)",
            },
            pointLabels: {
              font: {
                size: 12,
              },
            },
          },
        }
      }

      chartInstance.current = new Chart(ctx, config)
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [chart])

  const getChartColors = (type, count, alpha = 0.8) => {
    const colors = [
      `rgba(54, 162, 235, ${alpha})`, // Blue
      `rgba(255, 99, 132, ${alpha})`, // Red
      `rgba(255, 205, 86, ${alpha})`, // Yellow
      `rgba(75, 192, 192, ${alpha})`, // Teal
      `rgba(153, 102, 255, ${alpha})`, // Purple
      `rgba(255, 159, 64, ${alpha})`, // Orange
      `rgba(199, 199, 199, ${alpha})`, // Grey
      `rgba(83, 102, 255, ${alpha})`, // Indigo
      `rgba(255, 193, 7, ${alpha})`, // Amber
      `rgba(40, 167, 69, ${alpha})`, // Green
      `rgba(220, 53, 69, ${alpha})`, // Danger
      `rgba(108, 117, 125, ${alpha})`, // Secondary
    ]

    if (type === "line") {
      return colors[0]
    }

    return colors.slice(0, Math.max(count, 1))
  }

  const getScaleConfig = (type) => {
    if (type === "pie" || type === "doughnut" || type === "radar") {
      return {}
    }

    return {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0,0,0,0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(0,0,0,0.7)",
          font: {
            size: 11,
          },
          callback: (value) => {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + "M"
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + "K"
            }
            return value
          },
        },
      },
      x: {
        grid: {
          color: "rgba(0,0,0,0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(0,0,0,0.7)",
          maxRotation: 45,
          font: {
            size: 11,
          },
        },
      },
    }
  }

  const getChartTypeIcon = (type) => {
    const iconMap = {
      bar: "bar-chart-fill",
      line: "graph-up",
      pie: "pie-chart-fill",
      doughnut: "circle-fill",
      scatter: "dot",
      bubble: "circle",
      radar: "hexagon-fill",
      polarArea: "pentagon-fill",
      histogram: "bar-chart-steps",
      box: "box",
      heatmap: "grid-3x3-gap-fill",
    }
    return iconMap[type] || "graph-up"
  }

  if (!chart) {
    return null
  }

  return (
    <Card className="h-100 border-0 shadow-sm chart-card-modern" data-aos="fade-up" data-aos-delay={delay}>
      <Card.Header className="bg-light border-0 py-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <i className={`bi bi-${getChartTypeIcon(chart.type)} text-orange me-2`}></i>
            <small className="text-muted fw-semibold">{chart.type?.toUpperCase() || "CHART"}</small>
          </div>
          <Badge bg="primary" className="badge-modern">
            {chart.data?.length || 0} Points
          </Badge>
        </div>
      </Card.Header>
      <Card.Body className="p-4">
        <div style={{ height: "350px", position: "relative" }}>
          <canvas ref={chartRef}></canvas>
        </div>
        {chart.insight && (
          <div className="mt-4 p-3 bg-light rounded-3 insight-box">
            <div className="d-flex align-items-start">
              <i className="bi bi-lightbulb-fill text-warning me-2 mt-1 flex-shrink-0"></i>
              <div>
                <h6 className="text-orange mb-2 fw-bold">Key Insight</h6>
                <p className="mb-0 small text-dark">{chart.insight}</p>
              </div>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
