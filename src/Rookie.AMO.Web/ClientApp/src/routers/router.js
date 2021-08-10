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
  },
  {
    path: "/callback",
    exact: false,
    main: () => <Callback />,
  },
  {
    path: "/manage-user",
    exact: false,
    main: () => <ManageUser />,
  },

  {
    path: "/manage-asset",
    exact: false,
    main: () => <ManageAsset />,
  },
  {
    path: "/manage-assignment",
    exact: false,
    main: () => <ManageAssignment />,
  },
  {
    path: "/report",
    exact: false,
    main: () => <Report />,
  },
  {
    path: "/request-return",
    exact: false,
    main: () => <Request />,
  },
  {
    path: "/createuser",
    exact: false,
    main: () => <CreateUser />,
  },
  {
    path: "/edituser",
    exact: false,
    main: () => <EditUser />,
  },
  {
    path: "/createassets",
    exact: false,
    main: () => <CreateAssets />,
  },
  {
    path: "/editassets",
    exact: false,
    main: () => <EditAssets />,
  },
  {
    path: "/createassignment",
    exact: false,
    main: () => <CreateAssignment />,
  },
  {
    path: "/editassignment",
    exact: false,
    main: () => <EditAssignment />,
  },
  {
    path: "",
    exact: false,
    // main: () => <NotFoundPage />
  },
];

export default routes;
