// UnauthorizedPage.js
import Link from "next/link"
import { Container, Alert } from "react-bootstrap"


export default function UnauthorizedPage() {
  return (
    <Container className="text-center my-5">
      <Alert variant="danger">
        <h4>Access Denied</h4>
        <p>You are not allowed to view this page. Please log in with the correct account.</p>
      </Alert>
      <Link href={'/login'} className="btn btn-primary">Go to Login</Link>
    </Container>
  )
}
