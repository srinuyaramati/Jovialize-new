import Dashboard from "./pages/Dashboard/Dashboard";
import DealsManagement from "./pages/DealsManagement/Index";
import AddDeal from "./pages/DealsManagement/AddDeal";
import EditDeal from "./pages/DealsManagement/EditDeal";
import CityManagement from "./pages/CityManagement/CityManagement";
import AdminManagement from "./pages/AdminManagement/Index";

import MassMailing from "./pages/MassMailing/Index";
import Login from "./pages/Authentication/Login";
import RoleManagement from "./pages/RoleManagement/Index";
import UserManagement from "pages/UserManagement";
import BannerImages from "pages/BannerImages"
import ForgotPassword from "pages/Authentication/ForgotPassword";
import ResetPassword from "pages/Authentication/ResetPassword";

//import Signup from "./pages/Authentication/Signup";

export const PrivateRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-support-17",
    component: Dashboard,
    layout: "/admin",
    displayOnSideBar: true,
    displayBasedOnRole: true
  },
  {
    path: "/dealsManagement",
    name: "Deals Management",
    icon: "nc-icon nc-notes",
    component: DealsManagement,
    layout: "/admin",
    displayOnSideBar: true,
    displayBasedOnRole: true
  },
  {
    path: "/cityManagement",
    name: "City Management",
    icon: "far fa-building",
    component: CityManagement,
    layout: "/admin",
    displayOnSideBar: true,
    displayBasedOnRole: false
  },
  {
    path: "/adminManagement",
    name: "Admin Users",
    icon: "nc-icon nc-single-02",
    component: AdminManagement,
    layout: "/admin",
    displayOnSideBar: true,
    displayBasedOnRole: false
  },
  {
    path: "/userManagement",
    name: "User Management",
    icon: "nc-icon nc-single-02",
    component: UserManagement,
    layout: "/admin",
    displayOnSideBar: true,
    displayBasedOnRole: true
  },
  {
    path: "/massMailing",
    name: "Mass Mailing",
    icon: "nc-icon nc-email-83",
    component: MassMailing,
    layout: "/admin",
    displayOnSideBar: true,
    displayBasedOnRole: true
  },
  {
    path: "/bannerImages",
    name: "Banner Images",
    icon: "nc-icon nc-album-2",
    component: BannerImages,
    layout: "/admin",
    displayOnSideBar: true,
    displayBasedOnRole: false
  },
  // {
  //   path: "/roleManagement",
  //   name: "Role management",
  //   icon: "nc-icon nc-settings-gear-64",
  //   component: RoleManagement,
  //   layout: "/admin",
  //   displayOnSideBar: true,
  //   displayBasedOnRole: true
  // },
  {
    path: "/addDeal",
    name: "Add Deal",
    icon: "nc-icon nc-email-83",
    component: AddDeal,
    layout: "/admin",
    displayOnSideBar: false
  },
  {
    path: "/editDeal",
    name: "Edit Deal",
    icon: "nc-icon nc-email-83",
    component: EditDeal,
    layout: "/admin",
    displayOnSideBar: false
  }

];

export const PublicRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/authentication"
  },
  {
    path: "/forgotPassword",
    name: "Forgot Password",
    component: ForgotPassword,
    layout: "/authentication"
  },
  {
    path: "/resetPassword",
    name: "Reset Password",
    component: ResetPassword,
    layout: "/authentication"
  },
  // {
  //   path: "/signup",
  //   name: "Signup",
  //   component: Signup,
  //   layout: "/authentication"
  // }
];