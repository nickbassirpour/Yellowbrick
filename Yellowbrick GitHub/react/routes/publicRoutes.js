import { lazy } from 'react';
const Landing = lazy(() => import('../components/landing/Landing'));
const PageNotFound = lazy(() => import('../components/error/Error404'));
const ForbiddenPage = lazy(() => import('../components/error/ForbiddenPage'));
const Register = lazy(() => import("../components/user/Register"));
const Login = lazy(() => import("../components/user/Login"));
const RequestReset = lazy(() => import("../components/user/RequestResetPassword"));
const ConfirmEmail = lazy(() => import("../components/user/ConfirmEmail"));
const UpdatePassword = lazy(() => import("../components/user/UpdatePassword"));


const routes = [
    {
        path: '/',
        name: 'Landing',
        exact: true,
        element: Landing,
        roles: [],
        isAnonymous: true,
        isEmpty : false,
    },
    {
        path: "/register",
        name: "Register",
        element: Register,
        roles: [],
        exact: true,
        isAnonymous: true,
        isEmpty : true,
      },
      {
        path: "/login",
        name: "Login",
        element: Login,
        roles: [],
        exact: true,
        isAnonymous: true,
        isEmpty : true,
      },
      {
        path: "/confirm",
        name: "ConfirmEmail",
        element: ConfirmEmail,
        roles: [],
        exact: true,
        isAnonymous: true,
        isEmpty : true,
      },
      {
        path: "/request-reset-password",
        name: "RequestReset",
        element: RequestReset,
        roles: [],
        exact: true,
        isAnonymous: true,
        isEmpty : true,
      },
      {
        path: "/update-password",
        name: "UpdatePassword",
        element: UpdatePassword,
        roles: [],
        exact: true,
        isAnonymous: true,
        isEmpty : true
      },
];

const errorRoutes = [
    {
      path: "/forbiddenpage",
      name: "Error - 403",
      element: ForbiddenPage,
      roles: [],
      exact: true,
      isAnonymous: false,
    },
    {
        path: '*',
        name: 'Error - 404',
        element: PageNotFound,
        roles: ["Admin", "Advisor", "Agent", "Client"],
        exact: true,
        isAnonymous: true,
    },
];
var allRoutes = [...routes, ...errorRoutes];

export default allRoutes;
