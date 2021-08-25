import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGreaterThan } from 'react-icons/fa';
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import './Header.css';
import { useSelector } from 'react-redux';
import userManager from '../../utils/userManager';
import queryString from 'query-string';
import { BASE_URL_AZURE } from '../../constants/config';

const Header = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentHeader, setCurrentHeader] = useState('Home');
  const [currentIndex, setCurrentIndex] = useState('');

  const oidc = useSelector((state) => state.oidc);
  const changePasswordCallback = queryString.stringify({
    returnUrl: userManager.settings.post_logout_redirect_uri,
  });
  const { user } = oidc;
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    switch (props.componentActive) {
      case '/': {
        setCurrentHeader('Home');
        break;
      }
      case '/manage-user': {
        setCurrentHeader('Manage User');
        break;
      }
      case '/manage-asset': {
        setCurrentHeader('Manage Asset');
        break;
      }
      case '/manage-assignment': {
        setCurrentHeader('Manage Assignment');
        break;
      }
      case '/request-return': {
        setCurrentHeader('Request for Returning');
        break;
      }
      case '/report': {
        setCurrentHeader('Report');
        break;
      }
      default: {
        setCurrentHeader('Home');
      }
    }
  }, [props.componentActive]);

  const path = useSelector((state) => state.IndexReducer);
  useEffect(() => {
    switch (path) {
      case '': {
        setCurrentIndex('');
        break;
      }
      case '/create-user': {
        setCurrentIndex('Create User');
        break;
      }
      case '/edit-user': {
        setCurrentIndex('Edit User');
        break;
      }
      case '/createassets': {
        setCurrentIndex('Create Asset');
        break;
      }
      case '/edit-assets': {
        setCurrentIndex('Edit Asset');
        break;
      }
      case '/create-assignment': {
        setCurrentIndex('Create Assignment');
        break;
      }
      case '/edit-assignments': {
        setCurrentIndex('Edit Assignment');
        break;
      }
      default: {
        setCurrentIndex('');
      }
    }
  }, [path]);

  return (
    <div className="header">
      <Container className="container-fluid">
        <Row>
          <Col xs="6">
            <Link to="/" className="header-logo">
              {currentHeader}
            </Link>
            {path !== '' ? <FaGreaterThan className="index-icon" /> : ''}
            {currentIndex}
          </Col>
          {user != null && (
            <Col xs="6" className="header-right">
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>{user.profile.userName}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>{user.profile.userName}</DropdownItem>
                  <DropdownItem>
                    <a
                      href={`${userManager.settings.authority}Manage/ChangePassword?${changePasswordCallback}`}
                    >
                      Change password
                    </a>
                  </DropdownItem>
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
