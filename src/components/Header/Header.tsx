import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header: React.FC = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>Конвертер валют</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/latest-rates">
            <Nav.Link>Курсы валют</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/archive-rates">
            <Nav.Link>Архив кусов</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/available-currencies">
            <Nav.Link>Список доступных валют</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
