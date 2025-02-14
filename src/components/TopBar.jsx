import {Container, Navbar, Nav} from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TopBar = (props) => {
    return (
        <Navbar expand="lg" className="topbar shadow-sm">
            <Container fluid>
                <Navbar.Brand href="#home" className="fw-bold text-white">{props.title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 text-white" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <NavLink className="nav-link text-white fw-semibold px-3" to="/home">
                    Home
                    </NavLink>
                    <NavLink className="nav-link text-white fw-semibold px-3" to="/list-city/Rome/41.9028/12.4964">
                    List City
                    </NavLink>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopBar;
