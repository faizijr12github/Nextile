"use client"

import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap"
import { useSession, signOut } from "next-auth/react"
import { useState, useEffect } from "react"

function NavScrollExample() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"
  const isAuthenticated = status === "authenticated"

  // Add mounted state to prevent hydration errors
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  // Return a simplified version during SSR to avoid hydration issues
  if (!mounted) {
    return (
      <Navbar expand="lg" className="bg-body-tertiary bg-white">
        <Container fluid>
          <Navbar.Brand href="/">
            <img loading="lazy" src='/images/nextile-logo-1.jpg' alt='origo-logo' className='img-fluid' width={200} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0"></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm px-4 mynavbar bg-white">
      <Container fluid>
        <Navbar.Brand href="/">
        <img loading="lazy" src='/images/nextile-logo-1.jpg' alt='origo-logo' className='img-fluid' width={200} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="justify-content-center flex-grow-1">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/insights"><i className="bi bi-bar-chart me-1"></i>Insights</Nav.Link>
            <Nav.Link href="/explore"><i className="bi bi-robot me-1"></i>Explore</Nav.Link>

            {isAuthenticated && session?.user?.role === "admin" && (
              <Nav.Link href="/admin-dashboard">Admin Dashboard</Nav.Link>
            )}
          </Nav>

          {!isAuthenticated && !isLoading && (
            <Button href="/registerPage" className="me-3 bg-orange-grad text-white fw-bold border-0">
            Register
          </Button>
          )}

          {!isAuthenticated && !isLoading ? (
            <Button href="/login" className="me-3 bg-orange-grad text-white fw-bold border-0">
              Login
            </Button>
          ) : (
            isAuthenticated && (
              <NavDropdown
                className="me-5"
                title={
                  <span>
                    <i className="bi bi-person-circle me-1"></i>
                    {session?.user?.name || session?.user?.email}
                  </span>
                }
                id="user-dropdown"
              >
                {session?.user?.role === "buyer" && <NavDropdown.Item className="nav-drop-link" href="/manageBuyer"><i className="bi bi-person-fill-gear me-1"></i>Profile</NavDropdown.Item>}
                {session?.user?.role === "supplier" && (
                  <NavDropdown.Item className="nav-drop-link" href="/manageSupplier"><i className="bi bi-person-fill-gear me-1"></i>Profile</NavDropdown.Item>
                )}
                {session?.user?.role === "inspection" && (
                  <NavDropdown.Item className="nav-drop-link" href="/manageTeam"><i className="bi bi-person-fill-gear me-1"></i>Profile</NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item className="nav-drop-link" onClick={handleSignOut}><i className="bi bi-box-arrow-right me-1"></i>Logout</NavDropdown.Item>
              </NavDropdown>
            )
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavScrollExample
