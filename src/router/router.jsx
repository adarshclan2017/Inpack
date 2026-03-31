import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Otp from "../pages/Otp";
import BranchSelect from "../pages/BranchSelect";
import Welcome from "../pages/Welcome";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import CashTransaction from "../pages/CashTransaction";
import BankTransaction from "../pages/BankTransaction";
import JobEntry from "../pages/JobEntry";
import JobDone from "../pages/job-done";
import JobDelivery from "../pages/job-delivery";
import Invoice from "../pages/Invoice";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/invoice", element: <Invoice /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/welcome", element: <Welcome /> },
  { path: "/otp", element: <Otp /> },
  { path: "/BranchSelect", element: <BranchSelect /> },
  { path: "/cash", element: <CashTransaction /> },
  { path: "/bank", element: <BankTransaction /> },
  { path: "/job-entry", element: <JobEntry /> },
  { path: "/job-done", element: <JobDone /> },
  { path: "/job-delivery", element: <JobDelivery /> },
]);