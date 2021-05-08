import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const Reportages = React.lazy(() => import("./views/reportages/Students"));
const Reportage = React.lazy(() => import("./views/reportages/Student"));
const AddReportage = React.lazy(() => import("./views/reportages/AddStudent"));


const routes = [
  { path: "/", exact: true, name: "Acceuil" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/reportages", exact: true, name: "Les Reportages", component: Reportages },
  { path: "/create-reportage", exact: true, name: "information du reportage", component: AddReportage, },
  { path: "/create-reportage/:id", exact: true, name: "information du reportage", component: AddReportage, },
  { path: "/reportages/:id", exact: true, name: "information du reportage", component: Reportage, },
];

export default routes;
