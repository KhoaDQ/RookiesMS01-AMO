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
    main: ({ match, history }) => <Home match={match} history={history} />,
    allowedRole: ["Admin", "Staff"],
  },
  {
    path: "/callback",
    exact: false,
    main: () => <Callback />,
    allowedRole: [],
  },
  {
    path: "/manage-user",
    exact: false,
    main: ({ match, history }) => <ManageUser match={match} history={history} />,
    allowedRole: ["Admin"],
  },
  {
    path: "/manage-asset",
    exact: false,
    main: ({ match, history }) => <ManageAsset match={match} history={history} />,
    allowedRole: ["Admin"],
  },
  {
    path: "/manage-assignment",
    exact: false,
    main: ({ match, history }) => <ManageAssignment match={match} history={history} />,
    allowedRole: ["Admin"],
  },
  {
    path: "/report",
    exact: false,
    main: ({ match, history }) => <Report match={match} history={history} />,
    allowedRole: ["Admin"],
  },
  {
    path: "/request-return",
    exact: false,
    main: ({ match, history }) => <Request match={match} history={history} />,
    allowedRole: ["Admin"],
  },
  {
    path: "/create-user",
    exact: false,
    main: ({ match, history }) => <CreateUser match={match} history={history} />,
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
    main: ({ match, history }) => <CreateAssets match={match} history={history} />,
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
    path: "/create-assignment",
    exact: false,
    main: ({ match, history }) => <CreateAssignment match={match} history={history} />,
    allowedRole: ["Admin"],
  },
  {
    path: "/edit-assignments/:id",
    exact: false,
    main: ({ match, history }) => <EditAssignment match={match} history={history} />,
    allowedRole: ["Admin"],
  },
  {
    path: "",
    exact: false,
    // main: (match,history) => <NotFoundPage match={match} history={history} />,
    allowedRole: [""],
  },
];

export default routes;
