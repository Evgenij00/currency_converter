import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Конвертер валют</Navbar.Brand>
      <Nav className="mr-auto">
        <LinkContainer to="/">
          <Nav.Link>Курсы валют</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/convert">
          <Nav.Link>Калькулятор</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/course-archive">
          <Nav.Link>Архив кусов</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/available-currencies">
          <Nav.Link>Список доступных валют</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default Header;
