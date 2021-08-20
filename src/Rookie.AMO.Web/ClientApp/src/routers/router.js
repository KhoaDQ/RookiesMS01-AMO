import React from "react";
import Home from "../pages/Home";
import ManageUser from "../pages/ManageUser";
import ManageAssignment from "../pages/ManageAssignment";
import ManageAsset from "../pages/ManageAsset";
import Report from "../pages/Report";
import Request from "../pages/Request";
import CreateUser from "../pages/ManageUser/CreateUser";
import EditUser from "../pages/ManageUser/EditUser";
import CreateAssets from "../pages/ManageAsset/CreateAssets";
import EditAssets from "../pages/ManageAsset/EditAssets";
import CreateAssignment from "../pages/ManageAssignment/CreateAssignment";
import EditAssignment from "../pages/ManageAssignment/EditAssignment";
import Callback from "../components/Callback";
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
    allowedRole: ["Admin", "Staff"],
  },
  {
    path: "/manage-user",
    exact: false,
    main: () => <ManageUser />,
    allowedRole: ["Admin"],
  },
  {
    path: "/callback",
    exact: false,
    main: () => <Callback />,
    allowedRole: [],
  },
  {
    path: "/manage-asset",
    exact: false,
    main: () => <ManageAsset />,
    allowedRole: ["Admin"],
  },
  {
    path: "/manage-assignment",
    exact: false,
    main: () => <ManageAssignment />,
    allowedRole: ["Admin"],
  },
  {
    path: "/report",
    exact: false,
    main: () => <Report />,
    allowedRole: ["Admin"],
  },
  {
    path: "/request-return",
    exact: false,
    main: () => <Request />,
    allowedRole: ["Admin"],
  },
  {
    path: "/create-user",
    exact: false,
    main: () => <CreateUser />,
    allowedRole: ["Admin"],
  },
  {
    path: "/edit-user/:id",
    exact: false,
    main: ({ history, match }) => <EditUser history={history} match={match} />,
    allowedRole: ["Admin"],
  },
  {
    path: "/createassets",
    exact: false,
    main: () => <CreateAssets />,
    allowedRole: ["Admin"],
  },
  {
    path: "/edit-assets/:id",
    exact: false,
    main: ({ history, match }) => (
      <EditAssets history={history} match={match} />
    ),
    allowedRole: ["Admin"],
  },
  {
    path: "/createassignment",
    exact: false,
    main: () => <CreateAssignment />,
    allowedRole: ["Admin"],
  },
  {
    path: "/editassignment",
    exact: false,
    main: () => <EditAssignment />,
    allowedRole: ["Admin"],
  },
  {
    path: "",
    exact: false,
    // main: () => <NotFoundPage />,
    allowedRole: [""],
  },
];

export default routes;
