import React from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

const NavbarTop = (props) => {
    return (
        <>


            <Navbar bg="" expand="lg" className="nav-top">
                <Navbar.Brand>{props.name}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto justify-content-end">
                        <Nav.Link href="#home"><i class="fa fa-home"> Home</i></Nav.Link>
                        <Nav.Link href="#link"><i class="fa fa-user"> Notification</i></Nav.Link>
                    </Nav>
                    <Form className="nosubmit" inline>
                        <input type="search" placeholder="Search" className="nosubmit mr-sm-2 search-box" />
                        {/* <i class="fa fa-search" aria-hidden="true"></i> */}

                    </Form>
                </Navbar.Collapse>
            </Navbar>


        </>
    )
}

export default NavbarTop;