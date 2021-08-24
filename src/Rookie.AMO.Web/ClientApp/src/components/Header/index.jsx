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
} from "reactstrap";
import "./Header.css";
import { useSelector } from "react-redux";
import userManager from "../../utils/userManager";
import queryString from "query-string";
import { BASE_URL_AZURE } from "../../constants/config";

const Header = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
    const oidc = useSelector((state) => state.oidc);
    const changePasswordCallback = queryString.stringify({
        returnUrl: userManager.settings.post_logout_redirect_uri
  });
  const { user } = oidc;
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="header">
      <Container className='container-fluid'>
        <Row>
          <Col xs="6">
            <Link to="/" className="header-logo">
              Home
            </Link>
          </Col>
          {user != null && (
            <Col xs="6" className="header-right">
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>{user.profile.userName}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>{user.profile.userName}</DropdownItem>
                  <DropdownItem><a href={`${userManager.settings.authority}Manage/ChangePassword?${changePasswordCallback}`}>Change password</a></DropdownItem>
                  <DropdownItem onClick={() => userManager.signoutRedirect()}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Header;
