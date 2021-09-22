import React from 'react'
import { Navbar, Nav,Container } from 'react-bootstrap'
import logo from '../../assets/image/logo.png'
import { useHistory } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {userLogout} from "../../api/userApi"

const Header = () => {
    const history = useHistory()

    const logMeOut = () => {
        sessionStorage.removeItem("accessJWT")
        localStorage.removeItem("crmSite")
        userLogout()
        history.push("/")
    }
    return (
        <Navbar collapseOnSelect bg="info" variant="dark" expand="md">
            <Container>
            <Navbar.Brand>
                <img src={logo} alt="logo" width="50px" style={{backgroundColor:"white", borderRadius:"50%"}} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <LinkContainer to="/dashboard"><Nav.Link>Dashboard</Nav.Link></LinkContainer>
                    <LinkContainer to="/tickets"><Nav.Link>Tickets</Nav.Link></LinkContainer>
                    <Nav.Link onClick={logMeOut}>Logout</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
