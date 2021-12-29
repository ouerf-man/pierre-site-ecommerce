import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const CMS = React.lazy(() => import("./views/cms/CMS"));

const Reportages = React.lazy(() => import("./views/reportages/Students"));
const Reportage = React.lazy(() => import("./views/reportages/Student"));
const AddReportage = React.lazy(() => import("./views/reportages/AddStudent"));

const Blogs = React.lazy(() => import("./views/blog/Blogs"));
const Blog = React.lazy(() => import("./views/blog/Blog"));
const AddBlog = React.lazy(() => import("./views/blog/AddBlog"));

const Coeff = React.lazy(() => import("./views/coeff"));


const routes = [
  { path: "/", exact: true, name: "Acceuil" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/cms", name: "CMS", component: CMS },

  { path: "/reportages", exact: true, name: "Les Reportages", component: Reportages },
  { path: "/create-reportage", exact: true, name: "information du reportage", component: AddReportage, },
  { path: "/create-reportage/:id", exact: true, name: "information du reportage", component: AddReportage, },
  { path: "/reportages/:id", exact: true, name: "information du reportage", component: Reportage, },

  { path: "/blogs", exact: true, name: "Les blogs", component: Blogs },
  { path: "/create-blog/:id", exact: true, name: "information du blog", component: AddBlog, },
  { path: "/create-blog", exact: true, name: "Créer un blog", component: AddBlog, },
  { path: "/blog/:id", exact: true, name: "information du blog", component: Blog, },

  {path : '/coeff', exact: true, name: "Coefficients", component: Coeff,}
];

export default routes;
