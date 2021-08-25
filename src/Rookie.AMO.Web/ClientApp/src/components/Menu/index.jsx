import React from "react";
import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const menus = [
  {
    label: "Home",
    to: "/",
    exact: true,
    allowedRole: ["Admin", "Staff"]
  },
  {
    label: "Manage User",
    to: "/manage-user",
    exact: false,
    allowedRole: ["Admin"]
  },
  {
    label: "Manage Asset",
    to: "/manage-asset",
    exact: false,
    allowedRole: ["Admin"]
  },
  {
    label: "Manage Assignment",
    to: "/manage-assignment",
    exact: false,
    allowedRole: ["Admin"]
  },
  {
    label: "Request for Returning",
    to: "/request-return",
    exact: false,
    allowedRole: ["Admin"]
  },
  {
    label: "Report",
    to: "/report",
    exact: false,
    allowedRole: ["Admin"]
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

const showMenus = (menus, user) => {
  let result = [];
  if (menus.length > 0) {
    result = menus.map((menu, index) => {
      const show = menu.allowedRole.length == 0 || (user != null && menu.allowedRole.includes(user.profile.role))
      if (show) {
        return (
          <MenuLink
            key={index}
            label={menu.label}
            to={menu.to}
            activeOnlyWhenExact={menu.exact}
          />
        );
      }
    });
  }
  return result;
};
export default function Menu() {
  const { user, isLoadingUser } = useSelector((state) => state.oidc);

  useEffect(() => {
  }, [user, isLoadingUser]);
  return <ul className="left-bar__list">{showMenus(menus, user)}</ul>;
}
