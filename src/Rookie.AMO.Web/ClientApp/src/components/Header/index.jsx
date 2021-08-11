import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import "./Header.css";
import { useSelector } from "react-redux";
import userManager from "../../utils/userManager";
const Header = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const oidc = useSelector((state) => state.oidc);
  const { user } = oidc;
  const signin = () => userManager.signinRedirect();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="header">
      <Container>
        <Row>
          <Col xs="6">
            <Link to="/" className="header-logo">
              Home
            </Link>
          </Col>
          {user != null ? (
            <Col xs="6" className="header-right">
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>{user.name}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>{user.name}</DropdownItem>
                  <DropdownItem>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          ) : (
            <Col xs="6" className="header-right">
              <Button onClick={this.signin}>Login</Button>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Header;
