import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const Reportages = React.lazy(() => import("./views/reportages/Students"));
const Reportage = React.lazy(() => import("./views/reportages/Student"));
const AddReportage = React.lazy(() => import("./views/reportages/AddStudent"));

const Blogs = React.lazy(() => import("./views/blog/Blogs"));
const Blog = React.lazy(() => import("./views/blog/Blog"));
const AddBlog = React.lazy(() => import("./views/blog/AddBlog"));


const routes = [
  { path: "/", exact: true, name: "Acceuil" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/reportages", exact: true, name: "Les Reportages", component: Reportages },
  { path: "/create-reportage", exact: true, name: "information du reportage", component: AddReportage, },
  { path: "/create-reportage/:id", exact: true, name: "information du reportage", component: AddReportage, },
  { path: "/reportages/:id", exact: true, name: "information du reportage", component: Reportage, },

  { path: "/blogs", exact: true, name: "Les blogs", component: Blogs },
  { path: "/create-blog", exact: true, name: "information du reportage", component: AddBlog, },
  { path: "/create-blog/:id", exact: true, name: "information du reportage", component: AddBlog, },
  { path: "/blog/:id", exact: true, name: "information du reportage", component: Blog, },
];

export default routes;
