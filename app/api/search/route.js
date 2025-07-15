export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")

  console.log("Search API called with query:", query)

  if (!query) {
    return new Response(JSON.stringify({ error: "Query parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYWl6YW4iLCJpYXQiOjE3NTI1NTYyMDUsImV4cCI6MTc1Nzk3NzIwMH0.fpTADkmw-qcW9kggPpS8kTVqBU8lZvCZ2Im-PGC-pTk",
  )

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  const url = `https://p-fyp-service-34fe7.vercel.app/api/detail-search?query=${encodeURIComponent(query)}`

  try {
    console.log("Fetching from URL:", url)
    const response = await fetch(url, requestOptions)

    if (!response.ok) {
      console.error("Upstream API error:", response.status, response.statusText)
      return new Response(JSON.stringify({ error: `Upstream API error with status ${response.status}` }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      })
    }

    const data = await response.text()
    console.log("Raw API response:", data)

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Search API Error:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
