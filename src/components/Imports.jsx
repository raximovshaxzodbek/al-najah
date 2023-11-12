import { lazy } from "react";

const Login = lazy(() => import("../assets/views/Login"));
const Information = lazy(() => import("../assets/views/Information"));
const TaskOne = lazy(() => import("../assets/views/Tasks/TaskOne"));
const TaskTwo = lazy(() => import("../assets/views/Tasks/TaskTwo"));
const TaskThree = lazy(() => import("../assets/views/Tasks/TaskThree"));
const Router = lazy(() => import("./Router"));

const Navbar = lazy(() => import("./Navbar"));
const Loading = lazy(() => import("./Loading"));
const ErrorPage = lazy(() => import("./404"));

export {
  Login,
  Information,
  TaskOne,
  TaskTwo,
  TaskThree,
  Router,
  Navbar,
  Loading,
  ErrorPage,
};
