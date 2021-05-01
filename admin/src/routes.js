import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Teachers = React.lazy(() => import("./views/teachers/Teachers"));
const AddTeacher = React.lazy(() => import("./views/teachers/AddTeacher"));
const Teacher = React.lazy(() => import("./views/teachers/Teacher"));

const Users = React.lazy(() => import("./views/students/Students"));
const User = React.lazy(() => import("./views/students/Student"));
const AddStudent = React.lazy(() => import("./views/students/AddStudent"));
const Classes = React.lazy(() => import("./views/classes/Classes"));
const Class = React.lazy(() => import("./views/classes/Class"));
const AddClass = React.lazy(() => import("./views/classes/AddClass"));

const Years = React.lazy(() => import("./views/annee/Years"));
const Year = React.lazy(() => import("./views/annee/Year"));
const AddYear = React.lazy(() => import("./views/annee/AddYear"));

const Cms = React.lazy(() => import("./views/cms"));
const AddPage = React.lazy(() => import("./views/cms/AddPage"));

const Actualites = React.lazy(() => import('./views/actualites'))
const AddActualites = React.lazy(() => import('./views/actualites/AddActualite'))

const routes = [
  { path: "/", exact: true, name: "Acceuil" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/students", exact: true, name: "étudiants", component: Users },
  { path: "/teachers", exact: true, name: "enseignant", component: Teachers },
  {
    path: "/create-student",
    exact: true,
    name: "information d'étudiant",
    component: AddStudent,
  },
  {
    path: "/create-teacher",
    exact: true,
    name: "information d'enseignant",
    component: AddTeacher,
  },
  {
    path: "/students/:id",
    exact: true,
    name: "information d'étudiant",
    component: User,
  },
  {
    path: "/teacher/:id",
    exact: true,
    name: "information d'enseignant",
    component: Teacher,
  },
  { path: "/class", exact: true, name: "classe", component: Classes },
  {
    path: "/create-class",
    exact: true,
    name: "ajouter classe",
    component: AddClass,
  },
  {
    path: "/class/:id",
    exact: true,
    name: "information class",
    component: Class,
  },
  {
    path: "/edit-class/:id",
    exact: true,
    name: "editer classe",
    component: AddClass,
  },

  { path: "/year", exact: true, name: "Année universitaire", component: Year },
  {
    path: "/years",
    exact: true,
    name: "Années universitaires",
    component: Years,
  },

  { path: "/cms", exact: true, name: "CMS", component: Cms },
  { path: "/ajouter-page", exact: true, name: "Ajouter page", component: AddPage },
  { path: "/actualites", exact: true, name: "Actualités", component: Actualites },
  { path: "/ajouter-actualité", exact: true, name: "Actualités", component: AddActualites },

];

export default routes;
