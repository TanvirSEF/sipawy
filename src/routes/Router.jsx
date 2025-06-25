import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Error from "../pages/error/Error";
import Home from "../pages/public/Home";
import PricingPlan from "../pages/Pricing/Pricing";
import Contact from "../pages/Contact/Contact";
import Bar from "../pages/Bar/Bar";
import BarDrinks from "../pages/BarDrinks/BarDrinks";
import BarDashboardLayout from "../layout/BarDashboardLayout";
import BarOrder from "@/pages/private/bar/BarOrder";
import BarInventory from "@/pages/private/bar/BarInventory";
import BarStaffs from "@/pages/private/bar/BarStaffs";
import BarSettings from "@/pages/private/bar/BarSettings";
import BarChats from "@/pages/private/bar/BarChats";
import ProfileDetails from "@/pages/private/bar/ProfileDetails";
import BarStatistics from "@/pages/private/bar/BarStatistics";
import Signup from "@/pages/Signup/Signup";
import Login from "@/pages/Login/Login";
import UserDashboardLayout from "@/layout/UserDashboardLayout";
import UserProfileDetails from "@/pages/private/user/UserProfileDetails";
import UserOrder from "@/pages/private/user/UserOrder";
import UserSettings from "@/pages/private/user/UserSettings";
import UserPackage from "@/pages/private/user/UserPackage";
import UserPayment from "@/pages/private/user/UserPayment";
import ForgotPass from "@/pages/Forgot/ForgotPass";
import VerifyCode from "@/pages/Forgot/VerifyCode";
import ResetPass from "@/pages/Forgot/ResetPass";
import Addtable from "@/pages/private/bar/Addtable";
import PrivateRoute from "./PrivateRoute";
import NotFound from "@/pages/Error.jsx/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      { path: "pricing", element: <PricingPlan /> },
      { path: "contact", element: <Contact /> },
      { path: "bar", element: <Bar /> },
      { path: "bar-drinks/:barId", element: <BarDrinks /> },
    ],
  },
  {
    path: "sign-up",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPass />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/reset-password",
    element: <ResetPass />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "bar-dashboard",
    element: (
      <PrivateRoute>
        <BarDashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      { path: "order", element: <BarOrder /> },
      { path: "inventory", element: <BarInventory /> },
      { path: "addtable", element: <Addtable /> },
      { path: "staffs", element: <BarStaffs /> },
      { path: "statistics", element: <BarStatistics /> },
      { path: "settings", element: <BarSettings /> },
      { path: "chat", element: <BarChats /> },
      { path: "profile-details", element: <ProfileDetails /> },
    ],
  },
  {
    path: "/user-dashboard",
    element: (
      <PrivateRoute>
        <UserDashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      { path: "/user-dashboard", element: <UserOrder /> },
      { path: "/user-dashboard/package", element: <UserPackage /> },
      { path: "/user-dashboard/payment", element: <UserPayment /> },
      { path: "/user-dashboard/settings", element: <UserSettings /> },
      { path: "/user-dashboard/chat", element: <BarChats /> },
      {
        path: "/user-dashboard/profile-details",
        element: <UserProfileDetails />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
