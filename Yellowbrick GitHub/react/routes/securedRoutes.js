import HousingStatus from "components/clients/housing/HousingStatus";
import { lazy } from "react";
const AnalyticsDashboards = lazy(() => import("../components/dashboard/analytics/Analytics"));
const ClientEmployment = lazy(() => import("../components/clients/employment/ClientEmployment"));
const ClientIncome = lazy(() => import("../components/clients/income/ClientIncome"));
const ClientsList = lazy(() => import("../components/clients/ClientsList"));
const ClientProperties = lazy(() => import("../components/clients/assets/ClientProperties"));
const ClientProtection = lazy(() => import("../components/clients/protection/ClientProtection"));
const FilesUpload = lazy(() => import("../components/fileupload/FilesUpload"));
const ForbiddenPage = lazy(() => import("../components/error/ForbiddenPage"));
const PersonalInformation = lazy(() => import('../components/clients/PersonalInformation'))
const newClient = lazy(() => import('../components/clients/NewClient'))
const PageNotFound = lazy(() => import("../components/error/Error404"));
const Mortgages = lazy(() => import("../components/clients/housing/Mortgages"));
const ShortTermDebt = lazy(() =>
  import("../components/clients/debts/ShortTermDebt")
);
const SingleFileUpload = lazy(() =>
  import("../components/fileupload/SingleFileUpload")
);
const LocationsForm = lazy(() => import("../components/location/LocationForm"));
const InvestmentAccounts = lazy(() => import("../components/clients/assets/InvestmentAccounts"));
const RetirementAccounts = lazy(() => import("../components/clients/assets/RetirementAccounts"));
const AdminInvite = lazy(() => import("../components/admin/AdminInvite"));
const ChangeStatus = lazy(() => import("../components/admin/ChangeStatus"));
const DashboardHome = lazy(() => import("../components/dashboard/DashboardHome"));
const AdminDashboard = lazy(() => import("../components/dashboard/AdminDashboard"));
const AdvisorDashboard = lazy(() => import("../components/dashboard/AdvisorDashboard"));
const AgentDashboard = lazy(() => import("../components/dashboard/AgentDashboard"));
const ClientDashboard = lazy(() => import("../components/dashboard/ClientDashboard"));
const HealthInsurance = lazy(()=> import("../components/clients/protection/HealthInsurance"));
const LifeInsurance = lazy(() => import("../components/clients/protection/LifeInsurance"));
const DisabilityInsurance = lazy(() => import("../components/clients/protection/DisabilityInsurance"));
const Clients = lazy(() => import("../components/clients/Client"));
const UsersList = lazy(() => import("../components/user/UsersList"));
const UserSettings = lazy(() => import("../components/user/UserSettings"));


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboards",
    element: DashboardHome,
    roles: ["Admin", "Agent", "Advisor", "Client"],
    icon: "uil-home-alt",
    header: "Navigation",
    children: [
      {
        path: "/dashboard/admin",
        name: "Admin Dashboard",
        element: AdminDashboard,
        roles: ["Admin"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/dashboard/advisor",
        name: "Advisor Dashboard",
        element: AdvisorDashboard,
        roles: ["Admin", "Advisor"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/dashboard/agent",
        name: "Agent Dashboard",
        element: AgentDashboard,
        roles: ["Admin", "Advisor", "Agent"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/dashboard/client",
        name: "Client Dashboard",
        element: ClientDashboard,
        roles: ["Admin", "Advisor", "Agent", "Client"],
        exact: true,
        isAnonymous: false,
      },
    ],
  },
  {
    path: "/location",
    name: "location",
    exact: true,
    element: LocationsForm,
    roles: ["Admin", "Advisor", "Agent"],
    isAnonymous: false,
  },
];

const admin = [
      {
        path: "/admin-invite",
        name: "AdminInvite",
        element: AdminInvite,
        roles: ["Admin"],
        exact: true,
        isAnonymous: false
      },
      {
        path: "/admin-change-status",
        name: "ChangeStatus",
        element: ChangeStatus,
        roles: ["Admin"],
        exact: true,
        isAnonymous: false
      },
      {
        path: "/users",
        name: "UsersList",
        element: UsersList,
        roles: ["Admin"],
        exact: true,
        isAnonymous: false,
        isEmpty: true,
      }
]

const clients = [
  {
    path: "/clients",
    name: "ClientList",
    element: ClientsList,
    roles: ["Admin", "Advisor", "Agent"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/clients/new/",
    name: "Client",
    element: newClient,
    roles: ["Admin", "Agent", "Advisor"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/clients/employment",
    name: "ClientEmployment",
    element: ClientEmployment,
    roles: ["Admin", "Agent", "Advisor"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/clients/income",
    name: "ClientIncome",
    element: ClientIncome,
    roles: ["Admin", "Advisor", "Agent"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/clients/housing/housing-status",
    name: "HousingStatus",
    element: HousingStatus,
    roles: ["Admin", "Advisor", "Agent"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/clients/new/PersonalInformation",
    name: "NewClient",
    element: PersonalInformation,
    roles: ["Admin", "Agent", "Advisor"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/clients/housing/mortgages",
    name: "Mortgages",
    element: Mortgages,
    roles: ["Admin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/clients/protection",
    name: "Client Protection",
    exact: true,
    element: ClientProtection,
    roles: ["Admin", "Advisor", "Agent"],
    isAnonymous: false,
  },
  {
    path: "/clients/protection/health",
    name: "Health Insurance",
    exact: true,
    element: HealthInsurance,
    roles: ["Admin", "Advisor", "Agent"],
    isAnonymous: false,
  },
  {
    path: "/clients/protection/life",
    name: "Life Insurance",
    exact: true,
    element: LifeInsurance,
    roles: ["Admin", "Advisor", "Agent"],
    isAnonymous: false,
  },
  {
    path: "/clients/protection/disability",
    name: "Disability Insurance",
    exact: true,
    element: DisabilityInsurance,
    roles: ["Admin", "Advisor", "Agent"],
    isAnonymous: false,
  },
  {
    path: "/clients/debts/shorttermdebt",
    name: "ShortTermDebt",
    exact: true,
    element: ShortTermDebt,
    roles: ["Admin", "Agent", "Advisor"],
    isAnonymous: false,
  },
  {
    path: "/clients/properties",
    name: "Client Properties",
    exact: true,
    element: ClientProperties,
    roles: ["Admin", "Agent", "Advisor"],
    isAnonymous: false,
  },
  {
    path: "/clients/investment",
    name: "Client Investment Accounts",
    exact: true,
    element: InvestmentAccounts,
    roles: ["Admin", "Agent", "Advisor"],
    isAnonymous: false,
  },
  {
    path: "/clients/retirement",
    name: "Client Retirement Accounts",
    exact: true,
    element: RetirementAccounts,
    roles: ["Admin", "Agent", "Advisor"],
    isAnonymous: false,
   },
   {
    path: "/clients/:id",
    name: "Clients",
    exact: true,
    element: Clients,
    roles: ["Admin", "Advisor", "Agent"],
    isAnonymous: false,
   },
];

const users = [
  {
    path: "/user-settings",
    name: "UserSettings",
    element: UserSettings,
    roles: ["Admin", "Advisor", "Agent"],
    exact: true,
    isAnonymous: false,
  },
];

const test = [
  {
    path: "/single-upload",
    name: "SingleFileUpload",
    exact: true,
    element: SingleFileUpload,
    roles: ["Admin", "Advisor", "Agent"],
    isAnonymous: false,
  },
  {
    path: "/filesTest",
    name: "FileUpload",
    exact: true,
    element: FilesUpload,
    roles: ["Admin", "Advisor", "Agent"],
    isAnonymous: false,
  },
  {
    path: "/test",
    name: "Test",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Fail"],
    isAnonymous: false,
  },
  {
    path: "/secured",
    name: "A Secured Route",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Fail"],
    isAnonymous: false,
  },
  {
    path: "/secured2",
    name: "A Secured Route",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Admin"],
    isAnonymous: false,
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
    path: "*",
    name: "Error - 404",
    element: PageNotFound,
    roles: ["Admin", "Advisor", "Agent", "Client"],
    exact: true,
    isAnonymous: false,
  }
];

const allRoutes = [
  ...admin,
  ...clients,
  ...dashboardRoutes,
  ...test,
  ...errorRoutes,
  ...users,
];

export default allRoutes;
