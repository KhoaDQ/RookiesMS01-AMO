import React from "react";
import { Link, Route } from "react-router-dom";

const menus = [
  {
    label: "Home",
    to: "/",
    exact: true,
  },
  {
    label: "Manage User",
    to: "/edituser",
    exact: false,
  },
  {
    label: "Manage Asset",
    to: "/manage-asset",
    exact: false,
  },
  {
    label: "Manage Assignment",
    to: "/manage-assignment",
    exact: false,
  },
  {
    label: "Request for Returning",
    to: "/request-return",
    exact: false,
  },
  {
    label: "Report",
    to: "/report",
    exact: false,
  },
];
// custom Link
const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        let active = match ? "left-bar__link--active" : "";
        return (
          <li className="left-bar__item">
            <Link className={`left-bar__link ${active}`} to={to}>
              {label}
            </Link>
          </li>
        );
      }}
    />
  );
};

const showMenus = (menus) => {
  let result = null;
  if (menus.length > 0) {
    result = menus.map((menu, index) => {
      return (
        <MenuLink
          key={index}
          label={menu.label}
          to={menu.to}
          activeOnlyWhenExact={menu.exact}
        />
      );
    });
  }
  return result;
};
export default function Menu() {
  return <ul className="left-bar__list">{showMenus(menus)}</ul>;
}
