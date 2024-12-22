import { Navbar, Container, Nav, NavDropdown, Form, Row, Col,  } from "react-bootstrap";
import { Link, useLocation } from "react-router";
import "./navigation-bar.scss"
import logo from "../../Img/moviehive-logo-transparent.svg";

export const NavigationBar = ({ onLoggedOut, onFilterChange }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();
    const showSearchBar = location.pathname === "/";

  return (
    <Navbar expand="lg" className="navbar-dark bg-dark fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
            <img id="MovieHive-logo" src={logo} alt="MovieHive Logo" draggable="false" height="30" />
        </Navbar.Brand>
        {showSearchBar && (
          <Form className="d-none d-lg-block">
              <Row>
                  <Col xs="auto">
                      <Form.Control type="text" placeholder="Search Movie" className=" mr-sm-2" style={{ width: '300px', maxWidth: '100%' }} onChange={(e) => onFilterChange(e.target.value)}/>
                  </Col>
              </Row>
          </Form>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                {storedUser ? (
                     <>
                        <Nav.Link as={Link} to="/">Movies</Nav.Link>
                        <NavDropdown title={storedUser.Name} id="basic-nav-dropdown" menuVariant="dark" className="custom-dropdown">
                            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={onLoggedOut}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </>
                ) : location.pathname === "/signup" ? (
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                ) : (
                    <Nav.Link as={Link} to="/signup">Create account</Nav.Link>
                )}
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};