import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

const menus = [
  {
    label: 'Home',
    to: '/',
    exact: true,
    allowedRole: ['Admin', 'Staff'],
  },
  {
    label: 'Manage User',
    to: '/manage-user',
    exact: false,
    allowedRole: ['Admin'],
  },
  {
    label: 'Manage Asset',
    to: '/manage-asset',
    exact: false,
    allowedRole: ['Admin'],
  },
  {
    label: 'Manage Assignment',
    to: '/manage-assignment',
    exact: false,
    allowedRole: ['Admin'],
  },
  {
    label: 'Request for Returning',
    to: '/request-return',
    exact: false,
    allowedRole: ['Admin'],
  },
  {
    label: 'Report',
    to: '/report',
    exact: false,
    allowedRole: ['Admin'],
  },
];
// custom Link
const MenuLink = ({ label, to, activeOnlyWhenExact, handleClick }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        let active = match ? 'left-bar__link--active' : '';
        let isActive = match ? 'true' : 'false';
        return (
          <li className="left-bar__item">
            <Link
              className={`left-bar__link ${active}`}
              to={to}
              onClick={handleClick(to, isActive)}
            >
              {label}
            </Link>
          </li>
        );
      }}
    />
  );
};

const showMenus = (menus, user, handleActive) => {
  let result = [];
  const handleClick = (content, isActive) => {
    if (isActive === 'true') handleActive(content);
  };
  if (menus.length > 0) {
    result = menus.map((menu, index) => {
      const show =
        menu.allowedRole.length == 0 ||
        (user != null && menu.allowedRole.includes(user.profile.role));
      if (show) {
        return (
          <MenuLink
            key={index}
            label={menu.label}
            to={menu.to}
            activeOnlyWhenExact={menu.exact}
            handleClick={handleClick}
          />
        );
      }
    });
  }
  return result;
};
export default function Menu(props) {
  const { user, isLoadingUser } = useSelector((state) => state.oidc);
  const [active, setActive] = useState('/');

  const handleActive = (content) => {
    setActive(content);
  };

  useEffect(() => {
    props.tranferActive(active);
  }, [active]);

  useEffect(() => {}, [user, isLoadingUser]);
  return (
    <ul className="left-bar__list">{showMenus(menus, user, handleActive)}</ul>
  );
}
