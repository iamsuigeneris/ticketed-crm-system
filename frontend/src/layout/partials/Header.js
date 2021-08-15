import React from 'react'
import { Navbar, Nav,Container } from 'react-bootstrap'
import logo from '../../assets/image/logo.png'

const Header = () => {
    return (
        <Navbar collapseOnSelect bg="info" variant="dark" expand="md">
            <Container>
            <Navbar.Brand>
                <img src={logo} alt="logo" width="50px" style={{backgroundColor:"white", borderRadius:"50%"}} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href="/dashboad">Dashboad</Nav.Link>
                    <Nav.Link href="/dashboad">Ticket</Nav.Link>
                    <Nav.Link href="/dashboad">Logout</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
